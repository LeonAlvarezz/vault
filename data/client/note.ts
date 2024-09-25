import { BlockNode, SaveNotePayload } from "@/types/note.type";
import { createClient } from "@/lib/supabase/client";

export async function saveNote(payload: SaveNotePayload) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("notes")
    .update({
      title: payload.title,
      content: payload.content as BlockNode[],
      category_id: +payload.category_id,
    })
    .eq("id", payload.id)
    .select();

  return { data, error };
}

export async function createNote() {
  const supabase = createClient();
  const {
    error: authErr,
    data: { user },
  } = await supabase.auth.getUser();

  if (authErr) {
    return { data: null, error: authErr };
  }
  const { data, error } = await supabase
    .from("notes")
    .insert([{ title: "Untitled", profile_id: user?.id }])
    .select()
    .single();
  return { data, error };
}

export async function getNoteContent(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}
