"use client";
import { Button } from "@/components/ui/button";
import BuyButton from "@/components/ui/button/buy-button";
import PricingDrawer from "@/components/ui/drawer/pricing-drawer";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubscription } from "@/stores/subscription";
import { User } from "@supabase/supabase-js";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
type Props = {
  user: User | null;
};
export default function SettingSubscription({ user }: Props) {
  const { isPremium, isLoading } = useSubscription();
  console.log("isLoading:", isLoading);
  return (
    <div>
      <h1 className="text-2xl font-bold">Subscription</h1>
      <Separator className="bg-neutral-700 my-3" />
      <div className="flex gap-4 flex-col mt-8">
        <div className="flex gap-10">
          <div className="basis-1/2">
            <h3 className="text-sm">Subscription Plan</h3>
            <p className="text-xs text-neutral-500 leading-normal sm:leading-loose">
              Manage your subscription plan
            </p>
          </div>
          <div className="basis-1/2">
            <p className="text-sm">{`Plan that you're currently under:`}</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mt-2 mb-4" />
            ) : (
              <p className="capitalize text-2xl font-semibold text-second mt-2 mb-4">
                {isPremium ? `premium` : `free`}
              </p>
            )}

            <PricingDrawer user={user}>
              <Button variant="main">Upgrade Now</Button>
            </PricingDrawer>
          </div>
        </div>
      </div>
    </div>
  );
}
