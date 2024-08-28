"use client";
import React, { useRef, useState } from "react";
import FloatingButton from "@/components/ui/floating-button";
import { FaCheck, FaPlus } from "react-icons/fa";
import { ICON_COLOR, ICON_SIZE } from "@/components/ui/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import FormatMenu from "@/components/ui/format-menu";
import TipTap from "@/components/tiptap/TipTap";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createLowlight, common } from "lowlight";
import Heading from "@tiptap/extension-heading";
import FormatMenuMobile from "@/components/ui/format-menu-mobile";

export default function EditAboutMeSection() {
  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): void {
    //Submit Logic
    throw new Error("Function not implemented.");
  }
  const [inputActive, setInputActive] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    setInputActive(true);
    inputRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "end",
    });
  };
  // Editor Config
  const editor = useEditor({
    onBlur: () => setInputActive(false),
    onFocus: handleFocus,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Content goes here...",
      }),
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
        languageClassPrefix: "javascript",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  return (
    <section>
      <h2>About Me</h2>
      <p className="text-xs mt-2 text-neutral-500">
        Write about yourself to let other better know about you
      </p>
      {inputActive && <FormatMenuMobile editor={editor} />}
      <div className="mt-10 h-full pb-20">
        <TipTap editor={editor} inputRef={inputRef} />
      </div>
      <div className="hidden xl:block fixed top-28 left-28 w-[200px]">
        <FormatMenu editor={editor} />
      </div>

      <FloatingButton className="bg-green-900  hover:bg-green-900/80 ">
        <Button onClick={handleSubmit} variant={"icon"} size={"icon"}>
          <FaCheck color="#6EFF6B" size={ICON_SIZE} />
        </Button>
      </FloatingButton>
    </section>
  );
}
