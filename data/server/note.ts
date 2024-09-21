import { createClient } from "@/utils/supabase/server";

export async function getNoteById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*, content: content->content")
    .eq("id", id)
    .single();
  return { data, error };
}

export async function getAllNotesByProfileId() {
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
    .select("*, content: content->content")
    .eq("profile_id", user!.id);
  return { data, error };
}
