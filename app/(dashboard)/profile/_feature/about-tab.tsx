import Render from "@/components/tiptap/Render";
import ImageContainerBlur from "@/components/ui/image-container-blur";
import NotAvailable from "@/components/ui/not-availble";
import { Profile } from "@/types/profiles.type";
import React from "react";
type Props = {
  profile: Profile | null;
};

export default function AccountTab({ profile }: Props) {
  return (
    <div className="mb-6">
      {profile?.aboutMe ? (
        <Render content={profile.aboutMe} />
      ) : (
        <div
          style={{ minHeight: "calc(100svh - 480px)" }}
          className="flex justify-center items-center"
        >
          <NotAvailable message="No About Me" />
        </div>
      )}
    </div>
  );
}
