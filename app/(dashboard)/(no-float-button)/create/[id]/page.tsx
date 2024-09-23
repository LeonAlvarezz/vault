"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import FormatMenuMobile from "@/components/ui/format-menu-mobile";
import useViewport from "@/hooks/useViewPort";
import TiptapEditor, {
  TiptapEditorRef,
} from "@/components/tiptap/TipTapEditor";
import CreateNoteDropdownMenu from "@/components/ui/dropdown/create-note-dropdown";
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
import { useToast } from "@/components/ui/use-toast";
import { getNoteContent, saveNote } from "@/data/client/note";
import BackButton from "@/components/ui/button/back-button";
import {
  useForm,
  Controller,
  FieldValue,
  type FieldValues,
} from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { randomInt, randomUUID } from "crypto";
import { Content } from "@tiptap/react";

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
  const { height, keyboardHeight } = useViewport();
  const [open, setOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const lastSavedContentRef = useRef<string>("");
  const router = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      content: {},
      category: [],
      tags: [],
    },
  });
  const { toast } = useToast();
  const params = useParams<{ id: string }>();

  const onFocus = () => {
    setInputActive(true);
    // if (inputRef.current) {
    //   inputRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "end",
    //     inline: "end",
    //   });
    // }
  };

  const handleUpdate = () => {};
  //Load Note
  useEffect(() => {
    const handleGetNoteContent = async () => {
      const { data, error } = await getNoteContent(params.id);
      setValue("title", data?.title || "");
      if (editorRef.current && editorRef.current.editor) {
        editorRef.current.editor.commands.setContent(data?.content as Content);
      }
    };
    handleGetNoteContent();
  }, []);

  const handleSaveNote = async (data: any) => {
    setSaveLoading(true);
    try {
      const finalTitle = data.title || "Untitled";

      if (editorRef.current && editorRef.current.editor) {
        const editorContent = editorRef.current.editor.getJSON();
        const contentString = JSON.stringify(editorContent);

        if (editorRef.current.editor.isEmpty) {
          toast({
            title: "Note not saved",
            description: "Cannot save an empty note.",
            variant: "default",
          });
          return;
        }

        if (contentString !== lastSavedContentRef.current) {
          const { data, error } = await saveNote({
            id: params.id,
            title: finalTitle,
            content: editorContent,
          });

          if (error) {
            toast({
              title: "Error Saving Note",
              description: error.message,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Note Saved",
              description: "Your note has been successfully saved.",
              variant: "default",
            });
          }
        }
      }
    } catch (error: unknown) {
      toast({
        title: "Error Saving Note",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    } finally {
      setSaveLoading(false);
    }
  };

  // // Save data every 10 seconds
  // const handleAutoSave = useCallback(() => {
  //   const formValues = watch();
  //   handleSaveNote(formValues);
  // }, [watch, handleSaveNote]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     handleAutoSave();
  //   }, 1000 * 60 * 5);
  //   return () => clearInterval(intervalId);
  // }, []);

  // // Save data upon reload or close tab
  // useEffect(() => {
  //   if (typeof window === "undefined" || typeof document === "undefined")
  //     return;

  //   // const handleVisibilityChange = () => {
  //   //   if (document.visibilityState === "hidden") {
  //   //     handleAutoSave();
  //   //   }
  //   // };

  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     event.preventDefault();
  //     handleAutoSave();
  //   };

  //   // document.addEventListener(
  //   //   "visibilitychange",
  //   //   handleVisibilityChange,
  //   //   false
  //   // );
  //   window.addEventListener("beforeunload", handleBeforeUnload, false);

  //   return () => {
  //     // document.removeEventListener("visibilitychange", handleVisibilityChange);
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [handleAutoSave]);

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

      <div className="hidden xl:block fixed top-20 left-28 w-[200px]">
        <Button variant={"main"} onClick={handleSubmit(handleSaveNote)}>
          Save
        </Button>
        <div className="flex flex-col gap-2 mt-4">
          <p>Statistic</p>
          <StatContainer label="Views" count={2000} rate={10} />
          <StatContainer label="Likes" count={100} />
          <StatContainer label="Bookmarks" count={50} />
        </div>
      </div>
      {/* <form onSubmit={handleSubmit(handleSaveNote)}> */}
      <form>
        {saveLoading && <p className="text-neutral-600">Saving</p>}
        <div className="flex justify-between items-center">
          <BackButton />
          <CreateNoteDropdownMenu />
        </div>
        <Input
          {...register("title")}
          className="bg-app_background hover:bg-transparent focus:outline-none text-white text-2xl px-0 mb-4"
          placeholder="Untitled"
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
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
            onUpdate={handleUpdate}
          />
        </div>
        {/* <Button onClick={handleSubmit(handleSaveNote)}>Save</Button> */}
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
