"use client";
import { updateUserCover } from "@/app/api/action";
import UploadButton from "@/components/ui/button/upload-button";
import ImageContainer from "@/components/ui/image-container";
import { toast } from "@/components/ui/use-toast";
import { uploadImage } from "@/data/client/image";
import { compressImage, toBase64 } from "@/lib/image";
import { Profile } from "@/types/profiles.type";
import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
type Props = {
  profile: Profile | null;
};
export default function CoverImage({ profile }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
    profile?.cover_url || null
  );
  useEffect(() => {
    if (!image) return;

    handleUploadCover(image);
  }, [image]);

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
    } else {
      const { error } = await updateUserCover(publicUrl);
      if (error) {
        toast({
          title: "Error Upload Image",
          description: error.message,
        });
      } else {
        toast({
          title: "Successfully Update Cover Image",
        });
        setImagePreviewUrl(publicUrl);
      }
    }
  };
  return (
    <div className="relative">
      {imagePreviewUrl ? (
        <ImageContainer
          src={imagePreviewUrl}
          alt="cover-image"
          className="overflow-hidden h-[150px] w-full opacity-80"
        />
      ) : (
        <ImageContainer
          src="/image/default-cover1.png"
          alt="default-cover"
          className="overflow-hidden h-[150px] w-full opacity-80"
        />
      )}
      <UploadButton
        className="absolute w-fit h-fit py-1 px-2 group bottom-0 right-0 hover:bg-neutral-800 z-50"
        setImage={setImage}
      >
        <div className="text-xs text-neutral-100 font-normal items-center flex gap-2 group-hover:text-neutral-300">
          <FaPen size={12} />
          <p>Edit</p>
        </div>
      </UploadButton>
    </div>
  );
}
