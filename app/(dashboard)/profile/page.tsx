import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageContainerBlur from "@/components/ui/image-container-blur";
import React, { Suspense } from "react";
import EditProfileDropdownMenu from "@/components/ui/dropdown/edit-profile-dropdown";
import TabView from "./_component/tab-view";
import { getProfile, getCacheUser } from "@/data/server/profiles";
import { getUserPublishedNotes } from "@/data/server/note";
import { NoteFilter } from "@/types/note.type";
import { getOccupationLabel } from "@/constant/occupation";
import CoverImage from "./edit/feature/cover_image";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "Vault - Profile",
  description: "View and manage your personal developer profile on Vault.",
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const user = await getCacheUser(supabase);
  const [{ data: profile, error }, { data: notes, error: noteError }] =
    await Promise.all([
      getProfile(),
      getUserPublishedNotes(user!.id, searchParams as NoteFilter),
    ]);
  return (
    <>
      <section>
        <CoverImage profile={profile} />
        <div className="flex flex-col sm:flex-row items-center gap-6 relative bottom-10 sm:bottom-6 px-2 sm:mb-6 mb-3 ">
          <Avatar className="size-28">
            {profile?.avatar_url && <AvatarImage src={profile.avatar_url} />}
            <AvatarFallback className="text-3xl">
              {profile?.username.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex justify-between w-full relative sm:mb-0 mb-6">
            <div className="flex flex-col">
              <h1 className="text-lg">{profile?.username || "No Username"}</h1>
              <p className="text-sm text-neutral-400">
                {profile?.occupation
                  ? getOccupationLabel(profile?.occupation)
                  : "Intern"}
              </p>
              <p className="text-xs mt-1 text-neutral-600 w-[50%] absolute top-[3.2rem] ">
                {profile?.bios || "No Bios~"}
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                assumenda corrupti modi quam laudantium hic expedita optio sit */}
              </p>
            </div>

            <EditProfileDropdownMenu />
          </div>
        </div>
      </section>
      {/* <Suspense> */}
      <TabView searchParams={searchParams} notes={notes} profile={profile} />
      {/* </Suspense> */}
    </>
  );
}
