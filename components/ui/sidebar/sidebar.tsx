import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { GoHomeFill } from "react-icons/go";
import { MdExplore } from "react-icons/md";
import { IoSearch, IoSettingsSharp } from "react-icons/io5";
import { FaStickyNote, FaUser } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";

import SidebarItem from "./sidebar-item";
import { cn } from "@/lib/utils";
import { signout } from "@/data/server/actions";
import { Button } from "../button";

export const ICON_SIZE = 20;
export const ICON_COLOR = "#DDD";
export const SIDEBAR_ITEM = [
  {
    id: "dashboard",
    icon: <GoHomeFill color={ICON_COLOR} size={ICON_SIZE} />,
    link: "/dashboard",
  },
  {
    separator: true,
  },
  {
    id: "explore",
    icon: <MdExplore color={ICON_COLOR} size={ICON_SIZE} />,
    link: "/explore",
  },
  {
    id: "search",
    icon: <IoSearch color={ICON_COLOR} size={ICON_SIZE} />,
    link: "/search",
  },
  {
    separator: true,
  },
  {
    id: "note",
    icon: <FaStickyNote color={ICON_COLOR} size={ICON_SIZE} />,
    link: "/note",
  },
  {
    id: "bookmark",
    icon: <FaBookBookmark color={ICON_COLOR} size={ICON_SIZE} />,
    link: "/bookmark",
  },
  {
    separator: true,
  },
  {
    id: "profile",
    icon: <FaUser color={ICON_COLOR} size={ICON_SIZE} />,
    link: "/profile?view=note",
  },
  {
    id: "settings",
    icon: <IoSettingsSharp color={ICON_COLOR} size={ICON_SIZE} />,
    link: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden sm:block sticky top-0 bottom-0 h-screen w-16 bg-neutral-900 border-r-[1px] border-neutral-800 z-50">
      <div className="flex justify-between flex-col min-h-svh sm:min-h-screen">
        <div>
          <div className="flex items-center flex-col w-full my-6">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            {SIDEBAR_ITEM.map((item, index) => (
              <SidebarItem
                key={index}
                id={item.id}
                icon={item.icon}
                link={item.link}
                separator={item.separator}
              />
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center">
          <form>
            <Button variant={"icon"} size={"icon"} formAction={signout}>
              <div
                className={cn(
                  "flex justify-center p-2 m-auto w-fit  hover:bg-neutral-700/50 rounded-sm my-4"
                )}
              >
                <IoLogOut color={ICON_COLOR} size={ICON_SIZE} />
              </div>
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
}
