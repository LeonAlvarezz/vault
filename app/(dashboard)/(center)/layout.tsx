import Sidebar from "@/components/ui/sidebar/sidebar";
import SidebarMobile from "@/components/ui/sidebar/sidebar-mobile";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 relative">
      <Sidebar />
      <SidebarMobile />
      <main className="w-[80%] md:w-[70%] xl:w-[50%] pt-10 pb-20 mx-auto z-10">
        {children}
      </main>
    </div>
  );
}
