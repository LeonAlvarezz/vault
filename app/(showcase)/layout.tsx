import React, { Suspense } from "react";
import Loading from "../loading";

export default function LayoutPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto w-[80%] sm:w-[50%] min-h-svh sm:min-h-screen">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}
