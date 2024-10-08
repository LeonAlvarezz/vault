import { createClient } from "@/lib/supabase/server";

export async function searchUserNote(searchQuery: string) {
  const supabase = createClient();
  const {
    error: authErr,
    data: { user },
  } = await supabase.auth.getUser();

  if (authErr) {
    return { data: null, error: authErr };
  }

  let query = supabase
    .from("notes")
    .select(
      "*, content: content->content, categories!inner(*), profile:profiles!notes_profile_id_fkey!inner(*), tags:rel_notes_tags(tags!inner(id, name, color, profile_id)), likes(*), bookmarks(*)"
    )
    .eq("profile_id", user!.id);

  const { data, error } = await query.textSearch("fts", searchQuery);

  return { data, error };
}

export async function searchBookmarkNote(searchQuery: string) {
  const supabase = createClient();
  const {
    error: authErr,
    data: { user },
  } = await supabase.auth.getUser();

  if (authErr) {
    return { data: null, error: authErr };
  }

  let query = supabase
    .from("bookmarks")
    .select(
      "*, note:notes!inner(*, content: content->content, categories!inner(*), profile:profiles!notes_profile_id_fkey!inner(*), tags:rel_notes_tags!inner(tags!inner(id, name, color, profile_id)), likes(*))"
    )
    .eq("profile_id", user!.id);

  const { data, error } = await query.textSearch("note.fts", searchQuery);

  return { data, error };
}
