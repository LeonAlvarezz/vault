import { Note } from "@/types/note.type";
import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export async function getNoteById(
  id: number
): Promise<{ data: Note | null; error: PostgrestError | null }> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}

export async function getAllNotes() {
  const supabase = createClient();
  const { data, error } = await supabase.from("notes").select("*");
  return { data, error };
}
