import Nav from "@/components/ui/Nav";
import React, { Suspense } from "react";

export default function LayoutPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <main className="mx-auto w-[90%] sm:w-[70%] min-h-svh sm:min-h-screen">
        {children}
      </main>
    </>
  );
}
