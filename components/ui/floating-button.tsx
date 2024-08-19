import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { ICON_COLOR, ICON_SIZE } from "./sidebar/sidebar";
import { cn } from "@/lib/utils";
type Props = {
  className?: string;
  children: React.ReactNode;
};
export default function FloatingButton({ className, children }: Props) {
  return (
    <div
      className={cn(
        `fixed bottom-16 sm:bottom-4 p-1 right-5 xl:right-72 rounded-full bg-main hover:bg-main/80`,
        className
      )}
    >
      {children}
    </div>
  );
}
