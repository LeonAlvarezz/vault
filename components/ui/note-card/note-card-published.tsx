import React from "react";
import ImageContainerBlur from "../image-container-blur";
import Tag from "../tag";
import EditNoteDropdownMenu from "../dropdown/edit-note-dropdown";
import Link from "next/link";
import NoteCardFooter from "./note-card-footer";
import { BlockNode, Note } from "@/types/note.type";
import { renderNoteDescription } from "@/lib/renderNote";
import { likeNote } from "@/data/server/like";
import { revalidatePath } from "next/cache";
import { bookmarkNote } from "@/data/server/bookmark";
type Props = {
  note: Note;
};
export default function NoteCardPublished({ note }: Props) {
  const isContentArray = (content: any): content is Array<any> => {
    return Array.isArray(content);
  };

  const toggleLike = async () => {
    "use server";
    const { error } = await likeNote(note.id);
    if (!error) {
      revalidatePath("/note");
    }
    return error;
  };

  const toggleBookmark = async () => {
    "use server";
    const { error } = await bookmarkNote(note.id);
    if (!error) {
      revalidatePath("/note");
    }
    return error;
  };
  return (
    <Link
      href={`/create/${note?.id}`}
      className="max-w-full h-auto bg-neutral-800 p-4 text-white flex flex-col cursor-pointer rounded-sm break-inside-avoid border-neutral-700  hover:scale-[1.02] duration-500 transition-transform"
    >
      {note?.cover_url && (
        <ImageContainerBlur
          className="h-[200px] overflow-hidden rounded-sm "
          src={note.cover_url}
          alt={note.title}
        />
      )}

      <div className="mt-2">
        {note?.categories && (
          <Tag color={note?.categories.color!} className="h-6">
            <p>{note?.categories.name!}</p>
          </Tag>
        )}
      </div>
      <div className="flex justify-between mt-1">
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

        <EditNoteDropdownMenu className="left-3" />
      </div>
      <NoteCardFooter
        note={note}
        toggleLike={toggleLike}
        toggleBookmark={toggleBookmark}
      />

      {/* <div className="flex flex-col flex-grow p-1">
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
      </div> */}
    </Link>
  );
}
