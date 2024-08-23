import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageContainer from "@/components/ui/image-container";
import React, { Suspense } from "react";
import EditProfileDropdownMenu from "@/components/ui/dropdown/edit-profile-dropdown";
import TabView from "./_component/tab-view";
type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};
export default async function Page({ searchParams }: Props) {
  return (
    <>
      <section>
        <ImageContainer
          src="/image/default-cover1.png"
          className="overflow-hidden h-[150px] w-full"
        />
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 relative bottom-10 sm:bottom-6 px-2 sm:mb-6 mb-3 ">
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
      {/* <Suspense> */}
      <TabView searchParams={searchParams} />
      {/* </Suspense> */}
    </>
  );
}
