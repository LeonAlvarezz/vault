import { isMacOs, isWindows } from "react-device-detect";

export const convertKeyNotation = (key: string): string => {
  const macToWin: { [key: string]: string } = {
    "⌘": "Meta",
    "⌥": "Alt",
    "⇧": "Shift",
    "⌃": "Ctrl",
  };
  const winToMac: { [key: string]: string } = {
    Ctrl: "⌘",
    Alt: "⌥",
    Shift: "⇧",
    Meta: "⌘",
  };

  if (isMacOs) {
    return winToMac[key] || key;
  } else {
    return macToWin[key] || key;
  }
};
