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
import Link from "next/link";
import { MdModeEdit } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
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
          <MdModeEdit className="mr-2 h-4 w-4" />
          <Link href="/profile/1/edit">Edit Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <ShareModal>
            <div className="flex">
              <FaShare className="mr-2 h-4 w-4" />
              <p>Share</p>
            </div>
          </ShareModal>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
