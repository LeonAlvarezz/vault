"use client";
import { getPlaceholderImage } from "@/lib/placeholder";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { env } from "process";
import React, { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Skeleton } from "../skeleton";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  skeletonHeight?: string;
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
const handleClick = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  // Optional: Do something here if you want
};

export default function ImageContainerBlurClient({
  src,
  alt = "",
  className,
  objectFit = "cover",
  preview = true,
  blur = false,
  skeletonHeight,
}: Props) {
  // const blurPlaceholder = useBlurPlaceholder(src, blur);
  const imageProps = {
    src,
    alt,
    width: 0,
    height: 0,
    style: { width: "100%", height: "100%", objectFit },
    sizes: "(max-width: 1250px) 100vw, 1250px",
    // ...(blur && blurPlaceholder
    //   ? { placeholder: "blur" as const, blurDataURL: blurPlaceholder }
    //   : {}),
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Skeleton className={cn("w-full", skeletonHeight)} />;
  }

  return (
    <div className={cn("relative", className)}>
      {preview ? (
        <PhotoProvider>
          <div onClick={handleClick} className="w-full h-full">
            <PhotoView src={src}>
              <Image {...imageProps} />
            </PhotoView>
          </div>
        </PhotoProvider>
      ) : (
        <Image {...imageProps} />
      )}
    </div>
  );
}
