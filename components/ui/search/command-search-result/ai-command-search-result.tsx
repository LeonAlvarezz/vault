import React from "react";
import { CommandItem } from "../../command";
import { Avatar, AvatarFallback, AvatarImage } from "../../avatar";
import { Separator } from "../../separator";
import { formatDate } from "@/lib/date";
import { SearchResult } from "@/types/search.type";
type Props = {
  searchResult: SearchResult;
  onSelect: () => void;
  isLast: boolean;
};
export default function AICommandSearchResult({
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

        <div className="w-full flex justify-between items-end">
          <div
            className="flex gap-2 rounded-sm p-0.5 mt-1 items-center"
            // onClick={handleProfileClick}
          >
            <Avatar className="w-6 h-6">
              {searchResult.avatar_url && (
                <AvatarImage src={searchResult.avatar_url} />
              )}
              <AvatarFallback>
                {searchResult.username?.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-xs text-neutral-200">
                {searchResult.username}
              </p>
            </div>
          </div>
          {searchResult.published_at && (
            <p className="text-[10px] text-neutral-400">
              {formatDate(searchResult.published_at || "")}
            </p>
          )}
        </div>
      </CommandItem>
      {!isLast && <Separator />}
    </>
  );
}
