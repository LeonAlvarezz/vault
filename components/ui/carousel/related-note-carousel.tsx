import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";
import NoteCard from "../note-card/note-card";

export default function RelatedNoteCarousel() {
  return (
    <section className="mt-20 w-full">
      <h2 className="font-bold text-xl mb-5 ">Related Note</h2>
      <Carousel className="w-full relative">
        <CarouselContent className="-ml-2 ">
          {Array.from({ length: 20 }).map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:basis-1/2 2xl:basis-1/3"
            >
              <NoteCard published />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute h-full w-[100px] from-neutral-900/80 top-0 left-0 bg-gradient-to-r pointer-events-none"></div>
        <div className="absolute h-full w-[100px] from-neutral-900/80 top-0 right-0 bg-gradient-to-l pointer-events-none"></div>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </section>
  );
}
