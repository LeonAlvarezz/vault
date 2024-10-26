import React from "react";
import ImageContainerBlur from "./image/image-container-blur";

import Logo from "@/public/image/logo.png";
import Link from "next/link";
import { Separator } from "./separator";
import SocialLinkSection from "@/app/(dashboard)/profile/edit/feature/social-link";
import { FaInstagram, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { Button } from "./button";
export default function Footer() {
  return (
    <footer className="bg-neutral-950/50 w-full h-fit flex border-t border-neutral-700/50">
      <div className="mx-auto w-[90%] sm:w-[70%] lg:w-[55%] h-full grid grid-cols-1 lg:grid-cols-6">
        {/* <div className="flex flex-col gap-2">
          <div className="flex items-center h-full">
            <ImageContainerBlur src={Logo} alt="logo" className="h-14" />
          </div>
        </div> */}
        <div className="flex lg:flex-col gap-2 col-span-2 flex-row py-6 lg:py-14 justify-between">
          <div className="flex items-end gap-2">
            <div className="flex items-center h-full">
              <ImageContainerBlur src={Logo} alt="logo" className="h-8" />
            </div>
            <p className="text-sm">Vault</p>
          </div>
          <div className="flex flex-col justify-end gap-2">
            <p className="text-xs text-neutral-500 lg:block hidden">
              Follow us on
            </p>
            <div className="flex gap-2 items-end">
              <Link
                href={"/"}
                className=" size-7 flex justify-center items-center rounded-full border-[#24A1DE] border hover:bg-[#24A1DE]/20"
              >
                <FaTelegramPlane color="#24A1DE" size={16} />
              </Link>
              <Link
                href={"/"}
                className=" size-7 flex justify-center items-center rounded-full border-[#D427B9] border hover:bg-[#D427B9]/20"
              >
                <FaInstagram color="#D427B9" size={16} />
              </Link>
              <Link
                href={"/"}
                className=" size-7 flex justify-center items-center rounded-full border-[#1DA1F2] border hover:bg-[#1DA1F2]/20"
              >
                <FaTwitter color="#1DA1F2" size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-6 lg:py-12 col-span-2">
          <h2>Product</h2>
          <Link href="/" className="text-sm text-neutral-500 hover:text-second">
            Home
          </Link>
          <Link href="/" className="text-sm text-neutral-500 hover:text-second">
            Dashboard
          </Link>
          <Link href="/" className="text-sm text-neutral-500 hover:text-second">
            Pricing
          </Link>
          <Link href="/" className="text-sm text-neutral-500 hover:text-second">
            Contact
          </Link>
        </div>
        <div className="py-12 flex justify-end items-end col-span-2">
          <p className="text-[10px] text-neutral-500 text-nowrap">
            Copyright © 2024 Vault. All rights reserved.
          </p>
        </div>
      </div>

      {/* <div className="flex gap-10 items-center"> */}
      {/* <div className="flex gap-10">
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
      </Link> */}
    </footer>
  );
}
