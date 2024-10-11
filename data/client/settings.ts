import { revalidatePathClient } from "@/app/api/action";
import { createClient } from "@/lib/supabase/client";
import { Setting } from "@/types/setting.type";

export const getUserSetting = async () => {
  const supabase = createClient();
  const {
    error: authErr,
    data: { user },
  } = await supabase.auth.getUser();

  if (authErr) {
    return { data: null, error: authErr };
  }

  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("profile_id", user!.id)
    .single();
  if (error) {
    return { data: null, error };
  }

  return { data, error };
};

export const saveSettings = async (config: Partial<Setting>) => {
  const supabase = createClient();
  const {
    error: authErr,
    data: { user },
  } = await supabase.auth.getUser();

  if (authErr) {
    return { data: null, error: authErr };
  }

  const { data, error } = await supabase
    .from("settings")
    .update(config)
    .eq("profile_id", user!.id);

  if (error) {
    return { data: null, error };
  }

  revalidatePathClient("/settings");

  return { data, error };
};
