import React, { Suspense } from "react";
import NoteCard from "@/components/ui/note-card/note-card";

import SearchInput from "@/components/ui/search/search-input";
import NoteSkeleton from "@/components/ui/skeleton/note-skeleton";
import ImageContainer from "@/components/ui/image-container";
import { getBookmarkNote } from "@/data/server/note";
import { getBookmark } from "@/data/server/bookmark";
import NoteCardPublished from "@/components/ui/note-card/note-card-published";
import { getAllCategories } from "@/data/client/category";
import { FilterCombobox } from "@/components/ui/combobox/filter-combobox";
import { NoteFilter } from "@/types/note.type";
import { MultiFilterCombobox } from "@/components/ui/combobox/multi-filter-combobox";
import { getTags } from "@/data/server/tag";
import SearchInputLocal from "@/components/ui/search/search-input-local";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vault - Bookmark",
  description:
    "Manage and organize your saved bookmarks for quick access to important notes and resources.",
};
const STATUS = [
  {
    value: "all_note",
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

export default async function BookmarkPage({ searchParams }: Props) {
  const [{ data: bookmarks, error }, { data: categories }, { data: tags }] =
    await Promise.all([
      getBookmark(searchParams as NoteFilter),
      getAllCategories(),
      getTags(),
    ]);

  const tagsOption = tags?.map((tag) => {
    return {
      label: tag.name,
      value: tag.name,
      color: tag.color!,
    };
  });
  const categoryOption = [
    { label: "All", value: "all" },
    ...(categories?.map((category) => ({
      label: category.name,
      value: category.name,
    })) || []),
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 ">Bookmark</h1>
      <SearchInputLocal />
      <div className="flex gap-2 mt-4">
        <FilterCombobox
          filterKey={"status"}
          options={STATUS}
          defaultValue={searchParams?.status as string}
          label="All Note"
        />

        <FilterCombobox
          filterKey={"category"}
          options={categoryOption!}
          defaultValue={searchParams?.category as string}
          label="Category"
        />
      </div>

      {bookmarks && bookmarks.length > 0 ? (
        <Suspense fallback={<NoteSkeleton />}>
          <section className="columns-1 sm:columns-2 2xl:columns-3 gap-2 space-y-2 my-6">
            {bookmarks.map((bookmark, index) =>
              bookmark.note.published_at ? (
                <NoteCardPublished
                  key={index}
                  note={bookmark.note}
                  isBookmark={true}
                  isLike={
                    bookmark.note.likes &&
                    bookmark.note.likes.length > 0 &&
                    bookmark.note.likes[0].deleted_at === null
                  }
                />
              ) : (
                <NoteCard key={index} note={bookmark.note} />
              )
            )}
          </section>
        </Suspense>
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
    </>
  );
}
