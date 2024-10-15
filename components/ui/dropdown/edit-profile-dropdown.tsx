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
      <DropdownMenuContent className="w-32">
        <DropdownMenuItem>
          <Link href="/profile/edit" className="flex items-center">
            <MdModeEdit className="mr-2 h-4 w-4" />
            <p className="whitespace-nowrap">Edit Profile</p>
          </Link>
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
