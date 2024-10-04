import { createClient } from "@/lib/supabase/server";
import { NoteFilter } from "@/types/note.type";

export async function getNoteById(id: string) {
  const supabase = createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) {
    return { data: null, error: authErr };
  }
  const { data, error } = await supabase
    .from("notes")
    .select(
      "*, content: content->content, categories!inner(*), profile:profiles!notes_profile_id_fkey!inner(*), tags:rel_notes_tags(tags!inner(id, name, color, profile_id)), likes(*), bookmarks(*)"
    )
    .eq("id", id)
    .eq("likes.profile_id", user!.id)
    .eq("bookmarks.profile_id", user!.id)
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
      "*, content: content->content, categories!inner(*), profile:profiles!notes_profile_id_fkey!inner(*), tags:rel_notes_tags(tags!inner(id, name, color, profile_id)), likes(*), bookmarks(*)"
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

export async function getNoteExplore(filter?: NoteFilter) {
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

export async function getBookmarkNote(filter?: NoteFilter) {
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
    .eq("bookmarks.profile_id", user!.id)
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

export async function increaseView(noteId: string) {
  "use server";
  const supabase = createClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: note, error: noteError } = await supabase
    .from("notes")
    .select("*")
    .match({ id: noteId })
    .single();
  if (noteError) {
    return { data: null, error: noteError };
  }
  const { error } = await supabase
    .from("notes")
    .update({ view: note.view ? note.view + 1 : 1 })
    .match({ id: noteId });
  if (error) {
    return { data: null, error };
  }

  const { data: metric, error: metricError } = await supabase
    .from("note_metrics")
    .select("*")
    .eq("note_id", noteId)
    .gte("created_at", `${today}T00:00:00.000Z`)
    .lte("created_at", `${today}T23:59:59.999Z`)
    .single();
  if (metricError && metricError.code !== "PGRST116") {
    return { error: metricError };
  }

  if (metric) {
    const { error: updateError } = await supabase
      .from("note_metrics")
      .update({ view: metric.view + 1 })
      .eq("note_id", noteId)
      .gte("created_at", `${today}T00:00:00.000Z`)
      .lte("created_at", `${today}T23:59:59.999Z`);
    if (updateError) {
      return { error: updateError };
    }

    return { error: null };
  }

  const { error: createError } = await supabase
    .from("note_metrics")
    .insert([{ note_id: noteId, view: 1 }]);

  if (createError) {
    return { error: createError };
  }

  return { error: null };
}
