import { BlockNode, Note, NOTE_CONTENT_TYPE } from "@/types/note.type";
import { renderNote } from "@/lib/renderNote";
import React from "react";
type Props = {
  note: Note;
};
export default async function Render({ note }: Props) {
  if (!note.content) {
    return "No Content";
  }

  if (Array.isArray(note.content)) {
    return (
      <div className="tiptap text-sm">
        {note.content.map((block, index) => {
          return (
            <React.Fragment key={index}>
              {renderNote(block as BlockNode)}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return <h1>Invalid Content Format {note.content.toString()}</h1>;
}
