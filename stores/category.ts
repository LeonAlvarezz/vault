import { Category } from "@/types/category.type";
import { Tag } from "@/types/tag.type";
import { create } from "zustand";

export const useCategorizationStore = create<CategoryState>((set) => ({
  categories: [],
  tags: [],
  setCategories: (categories: Category[]) => set({ categories }),
  setTags: (tags: Tag[]) => set({ tags }),
}));

export type CategoryState = {
  categories: Category[];
  tags: Tag[];
  setCategories: (categories: Category[]) => void;
  setTags: (tags: Tag[]) => void;
};
