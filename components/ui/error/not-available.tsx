import React from "react";
import ImageContainerBlurClient from "../image/image-container-blur-client";
import { Link } from "react-transition-progress/next";

export default function NotAvailable() {
  return (
    <div className="flex flex-col gap-4 items-center ">
      <ImageContainerBlurClient
        src="/image/not-available.svg"
        alt="empty"
        className="size-[200px] opacity-80"
        preview={false}
      />
      <h1 className="text-neutral-500 ">
        The content that you requested is not available
      </h1>
      <Link
        href="/"
        className="bg-main px-6 py-2 w-fit h-fit hover:bg-main/60 rounded-sm mt-4"
      >
        Go Home
      </Link>
    </div>
  );
}
