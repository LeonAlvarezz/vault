"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import BackButton from "../button/back-button";
import CreateNoteDropdownMenu from "../dropdown/create-note-dropdown";
import ImageContainerBlurClient from "../image/image-container-blur-client";
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
import { useParams } from "next/navigation";
import { compressImage, toBase64 } from "@/lib/image";
import { uploadImage } from "@/data/client/image";
import { useDebouncedCallback } from "use-debounce";
import { Content, EditorEvents, JSONContent } from "@tiptap/react";
import useViewport from "@/hooks/useViewPort";
import { Skeleton } from "../skeleton";
import { cn } from "@/lib/utils";
import FormatMenuMobile from "../format-menu-mobile";
import { NoteTag, Tag } from "@/types/tag.type";
import { Category } from "@/types/category.type";
import { Note } from "@/types/note.type";
import { isEqual } from "lodash"; // Import
import { Json } from "@/database.types";
import { useSubscription } from "@/stores/subscription";
import { saveNote } from "@/action/note";
import { revalidatePathClient } from "@/action";
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
  const [saveLoading, setSaveLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [formattedCategories, setFormattedCategories] = useState<
    SelectOption[]
  >([]);
  const [formattedTags, setFormattedTags] = useState<SelectOption[]>([]);
  const { height, keyboardHeight } = useViewport();
  const [inputActive, setInputActive] = useState(false);
  const [previousValues, setPreviousValues] = useState<CreateNoteFormValues>({
    title: "",
    content: null,
    category: "",
    tags: [],
    cover: "",
  });
  const { isPremium } = useSubscription();
  const compressedSize = isPremium ? 0.8 : 0.1;

  const { register, handleSubmit, setValue, watch } =
    useForm<CreateNoteFormValues>({
      defaultValues: {
        title: "",
        content: null,
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
            content_text: editorRef.current.editor
              .getText()
              .trim()
              .replace(/(\r\n|\n|\r){2,}/g, "\n"),
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
    [params.id]
  );

  const handleAutoSave = useCallback(() => {
    const hasChanged = (currentValues: CreateNoteFormValues) => {
      const completeCurrentValues = {
        ...currentValues,
        content: editorRef.current?.editor?.getJSON(),
      };
      return !isEqual(completeCurrentValues, previousValues);
    };
    const formValues = watch();
    if (hasChanged(formValues)) {
      handleSaveNote(formValues);
      setPreviousValues({
        ...formValues,
        content: editorRef.current?.editor?.getJSON() || null,
      });
    }
  }, [watch, handleSaveNote, previousValues]);

  useEffect(() => {
    if (!image) return;

    handleUploadCover(image);
  }, [image]);

  const handleUploadCover = async (image: File) => {
    const base64 = await toBase64(image);
    setImagePreviewUrl(base64);

    const compressedImage = await compressImage(image, {
      maxSizeMB: compressedSize,
    });

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
      setValue(
        "title",
        note?.title && note.title !== "Untitled" ? note.title : ""
      );
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
          // eslint-disable-next-line react/no-unused-prop-types
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
      console.log("Hello");
      if (editorRef.current?.editor) {
        clearInterval(interval);
        setEditorContent();
      }
    }, 100); // Poll every 100ms until the editor is available

    // Clear the interval if the component unmounts
    return () => clearInterval(interval);
  }, [editorRef, note]);

  useEffect(() => {
    const initialValues: CreateNoteFormValues = {
      title: note?.title || "",
      content: note?.content as JSONContent, // Ensure `content` is an object
      category: note?.category_id ? String(note.category_id) : "",
      tags: note?.tags?.map((tag) => String(tag.tags?.id)) || [],
      cover: note?.cover_url || "",
    };
    console.log("Hello");
    setPreviousValues(initialValues);
  }, [note]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleAutoSave();
        revalidatePathClient("/create");
        revalidatePathClient("/note");
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      handleAutoSave();
      revalidatePathClient("/note");
      revalidatePathClient("/create");
    };
    window.addEventListener("beforeunload", handleBeforeUnload, false);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleAutoSave]);

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
          <BackButton shouldRevalidate />
          <CreateNoteDropdownMenu
            handleSave={handleSubmit(handleSaveNote)}
            note={note}
            category={selectedCategory}
          />
        </div>
        {imagePreviewUrl && (
          <div className="relative bg-neutral-800 mb-2">
            <ImageContainerBlurClient
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
