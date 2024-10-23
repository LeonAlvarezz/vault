import NoteCard from "@/components/ui/note-card/note-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NoteSkeleton from "@/components/ui/skeleton/note-skeleton";
import { Note } from "@/types/note.type";
import React, { Suspense } from "react";
import NoteList from "../../../../components/ui/list/note-list";
import { FilterCombobox } from "@/components/ui/combobox/filter-combobox";
import NoNote from "@/components/ui/error/no-note";
type Props = {
  notes: Note[] | null;
  searchParams?: { [key: string]: string | string[] | undefined };
};
export default function NoteTab({ notes, searchParams }: Props) {
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

  return (
    <>
      <FilterCombobox
        filterKey={"sortBy"}
        options={ORDER}
        defaultValue={searchParams?.sortBy as string}
        label="Sort By"
      />
      {notes && notes.length > 0 ? (
        <NoteList notes={notes} />
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
