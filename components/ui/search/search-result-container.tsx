import { SearchResultCol } from "@/types/search.type";
import React from "react";
import Spinner from "../spinner";
import SearchResultColumn from "./search-result-column";
import { Link } from "react-transition-progress/next";
import { FaArrowDown } from "react-icons/fa";
import NoNote from "../error/no-note";
type Props = {
  show: boolean;
  loading: boolean;
  searchCols: SearchResultCol[];
  query: string;
};
export default function SearchResultContainer({
  show,
  loading,
  searchCols,
  query,
}: Props) {
  return (
    <>
      {show && (
        <div className="w-full absolute top-12 h-fit bg-popover border z-50 rounded-sm ">
          {loading ? (
            <div className="h-full w-full p-6 flex justify-center items-center">
              <Spinner />
            </div>
          ) : searchCols && searchCols.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 py-4 px-2">
              {searchCols.map((col) => (
                <SearchResultColumn key={col.id} searchResult={col} />
              ))}
              <Link
                href={`/search?query=${query}`}
                className="flex gap-2 justify-center items-center"
              >
                <FaArrowDown size={12} />
                <p className="text-xs">More Result</p>
              </Link>
            </div>
          ) : (
            <div className="h-full min-w-[200px] p-6 flex justify-center items-center">
              <NoNote />
            </div>
          )}
        </div>
      )}
    </>
  );
}
