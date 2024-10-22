"use server";
import { createClient } from "@/lib/supabase/server";
//NOT USING
export async function likeNote(noteId: string) {
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
  //Check if note already like
  const { data: like, error: likeError } = await supabase
    .from("likes")
    .select("*")
    .eq("profile_id", user!.id)
    .eq("note_id", noteId)
    .single();

  if (likeError && likeError.code !== "PGRST116") {
    return { error: likeError };
  }
  if (like) {
    if (like.deleted_at === null) {
      //if null == note already liked, when user click then unlike
      const { error } = await supabase
        .from("likes")
        .update({ deleted_at: new Date().toISOString() })
        .eq("profile_id", user!.id)
        .eq("note_id", noteId);

      if (error) {
        return { error };
      }

      action = "unlike";
    } else {
      //if not null == note have not been liked, when user click then like note
      const { error } = await supabase
        .from("likes")
        .update({ deleted_at: null })
        .eq("profile_id", user!.id)
        .eq("note_id", noteId);

      if (error) {
        return { error };
      }

      action = "like";
    }
  } else {
    //If no record then create new one
    const { error } = await supabase
      .from("likes")
      .insert([{ note_id: noteId, profile_id: user!.id }])
      .eq("profile_id", user!.id)
      .eq("note_id", noteId);

    if (error) {
      return { error };
    }

    action = "like";
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
      .update({ like: action === "like" ? metric.like + 1 : metric.like - 1 })
      .eq("note_id", noteId)
      .gte("created_at", `${today}T00:00:00.000Z`)
      .lte("created_at", `${today}T23:59:59.999Z`);
    if (updateError) {
      return { error: updateError };
    }

    const like = action === "like" ? 1 : -1;
    const { error: addNoteLikeError } = await supabase.rpc("increment", {
      table_name: "notes",
      field_name: "like",
      x: like,
      row_id: noteId,
    });

    if (addNoteLikeError) {
      return { error: addNoteLikeError };
    }

    return { error: null };
  }

  const { error: createError } = await supabase
    .from("note_metrics")
    .insert([{ note_id: noteId, like: 1 }]);

  if (createError) {
    return { error: createError };
  }

  const { error: addNoteLikeError } = await supabase.rpc("increment", {
    table_name: "notes",
    field_name: "like",
    x: 1,
    row_id: noteId,
  });

  if (addNoteLikeError) {
    return { error: addNoteLikeError };
  }
  return { error: null };
}
