// "use client";
import { cn } from "@/lib/utils";
import { Link } from "react-transition-progress/next";
import React from "react";
import AboutTab from "../_feature/about-tab";
import NoteTab from "../_feature/note-tab";
import { Note } from "@/types/note.type";
import { Profile } from "@/types/profiles.type";
type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
  notes: Note[] | null;
  profile: Profile | null;
};
export default function TabView({ searchParams, notes, profile }: Props) {
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
        {view === "about" ? (
          <AboutTab profile={profile} />
        ) : (
          <NoteTab notes={notes} searchParams={searchParams} />
        )}
      </section>
    </>
  );
}
