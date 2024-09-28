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
  if (published) {
    return <NoteCardPublished />;
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
      <div className="flex justify-between items-center mt-4">
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
