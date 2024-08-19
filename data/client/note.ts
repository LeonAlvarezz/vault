import { createClient } from "@/utils/supabase/client";

export async function sendNote(content: any) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("notes")
    .insert([{ content: content }])
    .select();

  return { data, error };
}
