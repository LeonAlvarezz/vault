import { createClient } from "@/lib/supabase/client";

export async function searchNoteCol(keyword: string, searchKey: string) {
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
      "id, title, cover_url, content->content, profiles!notes_profile_id_fkey!inner(*), bookmarks(*)"
    );
  switch (searchKey) {
    case "personal":
      query = query.eq("profile_id", user!.id);
      break;
    case "bookmark":
      query = query.eq("bookmarks.profile_id", user!.id);
      break;
    default:
      query = query.not("published_at", "is", null);
      break;
  }
  const { data, error } = await query
    .textSearch("fts", keyword)
    .order("fts", { ascending: true })
    .limit(4);
  if (error) {
    return { data: null, error };
  }
  return { data, error };
}

export async function commandSearch(searchQuery: string, isGlobal: boolean) {
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
      "id, title, content->content, published_at, profiles!notes_profile_id_fkey!inner(*)"
    );

  if (!isGlobal) {
    query = query.eq("profile_id", user!.id);
  } else {
    query = query.not("published_at", "is", null).neq("profile_id", user!.id);
  }

  const { data, error } = await query.textSearch("fts", searchQuery).limit(4);

  return { data, error };
}
