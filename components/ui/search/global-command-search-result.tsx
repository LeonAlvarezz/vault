import React from "react";
import { CommandItem } from "../command";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Separator } from "../separator";
import { SearchResult } from "@/types/search.type";
import { BlockNode } from "@/types/note.type";
import { renderNoteDescription } from "@/lib/renderNote";
import { isContentArray } from "@/utils/string";
import { formatDate } from "@/lib/date";
import Link from "next/link";
type Props = {
  searchResult: SearchResult;
  onSelect: () => void;
  isLast: boolean;
};
export default function GlobalCommandSearchResult({
  searchResult,
  onSelect,
  isLast,
}: Props) {
  return (
    <Link href={`/note/${searchResult.id}`}>
      <CommandItem
        className="flex flex-col gap-1 items-start !px-6 my-1"
        onSelect={onSelect}
      >
        <h2 className="">{searchResult.title}</h2>
        <p className="text-xs text-neutral-500 line-clamp-1">
          {searchResult.content_text}
        </p>

        <div className="w-full flex justify-between items-end">
          <div
            className="flex gap-2 rounded-sm p-0.5 mt-1 items-center"
            // onClick={handleProfileClick}
          >
            <Avatar className="w-6 h-6">
              {searchResult.profiles?.avatar_url && (
                <AvatarImage src={searchResult.profiles.avatar_url} />
              )}
              <AvatarFallback>
                {searchResult.profiles?.username.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-xs text-neutral-200">
                {searchResult.profiles?.username}
              </p>
            </div>
          </div>
          <p className="text-[10px] text-neutral-400">
            {formatDate(searchResult.published_at || "")}
          </p>
        </div>
      </CommandItem>
      {!isLast && <Separator />}
    </Link>
  );
}
