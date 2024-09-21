import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import React from "react";
import { FaPlus } from "react-icons/fa";
import NoteCard from "@/components/ui/note-card/note-card";
import FloatingButton from "@/components/ui/floating-button";
import { ICON_COLOR, ICON_SIZE } from "@/components/ui/sidebar/sidebar";
import Link from "next/link";
import SearchInput from "@/components/ui/search/search-input";
import { getAllNotesByProfileId } from "@/data/server/note";
export const revalidate = 10;

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
export default async function NotePage() {
  const { data: notes } = await getAllNotesByProfileId();
  return (
    <>
      <SearchInput />
      <div className="flex mt-4 justify-between">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          <Button
            variant={"main"}
            className="rounded-full px-8 hover:border-main hover:text-second"
          >
            All Note
          </Button>
          <Button
            variant={"outline"}
            className="rounded-full px-8 hover:border-main hover:text-second"
          >
            React
          </Button>
          <Button
            variant={"outline"}
            className="rounded-full px-8 hover:border-main hover:text-second"
          >
            Javascript
          </Button>
          <Button
            variant={"outline"}
            className="rounded-full px-8 hover:border-main hover:text-second"
          >
            Golang
          </Button>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Combobox options={STATUS} label="All Note" />
        <Combobox options={TAG} label="Tags" />
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
