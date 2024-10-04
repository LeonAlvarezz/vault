"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import { SlOptionsVertical } from "react-icons/sl";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { useToast } from "../use-toast";
import { cn } from "@/lib/utils";
type Props = {
  className?: string;
};
export default function EditNoteDropdownMenu({ className }: Props) {
  const { toast } = useToast();
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toast({
      title: "Note Deleted",
      variant: "success",
    });
    setOpen(false);
  };
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"icon"}
          size={"icon"}
          className={cn(
            "rounded-full size-7 flex-shrink-0 hover:bg-neutral-700/50 relative left-4 focus-visible:ring-offset-0",
            className
          )}
        >
          <SlOptionsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuItem className=" cursor-pointer group text-red-400 group-hover:text-red-500">
          <MdDelete className="mr-2 h-4 w-4  text-red-400" />
          <Button
            onClick={(e) => handleDelete(e)}
            variant={"icon"}
            size={"icon"}
            className="text-red-400 h-fit"
          >
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
