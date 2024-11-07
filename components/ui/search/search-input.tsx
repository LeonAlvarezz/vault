"use client";
import React, { useEffect, useState, useTransition } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "../button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CreateSearch, SEARCH_SOURCE, SEARCH_TYPE } from "@/types/search.type";
import { useToast } from "../use-toast";
import { logSearch } from "@/data/client/search";
import { sanitizeSearchInput } from "@/utils/string";
import { User } from "@supabase/supabase-js";
import { useDebouncedCallback } from "use-debounce";
import { useProgress } from "react-transition-progress";
import KeyboardKey from "../keyboard-key/keyboard-key";
type Props = {
  user: User | null;
  debounce?: boolean;
};
export default function SearchInput({ debounce = false, user }: Props) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const startProgress = useProgress();
  const { toast } = useToast();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (debounce) {
      if (!query) return;
      debouceSearch();
      return;
    }
    if (event.key === "Enter") {
      if (!query) return;
      onSearch();
    }
  };
  const debouceSearch = useDebouncedCallback(async () => {
    onSearch();
  }, 500);

  const onSearch = async () => {
    const sanitizedQuery = sanitizeSearchInput(query);
    if (sanitizedQuery) {
      const encodedQuery = encodeURIComponent(sanitizedQuery);
      const payload: CreateSearch = {
        query: query, // Ensure consistency here
        search_source: SEARCH_SOURCE.SEARCH_BAR,
        search_type: SEARCH_TYPE.NOTE,
      };

      if (user?.id) {
        // Added user check
        const { error } = await logSearch(user.id, payload);
        if (error) {
          return toast({
            title: "Error Inserting Search",
            description: error.message,
            variant: "destructive",
          });
        }
      }
      const params = new URLSearchParams(searchParams);
      params.set("query", encodedQuery);
      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      React.startTransition(() => {
        startProgress();
        router.push(newUrl);
      });
    }
  };

  useEffect(() => {
    const query = searchParams?.get("query");
    const searchQuery = query?.replace(/_/g, " ");
    setQuery(searchQuery || "");
  }, [searchParams]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length === 0) {
      setTimeout(() => {
        router.push(pathname);
      }, 0);
    }
    setQuery(value);
  };

  const onClear = () => {
    setQuery("");
    setTimeout(() => {
      router.push(pathname);
    }, 0);
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
      <div className="absolute top-1/2 right-20 -translate-y-1/2 pointer-events-none hidden sm:inline-flex select-none items-center gap-1 rounded ">
        <KeyboardKey />
      </div>

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
