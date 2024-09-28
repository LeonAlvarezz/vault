"use client";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { CategoryState, useCategorizationStore } from "@/stores/category";
import { Category } from "@/types/category.type";

// Create the React context
const CategoryContext = createContext<CategoryState | null>(null);

export const CategorizationProvider = ({
  children,
  initialCategories,
}: {
  children: ReactNode;
  initialCategories: Category[]; // Pass initial categories fetched from the server
}) => {
  const categoryStore = useCategorizationStore();

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      categoryStore.setCategories(initialCategories);
    }
  }, [initialCategories, categoryStore]);

  return (
    <CategoryContext.Provider value={categoryStore}>
      {children}
    </CategoryContext.Provider>
  );
};

// Hook to access Category Context
export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};
