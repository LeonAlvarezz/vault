import Sidebar from "@/components/ui/sidebar/sidebar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 relative">
      <Sidebar />
      <main className="w-full pt-20 flex">{children}</main>
    </div>
  );
}
