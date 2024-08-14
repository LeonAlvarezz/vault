import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { GoHomeFill } from "react-icons/go";
import { MdExplore } from "react-icons/md";
import { IoSearch, IoSettingsSharp } from "react-icons/io5";
import { FaStickyNote, FaUser } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";

import SidebarItem from "./sidebar-item";
import { cn } from "@/lib/utils";

const ICON_SIZE = 20;
const SIDEBAR_ITEM = [
  {
    id: "home",
    icon: <GoHomeFill color="white" size={ICON_SIZE} />,
    link: "/dashboard",
  },
  {
    seperator: true,
  },
  {
    id: "explore",
    icon: <MdExplore color="white" size={ICON_SIZE} />,
    link: "/explore",
  },
  {
    id: "search",
    icon: <IoSearch color="white" size={ICON_SIZE} />,
    link: "/",
  },
  {
    seperator: true,
  },
  {
    id: "note",
    icon: <FaStickyNote color="white" size={ICON_SIZE} />,
    link: "/note",
  },
  {
    id: "saved-note",
    icon: <FaBookBookmark color="white" size={ICON_SIZE} />,
    link: "/",
  },
  {
    seperator: true,
  },
  {
    id: "account",
    icon: <FaUser color="white" size={ICON_SIZE} />,
    link: "/",
  },
  {
    id: "settings",
    icon: <IoSettingsSharp color="white" size={ICON_SIZE} />,
    link: "/",
  },
];

export default function Sidebar() {
  return (
    <aside className="sticky min-h-screen w-16 bg-neutral-900 border-r-[1px] border-neutral-800">
      <div className="flex justify-between flex-col h-full">
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
                separator={item.seperator}
              />
            ))}
          </div>
        </div>
        <div>
          <Link href="/logout">
            <div
              className={cn(
                "flex justify-center p-2 m-auto w-fit  hover:bg-neutral-800 rounded-sm my-4"
              )}
            >
              <IoLogOut color="white" size={ICON_SIZE} />
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
}
