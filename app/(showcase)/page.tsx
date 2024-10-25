import React from "react";
import HeroSection from "./_section/hero-section";
import FeatureItem from "./_component/feature-item";
import { cn } from "@/lib/utils";
import Render from "@/components/tiptap/Render";
import PreviewTextFormat from "./_component/preview-text-format";
import PreviewCategorization from "./_component/preview-categorization";
import PreviewSearch from "./_component/preview-search";
import LinkButton from "@/components/ui/button/link-button";
import PreviewExplore from "./_component/preview-explore";

export default async function page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-main size-52 rounded-full blur-3xl opacity-20 absolute -right-10 bottom-0 -z-10"></div>
      <div className="bg-main size-52 rounded-full blur-3xl opacity-20 absolute -left-10 top-10 -z-10"></div>
      <HeroSection />
      <section style={{ minHeight: "calc(100svh - 56px)" }}>
        <h1 className="bg-gradient-to-r text-3xl font-bold from-fuchsia-100 via-blue-200 to-indigo-300 inline-block text-transparent bg-clip-text">
          Feature Rich
        </h1>
        <div className="grid grid-cols-3 grid-rows-2 gap-3 mt-10">
          <div
            className={cn(
              "bg-neutral-900 border border-neutral-700/50 p-6 rounded-sm overflow-hidden h-[350px]"
              // className
            )}
          >
            <h1 className="text-lg font-bold">Developer-Friendly Editor</h1>
            <p className="text-xs text-neutral-400">
              Quickly take notes, document solutions, and capture code snippets
              with ease.
            </p>
            <PreviewTextFormat />
          </div>
          <div
            className={cn(
              "bg-neutral-900 border border-neutral-700/50 p-6 rounded-sm overflow-hidden h-[350px]"
              // className
            )}
          >
            <h1 className="text-lg font-bold">Smart Organization</h1>
            <p className="text-xs text-neutral-400">
              Effortlessly organize notes with tagging, categorization
            </p>
            <PreviewCategorization />
          </div>
          <div
            className={cn(
              "bg-neutral-900 border border-neutral-700/50 p-6 rounded-sm overflow-hidden h-[350px]"
              // className
            )}
          >
            <h1 className="text-lg font-bold">Search Like Never Before</h1>
            <p className="text-xs text-neutral-400 mb-10">
              Search and find note via Full Text Search and Vector Search
            </p>
            <PreviewSearch />
          </div>
          <div
            className={cn(
              "bg-neutral-900 border border-neutral-700/50 p-6 rounded-sm overflow-hidden h-[300px] col-span-3 flex justify-between"
              // className
            )}
          >
            <div className="flex gap-2 flex-col justify-center">
              <h1 className="text-lg font-bold">
                Share & Browse Notes from The Community
              </h1>
              <p className="text-xs text-neutral-400">
                Share valuable notes with the community and discover insights
                from others.
              </p>
              <LinkButton
                label="Browse Now"
                href="/explore"
                className="w-fit mt-4"
              />
            </div>
            <PreviewExplore />
          </div>

          {/* <FeatureItem
            heading="Smart Organization"
            description="Effortlessly organize notes with tagging, categorization, and powerful semantic search."
          />
          <FeatureItem
            heading="Community Engagement"
            description="Share notes, learn from others, and build your presence within the developer community."
          />
          <FeatureItem
            heading="Developer-Friendly Editor"
            description="Quickly take notes, document solutions, and capture code snippets with ease."
          />
          <FeatureItem
            heading="Smart Organization"
            description="Effortlessly organize notes with tagging, categorization, and powerful semantic search."
          />
          <FeatureItem
            heading="Community Engagement"
            description="Share notes, learn from others, and build your presence within the developer community."
          /> */}
        </div>
      </section>
    </div>
  );
}
