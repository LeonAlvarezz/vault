import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";
import { RiMenu3Fill } from "react-icons/ri";

import { Button } from "../button";
import Link from "next/link";
import LinkButton from "../button/link-button";

export default function HamburgerMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"icon"} size={"icon"} className="size-5">
          <RiMenu3Fill />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-transparent backdrop-blur-md">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6">
          <Link href="/" className="text-xl hover:text-second font-semibold">
            Home
          </Link>
          <Link href="/pricing" className="text-xl hover:text-second font-bold">
            Pricing
          </Link>
          <LinkButton
            href="/pricing"
            label="Go to Dashboard"
            className="text-xl hover:text-second font-bold"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
