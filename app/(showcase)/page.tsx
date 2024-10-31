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
import SecondCallToActionSection from "./_section/second-call-to-action-section";

export default async function page() {
  const { data: notes } = await getHighlightNote();
  return (
    <div className="flex flex-col gap-4 relative">
      <HeroSection />
      <FeatureSection />

      <NoteHighlightSection notes={notes} />
      <SecondCallToActionSection />
    </div>
  );
}
