"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import { SlOptionsVertical } from "react-icons/sl";
import { MdPublish, MdModeEdit, MdSave } from "react-icons/md";
import ShareModal from "../modal/share-modal";
import { IoShareSocial } from "react-icons/io5";
type Props = {
  handleSave: (data: any) => Promise<void>;
  setOpenConfirmDialog: Dispatch<SetStateAction<boolean>>;
};
export default function CreateNoteDropdownMenu({
  handleSave,
  setOpenConfirmDialog,
}: Props) {
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
        <DropdownMenuItem
          className="p-2 flex items-center h-fit font-normal text-neutral-300"
          onClick={() => {
            setOpenConfirmDialog(true);
          }}
        >
          <MdPublish className="mr-2 h-4 w-4" />
          <p className="whitespace-nowrap">Publish</p>
        </DropdownMenuItem>
        <ShareModal>
          <DropdownMenuItem
            className="p-2 flex items-center h-fit font-normal text-neutral-300"
            onSelect={(e) => e.preventDefault()}
          >
            <IoShareSocial className="mr-2 h-4 w-4" />
            <p>Share</p>
          </DropdownMenuItem>
        </ShareModal>
        <DropdownMenuItem
          className="p-2 flex items-center h-fit font-normal text-neutral-300"
          onMouseDown={handleSave}
        >
          <MdSave className="mr-2 h-4 w-4" />
          <p className="whitespace-nowrap">Save</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
