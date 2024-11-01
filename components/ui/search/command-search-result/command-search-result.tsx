import React, { startTransition } from "react";
import { CommandGroup } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import GlobalCommandSearchResult from "./global-command-search-result";
import AICommandSearchResult from "./ai-command-search-result";
import LocalCommandSearchResult from "./local-command-search-result";
import { SearchResult } from "@/types/search.type";
import { useProgress } from "react-transition-progress";

type Props = {
  isGlobal: boolean;
  isVector: boolean;
  searchResult: SearchResult[];
  setOpen: (open: boolean) => void;
};

export default function CommandSearchResult({
  isGlobal,
  isVector,
  searchResult,
  setOpen,
}: Props) {
  const router = useRouter();
  const startProgress = useProgress();

  if (searchResult.length === 0) {
    return null;
  }

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    startTransition(async () => {
      startProgress();
      const url = result.published_at
        ? `/note/${result.id}`
        : `/create/${result.id}`;
      router.push(url);
    });
  };

  switch (true) {
    case isGlobal:
      console.log("Hello");
      return (
        <CommandGroup heading="Global">
          {searchResult.map((result, index) => (
            <GlobalCommandSearchResult
              key={result.id}
              searchResult={result}
              onSelect={() => handleSelect(result)}
              isLast={index === searchResult.length - 1}
            />
          ))}
        </CommandGroup>
      );

    case isVector:
      return (
        <CommandGroup heading="AI Results">
          {searchResult.map((result, index) => (
            <AICommandSearchResult
              key={result.id}
              searchResult={result}
              onSelect={() => handleSelect(result)}
              isLast={index === searchResult.length - 1}
            />
          ))}
        </CommandGroup>
      );

    default:
      return (
        <CommandGroup heading="Result">
          {searchResult.map((result, index) => (
            <LocalCommandSearchResult
              key={result.id}
              searchResult={result}
              onSelect={() => handleSelect(result)}
              isLast={index === searchResult.length - 1}
            />
          ))}
        </CommandGroup>
      );
  }
}
