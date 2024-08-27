import React from "react";
import { MdPinch } from "react-icons/md";
import { Button } from "../button";
import { FaArrowRight } from "react-icons/fa";
type TutorialStepProps = {
  nextStep: () => void;
};
export default function TutorialStep2({ nextStep }: TutorialStepProps) {
  return (
    <>
      <div className="absolute bottom-24 sm:bottom-10 right-12 xl:right-72 2xl:right-72">
        <div className="flex flex-col items-end w-40">
          <Button
            onClick={nextStep}
            variant={"main"}
            size={"sm"}
            className="mt-6 hover:bg-blue-800 self-start mb-4"
          >
            Continue
          </Button>
          <p className="">Click to create note </p>
          <FaArrowRight size={32} className="rotate-45" />
        </div>
      </div>
    </>
  );
}
