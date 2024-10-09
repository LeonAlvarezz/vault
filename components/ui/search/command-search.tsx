"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Button } from "../button";
import { RiGlobalLine } from "react-icons/ri";
import { Toggle } from "../toggle";
import { useGesture, usePinch } from "@use-gesture/react";
import { constructSearchQuery } from "@/utils/string";
import { useDebouncedCallback } from "use-debounce";
import { useToast } from "../use-toast";
import { SearchResult } from "@/types/search.type";
import { commandSearch } from "@/data/client/search";
import { Avatar, AvatarFallback } from "../avatar";
import GlobalCommandSearchResult from "./global-command-search-result";
import LocalCommandSearchResult from "./local-command-search-result";
import { Separator } from "../separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
import Link from "next/link";
import { CommandLoading } from "cmdk";
import Loading from "@/app/loading";
import Spinner from "../spinner";
import { IoSparklesSharp } from "react-icons/io5";
import { vectorSearch } from "@/app/api/action";

export default function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [isGlobal, setIsGlobal] = useState(false);
  const [isVectorSearch, setIsVectorSearch] = useState(false);
  const gestureRef = useRef<HTMLDivElement>(null);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState("");
  const [empty, setEmpty] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // useGesture(
  //   {
  //     onDrag: ({ touches, direction: [, dy], event }) => {
  //       if (touches === 2 && dy > 0) {
  //         event.preventDefault();
  //         setOpen(true);
  //       }
  //     },
  //   },
  //   {
  //     target: gestureRef,
  //     eventOptions: { passive: false },
  //   }
  // );
  // useGesture(
  //   {
  //     onPinch: ({ da: [d], origin: [ox, oy], event, first, active }) => {
  //       console.log("Pinch detected", { d, first, active });
  //       if (first && active) {
  //         const threshold = 200;
  //         if (d > threshold) {
  //           event.preventDefault();
  //           setOpen(true);
  //         }
  //       }
  //     },
  //   },
  //   {
  //     target: gestureRef,
  //     eventOptions: { passive: false },
  //   }
  // );

  usePinch(
    ({ direction: [d], event, cancel }) => {
      setOpen(true);
      cancel();
    },
    { target: typeof window !== "undefined" ? window : undefined }
  );

  const handlePressedChange = () => {
    if (isVectorSearch) {
      setIsVectorSearch(false);
    }
    setIsGlobal(!isGlobal);
    setSearchLoading(true);
    try {
      setSearchResult([]);
      getSearchResult(query);
    } catch (error) {
      toast({
        title: "Unexpected Error!",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    } finally {
      setSearchLoading(false);
    }
  };

  const handleVectorToggle = () => {
    if (isGlobal) {
      setIsGlobal(false);
    }
    setIsVectorSearch(!isVectorSearch);
    setSearchLoading(true);
    try {
      setSearchResult([]);
      getSearchResult(query);
    } catch (error) {
      toast({
        title: "Unexpected Error!",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    } finally {
      setSearchLoading(false);
    }
  };

  const fullTextSearch = async (query: string) => {
    const searchQuery = constructSearchQuery(query, "|");
    setSearchLoading(true);
    try {
      const { data, error } = await commandSearch(searchQuery, isGlobal);
      if (error) {
        toast({
          title: "Error Fetching Search Col!",
          description: error.message,
          variant: "destructive",
        });
      } else {
        if (data) {
          setSearchResult(data);
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
  };

  const AISearch = async (query: string) => {
    setSearchLoading(true);
    try {
      const { notes, error } = await vectorSearch(query.trim());
      if (error) {
        toast({
          title: "Error Fetching Search Col!",
          description: error.message,
          variant: "destructive",
        });
      } else {
        if (notes) {
          setSearchResult(notes);
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
  };

  const debouncedGetSearch = useDebouncedCallback(async (query: string) => {
    setSearchResult([]);
    if (!query) {
      setSearchResult([]);
      return;
    }
    if (isVectorSearch) {
      AISearch(query);
    } else {
      fullTextSearch(query);
    }
    // const searchQuery = constructSearchQuery(query, "|");
    // setSearchLoading(true);
    // try {
    //   const { data, error } = await commandSearch(searchQuery, isGlobal);
    //   if (error) {
    //     toast({
    //       title: "Error Fetching Search Col!",
    //       description: error.message,
    //       variant: "destructive",
    //     });
    //   } else {
    //     if (data) {
    //       setSearchResult(data);
    //       setEmpty(false);
    //     } else {
    //       setEmpty(true);
    //     }
    //   }
    // } catch (error) {
    //   toast({
    //     title: "Unexpected Error!",
    //     description: error instanceof Error ? error.message : String(error),
    //     variant: "destructive",
    //   });
    // } finally {
    //   setSearchLoading(false);
    // }
  }, 1000);

  const getSearchResult = React.useCallback(
    (query: string) => {
      debouncedGetSearch(query);
    },
    [debouncedGetSearch]
  );

  const handleInputChange = (search: string) => {
    setQuery(search);
    getSearchResult(query);
  };

  return (
    // <div {...bind()}>]
    <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
      {/* {searchLoading && <CommandLoading />} */}

      <CommandInput
        placeholder="Type a command or search..."
        onValueChange={handleInputChange}
      >
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="size-[24px]">
                <Toggle
                  aria-label="Toggle AI"
                  pressed={isVectorSearch}
                  onPressedChange={handleVectorToggle}
                  className="w-6 h-6 p-1 group hover:bg-neutral-600"
                >
                  <IoSparklesSharp className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block bg-clip-text" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent side={"bottom"}>
                <p className="capitalize">AI Search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="size-[24px]">
                <Toggle
                  aria-label="Toggle global"
                  pressed={isGlobal}
                  onPressedChange={handlePressedChange}
                  className="w-6 h-6 p-1 group hover:bg-neutral-600"
                >
                  <RiGlobalLine className="text-neutral-400" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent side={"bottom"}>
                <p className="capitalize">Global</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CommandInput>
      <CommandList>
        {searchLoading && (
          <div className="w-full min-h-[350px] flex justify-center items-center">
            <Spinner size={20} />
          </div>
        )}
        {isGlobal ? (
          <>
            {searchResult.length > 0 && (
              <CommandGroup heading="Global">
                {searchResult.map((result, index) => (
                  <GlobalCommandSearchResult
                    key={result.id}
                    searchResult={result}
                    onSelect={() => setOpen(false)}
                    isLast={index === searchResult.length - 1}
                  />
                ))}
              </CommandGroup>
            )}
          </>
        ) : (
          <>
            {searchResult.length > 0 && (
              <CommandGroup heading="Result">
                {searchResult.map((result, index) => (
                  <LocalCommandSearchResult
                    key={result.id}
                    searchResult={result}
                    onSelect={() => setOpen(false)}
                    isLast={index === searchResult.length - 1}
                  />
                ))}
              </CommandGroup>
            )}
          </>
        )}
      </CommandList>
      {empty ||
        (searchResult.length == 0 && !searchLoading && (
          <div className="h-full w-full flex justify-center items-center">
            <CommandEmpty>No results found.</CommandEmpty>
          </div>
        ))}
    </CommandDialog>
    // </div>
  );
}
