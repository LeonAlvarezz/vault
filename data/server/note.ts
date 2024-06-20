import { createClient } from "@/lib/supabase/server";

export async function getNoteById(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase.from("Notes").select("*").eq("id", id);
  return { data, error };
}

export async function getAllNotes() {
  const supabase = createClient();
  const { data, error } = await supabase.from("Notes").select("*");
  return { data, error };
}
