import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import React, { Suspense } from "react";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import NoteCard from "@/components/ui/note-card/note-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchInput from "@/components/ui/search/search-input";
import OrderSelect from "@/components/ui/select/order-select";
import { getNoteExplore } from "@/data/server/note";
import NoteSkeleton from "@/components/ui/skeleton/note-skeleton";
import ImageContainer from "@/components/ui/image-container";
import NoteCardPublished from "@/components/ui/note-card/note-card-published";
import { NoteFilter } from "@/types/note.type";
import { getAllCategories } from "@/data/client/category";
import { getTags } from "@/data/server/tag";
import { FilterCombobox } from "@/components/ui/combobox/filter-combobox";
import { MultiFilterCombobox } from "@/components/ui/combobox/multi-filter-combobox";
import NoteList from "../note/_component/note-list";
import { Metadata } from "next";

const STATUS = [
  {
    value: "javascript",
    label: "Javascript",
  },
  {
    value: "react",
    label: "React",
  },
  {
    value: "vue",
    label: "VueJS",
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

const ORDER = [
  {
    value: "recent",
    label: "Recent",
  },
  {
    value: "most_popular",
    label: "Most Popular",
  },
  {
    value: "trending",
    label: "Trending",
  },
  {
    value: "most_liked",
    label: "Most Liked",
  },
];

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: "Vault - Explore",
  description:
    "Discover community-shared notes, ideas, and knowledge in Vault's Explore section.",
};

export default async function NotePage({ searchParams }: Props) {
  const [{ data: notes }, { data: categories }] = await Promise.all([
    getNoteExplore(searchParams as NoteFilter),
    getAllCategories(),
  ]);

  const categoryOption = [
    { label: "All", value: "all" },
    ...(categories?.map((category) => ({
      label: category.name,
      value: category.name,
    })) || []),
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 ">Explore</h1>
      <SearchInput searchParams={searchParams} />
      <div className="mt-4 flex sm:flex-row flex-col gap-2  justify-between">
        <div className="flex gap-2">
          <FilterCombobox
            filterKey={"category"}
            options={categoryOption!}
            defaultValue={searchParams?.category as string}
            label="Category"
          />
        </div>

        <FilterCombobox
          filterKey={"sortBy"}
          options={ORDER}
          defaultValue={searchParams?.sortBy as string}
          label="Sort By"
        />
      </div>

      {notes && notes.length > 0 ? (
        <Suspense fallback={<NoteSkeleton />}>
          <NoteList notes={notes} />
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
