"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Button } from "../button";
import { RiGlobalLine } from "react-icons/ri";
import { Toggle } from "../toggle";
import { useGesture, usePinch } from "@use-gesture/react";

export default function CommandSearch() {
  const [open, setOpen] = useState(false);
  const gestureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  // useGesture(
  //   {
  //     onDrag: ({ touches, direction: [, dy], event }) => {
  //       if (touches === 2 && dy > 0) {
  //         event.preventDefault();
  //         setOpen(true);
  //       }
  //     },
  //   },
  //   {
  //     target: gestureRef,
  //     eventOptions: { passive: false },
  //   }
  // );
  // useGesture(
  //   {
  //     onPinch: ({ da: [d], origin: [ox, oy], event, first, active }) => {
  //       console.log("Pinch detected", { d, first, active });
  //       if (first && active) {
  //         const threshold = 200;
  //         if (d > threshold) {
  //           event.preventDefault();
  //           setOpen(true);
  //         }
  //       }
  //     },
  //   },
  //   {
  //     target: gestureRef,
  //     eventOptions: { passive: false },
  //   }
  // );

  usePinch(
    ({ direction: [d], event, cancel }) => {
      console.log("d:", d);
      if (d < 0) {
        setOpen(true);
        cancel();
      }
    },
    { target: typeof window !== "undefined" ? window : undefined }
  );

  return (
    // <div {...bind()}>
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search...">
        <Toggle
          aria-label="Toggle global"
          className="w-6 h-6 p-1 group hover:bg-neutral-600"
        >
          <RiGlobalLine className="text-neutral-400 group group-hover:text-white" />
        </Toggle>
      </CommandInput>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
    // </div>
  );
}
