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
import { BlockNode, Note } from "@/types/note.type";
import { renderNote, renderNoteDescription } from "@/lib/renderNote";
import { formatDate } from "@/lib/date";
type NoteCardProps = {
  note?: Note;
  published?: boolean;
};
export default function NoteCard({ published = false, note }: NoteCardProps) {
  const isContentArray = (content: any): content is Array<any> => {
    return Array.isArray(content);
  };
  if (published) {
    return <NoteCardPublished />;
  }

  return (
    <Link
      href={`/create/${note?.id}`}
      // onClick={handleCardClick}
      className="max-w-full h-auto bg-neutral-800 p-4 text-white flex flex-col cursor-pointer rounded-sm break-inside-avoid hover:scale-[1.02] hover:border border-neutral-700  transition-all"
    >
      <div className="flex justify-between items-center mb-4">
        {note?.categories && (
          <Tag color={note?.categories.color!} className="h-6">
            <p>{note?.categories.name!}</p>
          </Tag>
        )}

        <div className="flex justify-end w-full">
          <EditNoteDropdownMenu />
        </div>
        {/* <Button
          variant={"icon"}
          // size={"icon"}
          className="rounded-full p-2 size-8 relative left-2 flex-shrink-0 hover:bg-neutral-700/50 focus-visible:ring-offset-0"
        >
          <SlOptionsVertical />
        </Button> */}
      </div>
      <div className="flex justify-between items-center ">
        <div className="w-full">
          <h2 className="text-md font-semibold">{note?.title || "Untitled"}</h2>
          {note?.content &&
            isContentArray(note.content) &&
            note.content.length > 0 && (
              <p>{renderNoteDescription(note.content[0] as BlockNode)}</p>
            )}
          <p className="mt-4 text-xs text-neutral-300 text-right w-full ">
            {formatDate(note?.created_at)}
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
