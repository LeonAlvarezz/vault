"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import { SlOptionsVertical } from "react-icons/sl";
import { MdPublish, MdModeEdit } from "react-icons/md";
import ShareModal from "../modal/share-modal";
import { IoShareSocial } from "react-icons/io5";

export default function CreateNoteDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"icon"}
          size={"icon"}
          className="rounded-full hover:bg-neutral-700/50 relative left-4 focus-visible:ring-offset-0"
        >
          <SlOptionsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuItem>
          <Button
            variant={"icon"}
            className="p-0 flex items-center h-fit font-normal text-neutral-300"
          >
            <MdPublish className="mr-2 h-4 w-4" />
            <p className="whitespace-nowrap">Publish</p>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <ShareModal>
            <div className="flex">
              <IoShareSocial className="mr-2 h-4 w-4" />
              <p>Share</p>
            </div>
          </ShareModal>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
