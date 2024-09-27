"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { CategoryState, useCategorizationStore } from "@/stores/category";

// Create the React context
const CategoryContext = createContext<CategoryState | null>(null);

// Provide the Zustand store via React Context
export const CategorizationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const categoryStore = useCategorizationStore();

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
