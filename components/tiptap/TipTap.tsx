"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Heading } from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import Highlight from "@tiptap/extension-highlight";
import { cn } from "@/lib/utils";
import { common, createLowlight } from "lowlight";
import { mergeAttributes } from "@tiptap/core";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";

import { sendNote } from "@/data/client/note";
import TipTapBubbleMenu from "./BubbleMenu";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Content goes here...",
      }),
      BulletList.configure({
        keepMarks: true,
      }),
      Highlight.configure({ multicolor: true }),
      Heading.configure({ levels: [1, 2] }).extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes: { [key: number]: string } = {
            1: "text-4xl",
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
        languageClassPrefix: "language-css",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none dark:text-white",
      },
    },
  });

  const onSubmit = async (content: any) => {
    const { data, error } = await sendNote(content);
    if (error) {
      console.log(error);
    }
    console.log("Success");
    console.log(data);
  };

  return (
    <>
      <TipTapBubbleMenu editor={editor} />
      <EditorContent editor={editor} spellCheck="false" />
      {/* <button
        className="bg-white py-1 px-4 mt-10"
        onClick={async () => onSubmit(editor?.getJSON())}
      >
        Submit
      </button> */}
    </>
  );
};

export default Tiptap;
