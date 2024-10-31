import React, { MouseEvent } from "react";
import { Link } from "react-transition-progress/next";
import Tag from "../tag";
import EditNoteDropdownMenu from "../dropdown/edit-note-dropdown";
import { Note } from "@/types/note.type";
import { formatDate } from "@/lib/date";
import ImageContainerBlurClient from "../image/image-container-blur-client";
type NoteCardProps = {
  note?: Note;
  bookmark?: boolean;
};
export default function NoteCard({ bookmark = false, note }: NoteCardProps) {
  if (!note) {
    return (
      <Link
        href={"/note/1"}
        className="max-w-full h-auto bg-neutral-800/70 p-4 text-white flex flex-col cursor-pointer rounded-sm break-inside-avoid hover:scale-[1.02] duration-500 border-neutral-700  transition-all mb-2"
      >
        <div className="flex justify-between items-center mb-4">
          <Tag color="orange" className="h-6">
            <p>React</p>
          </Tag>
          <EditNoteDropdownMenu note={note} />
        </div>
        <div className="flex justify-between items-center ">
          <div>
            <h2 className="text-md font-semibold">
              How to publish note on Vault
            </h2>
            <p className="w-full line-clamp-4 mt-2 text-xs text-neutral-500">
              As we delve into 2024, the landscape of web development continues
              to evolve at a rapid pace. React, one of the most popular
              JavaScript libraries for building user interfaces, has maintained
              its position at the forefront of frontend development. With its
              component-based architecture and virtual DOM, React offers
            </p>
            <p className="mt-4 text-xs text-neutral-300 text-right">
              16 Jul 2024
            </p>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link
      href={`/create/${note?.id}`}
      className="max-w-full h-auto bg-neutral-800/70 p-4 text-white flex flex-col cursor-pointer rounded-sm break-inside-avoid hover:scale-[1.02] border-neutral-700 duration-500  transition-all mb-2"
    >
      {note?.cover_url && (
        <ImageContainerBlurClient
          className="h-[200px] bg-neutral-900 overflow-hidden rounded-sm mb-2 object-contain"
          src={note?.cover_url}
          objectFit="cover"
        />
      )}
      <div className="flex mt-1 flex-col">
        <div className="flex justify-between">
          <h2 className="text-md font-semibold mb-1">
            {note?.title || "Untitled"}
          </h2>
          <EditNoteDropdownMenu className="left-3" note={note} />
        </div>

        <p className="text-xs text-neutral-500 line-clamp-2 w-[95%] ">
          {note.content_text}
        </p>
      </div>
      <div className="flex justify-between items-end mt-4">
        {note?.categories && (
          <Tag color={note?.categories.color!} className="h-6">
            <p>{note?.categories.name!}</p>
          </Tag>
        )}
        <p className="mt-4 text-xs text-neutral-300 text-right w-full ">
          {formatDate(note?.created_at)}
        </p>
      </div>
    </Link>
  );
}
