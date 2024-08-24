import React, { MouseEvent } from "react";
import ImageContainer from "../image-container";
import { FaRegHeart } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { Button } from "../button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import Tag from "../tag";
import { SlOptionsVertical } from "react-icons/sl";
import { useRouter } from "next/navigation";
import NoteCardPublished from "./note-card-published";
import EditNoteDropdownMenu from "../dropdown/edit-note-dropdown";
type NoteCardProps = {
  published?: boolean;
};
export default function NoteCard({ published = false }: NoteCardProps) {
  if (published) {
    return <NoteCardPublished />;
  }

  return (
    <Link
      href={"/note/1"}
      // onClick={handleCardClick}
      className="max-w-full h-auto bg-neutral-800 p-4 text-white flex flex-col cursor-pointer rounded-sm break-inside-avoid hover:scale-[1.02] hover:border border-neutral-700  transition-all"
    >
      <div className="flex justify-between items-center mb-4">
        <Tag color="orange" className="h-6">
          <p>React</p>
        </Tag>
        <EditNoteDropdownMenu />
        {/* <Button
          variant={"icon"}
          // size={"icon"}
          className="rounded-full p-2 size-8 relative left-2 flex-shrink-0 hover:bg-neutral-700/50 focus-visible:ring-offset-0"
        >
          <SlOptionsVertical />
        </Button> */}
      </div>
      <div className="flex justify-between items-center ">
        <div>
          <h2 className="text-md font-semibold">
            How to publish note on Vault
          </h2>
          <p className="w-full line-clamp-4 mt-2 text-xs text-neutral-500">
            As we delve into 2024, the landscape of web development continues to
            evolve at a rapid pace. React, one of the most popular JavaScript
            libraries for building user interfaces, has maintained its position
            at the forefront of frontend development. With its component-based
            architecture and virtual DOM, React offers
          </p>
          <p className="mt-4 text-xs text-neutral-300 text-right">
            16 Jul 2024
          </p>
        </div>
        {/* <Button
            onClick={handleButtonClick}
          variant={"icon"}
            size={"icon"}
            className="group w-5 h-5 hover:text-blue-500 self-end z-50"
          >
            <SlOptionsVertical />
          </Button> */}
      </div>
    </Link>
  );
}