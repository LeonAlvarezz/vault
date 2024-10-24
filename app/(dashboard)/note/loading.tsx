import { Skeleton } from "@/components/ui/skeleton";
import NoteSkeleton from "@/components/ui/skeleton/note-skeleton";
import React from "react";

export default function loading() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-10 w-full" />
      <div className="flex gap-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-[100px] rounded-full" />
        ))}
      </div>

      <div className="flex gap-2">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-48" />
      </div>
      <NoteSkeleton />
    </div>
  );
}
