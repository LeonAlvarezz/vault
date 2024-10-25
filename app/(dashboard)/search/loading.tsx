import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 ">Explore</h1>
      <Skeleton className="h-10 w-full" />
      <div className="flex flex-col gap-2 mt-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-full h-12"
            style={{ animationDelay: `${index * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
