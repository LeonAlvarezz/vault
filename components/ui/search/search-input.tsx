"use client";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "../button";
import { usePathname, useRouter } from "next/navigation";
import { constructSearchQuery, sanitizeSearchInput } from "@/utils/string";
import SearchResultColumn from "./search-result-column";
import { useDebouncedCallback } from "use-debounce";
import { SearchResultCol } from "@/types/search.type";
import { useToast } from "../use-toast";
import { searchNoteCol } from "@/data/client/search";
import NoNote from "../note-card/no-note";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaArrowDown } from "react-icons/fa";
import Link from "next/link";
import SearchResultContainer from "./search-result-container";
type Props = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchKey?: string;
};
export default function SearchInput({ onChange, searchKey = "public" }: Props) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const [focus, setFocus] = useState(false);
  const { toast } = useToast();
  const [searchCols, setSearchCols] = useState<SearchResultCol[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!query) return;
      const sanitizedQuery = sanitizeSearchInput(query);
      if (sanitizedQuery) {
        const encodedQuery = encodeURIComponent(sanitizedQuery);
        router.push(`${pathname}?query=${encodedQuery}`);
      }
    }
  };

  const debouncedGetSearchCol = useDebouncedCallback(async (query: string) => {
    if (!query) return;
    setSearchCols([]);
    const searchQuery = constructSearchQuery(query, "|");
    setSearchLoading(true);
    try {
      const { data, error } = await searchNoteCol(searchQuery);
      if (error) {
        toast({
          title: "Error Fetching Search Col!",
          description: error.message,
          variant: "destructive",
        });
      } else {
        if (data.length > 0) {
          setSearchCols(data);
          setEmpty(false);
        } else {
          setEmpty(true);
        }
      }
    } catch (error) {
      toast({
        title: "Unexpected Error!",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    } finally {
      setSearchLoading(false);
    }
  }, 1000);

  const getSearchResultCol = React.useCallback(
    (query: string) => {
      debouncedGetSearchCol(query);
    },
    [debouncedGetSearchCol]
  );

  const handleFocus = () => {
    setTimeout(() => {
      setFocus(true);
    }, 300);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    getSearchResultCol(value);

    if (value.length === 0) {
      setTimeout(() => {
        setSearchCols([]);
      }, 500);
    }
  };

  return (
    <div className="relative">
      <SearchResultContainer
        show={focus}
        loading={searchLoading}
        searchCols={searchCols}
        query={query}
      />
      {/* {focus && (
          <div className="w-full absolute top-12 h-fit bg-popover">
            {searchLoading ? (
              <div className="h-full w-full p-6 flex justify-center items-center">
                <AiOutlineLoading3Quarters
                  size={14}
                  className="animate-spin mr-2"
                />
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
      </div> */}

      <Input
        variant={"outline"}
        placeholder="Search by title or keyword..."
        onKeyDown={handleKeyDown}
        value={query}
        onFocus={handleFocus}
        onBlur={() => {
          setTimeout(() => {
            setFocus(false);
          }, 200);
        }}
        onChange={handleChange}
      />
      <kbd className="absolute top-1/2 right-14 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-popover px-1.5 font-mono text-[10px] font-medium text-neutral-300 opacity-100">
        <span className="text-xs">⌘</span>K
      </kbd>
      <Button
        variant={"icon"}
        size={"icon"}
        className="absolute top-1/2 -translate-y-1/2 right-2 hover:bg-neutral-700/50 rounded-full"
      >
        <IoSearch className="text-neutral-400" size={20} />
      </Button>
    </div>
  );
}
