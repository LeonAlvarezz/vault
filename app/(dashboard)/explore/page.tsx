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

export default async function NotePage() {
  const { data: notes, error } = await getNoteExplore();
  if (error) {
    throw new Error(error.message);
  }
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 ">Explore</h1>
      <SearchInput />
      <div className="mt-4 flex sm:flex-row flex-col gap-2  justify-between">
        <div className="flex gap-2">
          <Combobox
            options={STATUS}
            label="Category"
            size="sm"
            className="basis-1/2"
          />
          <Combobox
            options={TAG}
            label="Tags"
            size="sm"
            className="basis-1/2"
          />
        </div>

        <OrderSelect options={ORDER} />
      </div>

      {notes && notes.length > 0 ? (
        <Suspense fallback={<NoteSkeleton />}>
          <section className="columns-1 sm:columns-2 2xl:columns-3 gap-2 space-y-2 my-6">
            {notes?.map((note, index) =>
              note.published_at ? (
                <NoteCard key={index} note={note} published />
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
      {/* <section className="my-6 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-2">
        {Array.from({ length: 30 }).map((_, index) => (
          <NoteCard published key={index} />
        ))}
      </section> */}
    </>
  );
}
