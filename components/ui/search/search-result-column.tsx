import React from "react";
import ImageContainerBlur from "../image-container-blur";
import ImageContainer from "../image-container";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { formatDate } from "@/lib/date";
import { SearchResultCol } from "@/types/search.type";
import { renderNoteDescription } from "@/lib/renderNote";
import { BlockNode } from "@/types/note.type";
import { isContentArray } from "@/utils/string";
import Link from "next/link";
type Props = {
  searchResult: SearchResultCol;
};
export default function SearchResultColumn({ searchResult }: Props) {
  return (
    <Link
      href={`/note/${searchResult.id}`}
      className="grid grid-cols-4 gap-4 px-2 items-center rounded-sm h-32 hover:bg-neutral-700/50 hover:cursor-pointer"
    >
      {searchResult.cover_url && (
        <ImageContainer
          src={searchResult.cover_url}
          alt="placeholder"
          className="h-32"
          objectFit="contain"
        />
      )}
      <div className="col-span-3">
        <p className="text-sm">{searchResult.title}</p>
        <div className="w-full line-clamp-1 mb-1 text-xs text-neutral-500">
          {searchResult?.content &&
            isContentArray(searchResult.content) &&
            searchResult.content.length > 0 && (
              <>{renderNoteDescription(searchResult.content[0] as BlockNode)}</>
            )}
        </div>

        <div
          className="flex gap-2 rounded-sm p-0.5  items-center"
          // onClick={handleProfileClick}
        >
          <Avatar className="w-7 h-7">
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
      </div>
    </Link>
  );
}
