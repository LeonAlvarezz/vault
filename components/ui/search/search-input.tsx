"use client";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "../button";
import { usePathname, useRouter } from "next/navigation";
import { sanitizeSearchInput } from "@/utils/string";
type Props = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function SearchInput({ onChange }: Props) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
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
  return (
    <div className="relative">
      <Input
        variant={"outline"}
        placeholder="Search by title or keyword..."
        onKeyDown={handleKeyDown}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <kbd className="absolute top-1/2 right-14 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-popover px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
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
