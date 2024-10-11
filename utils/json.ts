import { Json } from "@/database.types";
import { KeyboardShortcut } from "@/types/setting.type";

export const getKeyboardValue = (json: Json) => {
  const shortcut = json as KeyboardShortcut;
  return shortcut;
};
