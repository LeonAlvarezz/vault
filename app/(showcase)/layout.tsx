import React from "react";

export default function LayoutPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto w-[80%] sm:w-[50%] min-h-screen">{children}</main>
  );
}