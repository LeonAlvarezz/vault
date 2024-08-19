import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import NoteCard from "@/components/ui/note-card";
import FloatingButton from "@/components/ui/floating-button";
import { ICON_COLOR, ICON_SIZE } from "@/components/ui/sidebar/sidebar";
import Link from "next/link";
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
export default function NotePage() {
  return (
    <>
      <div className="relative">
        <Input
          variant={"outline"}
          placeholder="Search by title or keyword..."
        />
        <IoSearch
          color="white"
          size={20}
          className="absolute top-1/2 -translate-y-1/2 right-4"
        />
      </div>
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

      <section className="my-6 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-2">
        {/* <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard /> */}
        {Array.from({ length: 30 }).map((_, index) => (
          <NoteCard key={index} />
        ))}
      </section>
      {/* <Combobox /> */}
      <FloatingButton className="fixed bottom-4 p-4 right-64 cursor-pointer ">
        <Link href="/create">
          <FaPlus color={ICON_COLOR} size={ICON_SIZE} />
        </Link>
      </FloatingButton>
    </>
  );
}
