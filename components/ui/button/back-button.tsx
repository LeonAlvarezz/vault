"use client";
import React from "react";
import { Button } from "../button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant={"icon"}
      size={"icon"}
      type="button"
      onClick={() => router.back()}
      className="group w-6 h-6 hover:text-blue-500 p-0"
    >
      <IoIosArrowRoundBack size={32} />
    </Button>
  );
}
