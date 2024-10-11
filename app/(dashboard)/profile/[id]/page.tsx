import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ImageContainerBlur from "@/components/ui/image-container-blur";
import React from "react";
import TabView from "../_component/tab-view";
import ContactButton from "@/components/ui/button/contact-button";
import { getProfilesById } from "@/data/server/profiles";
type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
  params: { id: string };
};
export default async function AccountPage({ searchParams, params }: Props) {
  const [{ data: profile, error: profileError }] = await Promise.all([
    getProfilesById(params.id),
  ]);
  return (
    <>
      <section>
        <ImageContainerBlur
          src="/image/default-cover1.png"
          className="h-[150px] w-full overflow-hidden"
        />
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 relative sm:bottom-6 bottom-10 px-2 sm:mb-6 mb-3">
          <Avatar className="size-28">
            {profile?.avatar_url && <AvatarImage src={profile.avatar_url} />}
            <AvatarFallback className="text-3xl">
              {profile?.username.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col sm:flex-row gap-y-4 text-center sm:text-start justify-between w-full">
            <div>
              <h1 className="text-lg">{profile?.username}</h1>
              <p className="text-sm text-neutral-400">
                {profile?.occupation || "Intern"}
              </p>
              <p className="text-xs text-neutral-600 text-center sm:text-start w-[70%] sm:mx-0 mx-auto sm:w-[90%]">
                {profile?.bios || "No bios"}
              </p>
            </div>
            <ContactButton />
          </div>
        </div>
      </section>
      <TabView searchParams={searchParams} />
    </>
  );
}
