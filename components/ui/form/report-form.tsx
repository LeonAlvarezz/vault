"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import MultiUploadButton from "@/components/ui/button/multi-upload-button";
import SubmitButton from "@/components/ui/button/submit-button";
import { InputWithLabel, TextAreaWithLabel } from "@/components/ui/input-label";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa6";
import ImageContainerBlurClient from "../image/image-container-blur-client";
import { compressImage, toBase64 } from "@/lib/image";
import { IoIosClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { CreateReport } from "@/types/report.type";
import { uploadImage } from "@/data/client/image";
import { toast } from "../use-toast";
import { submitReport } from "@/data/client/report";

type ImagePreview = {
  base64: string;
  name: string;
  id: string;
};

export default function ReportForm() {
  const [images, setImages] = useState<File[] | null>([]);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  useEffect(() => {
    if (!images) return;
    const handleUploadCover = async (images: File[]) => {
      images.forEach(async (image) => {
        const base64 = await toBase64(image);
        setImagePreviews((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            name: image.name,
            base64: base64,
          },
        ]);
      });
    };

    handleUploadCover(images);
  }, [images]);
  const handleDeletePreview = (id: string) => {
    setImagePreviews((prev) => prev.filter((image) => image.id !== id));
  };
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<CreateReport>({
      defaultValues: {
        contact_email: "",
        description: "",
        subject: "",
        images: [],
      },
    });
  const handleSubmitReport = async (data: CreateReport) => {
    if (!data) return;
    let imageURLs: string[] = [];

    if (images && images.length > 0) {
      const { data, error } = await getImagesURL();

      if (error) {
        toast({
          title: "Something went wrong with uploading image!",
          variant: "destructive",
        });
        return;
      }

      imageURLs = data ?? [];
    }

    const payload: CreateReport = {
      subject: data.subject,
      description: data.description,
      contact_email: data.contact_email,
      images: imageURLs,
    };
    reset();
    setImagePreviews([]);
    // console.log("payload:", payload);
    const { error } = await submitReport(payload);
    if (error) {
      toast({
        title: "Something went wrong with uploading image!",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Successfully Submit Report",
      description:
        "You have successfully submit the report, we will reach out to you via the provided email.",
      variant: "success",
    });
  };

  const getImagesURL = async () => {
    if (!images) {
      return { data: null, error: "No Image Provided" };
    }

    try {
      const uploadImages = await Promise.all(
        images.map(async (image) => {
          const compressedImage = await compressImage(image, {
            maxSizeMB: 0.5,
          });
          const { publicUrl } = await uploadImage(compressedImage);

          if (!publicUrl) {
            throw new Error("Something went wrong.");
          }

          return publicUrl;
        })
      );

      return { data: uploadImages, error: null };
    } catch (error: unknown) {
      return {
        data: null,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleSubmitReport)}
      //   action={handleSubmit}
      className="mt-10 flex gap-6 flex-col"
    >
      <InputWithLabel
        register={register("contact_email")}
        label="Contact Email"
        name="contact_email"
        required
      />
      <InputWithLabel
        register={register("subject")}
        label="Subject"
        name="subject"
        required
      />
      <TextAreaWithLabel
        register={register("description")}
        name="description"
        label="Description"
        minHeight={200}
        showCount
        maxLength={500}
      />
      <Label>Attachment</Label>
      <div className="flex gap-4">
        {imagePreviews?.map((image, index) => (
          <div key={index} className="relative">
            <ImageContainerBlurClient
              src={image.base64}
              className="w-16 h-16 rounded-sm"
            />
            <Button
              variant="icon"
              size="icon"
              onClick={() => handleDeletePreview(image.id)}
              className="rounded-full w-4 h-4 absolute -top-1 -right-1 bg-red-500 hover:bg-red-500/50"
            >
              <IoIosClose />
            </Button>
          </div>
        ))}
        <MultiUploadButton setImage={setImages}>
          <Button
            variant={"icon"}
            className="w-16 h-16 relative border rounded-sm border-dashed hover:bg-transparent hover:border-neutral-700/50"
          >
            <FaPlus />
          </Button>
        </MultiUploadButton>
      </div>
      <SubmitButton label="Submit" />
    </form>
  );
}
