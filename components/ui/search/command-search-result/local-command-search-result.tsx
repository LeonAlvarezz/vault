import React from "react";
import { CommandItem } from "../../command";
import { Separator } from "../../separator";
import { SearchResult } from "@/types/search.type";
type Props = {
  searchResult: SearchResult;
  onSelect: () => void;
  isLast: boolean;
};
export default function LocalCommandSearchResulT({
  searchResult,
  onSelect,
  isLast,
}: Props) {
  return (
    <>
      <CommandItem
        className="flex flex-col gap-1 items-start !px-6 my-1"
        onSelect={onSelect}
      >
        <h2 className="">{searchResult.title}</h2>

        <p className="text-xs text-neutral-500 line-clamp-1">
          {searchResult.content_text}
        </p>
      </CommandItem>
      {!isLast && <Separator />}
    </>
  );
}
