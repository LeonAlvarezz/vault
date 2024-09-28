import { Button } from "@/components/ui/button";
import React from "react";
import NoteCard from "@/components/ui/note-card/note-card";
import Link from "next/link";
import SearchInput from "@/components/ui/search/search-input";
import { getAllNotesByProfileId } from "@/data/server/note";
import { getAllCategories } from "@/data/client/category";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { FilterCombobox } from "@/components/ui/combobox/filter-combobox";
import { NoteFilter } from "@/types/note.type";
export const revalidate = 10;

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
type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};
export default async function NotePage({ searchParams }: Props) {
  const { data: notes } = await getAllNotesByProfileId(
    searchParams as NoteFilter
  );
  const { data: categories } = await getAllCategories();
  return (
    <>
      <SearchInput />
      <div className="flex mt-4 justify-between">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          <Link
            href={"?category=all"}
            className={cn(
              "rounded-full px-8 text-sm border w-fit h-10 py-2 border-neutral-700 hover:border-main hover:text-second capitalize flex justify-center items-center",
              (searchParams?.category === "all" || searchParams) &&
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

          <Button
            variant={"outline"}
            className="rounded-full px-8 hover:border-main hover:text-second"
          >
            Golang
          </Button>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <FilterCombobox
          filterKey={"status"}
          options={STATUS}
          label="All Note"
        />
        <FilterCombobox filterKey={"tag"} options={TAG} label="Tags" />
      </div>

      {/* <section className="my-6 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-2 ">
        <div className="grid gap-2">
          <NoteCard />
          <NoteCard />
          <NoteCard published />
        </div>
      </section> */}
      <section className="columns-1 sm:columns-2 2xl:columns-3 gap-2 space-y-2 my-6">
        {notes?.map((note, index) =>
          note.published_at ? (
            <NoteCard key={index} note={note} published />
          ) : (
            <NoteCard key={index} note={note} />
          )
        )}
        {/* <NoteCard />
        <NoteCard published />
        <NoteCard published />
        <NoteCard published />
        <NoteCard />
        <NoteCard /> */}
      </section>
    </>
  );
}
