import { Json } from "@/database.types";
export type KeyboardShortcut = {
  openCommandSearch: string;
  saveNote: string;
};
export type Setting = {
  created_at: string;
  disable_command_search: boolean | null;
  id: number;
  keyboard_shortcuts: Json | null;
  language: string | null;
  notification: Json | null;
  profile_id: string | null;
  updated_at: string | null;
};
