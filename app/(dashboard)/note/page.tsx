import React, { Suspense } from "react";
import { getAllNotesByProfileId } from "@/data/server/note";
import { getAllCategories } from "@/data/client/category";
import { FilterCombobox } from "@/components/ui/combobox/filter-combobox";
import { NoteFilter } from "@/types/note.type";
import { MultiFilterCombobox } from "@/components/ui/combobox/multi-filter-combobox";
import { getTags } from "@/data/server/tag";
import CategorySwipe from "./_component/category-swipe";
import NoteSkeleton from "@/components/ui/skeleton/note-skeleton";
import NoNote from "@/components/ui/error/no-note";
import SearchInputLocal from "@/components/ui/search/search-input-local";
import NoteList from "../../../components/ui/list/note-list";
import { Metadata } from "next";
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
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "Vault - Note",
  description: "Create, edit, and publish your developer notes on Vault.",
};

export default async function NotePage(props: Props) {
  const searchParams = await props.searchParams;
  const [{ data: notes }, { data: categories }, { data: tags }] =
    await Promise.all([
      getAllNotesByProfileId(searchParams as NoteFilter),
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

  return (
    <>
      <SearchInputLocal />
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
        <NoteList notes={notes} optionButton />
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
