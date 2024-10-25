import React, { Suspense } from "react";
import HeroSection from "./_section/hero-section";
import FeatureItem from "./_component/feature-item";
import { cn } from "@/lib/utils";
import Render from "@/components/tiptap/Render";
import PreviewTextFormat from "./_component/preview-text-format";
import PreviewCategorization from "./_component/preview-categorization";
import PreviewSearch from "./_component/preview-search";
import LinkButton from "@/components/ui/button/link-button";
import PreviewExplore from "./_component/preview-explore";
import FeatureSection from "./_section/feature-section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NoteHighlightCarousel from "@/components/ui/carousel/note-highlight-carousel";
import { getHighlightNote, getUserPublishedNotes } from "@/data/server/note";
import NoteHighlightSection from "./_section/note-highlight-section";

export default async function page() {
  const { data: notes } = await getHighlightNote();
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-main size-72 rounded-full blur-3xl opacity-10 absolute -right-10 bottom-0 -z-10"></div>
      <div className="bg-main size-72 rounded-full blur-3xl opacity-10 absolute -left-16 top-10 -z-10"></div>
      <HeroSection />
      <FeatureSection />
      <div className="bg-main size-72 rounded-full blur-3xl opacity-10 absolute -right-10 bottom-0 -z-10"></div>
      <div className="bg-main size-72 rounded-full blur-3xl opacity-10 absolute -left-16 top-10 -z-10"></div>
      <NoteHighlightSection notes={notes} />
      <section className="w-full mb-52">
        <div className="relative overflow-hidden bg-neutral-900 border border-neutral-700/50 animated-border-box -z-10">
          <div className=" flex flex-col  sm:flex-row p-10 justify-between w-full items-center ">
            <h1 className="text-3xl font-bold">
              Capture Insights Today, Empower Tomorrow
            </h1>
            <div className="flex gap-4 w-full mt-4 sm:mt-0 justify-start sm:justify-end">
              <LinkButton
                href="/dashboard"
                label="Get Started Now"
                className="text-nowrap w-fit"
              ></LinkButton>
              <LinkButton
                href="/pricing"
                label="See Pricing"
                className="bg-transparent border border-neutral-700 w-fit text-nowrap hover:bg-transparent hover:border-neutral-700/50"
              ></LinkButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
