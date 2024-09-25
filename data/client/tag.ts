import { createClient } from "@/lib/supabase/client";
import { CreateTag } from "@/types/tag.type";

export async function createTags(payload: CreateTag) {
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
    .insert({ name: payload.name, profile_id: user?.id })
    .select();
  if (error) {
    return { data: null, error };
  }
  return { data, error };
}

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
