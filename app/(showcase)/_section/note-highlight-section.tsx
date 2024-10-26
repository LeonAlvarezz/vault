import LinkButton from "@/components/ui/button/link-button";
import NoteHighlightCarousel from "@/components/ui/carousel/note-highlight-carousel";
import Spinner from "@/components/ui/spinner";
import { Note } from "@/types/note.type";
import React, { Suspense } from "react";
import GridPattern from "../_component/grid-pattern";
type Props = {
  notes: Note[] | null;
};
export default function NoteHighlightSection({ notes }: Props) {
  return (
    <section className="min-h-svh relative items-center justify-center flex flex-col section-center overflow-hidden">
      <h1 className="text-start bg-gradient-to-r text-3xl font-bold from-fuchsia-100 via-blue-200 to-indigo-300 inline-block text-transparent bg-clip-text mb-6">
        Note Highlight
      </h1>
      <div className="bg-neutral-800 opacity-50 size-[500px] rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 -z-30"></div>
      <GridPattern />
      <Suspense fallback={<Spinner></Spinner>}>
        <NoteHighlightCarousel notes={notes} />
      </Suspense>
      <div className="flex justify-center w-full">
        <LinkButton
          label="Explore More"
          href="/explore"
          className="mt-10 w-fit"
        />
      </div>
    </section>
  );
}
