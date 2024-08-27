import Sidebar, {
  ICON_COLOR,
  ICON_SIZE,
} from "@/components/ui/sidebar/sidebar";
import SidebarMobile from "@/components/ui/sidebar/sidebar-mobile";
import React, { Suspense } from "react";
import Loading from "../loading";
import FloatingButton from "@/components/ui/floating-button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-1 relative">
          <Sidebar />
          <SidebarMobile />
          <main className="w-[90%] sm:w-[80%] xl:w-[50%] pt-10 pb-20 mx-auto z-10 relative">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
        </div>
      </body>
    </html>
  );
}
