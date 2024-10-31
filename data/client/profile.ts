import { createClient } from "@/lib/supabase/client";
import { cache } from "react";

export const getUserSubscriptionStatus = cache(async () => {
  const supabase = createClient();
  const {
    error: authErr,
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("profiles")
    .select("subscription_tier")
    .eq("id", user!.id)
    .single();
  if (error) {
    return { status: null, error };
  }
  return { status: data.subscription_tier, error: null };
});
