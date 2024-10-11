import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import React, { Suspense } from "react";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { GiBackwardTime } from "react-icons/gi";
import { MdOutlineTrendingUp } from "react-icons/md";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchInput from "@/components/ui/search/search-input";
import { searchNoteCol } from "@/data/client/search";
import { getRecentSearch, searchPublishedNote } from "@/data/server/search";
import { constructSearchQuery } from "@/utils/string";
import { FilterCombobox } from "@/components/ui/combobox/filter-combobox";
import { MultiFilterCombobox } from "@/components/ui/combobox/multi-filter-combobox";
import NoteSkeleton from "@/components/ui/skeleton/note-skeleton";
import NoteList from "../note/_component/note-list";
import NoNote from "@/components/ui/error/no-note";
import { getAllCategories } from "@/data/client/category";
import { NoteFilter } from "@/types/note.type";
import { deleteSearch } from "@/app/api/action";
import SearchLogContainer from "@/components/ui/search/search-log-container";

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

const RECENT_SEARCH = [
  {
    value: "What's react",
  },
  {
    value: "What's Javascript",
  },
  {
    value: "What's Golang",
  },
  {
    value: "What's Lua",
  },
];
type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};
export default async function SearchPage({ searchParams }: Props) {
  let searchQuery;

  if (searchParams && searchParams.query) {
    searchQuery = constructSearchQuery(searchParams.query.toString(), "|");
  }

  const [
    { data: notes, error },
    { data: categories },
    { data: recentSearches, error: recentSearchError },
  ] = await Promise.all([
    searchPublishedNote(searchQuery || "", searchParams as NoteFilter),
    getAllCategories(),
    getRecentSearch(),
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
      <h1 className="text-2xl font-bold mb-4 ">Search</h1>
      <SearchInput searchParams={searchParams} />
      {searchParams && searchParams.query ? (
        <section>
          <div className="mt-4 flex gap-2">
            <FilterCombobox
              filterKey={"category"}
              options={categoryOption}
              defaultValue={searchParams?.category as string}
              label="Category"
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
              <NoNote />
            </div>
          )}
        </section>
      ) : (
        <section>
          {recentSearches && recentSearches.length > 0 && (
            <div className="mt-6">
              <div className="flex mb-4 items-center gap-2">
                <GiBackwardTime size={20} />
                <h2 className="text-xl font-bold">Recent</h2>
              </div>
              <div className="flex flex-col gap-2">
                {recentSearches.map((search) => (
                  <SearchLogContainer key={search.id} search={search} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}

//Trending Search
// {/* <div className="mt-10">
//             <div className="flex mb-4 items-center gap-2">
//               <MdOutlineTrendingUp size={20} />
//               <h2 className="text-xl font-bold">Trending</h2>
//             </div>
//             <div className="flex flex-col gap-2">
//               {RECENT_SEARCH.map((result, index) => (
//                 <div
//                   key={index}
//                   className="hover:bg-neutral-800 w-full py-1 px-2 rounded-sm cursor-pointer flex justify-between items-center"
//                 >
//                   <p className="text-sm">{result.value}</p>
//                   <Button
//                     variant={"icon"}
//                     size={"icon"}
//                     className="hover:text-red-500"
//                   >
//                     <IoClose size={16} />
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </div> */}
