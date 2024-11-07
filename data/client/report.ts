import { CreateReport } from "@/types/report.type";
import { getCacheUser } from "../server/profiles";
import { createClient } from "@/lib/supabase/client";

export const submitReport = async (payload: CreateReport) => {
  const supabase = createClient();
  const {
    error: authErr,
    data: { user },
  } = await supabase.auth.getUser();

  if (authErr) {
    return { data: null, error: authErr };
  }
  const { error } = await supabase.from("reports").insert({
    subject: payload.subject,
    description: payload.description,
    images: payload.images,
    contact_email: payload.contact_email,
    profile_id: user!.id,
  });

  return { error };
};
