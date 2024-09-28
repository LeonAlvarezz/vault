import { createClient } from "@/lib/supabase/client";
import { CreateTag, UpdateTag } from "@/types/tag.type";

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
    .insert({ name: payload.name, profile_id: user!.id })
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

export async function updateTag(payload: UpdateTag) {
  const supabase = createClient();
  const { error: authErr } = await supabase.auth.getUser();

  if (authErr) {
    return { data: null, error: authErr };
  }
  const { data, error } = await supabase
    .from("tags")
    .update({ name: payload.name, color: payload.color })
    .eq("id", payload.id)
    .select();
  if (error) {
    return { data: null, error };
  }
  return { data, error };
}

export async function deleteTag(id: number) {
  const supabase = createClient();
  const { error: authErr } = await supabase.auth.getUser();

  if (authErr) {
    return { data: null, error: authErr };
  }
  const { error } = await supabase.from("tags").delete().match({ id: id });
  if (error) {
    return { data: null, error };
  }
  return { error };
}
