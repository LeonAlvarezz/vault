import React from "react";
import ImageContainerBlur from "../image-container-blur";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { FaRegHeart } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import Tag from "../tag";
import EditNoteDropdownMenu from "../dropdown/edit-note-dropdown";
import Link from "next/link";
import InteractionButton from "./interaction-button";
import NoteCardFooter from "./note-card-footer";

export default function NoteCardPublished() {
  return (
    <Link
      href={"/note/1"}
      className="max-w-full h-auto bg-neutral-800 p-2 text-white flex flex-col cursor-pointer rounded-sm break-inside-avoid border-neutral-700  hover:scale-[1.02] transition-transform"
    >
      <ImageContainerBlur
        className="h-[200px] overflow-hidden rounded-sm "
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="flex flex-col flex-grow p-1">
        <div className="flex-grow flex flex-col gap-2 mt-1">
          <Tag color="orange" className="h-6">
            <p>React</p>
          </Tag>
          <div>
            <div className="w-full justify-between items-center flex">
              <h2 className="text-md font-semibold">What is React</h2>
              <EditNoteDropdownMenu className="left-3" />
            </div>

            <p className="w-full line-clamp-2 mt-2 text-xs text-neutral-500">
              As we delve into 2024, the landscape of web development continues
              to evolve at a rapid pace. React, one of the most popular
              JavaScript libraries for building user interfaces, has maintained
              its position at the forefront of frontend development. With its
              component-based architecture and virtual DOM, React offers
            </p>
          </div>
        </div>
        <NoteCardFooter />
      </div>
    </Link>
  );
}
