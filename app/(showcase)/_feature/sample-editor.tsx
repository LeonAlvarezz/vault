"use client";
import TiptapEditor, {
  TiptapEditorRef,
} from "@/components/tiptap/TipTapEditor";
import FormatMenuMobile from "@/components/ui/format-menu-mobile";
import LinkModal from "@/components/ui/modal/link-modal";
import useViewport from "@/hooks/useViewPort";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
type Props = {
  className: string;
};
export default function SampleEditor({ className }: Props) {
  const inputRef = useRef<HTMLDivElement>(null);
  const [inputActive, setInputActive] = useState(false);
  const editorRef = useRef<TiptapEditorRef>(null);
  const [open, setOpen] = useState(false);
  const { height, keyboardHeight } = useViewport();
  const handleUpdate = () => {
    if (inputActive && inputRef.current) {
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };
  return (
    <div
      className={cn(
        "min-h-[300px] border bg-neutral-900 p-4 !rounded-sm animated-border-box",
        className
      )}
      style={
        {
          "--animated-border-box-duration": `7s`,
          "--animated-border-box-border-radius": `calc(0.5rem - 4px)`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "fixed w-screen left-0 transition-all",
          !inputActive && "hidden"
        )}
        style={{
          zIndex: 999,
          bottom: `${keyboardHeight}px`,
          height: `${height * 0.1}px`,
        }}
      >
        {editorRef.current && (
          <FormatMenuMobile
            editor={editorRef.current?.editor}
            setOpen={setOpen}
          />
        )}
      </div>
      <TiptapEditor
        ref={editorRef}
        onFocus={() => setInputActive(true)}
        onBlur={() => setInputActive(false)}
        onUpdate={handleUpdate}
      />
      {editorRef.current && editorRef.current.editor && (
        <LinkModal
          editor={editorRef.current.editor}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}
