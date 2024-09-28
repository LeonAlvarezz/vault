import { createClient } from "@/lib/supabase/server";

export async function getTags() {
  const supabase = createClient();
  const {
    error: authErr,
    data: { user },
  } = await supabase.auth.getUser();

  if (authErr) {
    return { data: null, error: authErr };
  }
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("profile_id", user!.id);

  return { data, error };
}
