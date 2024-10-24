import { InsertUserPayload } from "@/types/profiles.type";
import { createClient } from "@/lib/supabase/server";
import { cache } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

const insertUser = async (id: string, payload: InsertUserPayload) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").insert([
    {
      ...payload, // Spread the payload object here
      user_id: id, // Add the user_id field
    },
  ]);

  if (error) {
    console.error("Error updating profile:", error);
    return null;
  }

  return data;
};

export const getProfilesById = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*,  content: aboutMe->content")
    .eq("id", id)
    .single();
  if (error) {
    return { data: null, error };
  }

  return { data, error };
};

export const getProfile = async () => {
  const supabase = await createClient();
  const user = await getCacheUser(supabase);
  const { data, error } = await supabase
    .from("profiles")
    .select("*, content: aboutMe->content")
    .eq("id", user!.id)
    .single();
  if (error) {
    return { data: null, error };
  }
  return { data, error };
};

const getUserInternal = async (supabase: SupabaseClient) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return user;
};

export const getCacheUser = cache(
  unstable_cache(getUserInternal, ["userId"], { tags: ["users"] })
);
