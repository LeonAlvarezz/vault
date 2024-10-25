import { cn } from "@/lib/utils";
import React from "react";
import PreviewTextFormat from "../_component/preview-text-format";
import PreviewCategorization from "../_component/preview-categorization";
import PreviewSearch from "../_component/preview-search";
import LinkButton from "@/components/ui/button/link-button";
import PreviewExplore from "../_component/preview-explore";

export default function FeatureSection() {
  return (
    <section className="min-h-svh flex justify-center items-center flex-col sm:mt-4 mt-20">
      <h1 className="bg-gradient-to-r text-3xl font-bold from-fuchsia-100 via-blue-200 to-indigo-300 inline-block text-transparent bg-clip-text">
        Features
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-4 lg:grid-rows-2 gap-3 mt-10">
        <div
          className={cn(
            "bg-neutral-900 border w-full border-neutral-700/50 p-6 rounded-sm overflow-hidden h-[350px]"
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
            "bg-neutral-900 border border-neutral-700/50 p-6 rounded-sm overflow-hidden h-[300px] col-span-1 lg:col-span-3 flex justify-between lg:gap-0 gap-14 lg:flex-row flex-col"
          )}
        >
          <div className="flex gap-2 flex-col justify-center">
            <h1 className="text-lg font-bold">
              Share & Browse Notes from The Community
            </h1>
            <p className="text-xs text-neutral-400">
              Share valuable notes with the community and discover insights from
              others.
            </p>
            <LinkButton
              label="Browse Now"
              href="/explore"
              className="w-fit mt-4"
            />
          </div>
          <PreviewExplore />
        </div>
      </div>
    </section>
  );
}
