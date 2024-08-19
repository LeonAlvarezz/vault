import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { ICON_COLOR, ICON_SIZE, SIDEBAR_ITEM } from "./sidebar";
import SidebarItem from "./sidebar-item";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IoLogOut } from "react-icons/io5";
import SidebarOptionalItemDropdownMenu from "../dropdown/sidebar-optional-item-dropdown";
import SidebarItemMobile from "./sidebar-item-mobile";

export default function SidebarMobile() {
  const visibleItems = SIDEBAR_ITEM.slice(0, 6); // Display first 4 items
  const remainingItems = SIDEBAR_ITEM.slice(6); // Remaining items for dropdown
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

        {/* <div>
          <Link href="/logout">
            <div
              className={cn(
                "flex justify-center p-2 m-auto w-fit  hover:bg-neutral-700/50 rounded-sm my-4"
              )}
            >
              <IoLogOut color={ICON_COLOR} size={ICON_SIZE} />
            </div>
          </Link>
        </div> */}
      </div>
    </aside>
  );
}
