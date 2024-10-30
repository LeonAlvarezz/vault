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
    return `${env.STRIPE_PREMIUM_TIER_PAYMENT_LINK}?client_reference_id=${user.id}`;
  };
  return <LinkButton href={getPaymentLink()} label="Upgrade Now" />;
}

// "use client";
// import { updateSubscription } from "@/app/api/action";
// import { Button } from "../button";
// import { SUBCRIPTION_TIER } from "@/types/profiles.type";
// import { toast } from "../use-toast";
// export default function BuyButton() {
//   return (
//     <Button
//       variant="main"
//       className="bg-main flex justify-center items-center px-4 rounded-sm w-full h-10 hover:bg-main/70 transition-all"
//       onClick={async () => {
//         const { error } = await updateSubscription(
//           "38089de3-f7b5-49f3-bcc4-f23665aad2be",
//           SUBCRIPTION_TIER.PREMIUM
//         );
//         if (error) {
//           toast({
//             title: "Unexpected Error!",
//             description: error instanceof Error ? error.message : String(error),
//             variant: "destructive",
//           });
//         }
//       }}
//     >
//       <p className="text-sm">Upgrade Now</p>
//     </Button>
//   );
// }
