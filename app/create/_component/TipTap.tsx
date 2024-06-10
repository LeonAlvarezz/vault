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
  Heading3Icon,
  Heading as HeadingIcon,
  Highlighter,
  Italic,
  Strikethrough,
} from "lucide-react";
import Highlight from "@tiptap/extension-highlight";
import { cn } from "@/lib/utils";
import { common, createLowlight } from "lowlight";
import { mergeAttributes } from "@tiptap/core";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import CodeBlock from "@tiptap/extension-code-block";
import { BiCodeBlock } from "react-icons/bi";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Content goes here...",
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
              value="italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              aria-label="Toggle italic"
              className="dark:hover:bg-slate-800/70 dark:text-white rounded-none"
            >
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="strike"
              aria-label="Toggle strike"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className="dark:hover:bg-slate-800/70 dark:text-white rounded-none"
            >
              <Strikethrough className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="code"
              aria-label="Toggle code"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className="dark:hover:bg-slate-800/70 dark:text-white rounded-none"
            >
              <Code className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="codeblock"
              aria-label="Toggle codeblock"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className="dark:hover:bg-slate-800/70 dark:text-white rounded-none"
            >
              <BiCodeBlock className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="bold"
              aria-label="Toggle bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="dark:hover:bg-slate-800/70 dark:text-white rounded-none"
            >
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="h1"
              aria-label="Toggle h1"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={cn(
                "dark:hover:bg-slate-800/70 dark:text-white rounded-none",
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
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
          </ToggleGroup>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} spellCheck="false" />
    </>
  );
};

export default Tiptap;
