"use server";
import { getCacheUser } from "@/data/server/profiles";
import { createClient } from "@/lib/supabase/server";
import { CreateTag } from "@/types/tag.type";
import { revalidatePath } from "next/cache";

export async function deleteTag(id: number) {
  const supabase = await createClient();
  const { error: authErr } = await supabase.auth.getUser();

  if (authErr) {
    return { data: null, error: authErr };
  }
  const { error } = await supabase.from("tags").delete().match({ id: id });
  if (error) {
    return { data: null, error };
  }
  revalidatePath("/create");
  return { error };
}

export async function createTags(payload: CreateTag) {
  const supabase = await createClient();
  const user = await getCacheUser(supabase);
  const { data, error } = await supabase
    .from("tags")
    .insert({ name: payload.name, profile_id: user!.id })
    .select();
  if (error) {
    return { data: null, error };
  }
  revalidatePath("/");

  return { data, error };
}
