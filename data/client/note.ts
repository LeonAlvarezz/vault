import { BlockNode, SaveNotePayload } from "@/types/note.type";
import { createClient } from "@/lib/supabase/client";
import { Tag } from "@/types/tag.type";
import { revalidatePathClient } from "@/app/api/action";
import OpenAI from "openai";

import { env } from "@/utils/env";

export async function saveNote(payload: SaveNotePayload) {
  const supabase = createClient();

  // const result = await openai.embeddings.create({
  //   input: payload.title + payload.content_text,
  //   model: "text-embedding-3-small",
  // });

  // const [{ embedding }] = result.data;

  // 1. Update the note itself
  const { data: noteData, error: noteError } = await supabase
    .from("notes")
    .update({
      title: payload.title,
      content: payload.content as BlockNode[],
      category_id: +payload.category_id,
      cover_url: payload.cover_url,
      content_text: payload.content_text,
      // embedding: JSON.stringify(embedding),
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

  revalidatePathClient("/note");

  return { data: noteData, error: null };
}

export async function createNote() {
  const supabase = createClient();
  const {
    error: authErr,
    data: { user },
  } = await supabase.auth.getUser();

  if (authErr) {
    return { data: null, error: authErr };
  }
  const { data, error } = await supabase
    .from("notes")
    .insert([{ title: "Untitled", profile_id: user?.id }])
    .select()
    .single();

  revalidatePathClient("/note");
  return { data, error };
}

export async function publishNote(id: string) {
  const supabase = createClient();
  const now = new Date();
  const { error } = await supabase
    .from("notes")
    .update({ published_at: now.toISOString() })
    .match({ id });
  return { error };
}
export async function unpublishNote(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("notes")
    .update({ published_at: null })
    .match({ id });
  return { error };
}

export async function getNoteContent(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("notes")
    .select(
      `
    *,
    tags:rel_notes_tags(
     tags (id, name, profile_id)
    )
  `
    )
    .eq("id", id)
    .single();

  return { data, error };
}
