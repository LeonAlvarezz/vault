import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
type Props = {
  href: string;
  className?: string;
  label: string;
  disabled?: boolean;
};
export default function LinkButton({
  href,
  className,
  label,
  disabled = false,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "bg-main flex justify-center items-center px-4 rounded-sm w-full h-10 hover:bg-main/70 transition-all flex-shrink-0",
        disabled && "pointer-events-none bg-main/70",
        className
      )}
    >
      <p className="text-sm">{label}</p>
    </Link>
  );
}
