"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import FormatMenuMobile from "@/components/ui/format-menu-mobile";
import useViewport from "@/hooks/useViewPort";
import TiptapEditor, {
  TiptapEditorRef,
} from "@/components/tiptap/TipTapEditor";
import CreateNoteDropdownMenu from "@/components/ui/dropdown/create-note-dropdown";
import StatContainer from "@/components/ui/statistic/stat-container";
import { Input } from "@/components/ui/input";
import { BiSolidCategory } from "react-icons/bi";
import { ICON_COLOR, ICON_SIZE } from "@/components/ui/sidebar/sidebar";
import { FaTags } from "react-icons/fa";
import LinkModal from "@/components/ui/modal/link-modal";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { getNoteContent, saveNote } from "@/data/client/note";
import BackButton from "@/components/ui/button/back-button";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Content } from "@tiptap/react";
import { TagMultiSelect } from "@/components/ui/select/tag-multi-select";
import { getAllCategories } from "@/data/client/category";
import { CategoryCombobox } from "@/components/ui/combobox/category-combobox";
import { Separator } from "@/components/ui/separator";
import { getTags } from "@/data/client/tag";
import { Skeleton } from "@/components/ui/skeleton";
import UploadButton from "@/components/ui/button/upload-button";
import { FaImage, FaPen } from "react-icons/fa6";
import { uploadImage } from "@/data/client/image";
import { compressImage, toBase64 } from "@/lib/image";
import ImageContainer from "@/components/ui/image-container";
import ConfirmPublishDialog from "@/components/ui/dialog/confirm-publish-dialog";
import { Note } from "@/types/note.type";
import { ToastAction } from "@/components/ui/toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type SelectOption = {
  value: string;
  label: string;
  color?: string;
};
export default function Page() {
  const [inputActive, setInputActive] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<TiptapEditorRef>(null);
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [tags, setTags] = useState<SelectOption[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const { height, keyboardHeight } = useViewport();
  const [open, setOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [note, setNote] = useState<Note>();

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      content: {},
      category: "",
      tags: [] as string[],
      cover: "",
    },
  });
  const { toast } = useToast();
  const params = useParams<{ id: string }>();
  const selectedCategory = watch("category");
  const selectedTags = watch("tags");
  const router = useRouter();

  const handleGetTags = async () => {
    const { data, error } = await getTags();

    if (error) {
      toast({
        title: "Error Fetching Tags",
        description: error?.message,
      });
    }
    const formattedTags = data!.map((tag) => ({
      value: String(tag.id),
      label: tag.name!,
      color: tag.color!,
    }));
    setTags(formattedTags);
  };

  const handleGetNoteContent = async () => {
    const { data, error } = await getNoteContent(params.id);
    if (error) {
      if ((error.code = "PGRST116")) {
        toast({
          title: "Unauthorized",
          description: "You are not authenticated to view this note",
        });
      } else {
        toast({
          title: "Error Fetching Note",
          description: error?.message,
        });
      }
      router.push("/note");
    }
    if (!data) {
      toast({
        title: "Unexpected Error",
        action: (
          <div className="flex gap-2">
            <ToastAction altText="Try again" onClick={() => router.refresh}>
              Try again
            </ToastAction>
            <ToastAction altText="Home" onClick={() => router.push("/note")}>
              Go Home
            </ToastAction>
          </div>
        ),
      });
    }
    setNote(data!);
    setValue("title", data?.title || "");
    if (data && data.category_id) {
      setValue("category", String(data?.category_id));
    }
    const tagsArr = data?.tags?.map((tag) => String(tag.tags?.id));
    setValue("tags", tagsArr || []);

    if (data?.cover_url) {
      setValue("cover", data?.cover_url);
      setImagePreviewUrl(data.cover_url);
    }

    editorRef.current?.editor?.commands.setContent(data?.content as Content);
  };
  //Load Note
  useEffect(() => {
    const handleGetCategory = async () => {
      const { data, error } = await getAllCategories();
      if (error) {
        toast({
          title: "Error Fetching Category",
          description: error?.message,
        });
      }
      const formattedCategories = data!.map((category) => ({
        value: String(category.id),
        label: category.name!,
        color: category.color!,
      }));
      setCategories(formattedCategories);
    };

    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          handleGetNoteContent(),
          handleGetCategory(),
          handleGetTags(),
        ]);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast({
          title: "Error",
          description: "Failed to load initial data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [shouldUpdate]);

  const handleSaveNote = async (data: any) => {
    setSaveLoading(true);
    try {
      const finalTitle = data.title || "Untitled";

      if (editorRef.current && editorRef.current.editor) {
        const editorContent = editorRef.current.editor.getJSON();

        if (editorRef.current.editor.isEmpty) {
          toast({
            title: "Note not saved",
            description: "Cannot save an empty note.",
            variant: "default",
          });
          return;
        }

        const { error } = await saveNote({
          id: params.id,
          title: finalTitle,
          content: editorContent,
          category_id: data.category,
          tags: data.tags,
          cover_url: data.cover,
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
  const handleUploadCover = async (image: File) => {
    const base64 = await toBase64(image);
    setImagePreviewUrl(base64);

    const compressedImage = await compressImage(image, { maxSizeMB: 1 });

    const { publicUrl, error } = await uploadImage(compressedImage);

    if (error) {
      setImagePreviewUrl(null);
      toast({
        title: "Error Upload Image",
        description: error.message,
      });
      return;
    }

    setValue("cover", publicUrl);
    setImagePreviewUrl(publicUrl);
  };

  useEffect(() => {
    if (!image) return;

    handleUploadCover(image);
  }, [image]);

  useEffect(() => {
    if (shouldUpdate) setShouldUpdate(false);
  }, [shouldUpdate]);

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

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center">
          <BackButton />
          <CreateNoteDropdownMenu
            handleSave={handleSubmit(handleSaveNote)}
            setOpenConfirmDialog={setOpenConfirmDialog}
          />
        </div>
        <div className="flex gap-2 flex-col">
          <Skeleton className="w-32 h-10 mb-4" />
          <Skeleton className="w-full h-10 rounded-md" />
          <Skeleton className="w-full h-10 rounded-md" />

          <Separator className="my-6" />
          <Skeleton className="w-full h-[300px] rounded-md" />
        </div>
      </div>
    );
  }

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
        <div className="flex flex-col gap-2 mt-4">
          <p>Statistic</p>
          <StatContainer label="Views" count={2000} rate={10} />
          <StatContainer label="Likes" count={100} />
          <StatContainer label="Bookmarks" count={50} />
        </div>
      </div>
      {/* <form onSubmit={handleSubmit(handleSaveNote)}> */}
      <form>
        {saveLoading && (
          <div className="fixed top-4 flex gap-2 items-center">
            <AiOutlineLoading3Quarters
              className="animate-spin text-neutral-500"
              size={14}
            />
            <p className="text-neutral-500">Saving</p>
          </div>
        )}
        <div className="flex justify-between items-center">
          <BackButton />
          <CreateNoteDropdownMenu
            handleSave={handleSubmit(handleSaveNote)}
            setOpenConfirmDialog={setOpenConfirmDialog}
          />
        </div>
        {imagePreviewUrl && (
          <div className="relative bg-neutral-800 mb-2">
            <ImageContainer
              src={imagePreviewUrl}
              className="h-20 opacity-50"
              preview={false}
            />

            <UploadButton
              className="absolute w-fit h-fit py-1 px-2 group bottom-0 hover:bg-neutral-800"
              setImage={setImage}
            >
              <div className="text-xs text-neutral-100 font-normal items-center flex gap-2 group-hover:text-neutral-300">
                <FaPen size={12} />
                <p>Edit</p>
              </div>
            </UploadButton>
          </div>
        )}

        <Input
          {...register("title")}
          className="bg-app_background hover:bg-transparent focus:outline-none text-white text-2xl px-0"
          placeholder="Untitled"
        />
        {!imagePreviewUrl && (
          <UploadButton
            className="block w-fit h-fit py-1 px-2 hover:bg-neutral-700/50 group "
            setImage={setImage}
          >
            <div className="text-xs text-neutral-700 font-normal flex gap-2 group-hover:text-neutral-300">
              <FaImage size={16} />
              <p>Upload Cover</p>
            </div>
          </UploadButton>
        )}
        <div className="flex gap-2 flex-col mt-4">
          <div className="flex sm:items-center items-start flex-col sm:flex-row sm:gap-0 gap-2">
            <div className="flex gap-2 w-1/3 ">
              <BiSolidCategory
                size={ICON_SIZE}
                color={ICON_COLOR}
                className="flex-shrink-0"
              />
              <p className="text-sm">Category</p>
            </div>

            <CategoryCombobox
              options={categories}
              label="Click to select category"
              size="md"
              className="w-full border-0 hover:bg-neutral-700/50 px-1"
              icon={false}
              value={selectedCategory}
              onChange={(value) => setValue("category", value)}
            />
          </div>
          <div className="flex sm:items-center items-start flex-col sm:flex-row sm:gap-0 gap-2">
            <div className="flex gap-2 w-1/3">
              <FaTags
                size={ICON_SIZE}
                color={ICON_COLOR}
                className="flex-shrink-0"
              />
              <p className="text-sm">Tag</p>
            </div>
            <TagMultiSelect
              options={tags}
              placeholder="Click to select tags"
              onValueChange={(value) => setValue("tags", value)}
              defaultValue={selectedTags}
              maxCount={3}
              onTagUpdate={handleGetTags}
            />
          </div>
        </div>
        <Separator className="my-6" />
        <div className="pb-20" ref={inputRef}>
          <TiptapEditor
            ref={editorRef}
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
            onUpdate={handleGetTags}
          />
        </div>
        {editorRef.current && editorRef.current.editor && (
          <LinkModal
            editor={editorRef.current.editor}
            open={open}
            setOpen={setOpen}
          />
        )}

        <ConfirmPublishDialog
          open={openConfirmDialog}
          setOpen={setOpenConfirmDialog}
          note={note}
          refresh={handleGetNoteContent}
        />
      </form>
    </>
  );
}
