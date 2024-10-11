"use client";
import { Search } from "@/types/search.type";
import React from "react";
import { Button } from "../button";
import { IoClose } from "react-icons/io5";
import { deleteSearch } from "@/app/api/action";
import { toast } from "../use-toast";
import Link from "next/link";
import { sanitizeSearchInput } from "@/utils/string";
type Props = {
  search: Search;
};
export default function SearchLogContainer({ search }: Props) {
  const handleDelete = async (id: number) => {
    const { error } = await deleteSearch(id);
    console.log("error:", error);
    if (error) {
      toast({
        title: "Error Deleting Search",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  const constructRouteURL = () => {
    const sanitizedQuery = sanitizeSearchInput(search.query || "");
    const encodedQuery = encodeURIComponent(sanitizedQuery);
    return `/search?query=${encodedQuery}`;
  };
  return (
    <Link
      href={constructRouteURL()}
      className="hover:bg-neutral-800 w-full py-1 px-2 rounded-sm cursor-pointer flex justify-between items-center"
    >
      <p className="text-sm">{search.query}</p>
      <Button
        variant={"icon"}
        size={"icon"}
        className="hover:text-red-500"
        type="submit"
        onClick={() => handleDelete(search.id)}
      >
        <IoClose size={16} />
      </Button>
    </Link>
  );
}
