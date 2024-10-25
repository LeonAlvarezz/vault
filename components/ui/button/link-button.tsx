import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
type Props = {
  href: string;
  className?: string;
  label: string;
};
export default function LinkButton({ href, className, label }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "bg-main flex justify-center items-center px-4 rounded-sm w-full h-10 hover:bg-main/70 transition-all",
        className
      )}
    >
      <p className="text-sm font-semibold">{label}</p>
    </Link>
  );
}
