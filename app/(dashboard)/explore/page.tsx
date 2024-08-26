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

export default function NotePage() {
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

        <Select defaultValue="trending">
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            {ORDER.map((order, index) => (
              <SelectItem key={index} value={order.value}>
                {order.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <section className="my-6 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-2">
        {Array.from({ length: 30 }).map((_, index) => (
          <NoteCard published key={index} />
        ))}
      </section>
    </>
  );
}
