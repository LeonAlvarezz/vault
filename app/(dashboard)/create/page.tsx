"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { ICON_COLOR, ICON_SIZE } from "@/components/ui/sidebar/sidebar";
import { MultiSelect } from "@/components/ui/multi-select";
import FormatMenu from "@/components/ui/format-menu";
import StatContainer from "@/components/ui/statistic/stat-container";
import ShareModal from "@/components/ui/modal/share-modal";
import { Button } from "@/components/ui/button";
import { FaTags } from "react-icons/fa";
import CreateNoteDropdownMenu from "@/components/ui/dropdown/create-note-dropdown";
import useViewport from "@/hooks/useViewPort";
import TipTap from "@/components/tiptap/TipTap";
import FormatMenuMobile from "@/components/ui/format-menu-mobile";
import { useEditor, EditorContent } from "@tiptap/react";
import { Heading } from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import Highlight from "@tiptap/extension-highlight";
import { common, createLowlight } from "lowlight";
import { mergeAttributes } from "@tiptap/core";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
const TAG = [
  {
    value: "framework",
    label: "Framework",
  },
  {
    value: "Websocket",
    label: "Websocket",
  },
  {
    value: "tutorial",
    label: "Tutorial",
  },
];
export default function Page() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
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
        languageClassPrefix: "javascript",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none dark:text-white",
      },
    },
  });

  // Scroll to the bottom when inputActive is true
  useEffect(() => {
    if (inputActive) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    }
  }, [inputActive]);

  return (
    <>
      {inputActive && (
        // <div className="absolute bottom-0 w-full  " st≥÷yle={{ height: `100%` }}>
        <FormatMenuMobile editor={editor} />
      )}
      <div className="xl:hidden flex gap-2 justify-end">
        <CreateNoteDropdownMenu />
      </div>
      <div className="hidden xl:block fixed top-28 left-28  w-[200px]">
        <FormatMenu editor={editor} />
        <div className="flex flex-col gap-2 mt-4">
          <ShareModal>
            <Button variant={"main"}>Share</Button>
          </ShareModal>
          <Button variant={"main"}>Publish</Button>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <p>Statistic</p>
          <StatContainer label="Views" count={2000} rate={10} />
          <StatContainer label="Likes" count={100} />
          <StatContainer label="Bookmarks" count={50} />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          className="bg-app_background hover:bg-transparent focus:outline-none text-white text-2xl h-24 px-0"
          placeholder="Title"
        />
        <div className="flex gap-2 flex-col">
          <div className="flex sm:items-center items-start flex-col sm:flex-row sm:gap-0 gap-2">
            <div className="flex gap-2 w-1/3 ">
              <BiCategory
                size={ICON_SIZE}
                color={ICON_COLOR}
                className="flex-shrink-0"
              />
              <p className="text-sm">Category</p>
            </div>
            <MultiSelect
              options={TAG}
              placeholder="Click to select category "
              onValueChange={setSelectedFrameworks}
              defaultValue={selectedFrameworks}
              maxCount={2}
            />
          </div>
          <div className="flex sm:items-center items-start flex-col sm:flex-row sm:gap-0 gap-2 mb-6">
            <div className="flex gap-2 w-1/3 ">
              <FaTags
                size={ICON_SIZE}
                color={ICON_COLOR}
                className="flex-shrink-0"
              />
              <p className="text-sm">Tag</p>
            </div>
            <MultiSelect
              options={TAG}
              placeholder="Click to select tags"
              onValueChange={setSelectedFrameworks}
              defaultValue={selectedFrameworks}
              maxCount={2}
            />
          </div>
        </div>
        <div className="pb-10">
          <TipTap editor={editor} inputRef={inputRef} />
        </div>
      </form>
    </>
  );
}
