import { BlockNode, Note, NOTE_CONTENT_TYPE } from "@/types/note.type";
import { renderNote } from "@/lib/renderNote";
import {
  EditorContent,
  JSONContent,
  mergeAttributes,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import { common, createLowlight } from "lowlight";
import Loading from "@/app/loading";
import React from "react";
type Props = {
  data?: any[] | null;
  // id: string;
  note: Note;
};
export default async function Render({ data, note }: Props) {
  return (
    <div className="tiptap flex text-sm flex-col gap-1.5">
      {note.content.map((block, blockIndex) => (
        <React.Fragment key={blockIndex}>{renderNote(block)}</React.Fragment>
      ))}
    </div>
  );
}
