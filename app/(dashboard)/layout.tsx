import Sidebar from "@/components/ui/sidebar/sidebar";
import SidebarMobile from "@/components/ui/sidebar/sidebar-mobile";
import React, { Suspense, useContext } from "react";
import FloatingButton from "@/components/ui/floating-button";

import Tutorial from "@/components/ui/tutorial/tutorial";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 relative">
      <Sidebar />
      <SidebarMobile />
      <main className="w-[90%] sm:w-[80%] xl:w-[50%] pt-10 pb-20 mx-auto z-10 relative">
        {children}
        <FloatingButton />
        <Tutorial />
      </main>
    </div>
  );
}
