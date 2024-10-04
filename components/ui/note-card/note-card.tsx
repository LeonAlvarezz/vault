import React, { MouseEvent } from "react";
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
import ImageContainerBlur from "../image-container-blur";
type NoteCardProps = {
  note?: Note;
  published?: boolean;
};
export default function NoteCard({ published = false, note }: NoteCardProps) {
  const isContentArray = (content: any): content is Array<any> => {
    return Array.isArray(content);
  };

  if (!note) {
    return (
      <Link
        href={"/note/1"}
        className="max-w-full h-auto bg-neutral-800 p-4 text-white flex flex-col cursor-pointer rounded-sm break-inside-avoid hover:scale-[1.02] duration-500 border-neutral-700  transition-all"
      >
        <div className="flex justify-between items-center mb-4">
          <Tag color="orange" className="h-6">
            <p>React</p>
          </Tag>
          <EditNoteDropdownMenu />
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
  if (published) {
    return <NoteCardPublished note={note} />;
  }

  return (
    <Link
      href={`/create/${note?.id}`}
      className="max-w-full h-auto bg-neutral-800 p-4 text-white flex flex-col cursor-pointer rounded-sm break-inside-avoid hover:scale-[1.02] border-neutral-700  transition-all"
    >
      {note?.cover_url && (
        <ImageContainerBlur
          className="h-[200px] overflow-hidden rounded-sm mb-2"
          src={note?.cover_url}
        />
      )}
      <div className="flex justify-between">
        <div>
          <h2 className="text-md font-semibold mb-1">
            {note?.title || "Untitled"}
          </h2>
          {note?.content &&
            isContentArray(note.content) &&
            note.content.length > 0 && (
              <>{renderNoteDescription(note.content[0] as BlockNode)}</>
            )}
        </div>

        <EditNoteDropdownMenu />
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
