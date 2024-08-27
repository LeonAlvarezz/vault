import React from "react";
import { MdPinch, MdKeyboardCommandKey } from "react-icons/md";
import { Button } from "../button";
import { isMobile } from "react-device-detect";
type TutorialStepProps = {
  nextStep: () => void;
};
export default function TutorialStep1({ nextStep }: TutorialStepProps) {
  return (
    <div className="flex flex-col items-center">
      {isMobile ? (
        <>
          <MdPinch size={50} />
          <p>Pinch out to open search</p>
        </>
      ) : (
        <>
          <div className="flex">
            <MdKeyboardCommandKey size={24} /> + K
          </div>
          <div>
            Press{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-popover px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span className="text-sm">⌘</span>K
            </kbd>{" "}
            to open search
          </div>
        </>
      )}

      <Button
        onClick={nextStep}
        variant={"main"}
        size={"sm"}
        className="mt-6 hover:bg-blue-800 mb-4"
      >
        Continue
      </Button>
    </div>
  );
}
