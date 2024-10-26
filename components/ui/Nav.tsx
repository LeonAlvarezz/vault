import React from "react";
import Logo from "@/public/image/logo.png";
import ThemeSwitch from "@/theme/ThemeSwitch";
import Image from "next/image";
import ImageContainerBlur from "./image/image-container-blur";
import Link from "next/link";
import { Button } from "./button";
import HamburgerMenu from "./menu/hamburger-menu";

export default function Nav() {
  return (
    <nav className="bg-950/50 w-full h-14 flex items-center justify-between px-6 sm:px-20">
      {/* <Image src={}>

      </Image> */}
      <div className="hidden sm:flex items-center justify-between w-full">
        <div className="flex gap-10 items-center">
          <ImageContainerBlur src={Logo} alt="logo" className="h-8" />
          <div className="flex gap-10">
            <Link href="/" className="text-sm hover:text-second">
              Home
            </Link>
            <Link href="/pricing" className="text-sm hover:text-second ">
              Pricing
            </Link>
          </div>
        </div>
        <Link
          href={"/dashboard"}
          className="bg-main flex justify-center items-center px-4 rounded-sm w-fit h-6 hover:bg-main/70 transition-all"
        >
          <p className="text-xs">Dashboard</p>
        </Link>
      </div>

      <div className="sm:hidden flex justify-between items-center w-full">
        <ImageContainerBlur src={Logo} alt="logo" className="h-7" />
        <HamburgerMenu />
      </div>

      {/* <ThemeSwitch /> */}
    </nav>
  );
}
