import NoteCard from "@/components/ui/note-card/note-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export default function NoteTab() {
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
      <Select defaultValue="recent">
        <SelectTrigger className="w-[150px]">
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
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-2">
        {Array.from({ length: 10 }).map((_, index: number) => (
          <NoteCard key={index} />
        ))}
      </div>
    </>
  );
}
