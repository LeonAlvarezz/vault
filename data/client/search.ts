import { createClient } from "@/lib/supabase/client";

export async function searchNoteCol(query: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("notes")
    .select(
      "id, title, cover_url, content_text, profiles!notes_profile_id_fkey!inner(*)"
    )
    .textSearch("fts", query)
    .limit(4);
  if (error) {
    return { data: null, error };
  }
  console.log("error", error);

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
      "id, title, published_at, content_text, profiles!notes_profile_id_fkey!inner(*)"
    );

  if (!isGlobal) {
    query = query.eq("profile_id", user!.id);
  } else {
    query = query.not("published_at", "is", null).neq("profile_id", user!.id);
  }

  const { data, error } = await query.textSearch("fts", searchQuery).limit(4);

  return { data, error };
}
