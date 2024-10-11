"use client";
import React, { Dispatch, SetStateAction, useRef } from "react";

import { FaCamera } from "react-icons/fa6";
import {
  InputWithLabel,
  SelectWithLabel,
  TextAreaWithLabel,
} from "@/components/ui/input-label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Profile } from "@/types/profiles.type";
import UploadButton from "@/components/ui/button/upload-button";

const OCCUPATION = [
  {
    label: "Software Engineer",
    value: "software_engineer",
  },
  {
    label: "Designer",
    value: "designer",
  },
  {
    label: "Cyber Security",
    value: "cyber_security",
  },
  {
    label: "Backend Developer",
    value: "backend_developer",
  },
  {
    label: "Frontend Developer",
    value: "frontend_developer",
  },
];
type Props = {
  profile: Profile;
  setImage: Dispatch<SetStateAction<File | null>>;
  imagePreview: string | null;
};
export default function UserInformationSection({
  profile,
  setImage,
  imagePreview,
}: Props) {
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };
  return (
    <section className="flex flex-col sm:flex-row items-center sm:items-stretch justify-between gap-4">
      <div className="size-[150px] relative flex-shrink-0 ">
        <Avatar className="size-full flex-shrink-0">
          {imagePreview ? (
            <AvatarImage src={imagePreview} />
          ) : (
            <AvatarFallback className="text-3xl">
              {profile.username.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <UploadButton setImage={setImage}>
          <FaCamera size={20} />
        </UploadButton>
        {/* <Button
          onClick={handleUploadClick}
          variant={"icon"}
          size={"icon"}
          className="absolute bottom-0 right-0 hover:bg-neutral-700/50 rounded-full"
        >
          <FaCamera size={20} />
        </Button>
        <Input
          name="avatar_url"
          ref={uploadRef}
          className="hidden"
          type="file"
        /> */}
      </div>

      <div className="basis-2/5 w-full flex flex-col gap-4 justify-between">
        <InputWithLabel
          name="username"
          placeholder="Enter username..."
          label="Username"
        />
        <SelectWithLabel
          name="occupation"
          placeholder="Occupation"
          label="Occupation"
          options={OCCUPATION}
        />
      </div>
      <div className="basis-2/5 w-full">
        <TextAreaWithLabel
          name="bios"
          placeholder="Enter something interesting about yourself..."
          label="Bios"
          showCount
          maxLength={150}
        />
      </div>
    </section>
  );
}
