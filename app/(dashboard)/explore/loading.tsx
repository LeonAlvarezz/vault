import { Skeleton } from "@/components/ui/skeleton";
import NoteSkeleton from "@/components/ui/skeleton/note-skeleton";
import React from "react";

export default function loading() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold mb-4 ">Explore</h1>
      <Skeleton className="h-10 w-full" />
      <div className="flex justify-between">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
      <NoteSkeleton />
    </div>
  );
}
