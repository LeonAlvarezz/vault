"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import FormatMenuMobile from "@/components/ui/format-menu-mobile";
import useViewport from "@/hooks/useViewPort";
import TiptapEditor, {
  TiptapEditorRef,
} from "@/components/tiptap/TipTapEditor";
import LinkModal from "@/components/ui/modal/link-modal";
import { cn } from "@/lib/utils";
import { Profile } from "@/types/profiles.type";
import { Content } from "@tiptap/react";
type Props = {
  editorRef: RefObject<TiptapEditorRef>;
  profile: Profile;
};
export default function EditAboutMeSection({ editorRef, profile }: Props) {
  const [inputActive, setInputActive] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  // const editorRef = useRef<TiptapEditorRef>(null);
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
  useEffect(() => {
    if (!profile.aboutMe) return;
    const setEditorContent = () => {
      if (editorRef.current?.editor) {
        editorRef.current.editor.commands.setContent(
          profile.aboutMe as Content
        );
      } else {
        // Retry after a brief delay if editor is not ready yet
        setTimeout(setEditorContent, 100);
      }
    };

    setEditorContent();
  }, [profile, editorRef]);

  return (
    <section>
      <h2>About Me</h2>
      <p className="text-xs mt-2 text-neutral-500">
        Write about yourself to let other better know about you
      </p>
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
      <div className="pb-24 mt-10" ref={inputRef}>
        <TiptapEditor
          ref={editorRef}
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          onUpdate={handleUpdate}
        />
      </div>
      {editorRef.current && editorRef.current.editor && (
        <LinkModal
          editor={editorRef.current.editor}
          open={open}
          setOpen={setOpen}
        />
      )}
    </section>
  );
}
