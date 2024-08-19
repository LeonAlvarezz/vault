"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { SidebarMobileProps } from "../sidebar/sidebar-item-mobile";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { IoLogOut } from "react-icons/io5";
import { ICON_COLOR, ICON_SIZE } from "../sidebar/sidebar";
import { signout } from "@/app/api/action";
type Props = {
  items: SidebarMobileProps[];
};
export default function SidebarOptionalItemDropdownMenu({ items }: Props) {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"icon"}
          size={"icon"}
          className="rounded-full hover:bg-neutral-700/50 focus-visible:ring-offset-0"
        >
          <SlOptionsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {items.map((item) => {
          if (item.separator) return undefined;
          return (
            <DropdownMenuItem key={item.id} asChild>
              <Link href={item.link || "/"}>
                <div
                  className={cn(
                    "grid grid-cols-3 text-sm gap-2 capitalize p-2 w-full hover:bg-neutral-800 rounded-sm",
                    pathname === `/${item.id}` && "bg-neutral-700/50"
                  )}
                >
                  {item.icon}
                  <p className="col-span-2 w-full">{item.id}</p>
                </div>
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuItem>
          <form className="w-full">
            <Button
              variant={"icon"}
              size={"icon"}
              formAction={signout}
              className="w-full"
            >
              <div
                className={cn(
                  "grid grid-cols-3  place-items-start text-sm gap-2 capitalize p-2 w-full hover:bg-neutral-800 rounded-sm"
                )}
              >
                <IoLogOut color="#FF8080" size={ICON_SIZE} />
                <p className="col-span-2 text-[#FF8080] font-normal">Logout</p>
              </div>
            </Button>
          </form>

          {/* <Link href="/logout">
            <div
              className={cn(
                "grid grid-cols-3 gap-2 capitalize p-2 w-full hover:bg-neutral-800 rounded-sm"
              )}
            >
              <IoLogOut color={ICON_COLOR} size={ICON_SIZE} />
              <p>Logout</p>
            </div>
          </Link> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
