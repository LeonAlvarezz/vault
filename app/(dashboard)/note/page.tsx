import React, { Suspense } from "react";
import NoteCard from "@/components/ui/note-card/note-card";
import Link from "next/link";
import SearchInput from "@/components/ui/search/search-input";
import { getAllNotesByProfileId } from "@/data/server/note";
import { getAllCategories } from "@/data/client/category";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { FilterCombobox } from "@/components/ui/combobox/filter-combobox";
import { NoteFilter } from "@/types/note.type";
import { MultiFilterCombobox } from "@/components/ui/combobox/multi-filter-combobox";
import { getTags } from "@/data/server/tag";
import Loading from "@/app/loading";
import ImageContainer from "@/components/ui/image-container";
import CategorySwipe from "./_component/category-swipe";
import NoteSkeleton from "@/components/ui/skeleton/note-skeleton";
import NoteCardPublished from "@/components/ui/note-card/note-card-published";
import NoNote from "@/components/ui/note-card/no-note";
const STATUS = [
  {
    value: "all",
    label: "All Note",
  },
  {
    value: "published",
    label: "Published",
  },
  {
    value: "unpublished",
    label: "Unpublished",
  },
];

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};
export default async function NotePage({ searchParams }: Props) {
  const [{ data: notes }, { data: categories }, { data: tags }] =
    await Promise.all([
      getAllNotesByProfileId(searchParams as NoteFilter),
      getAllCategories(),
      getTags(),
    ]);
  // const { data: notes } = await getAllNotesByProfileId(
  //   searchParams as NoteFilter
  // );
  // const { data: categories } = await getAllCategories();
  // const { data: tags } = await getTags();
  const tagsOption = tags?.map((tag) => {
    return {
      label: tag.name,
      value: tag.name,
      color: tag.color!,
    };
  });

  return (
    <>
      <SearchInput />
      <div className="flex mt-4 justify-between">
        <CategorySwipe
          categories={categories || []}
          searchParams={searchParams}
        />
      </div>
      <div className="mt-4 flex gap-2">
        <FilterCombobox
          filterKey={"status"}
          options={STATUS}
          defaultValue={searchParams?.status as string}
          label="All Note"
        />
        <MultiFilterCombobox
          filterKey={"tags"}
          defaultValue={(searchParams?.tags as string[]) || []}
          options={tagsOption || []}
          placeholder="Tags"
          maxCount={1}
        />
      </div>
      {notes && notes.length > 0 ? (
        <Suspense fallback={<NoteSkeleton />}>
          <section className="columns-1 sm:columns-2 2xl:columns-3 gap-2 space-y-2 my-6">
            {notes?.map((note, index) =>
              note.published_at ? (
                <NoteCardPublished key={index} note={note} />
              ) : (
                <NoteCard key={index} note={note} />
              )
            )}
          </section>
        </Suspense>
      ) : (
        <div
          className="w-full flex justify-center items-center"
          style={{ minHeight: "calc(100svh - 280px)" }}
        >
          <NoNote />
        </div>
      )}
    </>
  );
}
