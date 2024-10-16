"use server";

import { createClient } from "@/lib/supabase/server";
import { NoteFilter } from "@/types/note.type";
import { constructSearchQuery } from "@/utils/string";
import { searchBookmarkNote, searchUserNote } from "./search";

export async function bookmarkNote(noteId: string) {
  const supabase = createClient();
  let action;
  const today = new Date().toISOString().split("T")[0];

  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) {
    return { error: authErr };
  }
  //Check if note already bookmark
  const { data: bookmark, error: bookmarkError } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("profile_id", user!.id)
    .eq("note_id", noteId)
    .single();

  if (bookmarkError && bookmarkError.code !== "PGRST116") {
    return { error: bookmarkError };
  }
  if (bookmark) {
    if (bookmark.deleted_at === null) {
      //if null == note already bookmark, when user click then unbookmark
      const { error } = await supabase
        .from("bookmarks")
        .update({ deleted_at: new Date().toISOString() })
        .eq("profile_id", user!.id)
        .eq("note_id", noteId);

      if (error) {
        return { error };
      }
      action = "unbookmark";
    } else {
      //if not null == note have not been bookmark, when user click then bookmark note
      const { error } = await supabase
        .from("bookmarks")
        .update({ deleted_at: null })
        .eq("profile_id", user!.id)
        .eq("note_id", noteId);

      if (error) {
        return { error };
      }

      action = "bookmark";
    }
  } else {
    //If no record then create new one
    const { error } = await supabase
      .from("bookmarks")
      .insert([{ note_id: noteId, profile_id: user!.id }])
      .eq("profile_id", user!.id)
      .eq("note_id", noteId);

    if (error) {
      return { error };
    }

    action = "bookmark";
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
      .update({
        bookmark:
          action === "bookmark" ? metric.bookmark + 1 : metric.bookmark - 1,
      })
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
    .insert([{ note_id: noteId, bookmark: 1 }]);

  if (createError) {
    return { error: createError };
  }
  return { error: null };
}

export async function getBookmark(filter?: NoteFilter) {
  const supabase = createClient();

  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) {
    return { error: authErr };
  }
  let query = supabase
    .from("bookmarks")
    .select(
      "*, note:notes!inner(*, content: content->content, categories!inner(*), profile:profiles!notes_profile_id_fkey!inner(*), tags:rel_notes_tags!inner(tags!inner(id, name, color, profile_id, created_at)), likes(*))"
    )
    .eq("profile_id", user!.id)
    .is("deleted_at", null);

  if (filter?.category && filter?.category !== "all") {
    query = query.eq("notes.categories.name", filter.category);
  }

  if (filter?.status && filter?.status !== "all") {
    switch (filter.status) {
      case "published":
        query = query.not("notes.published_at", "is", null);
        break;

      case "unpublished":
        query = query.is("notes.published_at", null);
        break;
    }
  }

  if (filter?.query) {
    const query = constructSearchQuery(filter.query, "|");
    const { data, error } = await searchBookmarkNote(query);
    return { data, error };
  }

  const { data, error } = await query;

  return { data, error };
}
