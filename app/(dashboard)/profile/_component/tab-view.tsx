// "use client";
import { cn } from "@/lib/utils";
import { Link } from "react-transition-progress/next";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React from "react";
import AboutTab from "../_feature/about-tab";
import NoteTab from "../_feature/note-tab";
type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};
export default function TabView({ searchParams }: Props) {
  const view = searchParams?.view;
  return (
    <>
      <div className="flex w-full">
        <Link
          className={cn(
            "pb-2 border-b-2 border-neutral-800 px-4",
            view === "note" && "border-main"
          )}
          href={`?view=note`}
        >
          Note
        </Link>
        <Link
          className={cn(
            "pb-2 border-b-2 border-neutral-800 px-4",
            view === "about" && "border-main"
          )}
          href={`?view=about`}
        >
          About
        </Link>
        <div className="w-full h-[34px] border-b-2 border-neutral-800"></div>
      </div>
      <section className="mt-4">
        {view === "about" ? <AboutTab /> : <NoteTab />}
      </section>
    </>
  );
}
