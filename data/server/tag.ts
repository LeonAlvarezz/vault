import { createClient } from "@/lib/supabase/server";
import { getCacheUser } from "./profiles";

export async function getTags() {
  const supabase = await createClient();
  const user = await getCacheUser(supabase);
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("profile_id", user!.id);

  return { data, error };
}
