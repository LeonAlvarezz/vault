import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ImageContainer from "@/components/ui/image-container";
import Link from "next/link";
import React from "react";
import TabView from "./_component/tab-view";
import { SlOptionsVertical } from "react-icons/sl";
import EditProfileDropdownMenu from "@/components/ui/dropdown/edit-profile-dropdown";

export default function AccountPage() {
  return (
    <>
      <section>
        <ImageContainer
          src="/image/default-cover1.png"
          className="h-[150px] w-full"
        />
        <div className="flex items-end gap-6 relative bottom-6 px-2 mb-6">
          <Avatar className="size-28">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex justify-between w-full">
            <div>
              <h1 className="text-lg">John Doe</h1>
              <p className="text-sm text-neutral-400">Software Developer</p>
              <p className="text-xs text-neutral-600 w-[90%]">
                a passionate software developer hail from Cambodia - Live Laugh
                Code
              </p>
            </div>

            <EditProfileDropdownMenu />
          </div>
        </div>
      </section>
      <TabView />
    </>
  );
}
