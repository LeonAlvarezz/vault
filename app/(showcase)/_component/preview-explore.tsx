"use client";
import ImageContainerBlurClient from "@/components/ui/image/image-container-blur-client";
import React from "react";
import Masonry from "react-masonry-css";
export const breakpointColumnsObj = {
  default: 2,
  900: 3,
};

export default function PreviewExplore() {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-2 scale-110 relative right-4" // Ensure there's a gap between columns
    >
      <div className="bg-gradient-to-br from-neutral-900/20 to-neutral-900 absolute top-0 left-0 w-full h-[500px] z-20"></div>

      <div className="w-44 h-fit bg-popover border border-neutral-700 mb-2 p-3 rounded-sm">
        <ImageContainerBlurClient
          src="/image/preview-note-1.png"
          className="h-24"
          skeletonHeight="h-24"
        />
        <p className="text-xs font-bold mt-2">
          Building Interactive Charts in Next.js with Shadcn
        </p>
        <p className="text-[10px] text-neutral-500 line-clamp-2 mt-1">
          Learn how to integrate Shadcn UI components with Next.js to create
          responsive, dynamic charts for real-time data visualization.
        </p>
      </div>
      <div className="w-44 h-fit bg-popover border border-neutral-700 mb-2 p-3 rounded-sm">
        <ImageContainerBlurClient
          src="/image/preview-note-2.png"
          className="h-24"
          skeletonHeight="h-24"
        />
        <p className="text-xs font-bold mt-2">Error-Proof Your Web App</p>
        <p className="text-[10px] text-neutral-500 line-clamp-2 mt-1">
          Key tips for graceful error handling in web development.
        </p>
      </div>
      <div className="w-44 h-fit bg-popover border border-neutral-700 mb-2 p-3 rounded-sm">
        <ImageContainerBlurClient
          src="/image/preview-note-3.png"
          className="h-24"
          skeletonHeight="h-24"
        />
        <p className="text-xs font-bold mt-2">Reusable Components Done Right</p>
        <p className="text-[10px] text-neutral-500 line-clamp-2 mt-1">
          Learn how component reusability can cut dev time and improve code
          maintainability.
        </p>
      </div>
      <div className="w-44 h-fit bg-popover border border-neutral-700 mb-2 p-3 rounded-sm">
        <ImageContainerBlurClient
          src="/image/preview-note-4.png"
          className="h-24"
          skeletonHeight="h-24"
        />
        <p className="text-xs font-bold mt-2">Async JavaScript Simplified</p>
        <p className="text-[10px] text-neutral-500 line-clamp-2 mt-1">
          Demystify asynchronous JavaScript with practical examples and use
          cases.
        </p>
      </div>
      {/* <div className="w-44 h-40 bg-popover border border-neutral-700 mb-2"></div>
      <div className="w-44 h-52 bg-popover border border-neutral-700 mb-2"></div>
      <div className="w-44 h-40 bg-popover border border-neutral-700 mb-2"></div>*/}
    </Masonry>
  );
}
