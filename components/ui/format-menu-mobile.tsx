import React, { SetStateAction } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RiCodeBlock } from "react-icons/ri";
import {
  FaBold,
  FaCode,
  FaItalic,
  FaLink,
  FaList,
  FaListOl,
} from "react-icons/fa";
import { LuHeading1, LuHeading2 } from "react-icons/lu";

import { TbBlockquote } from "react-icons/tb";
import { MdFormatListBulleted } from "react-icons/md";
import { Button } from "./button";
import { Editor, mergeAttributes, useEditor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type Props = {
  editor: Editor | null;
};
export default function FormatMenuMobile({ editor }: Props) {
  if (!editor) {
    return (
      <div className="w-full justify-center flex">
        <AiOutlineLoading3Quarters className="animate-spin" size={14} />
      </div>
    );
  }
  return (
    <div className="bottom-1 absolute left-1/2 -translate-x-1/2 overflow-x-auto w-full sm:w-fit flex gap-4 bg-popover pt-1 pb-4 px-4 rounded-sm">
      <ToggleGroup variant={"outline"} type="multiple">
        <ToggleGroupItem
          value="bold"
          aria-label="Toggle bold"
          onMouseDown={(e) => e.preventDefault()}
          className={cn("h-9 w-9 p-0", editor.isActive("bold") && "is-active")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FaBold size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle italic"
          onMouseDown={(e) => e.preventDefault()}
          className={cn(
            "h-9 w-9 p-0",
            editor.isActive("italic") && "is-active"
          )}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FaItalic size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="code"
          aria-label="Toggle code"
          onMouseDown={(e) => e.preventDefault()}
          className={cn("h-9 w-9 p-0", editor.isActive("code") && "is-active")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <FaCode size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="codeBlock"
          aria-label="Toggle codeBlock"
          onMouseDown={(e) => e.preventDefault()}
          className={cn(
            "h-9 w-9 p-0",
            editor.isActive("codeBlock") && "is-active"
          )}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <RiCodeBlock />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup variant={"outline"} type="multiple">
        <ToggleGroupItem
          value="bold"
          aria-label="Toggle heading1"
          onMouseDown={(e) => e.preventDefault()}
          className={cn(
            "h-9 w-9 p-0",
            editor.isActive("heading", { level: 1 }) && "is-active"
          )}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <LuHeading1 size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle heading2"
          onMouseDown={(e) => e.preventDefault()}
          className={cn(
            "h-9 w-9 p-0",
            editor.isActive("heading", { level: 2 }) && "is-active"
          )}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <LuHeading2 size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup variant={"outline"} type="multiple">
        <ToggleGroupItem
          value="blockquote"
          aria-label="Toggle blockquote"
          onMouseDown={(e) => e.preventDefault()}
          className={cn(
            "h-9 w-9 p-0",
            editor.isActive("blockquote") && "is-active"
          )}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <TbBlockquote size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="bulletList"
          aria-label="Toggle bulletList"
          onMouseDown={(e) => e.preventDefault()}
          className={cn(
            "h-9 w-9 p-0",
            editor.isActive("bulletList") && "is-active"
          )}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <MdFormatListBulleted size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="orderedList"
          aria-label="Toggle orderedList"
          onMouseDown={(e) => e.preventDefault()}
          className={cn(
            "h-9 w-9 p-0",
            editor.isActive("orderedList") && "is-active"
          )}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FaListOl size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
      <Button
        variant={"outline"}
        onMouseDown={(e) => e.preventDefault()}
        className="p-3 h-9"
      >
        <FaLink size={14} />
      </Button>
    </div>
  );
}
