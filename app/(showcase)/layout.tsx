import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/nav/nav-bar";
import React, { Suspense } from "react";

export default function LayoutPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">{children}</main>
      <Footer />
    </>
  );
}
