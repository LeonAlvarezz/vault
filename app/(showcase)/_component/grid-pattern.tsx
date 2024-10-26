import { cn } from "@/lib/utils";
import React from "react";

export default function GridPattern() {
  return (
    <>
      <div className="bg-gradient-to-b from-app_background/30 to-app_background absolute top-0 left-0 w-full h-full -z-10"></div>
      <div className="size-[650px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 -z-20 bg-transparent grid grid-cols-10 grid-rows-10">
        {Array.from({ length: 100 }).map((_, index) => (
          <div
            className={cn(
              "border-l border-b border-neutral-800 border-dashed w-full h-full",
              index % 10 === 0 && "border-l-0 border-neutral-800"
            )}
            key={index}
          ></div>
        ))}
      </div>
    </>
  );
}
