import { createClient } from "@/lib/supabase/client";

export async function getAllCategories() {
  const supabase = createClient();
  const { data, error } = await supabase.from("categories").select();
  return { data, error };
}
