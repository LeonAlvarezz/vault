import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../button";
import { useSettings } from "@/stores/setting";
import { KeyboardShortcut } from "@/types/setting.type";
import { Json } from "@/database.types";
import { cn } from "@/lib/utils";
import { getKeyboardValue } from "@/utils/json";
import { convertKeyNotation } from "@/utils/keyboard-shortcut";
import { Skeleton } from "../skeleton";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "../use-toast";
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

  const [currentShortcut, setCurrentShortcut] = useState("");
  const [pressedEnter, setPressedEnter] = useState(false);

  useEffect(() => {
    const shortcutValue = getKeyboardValue(keyboard_shortcuts);
    console.log("shortcutValue:", shortcutValue);
    // console.log(
    //   "shortcutValue.openCommandSearch:",
    //   shortcutValue.openCommandSearch
    // );
    if (shortcutValue && shortcutValue.openCommandSearch) {
      console.log(
        "shortcutValue.openCommandSearch:",
        shortcutValue.openCommandSearch
      );
      const normalizedShortcut = shortcutValue.openCommandSearch
        .split("+")
        .map((key) => convertKeyNotation(key))
        .join("+");

      setCurrentShortcut(normalizedShortcut);
    } else {
      console.error("openCommandSearch is not defined");
    }
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
      if (isKeyRecording) {
        event.preventDefault();

        if (event.key === "Enter") {
          setIsKeyRecording(false);
          setPressedEnter(true);
        } else {
          const shortcut = formatShortcut(event);
          setCurrentShortcut(shortcut);
        }
      }
    },
    [isKeyRecording, formatShortcut, setIsKeyRecording]
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isKeyRecording && pressedEnter) {
      setKeyboardShortcut({
        openCommandSearch: currentShortcut,
      });
      toast({
        title: "Shortcut Set",
        description: `New shortcut: ${currentShortcut}`,
      });
      setPressedEnter(false);
    }
  }, [isKeyRecording, currentShortcut, pressedEnter, setKeyboardShortcut]);

  return (
    <>
      <Button
        variant="outline"
        disabled={disabled}
        className={cn(
          "font-normal text-xs focus-visible:ring-0 focus-visible:ring-offset-0",
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

        {currentShortcut.length == 0 && !isKeyRecording ? (
          <Skeleton className="w-6 h-3" />
        ) : (
          currentShortcut
        )}
        {/* <KeyboardKey keys={curr}/> */}
      </Button>
    </>
  );
}
