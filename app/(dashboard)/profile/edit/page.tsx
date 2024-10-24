import React from "react";
import { getProfile } from "@/data/server/profiles";
import { notFound } from "next/navigation";
import EditProfileForm from "@/components/ui/form/edit-profile-form";
import { createClient } from "@/lib/supabase/server";

export default async function EditProfilePage() {
  const supabase = createClient();

  const { data: profile, error } = await getProfile();
  if (!profile) {
    notFound();
  }
  return (
    <div className="w-full">
      <EditProfileForm profile={profile} />
    </div>
  );
}
