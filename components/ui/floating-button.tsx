import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { ICON_COLOR, ICON_SIZE } from "./sidebar/sidebar";
import { cn } from "@/lib/utils";
type Props = {
  className?: string;
};
export default function FloatingButton({ className }: Props) {
  return (
    <Link
      href={"/create"}
      className={cn(`p-4 rounded-full bg-main hover:bg-main/80`, className)}
    >
      <FaPlus color={ICON_COLOR} size={ICON_SIZE} />
    </Link>
  );
}
