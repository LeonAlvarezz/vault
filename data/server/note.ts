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
    .select("*, content: content->content, categories!inner(*)")
    .eq("profile_id", user!.id);

  if (filter?.category && filter?.category !== "all") {
    query = query.eq("categories.name", filter.category);
  }

  if (filter?.status && filter?.status !== "all") {
    switch (filter.status) {
      case "published":
        query = query.not("published_at", "is", null);
        break;

      case "unpublish":
        query = query.is("published_at", null);
        break;
    }
  }

  if (filter?.tag) {
    query = query.contains("tags", [filter.tag]);
  }

  const { data, error } = await query;

  return { data, error };
}
