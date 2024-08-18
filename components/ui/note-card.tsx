"use client";
import React, { MouseEvent } from "react";
import ImageContainer from "./image-container";
import { FaRegHeart } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { Button } from "./button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Tag from "./tag";
import { SlOptionsVertical } from "react-icons/sl";
import { useRouter } from "next/navigation";

export default function NoteCard() {
  const router = useRouter();

  const handleCardClick = () => {
    router.push("/note/id");
  };

  const handleProfileClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    router.push("/profile/1");
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    console.log("Button clicked!");
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full h-full bg-neutral-800 p-2 text-white flex flex-col cursor-pointer"
    >
      <ImageContainer
        className="h-[200px]"
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="flex flex-col flex-grow px-2 py-1">
        <Tag color="orange" className="h-5">
          <p>React</p>
        </Tag>
        <div className="flex-grow flex flex-col gap-2 mt-1">
          <div className="flex justify-between">
            <h2 className="text-md font-semibold">Good design to know</h2>
            <Button
              onClick={handleButtonClick}
              variant={"icon"}
              size={"icon"}
              className="group w-5 h-5 hover:text-blue-500 self-end z-50"
            >
              <SlOptionsVertical />
            </Button>
          </div>
          <div className="flex justify-between w-full items-center">
            <div onClick={handleProfileClick} className="flex gap-2">
              <Avatar className="w-7 h-7">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {/* <div className="flex justify-between w-full"> */}
              <div className="flex flex-col">
                <p className="text-sm text-neutral-200">John Doe</p>
                <p className="text-xs text-neutral-500">16 Jul 2024</p>
              </div>
            </div>
            <div className="flex gap-2 items-end">
              <Button
                onClick={handleButtonClick}
                variant={"icon"}
                size={"icon"}
                className="group w-5 h-5 hover:text-red-500 self-end"
              >
                <FaRegHeart className="group w-full h-full" />
              </Button>
              <Button
                onClick={handleButtonClick}
                variant={"icon"}
                size={"icon"}
                className="group w-5 h-5 hover:text-blue-500 self-end"
              >
                <IoBookmarkOutline className="group w-full h-full" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
