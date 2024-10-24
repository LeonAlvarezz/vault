import React from "react";
import SearchInput from "@/components/ui/search/search-input";
import { getNoteExplore } from "@/data/server/note";
import ImageContainer from "@/components/ui/image-container";
import { NoteFilter } from "@/types/note.type";
import { getAllCategories } from "@/data/client/category";
import { FilterCombobox } from "@/components/ui/combobox/filter-combobox";
import { Metadata } from "next";
import ExploreInfiniteScroll from "@/components/ui/infinite-scroll/explore-infinite-scroll";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/data/server/profiles";

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
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "Vault - Explore",
  description:
    "Discover community-shared notes, ideas, and knowledge in Vault's Explore section.",
};

export default async function NotePage(props: Props) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const user = await getUser(supabase);
  const [{ data: notes }, { data: categories }] = await Promise.all([
    getNoteExplore(user, searchParams as NoteFilter),
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
      <SearchInput user={user} debounce />
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
        // <Suspense fallback={<NoteSkeleton />}>
        //   <NoteList notes={notes} />
        // </Suspense>
        <ExploreInfiniteScroll notes={notes} searchParams={searchParams} />
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
