"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import { Heading } from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Bold,
  Code,
  Heading2Icon,
  List,
  ListOrdered,
  Heading as HeadingIcon,
  Highlighter,
  Italic,
  Quote,
  Strikethrough,
} from "lucide-react";
import Highlight from "@tiptap/extension-highlight";
import { cn } from "@/lib/utils";
import { common, createLowlight } from "lowlight";
import { mergeAttributes } from "@tiptap/core";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";

import { BiCodeBlock } from "react-icons/bi";
import { sendNote } from "@/data/client/note";

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
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <ToggleGroup
            type="multiple"
            size={"xs"}
            className="flex gap-1 justify-start dark:bg-slate-700 "
          >
            <ToggleGroupItem
              value="bold"
              aria-label="Toggle bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={cn(
                "dark:hover:bg-slate-800/70 p-1 dark:text-white rounded-none",
                editor.isActive("bold") ? "is-active" : ""
              )}
            >
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              aria-label="Toggle italic"
              className={cn(
                "dark:hover:bg-slate-800/70 dark:text-white rounded-none ",
                editor.isActive("italic") ? "is-active" : ""
              )}
            >
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="strike"
              aria-label="Toggle strike"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={cn(
                "dark:hover:bg-slate-800/70 dark:text-white rounded-none",
                editor.isActive("strike") ? "is-active" : ""
              )}
            >
              <Strikethrough className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="code"
              aria-label="Toggle code"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={cn(
                "dark:hover:bg-slate-800/70 dark:text-white rounded-none",
                editor.isActive("code") ? "is-active" : ""
              )}
            >
              <Code className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="codeBlock"
              aria-label="Toggle codeblock"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={cn(
                "dark:hover:bg-slate-800/70 dark:text-white rounded-none",
                editor.isActive("codeBlock" ? "is-active" : "")
              )}
            >
              <BiCodeBlock className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value=""
              aria-label="Toggle blockquote"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={cn(
                "dark:hover:bg-slate-800/70 dark:text-white rounded-none",
                editor.isActive("blockquote") ? "is-active" : ""
              )}
            >
              <Quote className="h-4 w-4" />
            </ToggleGroupItem>
            <div className="mx-1 w-[1px] h-6 bg-white/50"></div>
            <ToggleGroupItem
              value="h1"
              aria-label="Toggle h1"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={cn(
                "dark:hover:bg-slate-800/70 dark:text-white rounded-none",
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              )}
            >
              <HeadingIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="h2"
              aria-label="Toggle h2"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={cn(
                "dark:hover:bg-slate-800/70 dark:text-white rounded-none",
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              )}
            >
              <Heading2Icon className="h-4 w-4" />
            </ToggleGroupItem>
            <div className="mx-1 w-[1px] h-6 bg-white/50"></div>

            <ToggleGroupItem
              value="bulletList"
              aria-label="BulletList"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={cn(
                "dark:hover:bg-slate-800/70 dark:text-white rounded-none",
                editor.isActive("bulletList") ? "is-active" : ""
              )}
            >
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="orderedList"
              aria-label="OrderedList"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={cn(
                "dark:hover:bg-slate-800/70 dark:text-white rounded-none",
                editor.isActive("orderedList") ? "is-active" : ""
              )}
            >
              <ListOrdered className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} spellCheck="false" />
      <button
        className="bg-white py-1 px-4 mt-10"
        onClick={async () => onSubmit(editor?.getJSON())}
      >
        Submit
      </button>
    </>
  );
};

export default Tiptap;
