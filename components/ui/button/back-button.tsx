"use client";
import React, { startTransition } from "react";
import { Button } from "../button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useProgress } from "react-transition-progress";
import { revalidatePathClient } from "@/action";
type Props = {
  shouldRevalidate?: boolean;
};
export default function BackButton({ shouldRevalidate }: Props) {
  const router = useRouter();
  const startProgress = useProgress();
  return (
    <Button
      variant={"icon"}
      size={"icon"}
      type="button"
      onClick={() => {
        startTransition(async () => {
          startProgress();
          if (shouldRevalidate) {
            await revalidatePathClient("/");
          }
          router.back();
        });
      }}
      className="group w-6 h-6 hover:text-blue-500 p-0"
    >
      <IoIosArrowRoundBack size={32} />
    </Button>
  );
}
