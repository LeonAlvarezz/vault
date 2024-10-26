import Tag from "@/components/ui/tag";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function PreviewCategorization() {
  return (
    <div className="min-h-[300px] w-[500px] border border-neutral-700/50 p-4 mt-6 tiptap rounded-sm  overflow-hidden animated-border-box absolute">
      {/* <div className="bg-gradient-to-tl from-neutral-700 to-neutral-900 absolute top-0 left-0 w-full h-full opacity-40 "></div> */}
      <div className="bg-gradient-to-b from-neutral-900/30 to-neutral-900/90 absolute top-0 left-0 w-full h-full z-20"></div>
      <div className="flex gap-2">
        <div className="px-4 h-6 bg-main rounded-full flex justify-center items-center">
          <p className="text-xs">Next.js</p>
        </div>
        <div className="px-4 h-6 border border-neutral-700 rounded-full flex justify-center items-center">
          <p className="text-xs">React</p>
        </div>

        <div className="px-4 h-6 border border-neutral-700 rounded-full flex justify-center items-center">
          <p className="text-xs">Vue</p>
        </div>
        <div className="px-4 h-6 border border-neutral-700 rounded-full flex justify-center items-center">
          <p className="text-xs">Nuxt</p>
        </div>
      </div>
      <div className="flex gap-1 flex-col">
        <div className="max-w-[150px] h-8 border border-neutral-700 flex items-center justify-between px-2 rounded-sm">
          <p className="text-xs">Tag</p>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 z-10" />
        </div>
        <div className="max-w-[150px] min-h-24 border border-neutral-700 flex flex-col p-4 gap-2">
          <Tag color="red">Improvement</Tag>
          <Tag color="blue">Backend</Tag>
          <Tag color="green">Frontend</Tag>
        </div>
      </div>
    </div>
  );
}
