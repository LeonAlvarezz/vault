import { createClient } from "@/lib/supabase/server";
import { NoteFilter } from "@/types/note.type";
import { CreateSearch } from "@/types/search.type";

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

export async function searchPublishedNote(
  searchQuery: string,
  filter: NoteFilter
) {
  const supabase = createClient();
  let query = supabase
    .from("notes")
    .select(
      "*, content: content->content, categories!inner(*), profile:profiles!notes_profile_id_fkey!inner(*), tags:rel_notes_tags!inner(tags!inner(id, name, color, profile_id)), likes(*)"
    )
    .not("published_at", "is", null);

  if (filter?.category && filter?.category !== "all") {
    query = query.eq("categories.name", filter.category);
  }

  if (filter?.sortBy) {
    switch (filter.sortBy) {
      case "recent":
        query = query.order("created_at", { ascending: false }); // Assuming you're sorting by creation date
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

  const { data, error } = await query.textSearch("fts", searchQuery);

  return { data, error };
}

export async function getRecentSearch() {
  const supabase = createClient();
  const {
    error: authErr,
    data: { user },
  } = await supabase.auth.getUser();

  if (authErr) {
    return { data: null, error: authErr };
  }

  const { data, error } = await supabase
    .from("searches")
    .select("*")
    .eq("profile_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return { data: null, error };
  }
  return { data, error };
}
