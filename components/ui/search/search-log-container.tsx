"use client";
import { Search } from "@/types/search.type";
import React, { useTransition } from "react";
import Spinner from "../spinner";
import SearchLogContainerItem from "./search-log-container-item";
type Props = {
  searches: Search[];
};
export default function SearchLogContainer({ searches }: Props) {
  const [isLoading, setTransition] = useTransition();
  return (
    <div className="flex flex-col gap-2 relative">
      {searches.map((search) => (
        <SearchLogContainerItem
          key={search.id}
          search={search}
          setTransition={setTransition}
        />
      ))}
      {isLoading && (
        <div className="absolute top-0 left-0 bg-neutral-900/50 w-full h-full z-50 flex justify-center items-center">
          <Spinner size={24} />
        </div>
      )}
    </div>
  );
}
