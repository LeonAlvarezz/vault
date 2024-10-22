import React from "react";
import UserInformationSection from "./feature/user-information";
import SocialLinkSection from "./feature/social-link";
import { Separator } from "@/components/ui/separator";
import EditAboutMeSection from "./feature/edit-about-me";
import { getProfile, getProfilesById } from "@/data/server/profiles";
import { notFound } from "next/navigation";
import EditProfileForm from "@/components/ui/form/edit-profile-form";
import { createClient } from "@/lib/supabase/server";

export default async function EditProfilePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile, error } = await getProfilesById(user!.id);
  if (!profile) {
    notFound();
  }
  return (
    <div className="w-full">
      <EditProfileForm profile={profile} />
    </div>
  );
}
