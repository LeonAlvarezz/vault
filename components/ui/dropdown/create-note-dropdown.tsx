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
  handleSave: () => Promise<void>;
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
          className="p-0"
          onClick={() => {
            setOpenConfirmDialog(true);
          }}
        >
          <Button
            variant={"icon"}
            type="button"
            className="  p-2 w-full flex items-center justify-start h-full font-normal hover:bg-neutral-700/50 text-neutral-300"
          >
            <MdPublish className="mr-2 h-4 w-4" />
            <p className="whitespace-nowrap">Publish</p>
          </Button>
        </DropdownMenuItem>
        <ShareModal>
          <DropdownMenuItem
            className="p-0"
            onSelect={(e) => e.preventDefault()}
          >
            <Button
              variant={"icon"}
              type="button"
              className="  p-2 w-full flex items-center justify-start h-full font-normal hover:bg-neutral-700/50 text-neutral-300"
            >
              <IoShareSocial className="mr-2 h-4 w-4" />
              <p>Share</p>
            </Button>
          </DropdownMenuItem>
        </ShareModal>
        <DropdownMenuItem className="p-0">
          <Button
            variant={"icon"}
            type="button"
            className="py-2 px-2 w-full flex items-center justify-start h-full font-normal hover:bg-neutral-700/50 text-neutral-300"
            onMouseDown={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <MdSave className="mr-2 h-4 w-4" />
            <p className="whitespace-nowrap">Save</p>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
