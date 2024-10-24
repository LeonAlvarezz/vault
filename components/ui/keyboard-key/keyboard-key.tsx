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
export default function KeyboardKey({ disabled = false }: Props) {
  const { keyboard_shortcuts } = useSettings();

  const [currentShortcut, setCurrentShortcut] = useState("");

  useEffect(() => {
    const shortcutValue = getKeyboardValue(keyboard_shortcuts);

    if (shortcutValue && shortcutValue.openCommandSearch) {
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

  return (
    <>
      <Button
        variant="outline"
        disabled={true}
        className={cn(
          "font-normal size-6 scroll-px-2 text-[10px] focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-neutral-900"
        )}
        onClick={() => {
          setCurrentShortcut("");
        }}
      >
        {currentShortcut.length == 0 ? (
          <Skeleton className="w-6 h-3" />
        ) : (
          currentShortcut
        )}
        {/* <KeyboardKey keys={curr}/> */}
      </Button>
    </>
  );
}
