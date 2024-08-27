"use client";
import React, { useState } from "react";
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
  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      //   onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTutorial = tutorialSteps[currentStep];
  const CurrentStepComponent = tutorialSteps[currentStep].component;

  return (
    <div className="h-svh w-svw sm:w-screen sm:h-screen fixed bg-neutral-800/70 top-0 left-0 z-[100]">
      <div className="flex justify-center items-center w-full h-full flex-col relative">
        <CurrentStepComponent nextStep={nextStep} />
      </div>
    </div>
  );
}
