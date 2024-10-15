import React from "react";
import UserInformationSection from "./feature/user-information";
import SocialLinkSection from "./feature/social-link";
import { Separator } from "@/components/ui/separator";
import EditAboutMeSection from "./feature/edit-about-me";
import { getProfile } from "@/data/server/profiles";
import { notFound } from "next/navigation";
import EditProfileForm from "@/components/ui/form/edit-profile-form";

export default async function EditProfilePage() {
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
