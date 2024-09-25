import Sidebar, {
  ICON_COLOR,
  ICON_SIZE,
} from "@/components/ui/sidebar/sidebar";
import SidebarMobile from "@/components/ui/sidebar/sidebar-mobile";
import React, { Suspense } from "react";
import FloatingButton from "@/components/ui/floating-button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import Tutorial from "@/components/ui/tutorial/tutorial";
import Loading from "@/app/loading";
import QuickSnipModal from "@/components/ui/modal/quick-snip-modal";
import { createClient } from "@/lib/supabase/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-1 relative">
      <Sidebar />
      <SidebarMobile />
      <main className="w-[90%] sm:w-[80%] xl:w-[50%] pt-10 pb-20 mx-auto z-10 relative">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
      {/* <Link href="/create"> */}
      <FloatingButton className="p-3" user={user} />
      {/* </Link> */}
      <Tutorial />
      <QuickSnipModal />
    </div>
  );
}
