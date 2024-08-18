"use client";
import InputContent from "@/app/(dashboard)/(center)/create/_components/InputContent";
import React from "react";
import FloatingButton from "@/components/ui/floating-button";
import { FaCheck, FaPlus } from "react-icons/fa";
import { ICON_COLOR, ICON_SIZE } from "@/components/ui/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import FormatMenu from "@/components/ui/format-menu";

export default function EditAboutMeSection() {
  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): void {
    //Submit Logic
    throw new Error("Function not implemented.");
  }
  return (
    <section className="pb-20">
      <h2>About Me</h2>
      <p className="text-xs mt-2 text-neutral-500">
        Write about yourself to let other better know about you
      </p>
      <div className="mt-5 h-full">
        <InputContent />
      </div>
      <div className="hidden xl:block fixed top-28 left-28 w-[200px]">
        <FormatMenu />
      </div>

      <FloatingButton className="bg-green-900  hover:bg-green-900/80 ">
        <Button onClick={handleSubmit} variant={"icon"} size={"icon"}>
          <FaCheck color="#6EFF6B" size={ICON_SIZE} />
        </Button>
      </FloatingButton>
    </section>
  );
}
