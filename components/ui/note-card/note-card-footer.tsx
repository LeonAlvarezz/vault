"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { FaRegHeart } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { Button } from "../button";
import { useRouter } from "next/navigation";

export default function NoteCardFooter() {
  const router = useRouter();
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("Button clicked!");
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    router.push("/profile/id");
  };
  return (
    <div className="flex justify-between w-full items-center mt-2">
      <div
        className="flex gap-2 rounded-sm p-0.5 hover:bg-neutral-700/50 items-center"
        onClick={handleProfileClick}
      >
        <Avatar className="w-7 h-7">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm text-neutral-200">John Doe</p>
          <p className="text-xs text-neutral-500">16 Jul 2024</p>
        </div>
      </div>
      <div className="flex gap-2 items-end">
        <Button
          onClick={handleButtonClick}
          //   asChild
          variant={"icon"}
          size={"icon"}
          className="group w-5 h-5 hover:text-red-500 self-end"
        >
          <FaRegHeart className="group w-full h-full" />
        </Button>
        <Button
          //   asChild
          onClick={handleButtonClick}
          variant={"icon"}
          size={"icon"}
          className="group w-5 h-5 hover:text-blue-500 self-end"
        >
          <IoBookmarkOutline className="group w-full h-full" />
        </Button>
      </div>
    </div>
  );
}