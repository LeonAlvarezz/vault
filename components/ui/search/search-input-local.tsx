"use client";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "../button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
};
export default function SearchInputLocal({ onChange }: Props) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const [focus, setFocus] = useState(false);
  const { toast } = useToast();
  const [searchCols, setSearchCols] = useState<SearchResultCol[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchParams = useSearchParams();
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    navigateToTags(value);

    if (value.length === 0) {
      setTimeout(() => {
        setSearchCols([]);
      }, 300);
    }
  };
  const debouncedNavigate = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(query);

    params.set("query", query);

    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  }, 300);

  const navigateToTags = React.useCallback(
    (query: string) => {
      debouncedNavigate(query);
    },
    [debouncedNavigate]
  );

  return (
    <div className="relative">
      <Input
        variant={"outline"}
        placeholder="Search by title or keyword..."
        onKeyDown={handleKeyDown}
        value={query}
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
