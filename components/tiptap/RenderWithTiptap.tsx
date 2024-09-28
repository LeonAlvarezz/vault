"use client";
import { BlockNode, Note, NOTE_CONTENT_TYPE } from "@/types/note.type";
import { renderNote } from "@/lib/renderNote";
import {
  Content,
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
import { useEffect } from "react";
import Loading from "@/app/loading";
type Props = {
  data?: any[] | null;
  // id: string;
  note: Note;
};
export default async function RenderWithTiptap({ data, note }: Props) {
  const editor = useEditor({
    shouldRerenderOnTransaction: false,
    editable: false,

    // content: note.content as JSONContent,

    extensions: [
      StarterKit,
      BulletList.configure({
        keepMarks: true,
      }),
      Heading.configure({ levels: [1, 2] }).extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes: { [key: number]: string } = {
            1: "text-3xl",
            2: "text-2xl",
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }),

      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
        languageClassPrefix: "javascript",
      }),
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  useEffect(() => {
    editor?.commands.setContent(note.content as Content);
  }, [editor]);
  if (!editor) {
    return <Loading />;
  }
  return <EditorContent editor={editor} readOnly />;
}
