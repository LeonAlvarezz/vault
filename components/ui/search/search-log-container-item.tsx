"use client";
import { Search } from "@/types/search.type";
import React from "react";
import { Button } from "../button";
import { IoClose } from "react-icons/io5";
import { deleteSearch } from "@/app/api/action";
import { toast } from "../use-toast";
import { Link } from "react-transition-progress/next";
import { sanitizeSearchInput } from "@/utils/string";
type Props = {
  search: Search;
  setTransition: React.TransitionStartFunction;
};
export default function SearchLogContainerItem({
  search,
  setTransition,
}: Props) {
  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setTransition(async () => {
      const { error } = await deleteSearch(search.id);
      if (error) {
        toast({
          title: "Error Deleting Search",
          description: error.message,
          variant: "destructive",
        });
      }
    });
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
        onClick={handleDelete}
      >
        <IoClose size={16} />
      </Button>
    </Link>
  );
}
