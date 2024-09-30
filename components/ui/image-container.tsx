"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  objectFit?: "cover" | "contain";
  preview?: boolean;
};

export default function ImageContainer({
  src,
  alt = "",
  className,
  objectFit = "cover",
  preview = true,
}: Props) {
  return (
    <div className={cn("relative", className)}>
      {preview ? (
        <PhotoProvider>
          <PhotoView src={src}>
            <Image
              src={src}
              alt={alt}
              width={0}
              height={0}
              style={{ width: "100%", height: "100%", objectFit: objectFit }}
              sizes="(max-width: 1250px) 100vw, 1250px"
            />
          </PhotoView>
        </PhotoProvider>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          style={{ width: "100%", height: "100%", objectFit: objectFit }}
          sizes="(max-width: 1250px) 100vw, 1250px"
        />
      )}
    </div>
  );
}
