"use client";
import { Link } from "react-transition-progress/next";
import React, { ReactNode } from "react";
import { Separator } from "../separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type SidebarMobileProps = {
  id?: string;
  icon?: ReactNode;
  link?: string;
  separator?: boolean;
};

export default function SidebarItemMobile({
  id,
  icon,
  link,
  separator,
}: SidebarMobileProps) {
  const pathname = usePathname();
  if (separator) {
    return;
  }

  return (
    <Link href={link || "/"}>
      <div
        className={cn(
          "flex justify-center p-2 w-fit  hover:bg-neutral-800 rounded-sm",
          id && pathname === `/${id}` && "bg-neutral-700/50"
        )}
      >
        <div className="w-full flex justify-center ">{icon}</div>
      </div>
    </Link>
  );
}
