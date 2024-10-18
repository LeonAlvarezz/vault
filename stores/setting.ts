import { toast } from "@/components/ui/use-toast";
import { getUserSetting, saveSettings } from "@/data/client/settings";
import { Json } from "@/database.types";
import { Category } from "@/types/category.type";
import { Tag } from "@/types/tag.type";
import { create } from "zustand";

export const useSettings = create<SettingStore>((set) => ({
  disable_command_search: false,
  keyboard_shortcuts: { openCommandSearch: "Ctrl+K" },
  notification: { desktop: false, mobile: false },
  loading: true, // Set loading to true initially
  isKeyRecording: false,
  fetchSettings: async () => {
    set({ loading: true });
    try {
      const { data, error } = await getUserSetting(); // Fetch from your backend API
      if (error) {
        set({
          disable_command_search: false,
          keyboard_shortcuts: { openCommandSearch: "Ctrl+K" },
          notification: { desktop: false, mobile: false },
        });
      } else {
        set({
          disable_command_search: data?.disable_command_search || false,
          keyboard_shortcuts: data?.keyboard_shortcuts,
          notification: data?.notification,
          loading: false,
        });
      }
    } catch (error: unknown) {
      toast({
        title: "Failed to Fetch Settings",
        description: error instanceof Error ? error.message : String(error),
      });
      set({ loading: false }); // Stop loading on error
    }
  },

  setDisableSearch: async (value: boolean) => {
    set({ disable_command_search: value });
    await saveSettings({ disable_command_search: value });
  },

  setIsKeyRecording: async (value: boolean) => {
    set({ isKeyRecording: value });
  },

  setKeyboardShortcut: async (shortcut: Json) => {
    set({ keyboard_shortcuts: shortcut });
    await saveSettings({ keyboard_shortcuts: shortcut });
  },

  setNotification: async (notification: Json) => {
    set({ notification });
    await saveSettings({ notification });
  },

  resetSettings: async () => {
    const defaultSettings = {
      disable_command_search: false,
      keyboard_shortcuts: { openCommandSearch: "Ctrl+K" },
      notification: { desktop: false, mobile: false },
    };
    set(defaultSettings);
    await saveSettings(defaultSettings);
  },
}));

export type SettingStore = {
  disable_command_search: boolean;
  keyboard_shortcuts: Json;
  notification: Json;
  loading: boolean;
  isKeyRecording: boolean;
  setIsKeyRecording: (value: boolean) => void;
  fetchSettings: () => Promise<void>;

  setDisableSearch: (value: boolean) => void;
  setKeyboardShortcut: (shortcut: Json) => void;
  setNotification: (notification: Json) => void;
  resetSettings: () => void;
};
