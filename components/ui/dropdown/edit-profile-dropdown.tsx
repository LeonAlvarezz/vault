"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import { SlOptionsVertical } from "react-icons/sl";
import { Link } from "react-transition-progress/next";
import { MdModeEdit } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import ShareModal from "../modal/share-modal";
import { cn } from "@/lib/utils";

export default function EditProfileDropdownMenu() {
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
      <DropdownMenuContent className="w-30">
        <DropdownMenuItem className="p-0">
          <Link href="/profile/edit" className="flex items-center w-full">
            <div
              className={cn(
                "flex gap-2 items-center text-sm capitalize p-2 w-full rounded-sm hover:bg-neutral-700/50"
              )}
            >
              <MdModeEdit size={16} />
              <p className="text-sm">Edit Profile</p>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-0">
          <ShareModal>
            <div
              className={cn(
                "flex gap-2 items-center text-sm capitalize p-2 w-full rounded-sm hover:bg-neutral-700/50"
              )}
            >
              <IoShareSocial size={16} />
              <p>Share</p>
            </div>
          </ShareModal>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
