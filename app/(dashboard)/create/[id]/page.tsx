import EditNoteForm from "@/components/ui/form/edit-note-form";
import { getAllCategories } from "@/data/client/category";
import { getNoteContent } from "@/data/server/note";
import { getTags } from "@/data/server/tag";
import React, { useCallback, useEffect, useRef, useState } from "react";

export type CreateNoteFormValues = {
  title: string;
  content: Record<string, unknown>;
  category: string;
  tags: string[];
  cover: string;
};
type Props = {
  params: { id: string };
};
export default async function Page({ params }: Props) {
  const [{ data: note }, { data: tags }, { data: categories }] =
    await Promise.all([
      getNoteContent(params.id),
      getTags(),
      getAllCategories(),
    ]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [shouldUpdate, setShouldUpdate] = useState(true);
  // const [note, setNote] = useState<Note>();

  // const { toast } = useToast();

  // const router = useRouter();

  // const handleGetTags = async () => {
  //   const { data, error } = await getTags();

  //   if (error) {
  //     toast({
  //       title: "Error Fetching Tags",
  //       description: error?.message,
  //     });
  //   }
  //   const formattedTags = data!.map((tag) => ({
  //     value: String(tag.id),
  //     label: tag.name!,
  //     color: tag.color!,
  //   }));
  //   setTags(formattedTags);
  // };

  // const handleGetNoteContent = async () => {
  //   const { data, error } = await getNoteContent(params.id);
  //   if (error) {
  //     if ((error.code = "PGRST116")) {
  //       toast({
  //         title: "Unauthorized",
  //         description: "You are not authenticated to view this note",
  //       });
  //     } else {
  //       toast({
  //         title: "Error Fetching Note",
  //         description: error?.message,
  //       });
  //     }

  //     router.push("/note");
  //   }

  //   setNote(data!);
  //   setValue("title", data?.title || "");
  //   if (data && data.category_id) {
  //     setValue("category", String(data?.category_id));
  //   }
  //   const tagsArr = data?.tags?.map((tag) => String(tag.tags?.id));
  //   setValue("tags", tagsArr || []);

  //   if (data?.cover_url) {
  //     setValue("cover", data?.cover_url);
  //     setImagePreviewUrl(data.cover_url);
  //   }

  //   editorRef.current?.editor?.commands.setContent(data?.content as Content);
  // };
  //Load Note
  // useEffect(() => {
  //   const handleGetCategory = async () => {
  //     const { data, error } = await getAllCategories();
  //     if (error) {
  //       toast({
  //         title: "Error Fetching Category",
  //         description: error?.message,
  //       });
  //     }
  //     const formattedCategories = data!.map((category) => ({
  //       value: String(category.id),
  //       label: category.name!,
  //       color: category.color!,
  //     }));
  //     setCategories(formattedCategories);
  //   };

  //   const fetchInitialData = async () => {
  //     setIsLoading(true);
  //     try {
  //       await Promise.all([
  //         handleGetNoteContent(),
  //         handleGetCategory(),
  //         handleGetTags(),
  //       ]);
  //     } catch (error) {
  //       toast({
  //         title: "Error",
  //         description: "Failed to load initial data. Please try again.",
  //         variant: "destructive",
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchInitialData();
  // }, [shouldUpdate]);

  // useEffect(() => {
  //   if (shouldUpdate) setShouldUpdate(false);
  // }, [shouldUpdate]);

  // TODO: Uncomment to enable auto save
  // // Save data every 10 seconds

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
      {/* <div className="hidden xl:block fixed top-20 left-28 w-[200px]">
        <div className="flex flex-col gap-2 mt-4">
          <p>Statistic</p>
          <StatContainer label="Views" count={2000} rate={10} />
          <StatContainer label="Likes" count={100} />
          <StatContainer label="Bookmarks" count={50} />
        </div>
      </div> */}
      {/* <form onSubmit={handleSubmit(handleSaveNote)}> */}
      <EditNoteForm tags={tags} categories={categories} note={note} />
    </>
  );
}
