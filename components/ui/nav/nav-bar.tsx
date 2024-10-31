import React from "react";
import Logo from "@/public/image/logo.png";
import ThemeSwitch from "@/theme/ThemeSwitch";
import Image from "next/image";
import ImageContainerBlur from "../image/image-container-blur";
import Link from "next/link";
import { Button } from "../button";
import HamburgerMenu from "../menu/hamburger-menu";
import NavbarItem from "./nav-bar-item";

export default function Navbar() {
  return (
    <nav className="bg-950/50 w-full h-14 flex items-center justify-between px-6 sm:px-20">
      {/* <Image src={}>

      </Image> */}
      <div className="hidden sm:flex items-center justify-between w-full">
        <div className="flex gap-10 items-center">
          <div className="relative">
            <ImageContainerBlur src={Logo} alt="logo" className="h-8" />
            <div className="font-mono text-[8px] bg-main/50 absolute -bottom-2 -right-6 text-nowrap px-1 rounded-sm">
              alpha
            </div>
          </div>

          <NavbarItem />
        </div>
        <Link
          href={"/dashboard"}
          className="bg-main flex justify-center items-center px-4 rounded-sm w-fit h-6 hover:bg-main/70 transition-all"
        >
          <p className="text-xs">Dashboard</p>
        </Link>
      </div>

      <div className="sm:hidden flex justify-between items-center w-full">
        <div className="relative">
          <ImageContainerBlur src={Logo} alt="logo" className="h-8" />
          <div className="font-mono text-[8px] bg-main/50 absolute -bottom-2 -right-6 text-nowrap px-1 rounded-sm">
            alpha
          </div>
        </div>
        <HamburgerMenu />
      </div>

      {/* <ThemeSwitch /> */}
    </nav>
  );
}
