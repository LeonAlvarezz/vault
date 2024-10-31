import LinkButton from "@/components/ui/button/link-button";
import React from "react";

export default function SecondCallToActionSection() {
  return (
    <section className="bg-red-500/10 min-h-fit section-center mb-40 relative">
      <div className="bg-neutral-500 size-72 rounded-full blur-3xl opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"></div>
      {/* <div className="bg-main size-72 rounded-full blur-3xl opacity-10 absolute -left-16 top-10 -z-10"></div> */}
      <div className="relative overflow-hidden bg-neutral-900 border border-neutral-700/50 animated-border-box -z-10">
        <div className=" flex flex-col  sm:flex-row p-10 justify-between w-full items-center ">
          <h1 className="text-3xl font-semibold">
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
  );
}
