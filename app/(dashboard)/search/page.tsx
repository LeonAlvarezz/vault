import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import React from "react";
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

export default function SearchPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 ">Search</h1>
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

      {/* <div className="mt-4 flex justify-between">
        <div className="flex gap-2">
          <Combobox options={STATUS} label="Category" size="sm" />
          <Combobox options={TAG} label="Tags" size="sm" />
        </div>

        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            {ORDER.map((order) => (
              <SelectItem value={order.value}>{order.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      <section className="mt-6">
        <div className="flex mb-4 items-center gap-2">
          <GiBackwardTime size={20} />
          <h2 className="text-xl font-bold">Recent</h2>
        </div>
        <div className="flex flex-col gap-2">
          {RECENT_SEARCH.map((result, index) => (
            <div
              key={index}
              className="hover:bg-neutral-800 w-full py-1 px-2 rounded-sm cursor-pointer flex justify-between items-center"
            >
              <p className="text-sm">{result.value}</p>
              <Button
                variant={"icon"}
                size={"icon"}
                className="hover:text-red-500"
              >
                <IoClose size={16} />
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex mb-4 items-center gap-2">
          <MdOutlineTrendingUp size={20} />
          <h2 className="text-xl font-bold">Trending</h2>
        </div>
        <div className="flex flex-col gap-2">
          {RECENT_SEARCH.map((result, index) => (
            <div
              key={index}
              className="hover:bg-neutral-800 w-full py-1 px-2 rounded-sm cursor-pointer flex justify-between items-center"
            >
              <p className="text-sm">{result.value}</p>
              <Button
                variant={"icon"}
                size={"icon"}
                className="hover:text-red-500"
              >
                <IoClose size={16} />
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
