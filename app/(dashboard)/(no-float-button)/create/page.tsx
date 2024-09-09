"use client";
import React, { useRef, useState } from "react";
import FormatMenu from "@/components/ui/format-menu";
import FormatMenuMobile from "@/components/ui/format-menu-mobile";
import useViewport from "@/hooks/useViewPort";
import TiptapEditor, {
  TiptapEditorRef,
} from "@/components/tiptap/TipTapEditor";
import CreateNoteDropdownMenu from "@/components/ui/dropdown/create-note-dropdown";
import ShareModal from "@/components/ui/modal/share-modal";
import { Button } from "@/components/ui/button";
import StatContainer from "@/components/ui/statistic/stat-container";
import { Input } from "@/components/ui/input";
import { BiCategory, BiSolidCategory } from "react-icons/bi";
import { ICON_COLOR, ICON_SIZE } from "@/components/ui/sidebar/sidebar";
import { MultiSelect } from "@/components/ui/multi-select";
import { FaTags } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { isMobile } from "react-device-detect";
import EditNoteDropdownMenu from "@/components/ui/dropdown/edit-note-dropdown";
import LinkModal from "@/components/ui/modal/link-modal";
import { cn } from "@/lib/utils";
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
  const [inputActive, setInputActive] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<TiptapEditorRef>(null);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [link, setLink] = useState("");
  const { width, height, keyboardOpen, keyboardHeight } = useViewport();
  const [open, setOpen] = useState(false);

  const handleFocus = () => {
    setInputActive(true);
    if (inputRef.current) {
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    }
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
    <>
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
      <div className="xl:hidden flex gap-2 justify-end">
        <CreateNoteDropdownMenu />
      </div>

      <div className="hidden xl:block fixed top-20 left-28 w-[200px]">
        {/* {!editorRef.current ? (
          <div className="w-full justify-center h-full flex items-center ">
            <AiOutlineLoading3Quarters className="animate-spin" size={20} />
          </div>
        ) : (
          <FormatMenu
            editor={editorRef.current.editor}
            setLink={setLink}
            link={link}
          />
        )}
        <div className="flex flex-col gap-2 mt-4">
          <ShareModal>
            <Button variant={"main"}>Share</Button>
          </ShareModal>
          <Button variant={"main"}>Publish</Button>
        </div> */}
        <div className="flex flex-col gap-2 mt-4">
          <p>Statistic</p>
          <StatContainer label="Views" count={2000} rate={10} />
          <StatContainer label="Likes" count={100} />
          <StatContainer label="Bookmarks" count={50} />
        </div>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex gap-2 justify-end">
          <CreateNoteDropdownMenu />
        </div>
        <Input
          className="bg-app_background hover:bg-transparent focus:outline-none text-white text-2xl px-0 mb-4"
          placeholder="Title"
        />
        <div className="flex gap-2 flex-col">
          <div className="flex sm:items-center items-start flex-col sm:flex-row sm:gap-0 gap-2">
            <div className="flex gap-2 w-1/3 ">
              <BiSolidCategory
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
        <div className="pb-20" ref={inputRef}>
          <TiptapEditor
            ref={editorRef}
            onFocus={handleFocus}
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
      </form>
    </>
  );
}
