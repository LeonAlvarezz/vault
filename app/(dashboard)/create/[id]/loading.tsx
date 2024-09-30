import BackButton from "@/components/ui/button/back-button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingCreateNote() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <BackButton />
      </div>
      <div className="flex gap-2 flex-col">
        <Skeleton className="w-32 h-10 mb-4" />
        <Skeleton className="w-full h-10 rounded-md" />
        <Skeleton className="w-full h-10 rounded-md" />

        <Separator className="my-6" />
        <Skeleton className="w-full h-[300px] rounded-md" />
      </div>
    </div>
  );
}
