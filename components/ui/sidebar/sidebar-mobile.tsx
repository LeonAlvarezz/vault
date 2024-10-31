"use client";
import React, { useEffect } from "react";
import { SIDEBAR_ITEM } from "./sidebar";
import SidebarOptionalItemDropdownMenu from "../dropdown/sidebar-optional-item-dropdown";
import SidebarItemMobile from "./sidebar-item-mobile";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { useSettings } from "@/stores/setting";
import { useSubscription } from "@/stores/subscription";
type Props = {
  isAuthenticatedAsAnon: boolean;
};
export default function SidebarMobile({ isAuthenticatedAsAnon }: Props) {
  const visibleItems = SIDEBAR_ITEM.slice(0, 6);
  const remainingItems = SIDEBAR_ITEM.slice(6);
  const isKeyboardOpen = useDetectKeyboardOpen();
  const { fetchSettings } = useSettings();
  const { fetchSubscriptionStatus } = useSubscription();

  useEffect(() => {
    Promise.all([fetchSettings(), fetchSubscriptionStatus()]);
  }, [fetchSettings, fetchSubscriptionStatus]);

  if (!isAuthenticatedAsAnon || isKeyboardOpen) {
    return null;
  }

  return (
    <aside className="block sm:hidden h-14 w-[90%] rounded-full fixed bottom-2 left-1/2 -translate-x-1/2 bg-neutral-900 border border-neutral-800 z-20">
      <div className="flex gap-4 items-center justify-between px-6 h-full">
        {visibleItems.map((item, index) => (
          <SidebarItemMobile
            key={index}
            id={item.id}
            icon={item.icon}
            link={item.link}
            separator={item.separator}
          />
        ))}
        {remainingItems.length > 0 && (
          <SidebarOptionalItemDropdownMenu items={remainingItems} />
        )}
      </div>
    </aside>
  );
}
