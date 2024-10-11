"use client";
import { Link } from "react-transition-progress/next";
import React, { ReactNode } from "react";
import { Separator } from "../separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

type SidebarProps = {
  id?: string;
  icon?: ReactNode;
  link?: string;
  separator?: boolean;
};

export default function SidebarItem({
  id,
  icon,
  link,
  separator,
}: SidebarProps) {
  const pathname = usePathname();
  if (separator) {
    return <Separator className="bg-neutral-700 my-3" />;
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex justify-center w-full my-4">
          <Link href={link || "/"}>
            <div
              className={cn(
                "p-2 m-auto w-fit rounded-sm hover:bg-neutral-800 ",
                id && pathname === `/${id}` && "bg-neutral-700/50"
              )}
            >
              <div className="w-full flex justify-center ">{icon}</div>
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p className="capitalize">{id}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
