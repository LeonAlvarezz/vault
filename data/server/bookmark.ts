"use server";

import { createClient } from "@/lib/supabase/server";

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
