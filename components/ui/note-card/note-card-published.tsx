import React from "react";
import Tag from "../tag";
import EditNoteDropdownMenu from "../dropdown/edit-note-dropdown";
import { Link } from "react-transition-progress/next";
import NoteCardFooter from "./note-card-footer";
import { Note } from "@/types/note.type";

import ImageContainerBlurClient from "../image/image-container-blur-client";
import { cn } from "@/lib/utils";
type Props = {
  note: Note;
  optionButton?: boolean;
  isBookmark?: boolean;
  isLike?: boolean;
  noInteraction?: boolean;
  className?: string;
};
export default function NoteCardPublished({
  note,
  optionButton = false,
  isBookmark,
  isLike,
  noInteraction = false,
  className,
}: Props) {
  return (
    <Link
      href={`/note/${note?.id}`}
      className={cn(
        "max-w-full h-auto bg-neutral-800 p-4 text-white flex flex-col justify-between cursor-pointer rounded-sm break-inside-avoid border-neutral-700  hover:scale-[1.02] duration-500 transition-transform mb-2",
        className
      )}
    >
      {note?.cover_url && (
        <ImageContainerBlurClient
          className="h-[200px] overflow-hidden rounded-sm bg-neutral-900 aspect-video "
          src={note.cover_url}
          alt={note.title}
          objectFit="cover"
        />
      )}

      <div className="mt-2">
        {note?.categories && (
          <Tag color={note?.categories.color!} className="h-6">
            <p>{note?.categories.name!}</p>
          </Tag>
        )}
      </div>
      <div className="flex mt-1 flex-col">
        <div className="flex justify-between">
          <h2 className="text-md font-semibold mb-1">
            {note?.title || "Untitled"}
          </h2>
          {optionButton && (
            <EditNoteDropdownMenu className="left-3" note={note} />
          )}
        </div>

        <p className="text-xs text-neutral-500 line-clamp-2 w-[95%]">
          {note.content_text}
        </p>
      </div>
      <NoteCardFooter
        note={note}
        bookmark={isBookmark}
        like={isLike}
        noInteraction={noInteraction}
      />
    </Link>
  );
}
