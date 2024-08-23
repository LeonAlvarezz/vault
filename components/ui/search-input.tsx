import React from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "./button";

export default function SearchInput() {
  return (
    <div className="relative">
      <Input variant={"outline"} placeholder="Search by title or keyword..." />
      <Button
        variant={"icon"}
        size={"icon"}
        className="absolute top-1/2 -translate-y-1/2 right-2 hover:bg-neutral-700/50 rounded-full"
      >
        <IoSearch color="white" size={20} />
      </Button>
    </div>
  );
}
