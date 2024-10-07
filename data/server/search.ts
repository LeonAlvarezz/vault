import { createClient } from "@/lib/supabase/server";

export async function searchNoteCol(query: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("notes")
    .select(
      "id, title, cover_url, content->content, profiles!notes_profile_id_fkey!inner(*)"
    )
    .textSearch("fts", query)
    .limit(4);
  if (error) {
    return { data: null, error };
  }

  return { data, error };
}
