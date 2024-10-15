import { isMacOs, isWindows } from "react-device-detect";

export const convertKeyNotation = (key: string): string => {
  const macToWin: { [key: string]: string } = {
    "⌘": "meta",
    "⌥": "alt",
    "⇧": "shift",
    "⌃": "ctrl",
  };
  const winToMac: { [key: string]: string } = {
    ctrl: "⌘",
    alt: "⌥",
    shift: "⇧",
    meta: "⌘",
  };

  if (isMacOs) {
    return winToMac[key] || key;
  } else {
    return macToWin[key] || key;
  }
};
