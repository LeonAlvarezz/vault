import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../button";
import { useSettings } from "@/stores/setting";
import { KeyboardShortcut } from "@/types/setting.type";
import { Json } from "@/database.types";
import { cn } from "@/lib/utils";
import { getKeyboardValue } from "@/utils/json";
type Props = {
  disabled?: boolean;
};
export default function ShortcutButton({ disabled = false }: Props) {
  const {
    setKeyboardShortcut,
    keyboard_shortcuts,
    setIsKeyRecording,
    isKeyRecording,
  } = useSettings();
  //   const [recording, setRecording] = useState(false);

  const [currentShortcut, setCurrentShortcut] = useState(
    getKeyboardValue(keyboard_shortcuts).openCommandSearch
  );

  useEffect(() => {
    setCurrentShortcut(getKeyboardValue(keyboard_shortcuts).openCommandSearch);
  }, [keyboard_shortcuts]);

  const formatShortcut = useCallback((event: KeyboardEvent) => {
    const keys: string[] = [];
    if (event.metaKey) keys.push("⌘");
    if (event.ctrlKey) keys.push("Ctrl");
    if (event.altKey) keys.push("Alt");
    if (event.shiftKey) keys.push("Shift");

    const key = event.key.toUpperCase();
    if (!["CONTROL", "ALT", "SHIFT", "META"].includes(key)) {
      keys.push(key);
    }
    return keys.join("+");
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      //   setCurrentShortcut("");
      if (isKeyRecording) {
        event.preventDefault();

        if (event.key === "Enter") {
          //   setRecording(false);
          setIsKeyRecording(false);
        } else {
          const shortcut = formatShortcut(event);
          setCurrentShortcut(shortcut);
          setKeyboardShortcut({
            openCommandSearch: shortcut,
          });
        }
      }
    },
    [isKeyRecording, formatShortcut]
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    // const formatShortcut = (event: KeyboardEvent) => {
    //   let keys = [];
    //   if (event.metaKey) keys.push("⌘");
    //   if (event.ctrlKey) keys.push("Ctrl");
    //   if (event.altKey) keys.push("Alt");
    //   if (event.shiftKey) keys.push("Shift");
    //   keys.push(event.key.toUpperCase());
    //   return keys.join("+");
    // };

    // const handleKeyUp = (event: KeyboardEvent) => {
    //   if (recording) {
    // const shortcut = formatShortcut(event);
    // setKeyboardShortcut({ openCommandSearch: shortcut });
    // setRecording(false);
    //   }
    // };

    window.addEventListener("keydown", handleKeyDown);
    // window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      //   window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isKeyRecording, setKeyboardShortcut]);

  return (
    <>
      <Button
        variant="outline"
        disabled={disabled}
        className={cn(
          "font-normal text-xs focus-visible:ring-0",
          isKeyRecording && "border-main"
        )}
        size="sm"
        onClick={() => {
          setCurrentShortcut("");
          setIsKeyRecording(true);
        }}
      >
        {isKeyRecording && currentShortcut.length == 0 && (
          <p className="text-neutral-400 text-xs ">
            Press key combination and then press enter
          </p>
        )}

        {currentShortcut}
        {/* <KeyboardKey keys={curr}/> */}
      </Button>
    </>
  );
}
