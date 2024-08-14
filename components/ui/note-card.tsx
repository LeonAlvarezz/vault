import React from "react";
import ImageContainer from "./image-container";
import { FaRegHeart } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";

import { Button } from "./button";
import Link from "next/link";

export default function NoteCard() {
  return (
    <Link href={"/note/id"}>
      <div className="w-[300px] h-[300px] bg-neutral-800 p-2 text-white flex flex-col">
        <ImageContainer
          className="h-[200px]"
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="flex flex-col flex-grow px-2 py-1">
          <div className="flex-grow">
            <h2 className="text-lg font-semibold">Good design to know</h2>
            <p className="text-sm text-neutral-500">John Doe</p>
          </div>
          <div className="flex gap-2 items-end">
            <Button
              variant={"icon"}
              size={"icon"}
              className="group w-5 h-5 hover:text-red-500 self-end"
            >
              <FaRegHeart className="group w-full h-full" />
            </Button>
            <Button
              variant={"icon"}
              size={"icon"}
              className="group w-5 h-5 hover:text-blue-500 self-end"
            >
              <IoBookmarkOutline className="group w-full h-full" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
