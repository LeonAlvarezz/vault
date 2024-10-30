"use client";
import React, { ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { Button } from "../button";
import { FaCheck } from "react-icons/fa6";
import { Separator } from "../separator";
import { FREE_TIER, PREMIUM_TIER } from "@/constant/pricing";
import Sparkle from "../animation/sparkle";
type Props = {
  children: ReactNode;
};
export default function PricingDrawer({ children }: Props) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-14">
          <DrawerTitle>Subscription Plan</DrawerTitle>
          <DrawerDescription>
            Use Vault for free with note taking feature from the get go. Upgrade
            to premium version to enjoy more media support, unlimited tag and
            faster support
          </DrawerDescription>
        </DrawerHeader>
        {/* <h2 className="text-lg">Subscription Plan</h2>
          <p className="text-xs text-neutral-500">
            Use Vault for free with note taking feature from the get go. Upgrade
            to premium version to enjoy more media support, unlimited tag and
            faster support
          </p> */}
        <div className="grid grid-cols-2 gap-4 px-14 py-2 mb-6">
          <div className="w-full flex flex-col justify-between min-h-[400px] border border-neutral-700/50 p-10 rounded-sm">
            <div>
              <h2 className="text-xl font-bold">Free</h2>
              <p className="text-xs text-neutral-500 mt-2">
                Ideal for personal use or exploring Vault’s essential features.
              </p>
              <p className="font-mono text-center text-4xl my-4">
                $0
                <span className="text-sm text-neutral-500">/month</span>
              </p>
              <Separator className="my-8" />
              <ul className="flex gap-2 flex-col mb-4">
                {FREE_TIER.map((tier, index) => (
                  <li
                    className="grid grid-cols-8 place-items-center gap-4"
                    key={index}
                  >
                    <FaCheck className="text-green-500 basis-[10%]" />
                    <p className="text-xs col-span-7 w-full">{tier.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <Button disabled variant="outline" className="w-full">
              Current Plan
            </Button>
          </div>
          <div className="w-full flex flex-col justify-between min-h-[400px] border-rainbow p-10 rounded-sm relative">
            <div>
              <h2 className="text-xl font-bold">Premium</h2>
              <p className="text-xs text-neutral-500 mt-2">
                Ideal for personal use or exploring Vault’s essential features.
              </p>
              <p className="font-mono text-center text-4xl my-4">
                $1.99
                <span className="text-sm text-neutral-500">/month</span>
              </p>
              <Separator className="my-8" />
              <ul className="flex gap-2 flex-col mb-4">
                {PREMIUM_TIER.map((tier, index) => (
                  <li
                    className="grid grid-cols-8 place-items-center gap-4"
                    key={index}
                  >
                    <FaCheck className="text-green-500 basis-[10%]" />
                    <p className="text-xs col-span-7 w-full">{tier.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="main" className="w-full">
              Upgrade
            </Button>
            <Sparkle />
          </div>
        </div>
        {/* <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}
