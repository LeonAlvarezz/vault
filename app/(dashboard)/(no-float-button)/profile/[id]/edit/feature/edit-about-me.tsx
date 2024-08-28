"use client";
import React, { useEffect, useRef, useState } from "react";
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
import useViewport from "@/hooks/useViewPort";
import TiptapEditor, {
  TiptapEditorRef,
} from "@/components/tiptap/TipTapEditor";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function EditAboutMeSection() {
  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): void {
    //Submit Logic
    throw new Error("Function not implemented.");
  }
  const [inputActive, setInputActive] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<TiptapEditorRef>(null);
  const { width, height, keyboardOpen, keyboardHeight } = useViewport();

  const handleFocus = () => {
    setInputActive(true);
    inputRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "end",
    });
  };

  const handleUpdate = () => {
    if (inputActive && inputRef.current) {
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  return (
    <section>
      <h2>About Me</h2>
      <p className="text-xs mt-2 text-neutral-500">
        Write about yourself to let other better know about you
      </p>
      {inputActive && (
        <div
          className="fixed w-screen left-0 transition-all"
          style={{
            zIndex: 999,
            bottom: `${keyboardHeight}px`,
            height: `${height * 0.1}px`,
          }}
        >
          {editorRef.current && (
            <FormatMenuMobile editor={editorRef.current?.editor} />
          )}
        </div>
      )}
      <div className="pb-24 mt-10" ref={inputRef}>
        <TiptapEditor
          ref={editorRef}
          onFocus={handleFocus}
          onBlur={() => setInputActive(false)}
          onUpdate={handleUpdate}
        />
      </div>
      <div className="hidden xl:block fixed top-28 left-28 w-[200px]">
        {!editorRef.current ? (
          <div className="w-full justify-center h-full flex items-center ">
            <AiOutlineLoading3Quarters className="animate-spin" size={20} />
          </div>
        ) : (
          <FormatMenu editor={editorRef.current.editor} />
        )}
      </div>

      <FloatingButton className="bg-green-900  hover:bg-green-900/80 ">
        <Button onClick={handleSubmit} variant={"icon"} size={"icon"}>
          <FaCheck color="#6EFF6B" size={ICON_SIZE} />
        </Button>
      </FloatingButton>
    </section>
  );
}
