"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "../command";
import { RiGlobalLine } from "react-icons/ri";
import { Toggle } from "../toggle";
import { usePinch } from "@use-gesture/react";
import { constructSearchQuery } from "@/utils/string";
import { useDebouncedCallback } from "use-debounce";
import { useToast } from "../use-toast";
import { SearchResult } from "@/types/search.type";
import { commandSearch } from "@/data/client/search";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
import Spinner from "../spinner";
import { IoSparklesSharp } from "react-icons/io5";
import { useSettings } from "@/stores/setting";
import { getKeyboardValue } from "@/utils/json";
import { useRouter } from "next/navigation";
import { useProgress } from "react-transition-progress";
import { convertKeyNotation } from "@/utils/keyboard-shortcut";
import { cn } from "@/lib/utils";
import { useSubscription } from "@/stores/subscription";
import { FaCrown } from "react-icons/fa6";
import CommandSearchResult from "./command-search-result/command-search-result";
import { vectorSearch } from "@/action/search";

const constructShortcutCond = (keys: string) => {
  if (!keys || typeof keys !== "string") {
    throw new Error("Invalid keys string provided");
  }

  const keyArray = keys.split("+").map((key) => convertKeyNotation(key.trim()));

  return (e: KeyboardEvent) => {
    const pressedKeys = new Set<string>();

    if (e.ctrlKey) pressedKeys.add(convertKeyNotation("Ctrl"));
    if (e.altKey) pressedKeys.add(convertKeyNotation("Alt"));
    if (e.shiftKey) pressedKeys.add(convertKeyNotation("Shift"));
    if (e.metaKey) pressedKeys.add(convertKeyNotation("Meta"));

    if (e.key) {
      pressedKeys.add(convertKeyNotation(e.key.toUpperCase()));
    }

    return keyArray.every((key) => pressedKeys.has(key));
  };
};

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
  const router = useRouter();
  const startProgress = useProgress();
  const { disable_command_search, keyboard_shortcuts, isKeyRecording } =
    useSettings();
  const { isPremium } = useSubscription();

  //TODO: Rate Limit Vector Search
  //TODO: Navigate

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (disable_command_search) return;

      const shortcut = keyboard_shortcuts
        ? getKeyboardValue(keyboard_shortcuts).openCommandSearch
        : "⌘+K";

      const normalizedShortcut = shortcut
        .split("+")
        .map(convertKeyNotation)
        .join("+");

      const isShortcutPressed = constructShortcutCond(normalizedShortcut)(e);

      if (isShortcutPressed && !isKeyRecording) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [disable_command_search, keyboard_shortcuts, isKeyRecording]);

  usePinch(
    ({ direction: [d], event, cancel }) => {
      if (disable_command_search) return;
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
  }, 1000);

  const getSearchResult = React.useCallback(
    (query: string) => {
      console.log("query:", query);
      debouncedGetSearch(query);
    },
    [debouncedGetSearch]
  );

  const handleInputChange = (search: string) => {
    setQuery(search);
    getSearchResult(search);
  };

  return (
    // <div {...bind()}>]
    // </div>
    <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
      {/* {searchLoading && <CommandLoading />} */}
      <CommandInput
        placeholder="Type a command or search..."
        onValueChange={handleInputChange}
      >
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="size-[24px]" asChild>
                <div className="relative">
                  <Toggle
                    aria-label="Toggle AI"
                    pressed={isVectorSearch}
                    disabled={!isPremium}
                    onPressedChange={handleVectorToggle}
                    className={cn(
                      "w-6 h-6 p-1 group hover:bg-neutral-600",
                      isVectorSearch && "bg-neutral-700/50"
                    )}
                  >
                    <IoSparklesSharp />
                  </Toggle>
                  {!isPremium && (
                    <div className="absolute -top-1 left-3 w-4 h-4 p-[3px] bg-neutral-950/70 flex justify-center items-center rounded-sm">
                      <FaCrown className="text-yellow-400" />
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side={"bottom"}>
                <p className="capitalize">AI Search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="size-[24px]" asChild>
                <Toggle
                  aria-label="Toggle global"
                  pressed={isGlobal}
                  onPressedChange={handlePressedChange}
                  className={cn(
                    "w-6 h-6 p-1 group hover:bg-neutral-600",
                    isGlobal && "bg-neutral-700/50"
                  )}
                >
                  <RiGlobalLine className="text-neutral-400" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent side={"bottom"}>
                <p className="capitalize">Global Search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CommandInput>
      <CommandList>
        {empty ||
          (searchResult.length == 0 && !searchLoading && (
            <div className="h-full w-full flex justify-center items-center min-h-[143px]">
              <CommandEmpty>No results found.</CommandEmpty>
            </div>
          ))}
        {searchLoading && (
          <div className="w-full min-h-[350px] flex justify-center items-center">
            <Spinner size={20} />
          </div>
        )}
        <CommandSearchResult
          isGlobal={isGlobal}
          isVector={isVectorSearch}
          searchResult={searchResult}
          setOpen={setOpen}
        />
        {/* {isGlobal || isVectorSearch ? (
          <>
            {searchResult.length > 0 && (
              <CommandGroup heading="Global">
                {searchResult.map((result, index) => (
                  <GlobalCommandSearchResult
                    key={result.id}
                    searchResult={result}
                    onSelect={() => {
                      setOpen(false);
                      startTransition(async () => {
                        startProgress();

                        const url = result.published_at
                          ? `/note/${result.id}`
                          : `/create/${result.id}`;
                        router.push(url);
                      });
                    }}
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
                    onSelect={() => {
                      setOpen(false);
                      startTransition(async () => {
                        startProgress();
                        router.push(`/create/${result.id}`);
                      });
                    }}
                    isLast={index === searchResult.length - 1}
                  />
                ))}
              </CommandGroup>
            )}
          </>
        )} */}
        <div className="py-2 flex">
          <p className="text-xs text-neutral-400 pr-4 pl-2 flex justify-center items-center w-full">
            Toggle on{" "}
            <span className="mx-1 bg-neutral-700/50 p-0.5 rounded-sm">
              <RiGlobalLine size={14} />
            </span>
            or{" "}
            <span className="mx-1 bg-neutral-700/50 p-0.5 rounded-sm">
              <IoSparklesSharp size={14} />
            </span>{" "}
            to search through note from the community
          </p>
        </div>
      </CommandList>
    </CommandDialog>
  );
}
