"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  FaBold,
  FaCode,
  FaItalic,
  FaLink,
  FaList,
  FaListOl,
} from "react-icons/fa";
import { RiCodeBlock } from "react-icons/ri";
import { TbBlockquote } from "react-icons/tb";
import { MdFormatListBulleted } from "react-icons/md";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Toggle } from "./toggle";
import { Button } from "./button";
import StatContainer from "./statistic/stat-container";
import ShareModal from "./modal/share-modal";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { Editor, mergeAttributes, useEditor } from "@tiptap/react";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { createLowlight, common } from "lowlight";
import Heading from "@tiptap/extension-heading";
import { cn } from "@/lib/utils";
import Loading from "@/app/loading";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import LinkModal from "./modal/link-modal";
type Props = {
  editor: Editor | null;
  setLink: Dispatch<SetStateAction<string>>;
  link: string;
};
export default function FormatMenu({ editor, setLink, link }: Props) {
  const [headingLevel, setHeadingLevel] = useState<string>("heading1");
  useEffect(() => {
    if (editor) {
      const updateHeadingLevel = () => {
        if (editor.isActive("heading", { level: 1 })) {
          setHeadingLevel("heading1");
        } else if (editor.isActive("heading", { level: 2 })) {
          setHeadingLevel("heading2");
        } else {
          setHeadingLevel("normal");
        }
      };

      editor.on("selectionUpdate", updateHeadingLevel);
      editor.on("focus", updateHeadingLevel);

      return () => {
        editor.off("selectionUpdate", updateHeadingLevel);
        editor.off("focus", updateHeadingLevel);
      };
    }
  }, [editor]);

  const handleHeadingChange = (value: string) => {
    if (editor) {
      switch (value) {
        case "heading1":
          editor.chain().focus().toggleHeading({ level: 1 }).run();
          break;
        case "heading2":
          editor.chain().focus().toggleHeading({ level: 2 }).run();
          break;
        case "normal":
        default:
          editor.chain().focus().setParagraph().run();
          break;
      }
      setHeadingLevel(value);
    }
  };
  if (!editor)
    return (
      <div className="w-full justify-center h-full flex items-center ">
        <AiOutlineLoading3Quarters className="animate-spin" size={20} />
      </div>
    );
  return (
    <div className="flex gap-2 flex-col">
      <ToggleGroup
        type="multiple"
        variant={"outline"}
        className="justify-between"
      >
        <ToggleGroupItem
          value="bold"
          aria-label="Toggle bold"
          className={cn(
            "h-10 w-10 p-0",
            editor.isActive("bold") && "is-active "
          )}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FaBold size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle italic"
          className={cn(
            "h-10 w-10 p-0",
            editor.isActive("italic") && "is-active"
          )}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FaItalic size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="code"
          aria-label="Toggle code"
          className={cn(
            "h-10 w-10 p-0",
            editor.isActive("code") && "is-active"
          )}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <FaCode size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="codeBlock"
          aria-label="Toggle codeblock"
          className={cn(
            "h-10 w-10 p-0",
            editor.isActive("codeBlock") && "is-active"
          )}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <RiCodeBlock size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
      <Select onValueChange={handleHeadingChange} value={headingLevel}>
        <SelectTrigger className="w-full ">
          <SelectValue placeholder="Heading" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="normal">Normal</SelectItem>
          <SelectItem value="heading1">Heading 1</SelectItem>
          <SelectItem value="heading2">Heading 2</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex justify-between">
        <ToggleGroup variant={"outline"} type="multiple">
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle blockquote"
            onMouseDown={(e) => e.preventDefault()}
            className={cn(
              "h-10 w-10 p-0",
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
              "h-10 w-10 p-0",
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
              "h-10 w-10 p-0",
              editor.isActive("orderedList") && "is-active"
            )}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <FaListOl size={16} />
          </ToggleGroupItem>
        </ToggleGroup>

        {/* <LinkModal editor={editor}>
          <Button variant={"outline"} className="p-3 h-10">
            <FaLink size={14} />
          </Button>
        </LinkModal> */}
      </div>
    </div>
  );
}
