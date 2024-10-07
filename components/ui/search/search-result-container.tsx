import { SearchResultCol } from "@/types/search.type";
import React from "react";
import SearchResultColumn from "./search-result-column";
import Link from "next/link";
import { FaArrowDown } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NoNote from "../note-card/no-note";
type Props = {
  show: boolean;
  searchCols: SearchResultCol[];
  query: string;
  loading: boolean;
  empty: boolean;
};
export default function SearchResultContainer({
  show,
  searchCols,
  query,
  loading,
  empty,
}: Props) {
  if (!show) return null;

  return (
    <div className="w-full absolute top-12 h-fit bg-popover z-[999]">
      {/* Show loading indicator */}
      {loading && (
        <div className="h-full w-full p-6 flex justify-center items-center">
          <AiOutlineLoading3Quarters size={14} className="animate-spin mr-2" />
        </div>
      )}

      {/* Show "NoNote" when not loading and no search results */}
      {empty && !loading && (
        <div className="h-full min-w-[200px] p-6 flex justify-center items-center">
          <NoNote />
        </div>
      )}

      {/* Show search results when not loading and results exist */}
      {!loading && searchCols.length > 0 && (
        <div className="grid grid-cols-1 gap-2 py-4 px-2">
          {searchCols.map((col) => (
            <SearchResultColumn key={col.id} searchResult={col} />
          ))}
          <Link
            href={`/search?query=${query}`}
            className="flex gap-2 mt-5 justify-center items-center"
          >
            <FaArrowDown size={12} />
            <p className="text-xs">More Result</p>
          </Link>
        </div>
      )}
    </div>
  );
}
