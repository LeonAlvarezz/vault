"use client";
import React, { startTransition } from "react";
import { Button } from "../button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useProgress } from "react-transition-progress";
type Props = {
  onRevalidate?: () => void;
};
export default function BackButton({ onRevalidate }: Props) {
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
          onRevalidate && onRevalidate();
          router.back();
        });
      }}
      className="group w-6 h-6 hover:text-blue-500 p-0"
    >
      <IoIosArrowRoundBack size={32} />
    </Button>
  );
}
