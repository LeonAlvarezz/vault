"use client";
import ImageContainerBlurClient from "@/components/ui/image/image-container-blur-client";
import { PREVIEW_NOTE } from "@/constant/homepage";
import React from "react";
import Masonry from "react-masonry-css";
import PreviewNoteCard from "./preview-note-card";
export const breakpointColumnsObj = {
  default: 2,
};

export default function PreviewExplore() {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-2 scale-110 relative lg:-right-20 bottom-20 -right-[14rem] lg:bottom-0" // Ensure there's a gap between columns
    >
      <div className="bg-gradient-to-br from-neutral-900/20 to-neutral-900 absolute top-0 left-0 w-full h-[500px] z-20"></div>
      {PREVIEW_NOTE.map((note, index) => (
        <PreviewNoteCard
          key={index}
          title={note.title}
          img={note.img}
          des={note.des}
        />
      ))}

      <div className="w-44 h-52 bg-popover border border-neutral-700 mb-2"></div>
      <div className="w-44 h-40 bg-popover border border-neutral-700 mb-2"></div>
    </Masonry>
  );
}
