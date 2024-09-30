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
  const { data: notes } = await getAllNotesByProfileId(
    searchParams as NoteFilter
  );
  const { data: categories } = await getAllCategories();
  const { data: tags } = await getTags();
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
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          <Suspense fallback={<Skeleton className="w-full rounded-md h-20" />}>
            <Link
              href={"?category=all"}
              className={cn(
                "rounded-full px-8 text-sm border w-fit h-10 py-2 border-neutral-700 hover:border-main hover:text-second capitalize flex justify-center items-center",
                (searchParams?.category === "all" || !searchParams?.category) &&
                  "bg-main border-0 hover:text-white"
              )}
            >
              <p className="w-full whitespace-nowrap">All Note</p>
            </Link>
            {categories ? (
              categories.map((category) => (
                <Link
                  href={"?category=" + category.name}
                  key={category.id}
                  className={cn(
                    "rounded-full px-8 text-sm border w-fit h-10 py-2 border-neutral-700 hover:border-main hover:text-second capitalize flex justify-center items-center",
                    searchParams?.category === category.name &&
                      "bg-main border-0 hover:text-white"
                  )}
                >
                  <p className="w-full whitespace-nowrap">{category.name}</p>
                </Link>
              ))
            ) : (
              <Skeleton className="w-full rounded-md h-20" />
            )}
          </Suspense>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <FilterCombobox
          filterKey={"status"}
          options={STATUS}
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
      <Suspense>
        {notes && notes.length > 0 ? (
          <section className="columns-1 sm:columns-2 2xl:columns-3 gap-2 space-y-2 my-6">
            {notes?.map((note, index) =>
              note.published_at ? (
                <NoteCard key={index} note={note} published />
              ) : (
                <NoteCard key={index} note={note} />
              )
            )}
          </section>
        ) : (
          <div
            className="w-full flex justify-center items-center"
            style={{ minHeight: "calc(100svh - 280px)" }}
          >
            <div className="flex flex-col gap-4 items-center ">
              <ImageContainer
                src="/image/empty-note.svg"
                alt="empty"
                className="size-[100px] opacity-80"
                preview={false}
              />
              <h1 className="text-neutral-500 ">No note available</h1>
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
}
