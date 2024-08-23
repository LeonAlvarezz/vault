import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ImageContainer from "@/components/ui/image-container";
import React from "react";
import TabView from "../_component/tab-view";
import ContactButton from "@/components/ui/button/contact-button";

export default function AccountPage() {
  return (
    <>
      <section>
        <ImageContainer
          src="/image/default-cover1.png"
          className="h-[150px] w-full overflow-hidden"
        />
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 relative sm:bottom-6 bottom-10 px-2 sm:mb-6 mb-3">
          <Avatar className="size-28">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col sm:flex-row gap-y-4 text-center sm:text-start justify-between w-full">
            <div>
              <h1 className="text-lg">John Doe</h1>
              <p className="text-sm text-neutral-400">Software Developer</p>
              <p className="text-xs text-neutral-600 text-center sm:text-start w-[70%] sm:mx-0 mx-auto sm:w-[90%]">
                a passionate software developer hail from Cambodia - Live Laugh
                Code
              </p>
            </div>
            <ContactButton />
          </div>
        </div>
      </section>
      <TabView />
    </>
  );
}
