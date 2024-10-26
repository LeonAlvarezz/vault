import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import React from "react";
import { RiGlobalLine } from "react-icons/ri";

export default function PreviewSearch() {
  return (
    <div className="max-h-[300px] !w-[450px] border border-neutral-700/50 p-3 rounded-sm overflow-hidden lg:mt-0 mt-4 animated-border-box preview-search absolute  lg:left-0 left-24">
      <div className="bg-gradient-to-b from-neutral-900/30 to-neutral-900/100 absolute top-0 left-0 w-full h-full z-20"></div>

      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center">
          <Search size={12} className="text-neutral-500" />
          <p className="text-xs">Next</p>
        </div>
        <RiGlobalLine className="text-neutral-500" />
      </div>
      <Separator className="my-2" />
      <div className="py-1.5">
        <p className="text-xs">{`What's NextJS`}</p>
        <p className="text-[10px] text-neutral-600">John Doe</p>
      </div>
      <Separator className="my-1" />
      <div className="py-1.5">
        <p className="text-xs">How to start your NextJS Project</p>
        <p className="text-[10px] text-neutral-600">John Doe</p>
      </div>
      <Separator className="my-1" />

      <div className="py-1.5">
        <p className="text-xs">use client in NextJS </p>
        <p className="text-[10px] text-neutral-600">John Doe</p>
      </div>
      <Separator className="my-1" />
    </div>
  );
}
