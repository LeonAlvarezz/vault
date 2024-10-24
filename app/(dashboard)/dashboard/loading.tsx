import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 ">Dashboard</h1>
      <div className="flex flex-col gap-2">
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Skeleton className="w-full h-40"></Skeleton>
          <Skeleton className="w-full h-40"></Skeleton>
          <Skeleton className="w-full h-40"></Skeleton>
        </div>
        <Skeleton className="w-full h-[350px]"></Skeleton>
        <Skeleton className="w-full h-[200px]"></Skeleton>
      </div>
    </div>
  );
}
