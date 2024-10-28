"use client";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import Confetti from "react-confetti";
import useViewport from "@/hooks/useViewPort";

export default function SuccessPaymentGraphic() {
  const { width, height } = useViewport();
  return (
    <>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={200}
        recycle={false}
      />
      <div className="relative">
        <div className="size-28 z-20 relative bg-green-700 border-2 border-green-300 rounded-full flex justify-center items-center">
          <FaCheck size={52} />
        </div>

        <div className="size-[200px] rounded-full bg-green-500/10 z-10 blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </>
  );
}
