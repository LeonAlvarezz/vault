import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";
import NoteCardPublished from "../note-card/note-card-published";
import { Note } from "@/types/note.type";
type Props = {
  notes: Note[] | null;
};
export default function NoteHighlightCarousel({ notes }: Props) {
  return (
    <Carousel className="w-[80%] lg:w-full relative h-fit">
      <CarouselContent className="-ml-2 ">
        {notes?.map((note, index) => (
          <CarouselItem key={index} className="pl-2 md:basis-1/2 2xl:basis-1/3">
            <NoteCardPublished
              className="h-[350px]"
              note={note}
              noInteraction
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute h-full w-[100px] from-neutral-900/60 top-0 left-0 bg-gradient-to-r"></div>
      <div className="absolute h-full w-[100px] from-neutral-900/60 top-0 right-0 bg-gradient-to-l"></div>
      <CarouselNext className="sm:flex absolute right-2" />
      <CarouselPrevious className="sm:flex absolute left-2" />
    </Carousel>
  );
}
