import { InsertUserPayload } from "@/types/profiles.type";
import { createClient } from "@/lib/supabase/server";

const insertUser = async (id: string, payload: InsertUserPayload) => {
  const supabase = createClient();
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
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return { data: null, error };
  }

  return { data, error };
};
