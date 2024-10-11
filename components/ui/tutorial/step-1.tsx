import React, { useEffect, useState } from "react";
import { MdPinch, MdKeyboardCommandKey } from "react-icons/md";
import { Button } from "../button";
import { isMobile, deviceDetect } from "react-device-detect";
import Spinner from "../spinner";
type TutorialStepProps = {
  nextStep: () => void;
};
export default function TutorialStep1({ nextStep }: TutorialStepProps) {
  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState(false);

  useEffect(() => {
    // Delay detection to simulate loading state
    const detectDevice = () => {
      setDevice(isMobile);
      setLoading(false);
    };

    detectDevice();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col items-center justify-between">
      {device ? (
        <>
          <MdPinch size={50} />
          <p>Pinch in/out to open search</p>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center">
            <MdKeyboardCommandKey size={16} /> + K
          </div>
          <div className="flex justify-center items-center gap-2">
            Press{"  "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-popover px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span className="text-[10px]">⌘</span>K
            </kbd>
            {"  "}
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
