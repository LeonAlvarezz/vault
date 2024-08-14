import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import NoteCard from "@/components/ui/note-card";

export default function NotePage() {
  return (
    <div className="w-[80%] md:w-[50%] mx-auto pt-20">
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
          <Button variant={"main"} className="rounded-full px-8">
            All Note
          </Button>
          <Button variant={"outline"} className="rounded-full px-8">
            React
          </Button>
          <Button variant={"outline"} className="rounded-full px-8">
            Javascript
          </Button>
          <Button variant={"outline"} className="rounded-full px-8">
            Golang
          </Button>
        </div>
        <Button
          variant={"outline"}
          size={"icon"}
          className="rounded-full flex-shrink-0"
        >
          <FaPlus size={16} />
        </Button>
      </div>

      <section className="mt-6 flex flex-wrap justify-between gap-y-2">
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
      </section>
      {/* <Combobox /> */}
    </div>
  );
}
