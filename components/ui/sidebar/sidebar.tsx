import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { GoHomeFill } from "react-icons/go";
import { MdExplore } from "react-icons/md";
import { IoBookmark, IoSearch, IoSettingsSharp } from "react-icons/io5";
import { FaStickyNote } from "react-icons/fa";
import SidebarItem from "./sidebar-item";
import LogoutButton from "../button/logout-button";
import { Link } from "react-transition-progress/next";
import { IoIosHelpCircle } from "react-icons/io";
import { getProfile } from "@/action/profile";

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
    icon: <IoBookmark color={ICON_COLOR} size={ICON_SIZE} />,
    link: "/bookmark",
  },
  {
    separator: true,
  },
  {
    id: "settings",
    icon: <IoSettingsSharp color={ICON_COLOR} size={ICON_SIZE} />,
    link: "/settings",
  },
  {
    id: "help",
    icon: <IoIosHelpCircle color={ICON_COLOR} size={ICON_SIZE} />,
    link: "/help",
  },
];
type Props = {
  isAuthenticatedAsAnon: boolean;
};
export default async function Sidebar({ isAuthenticatedAsAnon }: Props) {
  if (!isAuthenticatedAsAnon) {
    return null;
  }

  const { data: profile, error } = await getProfile();

  return (
    <aside className="hidden sm:block sticky top-0 bottom-0 h-screen w-16 bg-neutral-900 border-r-[1px] border-neutral-800 z-50">
      <div className="flex justify-between flex-col min-h-svh sm:min-h-screen">
        <div>
          <div className="flex items-center flex-col w-full my-6">
            <Link href={"/profile"}>
              <Avatar>
                {profile?.avatar_url && (
                  <AvatarImage src={profile.avatar_url} />
                )}
                <AvatarFallback>
                  {profile?.username.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
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
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
