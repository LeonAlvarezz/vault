import { env } from "@/utils/env";
import React from "react";
import LinkButton from "./link-button";
import { getCacheUser } from "@/data/server/profiles";
import { createClient } from "@/lib/supabase/server";

export default async function BuyButton() {
  const supabase = await createClient();
  const user = await getCacheUser(supabase);
  // Check auth
  // If not -> Redirect to login/signup with returnUrl
  const getPaymentLink = () => {
    if (!user) return `/auth/login?returnUrl=pricing`;
    return `${env.NEXT_PUBLIC_STRIPE_PREMIUM_TIER_PAYMENT_LINK}?client_reference_id=${user.id}`;
  };
  return <LinkButton href={getPaymentLink()} label="Upgrade Now" />;
}
