"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import React from "react";

export default function NavbarItem() {
  const pathname = usePathname();
  return (
    <div className="flex gap-10">
      <Link
        href="/"
        className={cn(
          "text-sm hover:text-second",
          pathname === "/" && "text-main  hover:text-main"
        )}
      >
        Home
      </Link>
      <Link
        href="/pricing"
        className={cn(
          "text-sm hover:text-second",
          pathname === "/pricing" && "text-main hover:text-main"
        )}
      >
        Pricing
      </Link>
    </div>
  );
}
