import { BlockNode, NoteFilter, SaveNotePayload } from "@/types/note.type";
import { createClient } from "@/lib/supabase/client";
import { Tag } from "@/types/tag.type";
import { revalidatePathClient } from "@/app/api/action";
import OpenAI from "openai";

import { env } from "@/utils/env";
import { constructSearchQuery } from "@/utils/string";
export const CURSOR_LIMIT = 20;

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
  revalidatePathClient("/explore");
  return { error };
}
export async function unpublishNote(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("notes")
    .update({ published_at: null })
    .match({ id });
  revalidatePathClient("/explore");
  return { error };
}

export async function getNoteContent(id: string) {
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
    .select(
      `
    *,
    tags:rel_notes_tags(
     tags (id, name, profile_id)
    )
  `
    )
    .eq("id", id)
    .eq("profile_id", user!.id)
    .single();

  return { data, error };
}

export async function getAllAvailableNoteForParams() {
  const supabase = createClient();

  let query = supabase
    .from("notes")
    .select("id")
    .not("published_at", "is", null);

  const { data } = await query;
  return { data };
}

export async function getCusorNote(filter: NoteFilter, from = 0, to = 20) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from("notes")
    .select(
      "*, categories!inner(*), profile:profiles!notes_profile_id_fkey!inner(*), tags:rel_notes_tags(tags!inner(id, name, color, profile_id)), likes(*), bookmarks(*)"
    )
    .not("published_at", "is", null);
  if (user) {
    query = query
      .eq("likes.profile_id", user.id)
      .eq("bookmarks.profile_id", user.id);
  }

  if (filter?.category && filter?.category !== "all") {
    query = query
      .eq("categories.name", filter.category)
      .not("categories.name", "is", "NULL");
  }

  if (filter?.tags) {
    const tagsArray = Array.isArray(filter.tags) ? filter.tags : [filter.tags];
    if (tagsArray.length > 0) {
      query = query.in("tags.tags.name", tagsArray);
    }
  }

  if (filter?.sortBy) {
    switch (filter.sortBy) {
      case "recent":
        query = query.order("created_at", { ascending: false });
        break;

      case "most_liked":
        query = query.order("like", { ascending: false });
        break;

      case "most_popular":
        query = query.order("view", { ascending: true });
        break;

      case "trending":
        query = query
          .order("like", { ascending: false })
          .order("view", { ascending: false })
          .order("created_at", { ascending: false });
        break;
    }
  }
  // if (filter?.query) {
  //   const constructedQuery = filter?.query.replace(/_/g, " ");
  //   const searchQuery = constructSearchQuery(constructedQuery, "|");
  //   const { data, error } = await searchPublishedNote(
  //   searchQuery || "",
  //     filter as NoteFilter
  //   );

  //   return { data, error };
  // }

  const { data, error } = await query.range(from, to);

  return { data, error };
}
