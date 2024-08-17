import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Button } from "../button";
import { Input } from "../input";
import { IoCopy } from "react-icons/io5";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { Separator } from "../separator";

interface ShareModalProps {
  children: React.ReactNode;
}

export default function ShareModal({ children }: ShareModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] py-10">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Share note to better boost your note visibility or send it to
            friends
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p>Share via link</p>
          <div className="flex">
            <Input
              variant={"outline"}
              className="w-full rounded-r-none"
              value={"https://www.vault.note.dev/john-doe"}
            />
            <Button
              variant={"icon"}
              size={"icon"}
              className="bg-main flex-shrink-0 rounded-l-none hover:bg-main/70"
            >
              <IoCopy />
            </Button>
          </div>
          <Separator className="bg-neutral-700 my-2" />
          <div className="flex flex-col gap-4">
            <p>Share via Social Media</p>
            <div className="flex gap-2">
              <Button
                variant={"icon"}
                size={"icon"}
                className="flex-shrink-0 rounded-full border-[#4267B2] border hover:bg-[#4267B2]/20"
              >
                <FaFacebookF color="#4267B2" size={16} />
              </Button>
              <Button
                variant={"icon"}
                size={"icon"}
                className="flex-shrink-0 rounded-full border-[#D427B9] border hover:bg-[#D427B9]/20"
              >
                <FaInstagram color="#D427B9" size={16} />
              </Button>
              <Button
                variant={"icon"}
                size={"icon"}
                className="flex-shrink-0 rounded-full border-[#1DA1F2] border hover:bg-[#1DA1F2]/20"
              >
                <FaTwitter color="#1DA1F2" size={16} />
              </Button>
              <Button
                variant={"icon"}
                size={"icon"}
                className="flex-shrink-0 rounded-full border-[#24A1DE] border hover:bg-[#24A1DE]/20"
              >
                <FaTelegramPlane color="#24A1DE" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
