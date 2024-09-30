import React from "react";
import { Skeleton } from "../skeleton";

export default function NoteSkeleton() {
  return (
    <div className="columns-1 sm:columns-2 2xl:columns-3 gap-2 space-y-2 my-6">
      <Skeleton className="w-auto h-[300px]" />
      <Skeleton className="w-auto h-[300px]" />
      <Skeleton className="w-auto h-[300px]" />
      <Skeleton className="w-auto h-[300px]" />
      <Skeleton className="w-auto h-[300px]" />
      <Skeleton className="w-auto h-[300px]" />
    </div>
  );
}
