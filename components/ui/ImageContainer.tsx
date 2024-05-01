import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
type Props = {
  src: string;
  alt?: string;
  className?: string;
};
export default function ImageContainer({ src, alt = "", className }: Props) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src={src}
        alt={alt}
        style={{ objectFit: "cover" }}
        fill
        sizes="(max-width: 700px) 30vw, 80px"
      />
    </div>
  );
}
