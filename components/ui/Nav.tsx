import React from "react";
import ThemeSwitch from "@/theme/ThemeSwitch";

export default function Nav() {
  return (
    <nav className=" bg-blue-950 w-full h-20 flex items-center justify-between px-10">
      <div className="bg-white size-12 rounded-full"></div>
      <ThemeSwitch />
    </nav>
  );
}
