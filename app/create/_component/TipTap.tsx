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
  Heading as HeadingIcon,
  Highlighter,
  Italic,
  Strikethrough,
} from "lucide-react";
import Highlight from "@tiptap/extension-highlight";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Content goes here...",
      }),
      Highlight.configure({ multicolor: true }),
      Heading.configure({
        levels: [1, 2],
        HTMLAttributes: {
          class: "my-h1 my-h2",
        },
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
            className="flex gap-1 justify-start"
          >
            <ToggleGroupItem
              value="italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              aria-label="Toggle italic"
              className="dark:bg-slate-700 dark:hover:bg-slate-700/70 dark:text-white rounded-none"
            >
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="strike"
              aria-label="Toggle strike"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className="dark:bg-slate-700 dark:hover:bg-slate-700/70 dark:text-white rounded-none"
            >
              <Strikethrough className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="code"
              aria-label="Toggle code"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className="dark:bg-slate-700 dark:hover:bg-slate-700/70 dark:text-white rounded-none"
            >
              <Code className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="bold"
              aria-label="Toggle bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="dark:bg-slate-700 dark:hover:bg-slate-700/70 dark:text-white rounded-none"
            >
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="h1"
              aria-label="Toggle h1"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className="dark:bg-slate-700 dark:hover:bg-slate-700/70 dark:text-white rounded-none"
            >
              <HeadingIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="h2"
              aria-label="Toggle h2"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className="dark:bg-slate-700 dark:hover:bg-slate-700/70 dark:text-white rounded-none"
            >
              <Heading2Icon className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
