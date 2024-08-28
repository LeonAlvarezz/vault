"use client";
import React, { useEffect, useState } from "react";
import { MdPinch } from "react-icons/md";
import { Button } from "../button";
import TutorialStep1 from "./step-1";
import TutorialStep2 from "./step-2";

const tutorialSteps = [
  {
    component: TutorialStep1,
  },
  {
    component: TutorialStep2,
  },
];

export default function Tutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(false);
  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOpen(false);
      localStorage.setItem("hasSeenTutorial", "true"); // Mark tutorial as seen
    }
  };

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      setOpen(true); // Show tutorial if not seen
    }
  }, []);

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = tutorialSteps[currentStep].component;

  return (
    <>
      {open && (
        <div className="fixed bg-neutral-800/70 top-0 left-0 z-[100]">
          <div className="flex justify-center items-center min-h-dvh sm:w-screen sm:h-screen w-svw flex-col relative">
            <CurrentStepComponent nextStep={nextStep} />
          </div>
        </div>
      )}
    </>
  );
}
