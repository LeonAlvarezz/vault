import ImageContainerBlurClient from "@/components/ui/image/image-container-blur-client";
import React from "react";
type Props = {
  img: string;
  title: string;
  des: string;
};
export default function PreviewNoteCard({ img, title, des }: Props) {
  return (
    <div className="w-fit min-w-44 max-w-48: h-fit bg-popover border border-neutral-700 mb-2 p-3 rounded-sm">
      <ImageContainerBlurClient
        src={img}
        className="h-24"
        skeletonHeight="h-24"
      />
      <p className="text-xs font-bold mt-2">{title}</p>
      <p className="text-[10px] text-neutral-500 line-clamp-2 mt-1">{des}</p>
    </div>
  );
}
