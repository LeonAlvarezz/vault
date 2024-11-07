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
import { MdDelete } from "react-icons/md";
import { useToast } from "../use-toast";
import { cn } from "@/lib/utils";
import { Note } from "@/types/note.type";
import { deleteNote } from "@/action/note";
type Props = {
  className?: string;
  note?: Note;
};
export default function EditNoteDropdownMenu({ className, note }: Props) {
  const { toast } = useToast();
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (note) {
      const { error } = await deleteNote(note.id);
      if (error) {
        toast({
          title: "Error Deleting Note",
          description: error.message,
          variant: "destructive",
        });
      }
      toast({
        title: "Note Deleted",
        variant: "success",
      });
    }

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
      <DropdownMenuContent
        className="w-32"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <DropdownMenuItem className="p-0" onSelect={(e) => e.preventDefault()}>
          <Button
            onClick={handleDelete}
            variant={"icon"}
            size={"icon"}
            className="py-2 px-2 w-full flex items-center justify-start  font-normal text-red-400 h-fit hover:bg-neutral-700/50 "
            type="button"
          >
            <MdDelete className="mr-2 h-4 w-4  text-red-400" />
            <p className="whitespace-nowrap">Delete</p>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
