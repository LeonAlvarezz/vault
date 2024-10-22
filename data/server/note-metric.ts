import { createClient } from "@/lib/supabase/server";
import { getUser } from "./profiles";

export async function getNoteSummary() {
  const supabase = createClient();
  const user = await getUser(supabase);

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
  const supabase = createClient();
  const user = await getUser(supabase);
  const { data, error } = await supabase
    .rpc("get_note_chart_data", { user_id: user!.id })
    .select("*");

  if (error) {
    return { data: null, error };
  }
  return { data, error };
}
