import { createClient } from "@/lib/supabase/server";
import { NoteFilter } from "@/types/note.type";

export async function getNoteById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*, content: content->content")
    .eq("id", id)
    .single();
  return { data, error };
}

export async function getAllNotesByProfileId(filter?: NoteFilter) {
  const supabase = createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) {
    return { data: null, error: authErr };
  }
  let query = supabase
    .from("notes")
    .select(
      "*, content: content->content, categories!inner(*), profile:profiles!notes_profile_id_fkey!inner(*), tags:rel_notes_tags!inner(tags!inner(id, name, color, profile_id)), likes(*), bookmarks(*)"
    )
    .eq("profile_id", user!.id)
    .eq("likes.profile_id", user!.id);

  if (filter?.category && filter?.category !== "all") {
    query = query.eq("categories.name", filter.category);
  }

  if (filter?.status && filter?.status !== "all") {
    switch (filter.status) {
      case "published":
        query = query.not("published_at", "is", null);
        break;

      case "unpublished":
        query = query.is("published_at", null);
        break;
    }
  }

  if (filter?.tags) {
    const tagsArray = Array.isArray(filter.tags) ? filter.tags : [filter.tags];
    if (tagsArray.length > 0) {
      query = query.in("tags.tags.name", tagsArray);
    }
  }

  const { data, error } = await query;

  return { data, error };
}

export async function getNoteExplore() {
  const supabase = createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) {
    return { data: null, error: authErr };
  }
  let query = supabase
    .from("notes")
    .select(
      "*, content: content->content, categories!inner(*), profile:profiles!notes_profile_id_fkey!inner(*), tags:rel_notes_tags!inner(tags!inner(id, name, color, profile_id)), likes(*), bookmarks(*)"
    )
    .not("published_at", "is", null)
    .eq("likes.profile_id", user!.id)
    .eq("bookmarks.profile_id", user!.id);
  if (user) {
    query = query.eq("likes.profile_id", user.id);
  }
  const { data, error } = await query;

  return { data, error };
}
