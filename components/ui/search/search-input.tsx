"use client";
import React, { useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "../button";
import { usePathname, useRouter } from "next/navigation";
import {
  CreateSearch,
  SEARCH_SOURCE,
  SEARCH_TYPE,
  SearchResultCol,
} from "@/types/search.type";
import { useToast } from "../use-toast";
import { logSearch } from "@/data/client/search";
import { sanitizeSearchInput } from "@/utils/string";
type Props = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchKey?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
};
export default function SearchInput({
  onChange,
  searchKey = "public",
  searchParams,
}: Props) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!query) return;
      onSearch();
    }
  };

  const onSearch = async () => {
    const sanitizedQuery = sanitizeSearchInput(query);
    if (sanitizedQuery) {
      const encodedQuery = encodeURIComponent(sanitizedQuery);
      const payload: CreateSearch = {
        query: query,
        search_source: SEARCH_SOURCE.SEARCH_BAR,
        search_type: SEARCH_TYPE.NOTE,
      };
      const { error } = await logSearch(payload);
      if (error) {
        toast({
          title: "Error Inserting Search",
          description: error.message,
          variant: "destructive",
        });
      }
      router.push(`${pathname}?query=${encodedQuery}`);
    }
  };

  useEffect(() => {
    const query = searchParams?.query?.toString();
    const searchQuery = query?.replace(/_/g, " ");
    setQuery(searchQuery || "");
  }, [searchParams?.query]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log("value:", value);

    if (value.length === 0) {
      setTimeout(() => {
        router.push("/search");
      }, 100);
    }
    setQuery(value);
  };

  const onClear = () => {
    setQuery("");
    setTimeout(() => {
      router.push("/search");
    }, 100);
  };

  return (
    <div className="relative">
      <Input
        variant={"outline"}
        placeholder="Search by title or keyword..."
        onKeyDown={handleKeyDown}
        value={query}
        onChange={handleChange}
      />

      <div className="absolute top-1/2 -translate-y-1/2 right-2 w-fit flex gap-1 items-center">
        {query.length > 0 && (
          <Button
            variant={"icon"}
            size={"icon"}
            onClick={onClear}
            className="hover:bg-neutral-700/50 rounded-full size-8"
          >
            <IoClose className="text-neutral-400" size={16} />
          </Button>
        )}

        <Button
          variant={"icon"}
          size={"icon"}
          onClick={onSearch}
          className="hover:bg-neutral-700/50 rounded-full size-8"
        >
          <IoSearch className="text-neutral-400" size={16} />
        </Button>
      </div>
    </div>
  );
}
