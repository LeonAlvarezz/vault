import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ImageContainerBlur from "@/components/ui/image-container-blur";
import React from "react";
import TabView from "../_component/tab-view";
import ContactButton from "@/components/ui/button/contact-button";
import { getProfilesById } from "@/data/server/profiles";
import { getPublishedNotesByProfileId } from "@/data/server/note";
import { NoteFilter } from "@/types/note.type";
import { getOccupationLabel } from "@/constant/occupation";
type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ id: string }>;
};
export default async function AccountPage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const [
    { data: profile, error: profileError },
    { data: notes, error: noteError },
  ] = await Promise.all([
    getProfilesById(params.id),
    getPublishedNotesByProfileId(params.id, searchParams as NoteFilter),
  ]);
  return (
    <>
      <section>
        <ImageContainerBlur
          src="/image/default-cover1.png"
          className="h-[150px] w-full overflow-hidden"
        />
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

            <ContactButton profile={profile} />
          </div>
        </div>
      </section>
      <TabView searchParams={searchParams} notes={notes} profile={profile} />
    </>
  );
}
