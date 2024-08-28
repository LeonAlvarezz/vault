import Render from "@/components/ui/Render";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ContactButton from "@/components/ui/button/contact-button";
import Tag from "@/components/ui/tag";
import Link from "next/link";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";

import { getNoteById } from "@/data/server/note";
import BackButton from "@/components/ui/button/back-button";
import RelatedNoteCarousel from "@/components/ui/carousel/related-note-carousel";
type Props = {
  params: { id: string };
};

export default async function NoteDetailPage({ params }: Props) {
  const { data } = await getNoteById(+params.id);
  if (!data) {
    return <div>No Note Available</div>;
  }
  return (
    <>
      <section className="flex gap-2 flex-col">
        <BackButton />
        <h1 className="text-2xl">{data.title}</h1>
        <Tag color="blue" className="text-xs h-6">
          React
        </Tag>
        <div className="flex justify-between items-end sm:items-center sm:flex-row flex-col my-2 gap-y-2">
          <div className="flex gap-4 sm:justify-start justify-between items-center w-full">
            <Link href={"/profile/id"}>
              <div className="flex gap-2">
                <Avatar className="size-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">John Doe</p>
                  <p className="text-xs text-neutral-400">16 Jul 2024</p>
                </div>
              </div>
            </Link>
            <div className="block sm:hidden">
              <ContactButton layout="mobile" />
            </div>
            <div className="hidden sm:block">
              <ContactButton layout="alternative" />
            </div>
          </div>
          <div className="flex gap-2 items-end">
            <Button
              // onClick={handleButtonClick}
              variant={"icon"}
              className="group size-9 hover:text-red-500 hover:border-red-500 self-end border border-neutral-600 p-1 rounded-full"
            >
              <FaRegHeart size={16} />
            </Button>
            <Button
              // onClick={handleButtonClick}
              variant={"icon"}
              className="group size-9 hover:text-blue-500 hover:border-blue-500 self-end border border-neutral-600 p-1 rounded-full"
            >
              <IoBookmarkOutline size={16} />
            </Button>
          </div>
        </div>
        <Render note={data} />
      </section>
      <RelatedNoteCarousel />
    </>
  );
}
