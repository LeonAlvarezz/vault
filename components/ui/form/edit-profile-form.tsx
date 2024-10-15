"use client";
import UserInformationSection from "@/app/(dashboard)/profile/edit/feature/user-information";
import React, { useEffect, useRef, useState } from "react";
import { Separator } from "../separator";
import SocialLinkSection from "@/app/(dashboard)/profile/edit/feature/social-link";
import EditAboutMeSection from "@/app/(dashboard)/profile/edit/feature/edit-about-me";
import { EditProfile, Profile } from "@/types/profiles.type";
import { FaCheck } from "react-icons/fa";
import { Button } from "../button";
import { InputWithLabel } from "../input-label";
import { compressImage, toBase64 } from "@/lib/image";
import { uploadImage } from "@/data/client/image";
import { toast } from "../use-toast";
import { editProfile } from "@/app/api/action";
import { ZodFormattedError } from "zod";
import { TiptapEditorRef } from "@/components/tiptap/TipTapEditor";
type Props = {
  profile: Profile;
};
export default function EditProfileForm({ profile }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const editorRef = useRef<TiptapEditorRef>(null);

  const [errors, setErrors] = useState<ZodFormattedError<EditProfile> | null>(
    null
  );
  const [imagePreview, setImagePreviewUrl] = useState(
    profile.avatar_url || null
  );
  const handleSubmit = async (formData: FormData) => {
    const data: EditProfile = {
      username: formData.get("username")?.toString() || undefined,
      githubLink: formData.get("githubLink")?.toString() || undefined,
      websiteLink: formData.get("websiteLink")?.toString(),
      linkedinLink: formData.get("linkedinLink")?.toString(),
      bios: formData.get("bios")?.toString(),
      occupation: formData.get("occupation")?.toString(),
      avatar_url: imagePreview || undefined,
      aboutMe: editorRef.current?.editor?.getJSON(),
    };
    const response = await editProfile(data);
    if (response?.error) {
      setErrors(response.error as ZodFormattedError<EditProfile>);
      //   toast({
      //     title: "Login Error!",
      //     description: response.error,
      //     variant: "destructive",
      //     duration: 1500,
      //   });
    } else {
      toast({
        title: "Successfully Edit Profile",
        variant: "success",
        duration: 1500,
      });
    }
  };

  const handleUploadCover = async (image: File) => {
    const base64 = await toBase64(image);
    setImagePreviewUrl(base64);

    const compressedImage = await compressImage(image, { maxSizeMB: 1 });

    const { publicUrl, error } = await uploadImage(compressedImage);

    if (error) {
      setImagePreviewUrl(null);
      toast({
        title: "Error Upload Image",
        description: error.message,
      });
      return;
    }

    setImagePreviewUrl(publicUrl);
  };

  useEffect(() => {
    if (!image) return;

    handleUploadCover(image);
  }, [image]);

  return (
    <form action={handleSubmit}>
      <UserInformationSection
        profile={profile}
        setImage={setImage}
        imagePreview={imagePreview}
        errors={errors}
      />
      <Separator className="my-10 " />
      <SocialLinkSection errors={errors} profile={profile} />
      <Separator className="my-10 " />
      <EditAboutMeSection editorRef={editorRef} profile={profile} />
      <Button
        variant={"icon"}
        className="fixed sm:bottom-4 right-5 bottom-20 xl:right-64 bg-green-800 size-12 rounded-full p-0 hover:bg-green-900"
        // onClick={(e) => {
        //   e.preventDefault();
        // }}
      >
        <FaCheck size={18} className="text-green-300" />
      </Button>
    </form>
  );
}
