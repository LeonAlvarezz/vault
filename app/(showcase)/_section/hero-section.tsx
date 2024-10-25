import LinkButton from "@/components/ui/button/link-button";
import ImageContainer from "@/components/ui/image/image-container";
import SquigglyArrow from "@/public/image/squiggly-arrow.svg";

import React from "react";
import FeatureItem from "../_component/feature-item";
import SampleEditor from "../_feature/sample-editor";

export default function HeroSection() {
  return (
    <section style={{ minHeight: "calc(100svh - 50px)" }} className="relative ">
      <div className="w-[70%] text-center mx-auto pt-10 md:pt-20 flex items-center flex-col gap-4 ">
        <h1 className="text-4xl font-bold">
          Your All-in-One Developer Knowledge{" "}
          <span className="underline text-second">Vault</span>
        </h1>
        <p className="text-sm text-neutral-400">
          Effortlessly capture, organize, and share your knowledge with the
          community of developer.
        </p>
        <LinkButton
          label="Get Started Now"
          href="/dashboard"
          className="w-fit mt-2"
        />
      </div>
      <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-6 lg:grid-rows-2 gap-2 mt-10">
        <FeatureItem
          heading="Powerful Search"
          description="Search through your note faster and easier with Full Text Search and
              Vector Search"
          className="col-span-2"
        />
        <SampleEditor className="col-span-2 row-span-2 w-full order-first md:order-none" />
        <FeatureItem
          heading="Write Note with Ease"
          description="Search through your note faster and easier with Full Text Search and
              Vector Search"
          className="col-span-2"
        />
        <FeatureItem
          heading="Share with the community"
          description="Search through your note faster and easier with Full Text Search and
              Vector Search"
          className="col-span-2"
        />
        <FeatureItem
          heading="Discover knowledge"
          description="Search through your note faster and easier with Full Text Search and
              Vector Search"
          className="col-span-2"
        />
      </div>
      <div className="lg:flex hidden justify-end mt-4">
        <div className="flex gap-2 w-fit md:px-20 xl:px-32">
          <ImageContainer
            src={SquigglyArrow}
            alt="squiggly-arrow"
            className="h-12 flex-shrink-0"
          />
          <div className="w-full">
            <p className="text-nowrap">Powered by Tiptap</p>
          </div>
        </div>
      </div>
    </section>
  );
}
