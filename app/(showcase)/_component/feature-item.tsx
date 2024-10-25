import ImageContainer from "@/components/ui/image/image-container";
import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import React from "react";
type Props = {
  heading: string;
  description: string;
  className?: string;
  imageSrc?: string | StaticImport;
};
export default function FeatureItem({
  heading,
  description,
  className,
  imageSrc,
}: Props) {
  return (
    <div
      className={cn(
        "bg-neutral-900 border border-neutral-700/50 p-6 rounded-sm",
        className
      )}
    >
      <h1 className="text-lg font-bold">{heading}</h1>
      <p className="text-xs text-neutral-400">{description}</p>
      {/* {children} */}

      {imageSrc && <ImageContainer src={imageSrc} />}
    </div>
  );
}
