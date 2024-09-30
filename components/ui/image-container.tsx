"use client";
import { getPlaceholderImage } from "@/lib/placeholder";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  objectFit?: "cover" | "contain";
  preview?: boolean;
  blur?: boolean;
};

const useBlurPlaceholder = (src: string, shouldBlur: boolean) => {
  const [blurPlaceholder, setBlurPlaceholder] = useState<string | undefined>();

  useEffect(() => {
    if (!shouldBlur) return;

    const handleBlur = async () => {
      try {
        const { placeholder } = await getPlaceholderImage(src);
        setBlurPlaceholder(placeholder);
      } catch (error) {
        console.error("Failed to generate blur placeholder:", error);
      }
    };

    handleBlur();
  }, [src, shouldBlur]);

  return blurPlaceholder;
};

export default function ImageContainer({
  src,
  alt = "",
  className,
  objectFit = "cover",
  preview = true,
  blur = false,
}: Props) {
  const blurPlaceholder = useBlurPlaceholder(src, blur);
  const imageProps = {
    src,
    alt,
    width: 0,
    height: 0,
    style: { width: "100%", height: "100%", objectFit },
    sizes: "(max-width: 1250px) 100vw, 1250px",
    ...(blur && blurPlaceholder
      ? { placeholder: "blur" as const, blurDataURL: blurPlaceholder }
      : {}),
  };
  return (
    <div className={cn("relative", className)}>
      {preview ? (
        <PhotoProvider>
          <PhotoView src={src}>
            <Image {...imageProps} />
          </PhotoView>
        </PhotoProvider>
      ) : (
        <Image {...imageProps} />
      )}
    </div>
  );
}
