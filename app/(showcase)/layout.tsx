import Footer from "@/components/ui/footer";
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
      <main>{children}</main>
      <Footer />
    </>
  );
}
