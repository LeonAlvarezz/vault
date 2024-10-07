import React from "react";
import { CommandItem } from "../command";
import { Separator } from "../separator";
import { SearchResult } from "@/types/search.type";
import { renderNoteDescription } from "@/lib/renderNote";
import { isContentArray } from "@/utils/string";
import { BlockNode } from "@/types/note.type";
import Link from "next/link";
type Props = {
  keyterm: string;
  searchResult: SearchResult;
  onSelect: () => void;
};
export default function LocalCommandSearchResulT({
  keyterm,
  searchResult,
  onSelect,
}: Props) {
  return (
    <Link href={`/create/${searchResult.id}`}>
      <CommandItem
        className="flex flex-col gap-1 items-start !px-6 my-1"
        onSelect={onSelect}
      >
        <h2 className="">{searchResult.title}</h2>

        {searchResult?.content &&
          isContentArray(searchResult.content) &&
          searchResult.content.length > 0 && (
            <>{renderNoteDescription(searchResult.content[0] as BlockNode)}</>
          )}
      </CommandItem>
      <Separator />
    </Link>
  );
}
