"use server";
import { getCacheUser } from "@/data/server/profiles";
import { createClient } from "@/lib/supabase/server";
import { SaveNotePayload, BlockNode } from "@/types/note.type";
import { revalidatePath } from "next/cache";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function saveNote(payload: SaveNotePayload) {
  const supabase = await createClient();
  const embeddingText = [
    `Title: ${payload.title}`, // Explicitly mark title
    `Content: ${payload.content_text}`,
    `Created/Updated: ${new Date().toISOString()}`,
    // Add some semantic markers
    `This note is about: ${payload.title}`,
  ]
    .filter(Boolean)
    .join("\n"); // Use newlines for better text separation

  const result = await openai.embeddings.create({
    input: embeddingText,
    model: "text-embedding-3-small",
  });

  const [{ embedding }] = result.data;

  // 1. Update the note itself
  const { data: noteData, error: noteError } = await supabase
    .from("notes")
    .update({
      title: payload.title,
      content: payload.content as BlockNode[],
      category_id: +payload.category_id || null,
      cover_url: payload.cover_url,
      content_text: payload.content_text,
      embedding: JSON.stringify(embedding),
      updated_at: new Date().toISOString(),
    })
    .eq("id", payload.id)
    .select();

  if (noteError) {
    return { data: null, error: noteError };
  }

  // 2. Delete existing tag relationships for the note in rel_note_tag
  const { error: deleteError } = await supabase
    .from("rel_notes_tags")
    .delete()
    .eq("note_id", payload.id);

  if (deleteError) {
    return { data: null, error: deleteError };
  }

  // 3. Insert new tag relationships into rel_note_tag
  const tagInserts = payload.tags.map((tagId) => ({
    note_id: payload.id,
    tag_id: +tagId,
  }));

  const { error: insertError } = await supabase
    .from("rel_notes_tags")
    .insert(tagInserts);

  if (insertError) {
    return { data: null, error: insertError };
  }

  // revalidatePathClient("/note");

  return { data: noteData, error: null };
}

export async function deleteNote(id: string) {
  const supabase = await createClient();
  const now = new Date().toISOString();

  const { error } = await supabase
    .from("notes")
    .update({ deleted_at: now })
    .match({ id });
  if (error) {
    return { error };
  }
  revalidatePath("/");
  return { error: null };
}

export async function likeNote(noteId: string) {
  const supabase = await createClient();
  let action;
  const today = new Date().toISOString().split("T")[0];
  const user = await getCacheUser(supabase);
  if (!user || user.is_anonymous) {
    return {
      error: {
        message: "You must login to like & bookmark note ",
      },
    };
  }
  //Check if note already like
  const { data: like, error: likeError } = await supabase
    .from("likes")
    .select("*")
    .eq("profile_id", user!.id)
    .eq("note_id", noteId)
    .single();
  if (likeError && likeError.code !== "PGRST116") {
    return { error: likeError };
  }
  if (like) {
    if (like.deleted_at === null) {
      //if null == note already liked, when user click then unlike
      const { error } = await supabase
        .from("likes")
        .update({ deleted_at: new Date().toISOString() })
        .eq("profile_id", user!.id)
        .eq("note_id", noteId);

      if (error) {
        return { error };
      }

      action = "unlike";
    } else {
      //if not null == note have not been liked, when user click then like note
      const { error } = await supabase
        .from("likes")
        .update({ deleted_at: null })
        .eq("profile_id", user!.id)
        .eq("note_id", noteId);

      if (error) {
        return { error };
      }

      action = "like";
    }
  } else {
    //If no record then create new one
    const { error } = await supabase
      .from("likes")
      .insert([{ note_id: noteId, profile_id: user!.id }])
      .eq("profile_id", user!.id)
      .eq("note_id", noteId);

    if (error) {
      return { error };
    }

    action = "like";
  }

  const { data: metric, error: metricError } = await supabase
    .from("note_metrics")
    .select("*")
    .eq("note_id", noteId)
    .gte("created_at", `${today}T00:00:00.000Z`)
    .lte("created_at", `${today}T23:59:59.999Z`)
    .single();
  if (metricError && metricError.code !== "PGRST116") {
    return { error: metricError };
  }

  if (metric) {
    const { error: updateError } = await supabase
      .from("note_metrics")
      .update({ like: action === "like" ? metric.like + 1 : metric.like - 1 })
      .eq("note_id", noteId)
      .gte("created_at", `${today}T00:00:00.000Z`)
      .lte("created_at", `${today}T23:59:59.999Z`);
    if (updateError) {
      return { error: updateError };
    }

    const like = action === "like" ? 1 : -1;
    const { error: addNoteLikeError } = await supabase.rpc("increment", {
      table_name: "notes",
      field_name: "like",
      x: like,
      row_id: noteId,
    });

    if (addNoteLikeError) {
      return { error: addNoteLikeError };
    }

    return { error: null };
  }

  const { error: createError } = await supabase
    .from("note_metrics")
    .insert([{ note_id: noteId, like: 1 }]);

  if (createError) {
    return { error: createError };
  }

  const { error: addNoteLikeError } = await supabase.rpc("increment", {
    table_name: "notes",
    field_name: "like",
    x: 1,
    row_id: noteId,
  });

  if (addNoteLikeError) {
    return { error: addNoteLikeError };
  }
  return { error: null };
}
