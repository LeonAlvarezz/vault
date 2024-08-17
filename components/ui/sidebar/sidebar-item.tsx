"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import { Separator } from "../separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
    <Link href={link || "/"}>
      <div
        className={cn(
          "flex justify-center p-2 m-auto w-fit  hover:bg-neutral-800 rounded-sm my-4",
          id && pathname === `/${id}` && "bg-neutral-700/50"
        )}
      >
        <div className="w-full flex justify-center ">{icon}</div>
      </div>
    </Link>
  );
}
