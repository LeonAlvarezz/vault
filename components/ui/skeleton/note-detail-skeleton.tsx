import React from "react";
import { Skeleton } from "../skeleton";
import BackButton from "../button/back-button";
import { Button } from "../button";
import { FaPen } from "react-icons/fa";

export default function NoteDetailSkeleton() {
  return (
    <div className="flex gap-2 flex-col">
      <div className="flex justify-between items-center">
        <BackButton />
      </div>
      <Skeleton className="w-[300px] h-[30px]" />
      <Skeleton className="w-[100px] h-[20px]" />
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex gap-1 flex-col">
            <Skeleton className="w-[80px] h-[20px]" />
            <Skeleton className="w-[50px] h-[20px]" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="size-10 rounded-full"></Skeleton>
          <Skeleton className="size-10 rounded-full"></Skeleton>
          <Skeleton className="size-10 rounded-full"></Skeleton>
        </div>
      </div>
      <Skeleton className="h-[500px] w-full mt-10"></Skeleton>
    </div>
  );
}
