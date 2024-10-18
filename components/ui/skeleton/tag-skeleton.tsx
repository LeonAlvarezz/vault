import React from "react";
import { CommandItem } from "../command";
import { Skeleton } from "../skeleton";

export default function TagSkeleton() {
  return (
    <>
      {Array.from({ length: 7 }).map((item, index) => (
        <CommandItem key={index}>
          <Skeleton className="w-[90%] h-6" />
        </CommandItem>
      ))}
    </>
  );
}
