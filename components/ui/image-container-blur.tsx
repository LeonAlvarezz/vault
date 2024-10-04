import { getPlaceholderImage } from "@/lib/placeholder";
import { cn } from "@/lib/utils";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import Image from "next/image";
import React from "react";
type Props = {
  src: string;
  alt?: string;
  className?: string;
  objectFit?: "cover" | "contain" | "fill";
};

export default async function ImageContainerBlur({
  src,
  alt = "",
  className,
  objectFit = "cover",
}: Props) {
  const { placeholder } = await getPlaceholderImage(src);
  return (
    <div className={cn("relative", className)}>
      <Image
        src={src}
        alt={alt}
        blurDataURL={placeholder}
        placeholder="blur"
        width={0}
        height={0}
        style={{ width: "100%", height: "100%", objectFit: objectFit }}
        sizes="(max-width: 1250px) 100vw, 1250px"
      />
    </div>
  );
}
