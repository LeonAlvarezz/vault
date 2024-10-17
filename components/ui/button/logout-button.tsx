"use client";
import React, { startTransition } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
import { signout } from "@/app/api/action";
import { cn } from "@/lib/utils";
import { IoLogOut } from "react-icons/io5";
import { Button } from "../button";
import { ICON_COLOR, ICON_SIZE } from "../sidebar/sidebar";
import { useProgress } from "react-transition-progress";

export default function LogoutButton() {
  const startProgress = useProgress();
  const handleSignout = () => {
    startTransition(async () => {
      startProgress();
      signout();
    });
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <form>
            <Button variant={"icon"} size={"icon"} formAction={handleSignout}>
              <div
                className={cn(
                  "flex justify-center p-2 m-auto w-fit  hover:bg-neutral-700/50 rounded-sm my-4"
                )}
              >
                <IoLogOut color={ICON_COLOR} size={ICON_SIZE} />
              </div>
            </Button>
          </form>
        </TooltipTrigger>
        <TooltipContent>
          <p className="capitalize text-[#FF8080]">Logout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
