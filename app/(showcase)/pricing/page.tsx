import { Button } from "@/components/ui/button";
import LinkButton from "@/components/ui/button/link-button";
import { Separator } from "@/components/ui/separator";
import { FREE_TIER, PREMIUM_TIER } from "@/constant/pricing";
import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa6";
export default function PricingPage() {
  return (
    <section className="my-10">
      <h1 className="text-3xl font-bold text-center mt-20">Pricing & Plan</h1>
      <p className="mt-2 text-xs text-neutral-400 text-center w-3/4 m-auto">
        Use Vault for free with note taking feature from the get go. Upgrade to
        premium version to enjoy more media support, unlimited tag and faster
        support
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <div className="w-full xl:min-w-[300px] lg:h-fit lg:min-h-[400px] border border-neutral-700 rounded-sm p-4 flex flex-col justify-between">
          <div className="h-full">
            <h2 className="text-xl font-bold">Free</h2>
            <p className="text-xs text-neutral-500 mt-2">
              Ideal for personal use or exploring Vault’s essential features.
            </p>
            <p className="font-mono text-center text-4xl my-4">
              $0
              <span className="text-sm text-neutral-500">/month</span>
            </p>
            <Separator className="my-8" />
            <ul className="flex gap-2 flex-col mb-4">
              {FREE_TIER.map((tier, index) => (
                <li
                  className="grid grid-cols-8 place-items-center gap-4"
                  key={index}
                >
                  <FaCheck className="text-green-500 basis-[10%]" />
                  <p className="text-xs col-span-7 w-full">{tier.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <LinkButton href="/dashboard" label="Start for Free" />
        </div>
        <div className="w-full xl:min-w-[300px] h-full lg:h-fit lg:min-h-[400px] border border-neutral-700 rounded-sm p-4 flex flex-col justify-between">
          <div className="h-full">
            <h2 className="text-xl font-bold">Premium</h2>
            <p className="text-xs text-neutral-500 mt-2">
              Ideal for personal use or exploring Vault’s essential features.
            </p>
            <p className="font-mono text-center text-4xl my-4">
              $1.99
              <span className="text-sm text-neutral-500">/month</span>
            </p>
            <Separator className="my-8" />
            <ul className="flex gap-2 flex-col mb-4">
              {PREMIUM_TIER.map((tier, index) => (
                <li
                  className="grid grid-cols-8 place-items-center gap-4"
                  key={index}
                >
                  <FaCheck className="text-green-500 basis-[10%]" />
                  <p className="text-xs col-span-7 w-full">{tier.text}</p>
                </li>
              ))}
            </ul>
          </div>
          {/* TODO Change to use real payment link */}
          <LinkButton href="/dashboard" label="Upgrade Now" />
        </div>
      </div>
    </section>
  );
}
