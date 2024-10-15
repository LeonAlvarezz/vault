"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import BackButton from "../button/back-button";
import CreateNoteDropdownMenu from "../dropdown/create-note-dropdown";
import ImageContainer from "../image-container";
import UploadButton from "../button/upload-button";
import { FaImage, FaPen } from "react-icons/fa";
import { Input } from "../input";
import CategorizationCustom from "@/app/(dashboard)/create/[id]/_feature/CategorizationCustom";
import { Separator } from "../separator";
import TiptapEditor, {
  TiptapEditorRef,
} from "@/components/tiptap/TipTapEditor";
import LinkModal from "../modal/link-modal";
import ConfirmPublishDialog from "../dialog/confirm-publish-dialog";
import { CreateNoteFormValues } from "@/app/(dashboard)/create/[id]/page";
import { useForm } from "react-hook-form";
import { toast } from "../use-toast";
import { revalidatePathClient, saveNote } from "@/app/api/action";
import { useParams } from "next/navigation";
import { compressImage, toBase64 } from "@/lib/image";
import { uploadImage } from "@/data/client/image";
import { useDebouncedCallback } from "use-debounce";
import { Content, EditorEvents } from "@tiptap/react";
import useViewport from "@/hooks/useViewPort";
import { Skeleton } from "../skeleton";
import { cn } from "@/lib/utils";
import FormatMenuMobile from "../format-menu-mobile";
import { NoteTag, Tag } from "@/types/tag.type";
import { Category } from "@/types/category.type";
import { Note } from "@/types/note.type";
type Props = {
  tags: NoteTag[] | null;
  categories: Category[] | null;
  note: Note | null;
};
type SelectOption = {
  value: string;
  label: string;
  color?: string;
};
export default function EditNoteForm({ tags, categories, note }: Props) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const params = useParams<{ id: string }>();
  const editorRef = useRef<TiptapEditorRef>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [formattedCategories, setFormattedCategories] = useState<
    SelectOption[]
  >([]);
  const [formattedTags, setFormattedTags] = useState<SelectOption[]>([]);
  const { height, keyboardHeight } = useViewport();
  const [inputActive, setInputActive] = useState(false);

  const { register, handleSubmit, setValue, watch } =
    useForm<CreateNoteFormValues>({
      defaultValues: {
        title: "",
        content: {},
        category: "",
        tags: [] as string[],
        cover: "",
      },
    });

  const selectedCategory = watch("category");
  const selectedTags = watch("tags");
  const handleSaveNote = useCallback(
    async (data: any) => {
      setSaveLoading(true);
      try {
        const finalTitle = data.title || "Untitled";

        if (editorRef.current && editorRef.current.editor) {
          const editorContent = editorRef.current.editor.getJSON();

          if (editorRef.current.editor.isEmpty) {
            return;
          }

          const tags = Array.isArray(data.tags) ? [...data.tags] : [];
          const category =
            typeof data.category === "string"
              ? data.category
              : String(data.category);
          const coverUrl = typeof data.cover === "string" ? data.cover : "";

          const serializableContent = JSON.stringify(editorContent);

          const noteData = {
            id: params.id,
            title: finalTitle,
            content: JSON.parse(serializableContent),
            category_id: category,
            tags: tags,
            cover_url: coverUrl,
            content_text: editorRef.current.editor.getText().trim(),
          };

          const { error } = await saveNote(noteData);

          if (error) {
            toast({
              title: "Error Saving Note",
              description: error.message,
              variant: "destructive",
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
    },
    [params.id, toast]
  );

  const handleAutoSave = useCallback(() => {
    const formValues = watch();
    handleSaveNote(formValues);
  }, [watch, handleSaveNote]);

  useEffect(() => {
    if (!image) return;

    handleUploadCover(image);
  }, [image]);

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

  const handleUserDebounceSave = useDebouncedCallback(() => {
    handleAutoSave();
  }, 3000);

  const handleUpdateTiptap = (props: EditorEvents["update"]) => {
    handleUserDebounceSave();
  };

  useEffect(() => {
    const handleSetContent = () => {
      const category = categories?.map((category) => {
        return {
          value: String(category.id),
          label: category.name!,
          color: category.color!,
        };
      });
      const tag = tags?.map((tag) => {
        return {
          label: tag.name!,
          value: String(tag.id),
          color: tag.color!,
        };
      });
      setFormattedCategories(category!);
      setFormattedTags(tag!);
      setValue("title", note?.title || "");
      if (note && note.category_id) {
        setValue("category", String(note?.category_id));
      }
      const tagsArr = note?.tags?.map((tag) => String(tag.tags?.id));
      setValue("tags", tagsArr || []);

      if (note?.cover_url) {
        setValue("cover", note?.cover_url);
        setImagePreviewUrl(note.cover_url);
      }
    };
    handleSetContent();
  }, [editorRef, note, tags, categories, setValue]);

  useEffect(() => {
    const setEditorContent = () => {
      if (note && editorRef.current?.editor) {
        try {
          // Ensure that the editor is fully initialized before setting content
          editorRef.current.editor.commands.setContent(note.content as Content);
        } catch (error) {
          toast({
            title: "Unexpected Error!",
            description: error instanceof Error ? error.message : String(error),
            variant: "destructive",
          });
        }
      }
    };

    // Wait for the editor to be fully ready
    const interval = setInterval(() => {
      if (editorRef.current?.editor) {
        clearInterval(interval);
        setEditorContent();
      }
    }, 100); // Poll every 100ms until the editor is available

    // Clear the interval if the component unmounts
    return () => clearInterval(interval);
  }, [editorRef, note, toast]);

  //   if (isLoading) {
  //     return (
  //       <div>
  //         <div className="flex justify-between items-center">
  //           <BackButton />
  //           <CreateNoteDropdownMenu
  //             handleSave={handleSubmit(handleSaveNote)}
  //             setOpenConfirmDialog={setOpenConfirmDialog}
  //           />
  //         </div>
  //         <div className="flex gap-2 flex-col">
  //           <Skeleton className="w-32 h-10 mb-4" />
  //           <Skeleton className="w-full h-10 rounded-md" />
  //           <Skeleton className="w-full h-10 rounded-md" />

  //           <Separator className="my-6" />
  //           <Skeleton className="w-full h-[300px] rounded-md" />
  //         </div>
  //       </div>
  //     );
  //   }

  // useEffect(() => {
  //   if (typeof window === "undefined" || typeof document === "undefined")
  //     return;

  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "hidden") {
  //       handleAutoSave();
  //       revalidatePathClient("/create");
  //       revalidatePathClient("/note");
  //     }
  //   };

  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     event.preventDefault();
  //     handleAutoSave();
  //     revalidatePathClient("/note");
  //     revalidatePathClient("/create");
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload, false);
  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [handleAutoSave]);

  return (
    <>
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
          className="bg-app_background hover:bg-transparent focus:outline-none text-white text-xl px-0"
          placeholder="Untitled"
          onChange={handleUserDebounceSave}
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
        {/* <div className="flex gap-2 flex-col mt-4">
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
    </div> */}
        <CategorizationCustom
          tags={formattedTags}
          selectedTags={selectedTags}
          categories={formattedCategories}
          selectedCategory={selectedCategory}
          setValue={setValue}
          debounceSave={handleUserDebounceSave}
        />
        <Separator className="my-6" />
        <div className="pb-20" ref={inputRef}>
          <TiptapEditor
            ref={editorRef}
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
            onUpdate={handleUpdateTiptap}
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
          category={selectedCategory}
          //   refresh={handleGetNoteContent}
        />
      </form>
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
    </>
  );
}
