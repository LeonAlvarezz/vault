"use client";
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import { all, common, createLowlight } from "lowlight";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import BulletList from "@tiptap/extension-bullet-list";
import { Heading } from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { EditorEvents, JSONContent, mergeAttributes } from "@tiptap/core";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../ui/button";
import { CustomImageExtension } from "./TipTapImage";
import { uploadImage } from "@/data/client/image";
import { CodeBlockExtension } from "./CustomCodeBlock";
import CodeBlock from "@tiptap/extension-code-block";
import { Json } from "@/database.types";
import { useSubscription } from "@/stores/subscription";

export interface TiptapEditorRef {
  editor: ReturnType<typeof useEditor> | null;
}

interface TiptapEditorProps {
  onUpdate?: (props: EditorEvents["update"]) => void;
  onFocus: () => void;
  onBlur?: () => void;
  onChange?: () => void;
}

const TiptapEditor = forwardRef<TiptapEditorRef, TiptapEditorProps>(
  (props, ref) => {
    const { onUpdate, onFocus, onBlur, onChange } = props;
    const editorRef = useRef<HTMLDivElement>(null);
    const { isPremium } = useSubscription();
    const compressedSize = isPremium ? 0.8 : 0.1;

    const codeBlockLowLight = CodeBlockExtension.configure({
      lowlight: createLowlight(all),
      defaultLanguage: "ts",
    });

    const editor = useEditor({
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      extensions: [
        StarterKit.configure({
          bulletList: false,
          heading: false,
          codeBlock: false,
        }),
        Placeholder.configure({
          placeholder: "Write something here...",
        }),
        BulletList.configure({
          keepMarks: true,
        }),
        // Image.configure({
        //   inline: true,
        // }),
        CustomImageExtension(uploadImage, compressedSize),
        Highlight.configure({ multicolor: true }),
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

        codeBlockLowLight,
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
      onUpdate,
      onFocus,
      onBlur,
    });

    useImperativeHandle(ref, () => ({
      editor,
    }));

    if (!editor) {
      return (
        <div className="flex justify-center w-full items-center h-full">
          <AiOutlineLoading3Quarters className="animate-spin" size={20} />
        </div>
      );
    }

    return (
      <div ref={editorRef}>
        <EditorContent editor={editor} className="text-sm" spellCheck={false} />
      </div>
    );
  }
);

TiptapEditor.displayName = "TiptapEditor";

export default TiptapEditor;
