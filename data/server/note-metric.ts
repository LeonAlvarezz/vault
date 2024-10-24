import { createClient } from "@/lib/supabase/server";
import { getCacheUser } from "./profiles";

export async function getNoteSummary() {
  const supabase = await createClient();
  const user = await getCacheUser(supabase);

  const { data, error } = await supabase
    .rpc("get_note_summary", { user_id: user!.id })
    .select("*")
    .single();
  if (error) {
    return { data: null, error };
  }

  return { data, error };
}

export async function getNoteMetricLast3Months() {
  const supabase = await createClient();
  const user = await getCacheUser(supabase);
  const { data, error } = await supabase
    .rpc("get_note_chart_data", { user_id: user!.id })
    .select("*");

  if (error) {
    return { data: null, error };
  }

  return { data, error };
}
