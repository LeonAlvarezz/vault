import NotAvailable from "@/components/ui/error/not-available";
import React from "react";

export default function notFound() {
  return (
    <div className="flex w-full min-h-svh justify-center items-center">
      <NotAvailable />
    </div>
  );
}
