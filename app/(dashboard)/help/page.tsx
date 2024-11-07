import ReportForm from "@/components/ui/form/report-form";
import React from "react";

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-semibold">Report & Feedback</h1>
      <p className="text-xs text-neutral-500 mt-2">
        Help make improve Vault by submitting bug and error encountered
      </p>
      <ReportForm />
    </>
  );
}
