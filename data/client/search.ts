import { createClient } from "@/lib/supabase/client";
import { CreateSearch } from "@/types/search.type";

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
    )
    .is("deleted_at", null);

  if (!isGlobal) {
    query = query.eq("profile_id", user!.id);
  } else {
    query = query.not("published_at", "is", null);
  }

  const { data, error } = await query.textSearch("fts", searchQuery).limit(4);

  return { data, error };
}

export async function logSearch(userId: string, payload: CreateSearch) {
  const supabase = createClient();

  const { data: search, error: countError } = await supabase
    .from("searches")
    .select("*")
    .eq("query", payload.query)
    .eq("profile_id", userId)
    .single();
  if (countError && countError.code !== "PGRST116") {
    return { error: countError };
  }
  if (search) {
    const { error } = await supabase.rpc("increment_int_id", {
      table_name: "searches",
      field_name: "search_count",
      row_id: search.id,
      x: 1,
    });
    if (error) {
      return { error };
    }
    return { error: null };
  } else {
    const { error } = await supabase
      .from("searches")
      .insert([
        {
          profile_id: userId,
          query: payload.query,
          search_source: payload.search_source,
          search_type: payload.search_type,
        },
      ])
      .eq("profile_id", userId);
    if (error) {
      return { error: null };
    }
  }
  return { error: null };
}
