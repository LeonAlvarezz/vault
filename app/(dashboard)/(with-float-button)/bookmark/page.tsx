import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import React from "react";
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
      <h1 className="text-2xl font-bold mb-4 ">Bookmark</h1>
      <SearchInput />
      <div className="flex gap-2 mt-4">
        <Combobox options={STATUS} label="Category" size="sm" />
        <Combobox options={TAG} label="Tags" size="sm" />
      </div>

      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-2">
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
      </section>
    </>
  );
}
