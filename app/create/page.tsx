"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import InputContent from "./_component/InputContent";

export default function Page() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="w-[90%] mx-auto">
      <form onSubmit={handleSubmit}>
        <Input
          className="dark:bg-slate-800 bg-slate-100 dark:text-white text-slate-900 focus:outline-none text-2xl h-24"
          placeholder="Title"
        />
        <InputContent />
      </form>
    </main>
  );
}
