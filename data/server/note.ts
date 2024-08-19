import { createClient } from "@/utils/supabase/server";

export async function getNoteById(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase.from("notes").select("*").eq("id", id);
  return { data, error };
}

export async function getAllNotes() {
  const supabase = createClient();
  const { data, error } = await supabase.from("notes").select("*");
  return { data, error };
}
