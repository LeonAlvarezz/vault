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
import { Json } from "@/database.types";
import NotAvailable from "../ui/not-availble";
type Props = {
  content: Json | null;
};
export default async function Render({ content }: Props) {
  if (!content) {
    return <NotAvailable />;
  }

  if (Array.isArray(content)) {
    return (
      <div className="tiptap text-sm">
        {content.map((block, index) => {
          return (
            <React.Fragment key={index}>
              {renderNote(block as BlockNode)}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return <h1>Invalid Content Format {content?.toString()}</h1>;
}
