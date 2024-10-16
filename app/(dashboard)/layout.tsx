import Sidebar from "@/components/ui/sidebar/sidebar";
import SidebarMobile from "@/components/ui/sidebar/sidebar-mobile";
import React, { Suspense, useContext } from "react";
import FloatingButton from "@/components/ui/floating-button";

import Tutorial from "@/components/ui/tutorial/tutorial";
import { isUserAuthenticated } from "../api/action";
import LoginSignUpFloatingButton from "@/components/ui/button/login-signup-button";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: isAuthenticatedAsAnon } = await isUserAuthenticated(true);
  return (
    <div className="flex flex-1 relative">
      <Sidebar isAuthenticatedAsAnon={isAuthenticatedAsAnon} />
      <SidebarMobile isAuthenticatedAsAnon={isAuthenticatedAsAnon} />
      <main className="w-[90%] sm:w-[80%] xl:w-[50%] pt-10 pb-20 mx-auto z-10 relative">
        {children}
        <FloatingButton isAuthenticatedAsAnon={isAuthenticatedAsAnon} />
        <Tutorial isAuthenticatedAsAnon={isAuthenticatedAsAnon} />
        <LoginSignUpFloatingButton
          isAuthenticatedAsAnon={isAuthenticatedAsAnon}
        />
      </main>
    </div>
  );
}
