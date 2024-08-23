"use client";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { Button } from "../button";

export default function InteractionButton() {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    console.log("Button clicked!");
  };
  return (
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
  );
}
