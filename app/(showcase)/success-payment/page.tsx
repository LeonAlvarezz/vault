import LinkButton from "@/components/ui/button/link-button";
import SuccessPaymentGraphic from "@/components/ui/graphic/success-payment-graphic";
import React from "react";

export default function Success() {
  return (
    <div className="flex justify-center section-center items-center">
      <div className="flex gap-4 flex-col justify-center items-center">
        <SuccessPaymentGraphic />

        <h1 className="relative z-30 mt-4 text-2xl font-bold text-center">
          {`Success! You're now a Vault Member!`}
        </h1>
        <p className="relative z-30 text-xs text-neutral-500 mb-10">
          {`Your subscription is active, and you now have full access to all
          Vault's premium features.`}
        </p>
        <LinkButton
          className="w-fit"
          href="/dashboard"
          label="Back to Dashboard"
        />
      </div>
    </div>
  );
}
