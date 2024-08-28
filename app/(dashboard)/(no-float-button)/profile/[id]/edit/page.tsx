import React from "react";
import UserInformationSection from "./feature/user-information";
import SocialLinkSection from "./feature/social-link";
import { Separator } from "@/components/ui/separator";
import EditAboutMeSection from "./feature/edit-about-me";

export default function EditProfilePage() {
  return (
    <div className="w-full">
      <UserInformationSection />
      <Separator className="my-10 " />
      <SocialLinkSection />
      <Separator className="my-10 " />
      <EditAboutMeSection />
    </div>
  );
}
