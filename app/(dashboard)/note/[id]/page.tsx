import Render from "@/app/feeds/[id]/Render";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Tag from "@/components/ui/tag";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";

export default function NoteDetailPage() {
  return (
    <section className="flex gap-2 flex-col">
      <h1 className="text-2xl">What is React</h1>
      <Tag color="blue" className="text-xs h-6">
        React
      </Tag>
      <div className="flex justify-between items-end sm:items-center sm:flex-row flex-col mt-2 gap-y-2">
        <div className="flex gap-4 sm:justify-start justify-between items-center w-full">
          <div className="flex gap-2">
            <Avatar className="size-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">John Doe</p>
              <p className="text-xs text-neutral-400">16 Jul 2024</p>
            </div>
          </div>
          <Button variant={"main"} size={"sm"} className="h-7">
            Contact
          </Button>
        </div>
        <div className="flex gap-2 items-end">
          <Button
            // onClick={handleButtonClick}
            variant={"icon"}
            className="group size-9 hover:text-red-500 hover:border-red-500 self-end border border-neutral-600 p-1 rounded-full"
          >
            <FaRegHeart size={16} />
          </Button>
          <Button
            // onClick={handleButtonClick}
            variant={"icon"}
            className="group size-9 hover:text-blue-500 hover:border-blue-500 self-end border border-neutral-600 p-1 rounded-full"
          >
            <IoBookmarkOutline size={16} />
          </Button>
        </div>
      </div>
      <Render />
    </section>
  );
}
