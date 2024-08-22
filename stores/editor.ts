import { Editor } from "@tiptap/react";
import { create } from "zustand";

type EditorState = {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));
