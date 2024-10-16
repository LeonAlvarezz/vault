import RenderWithTiptap from "@/components/tiptap/RenderWithTiptap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ContactButton from "@/components/ui/button/contact-button";
import Tag from "@/components/ui/tag";
import { Link } from "react-transition-progress/next";
import React from "react";
import { FaHeart, FaPen, FaRegHeart } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";

import { getNoteById, increaseView, isNoteOwner } from "@/data/server/note";
import BackButton from "@/components/ui/button/back-button";
import RelatedNoteCarousel from "@/components/ui/carousel/related-note-carousel";
import Render from "@/components/tiptap/Render";
import RenderHTML from "@/components/tiptap/RenderHTML";
import InteractionButton from "@/components/ui/note-card/interaction-button";
import { likeNote } from "@/data/server/like";
import { bookmarkNote } from "@/data/server/bookmark";
import { revalidatePath } from "next/cache";
import { formatDate } from "@/lib/date";
import { notFound } from "next/navigation";
import { description } from "../../dashboard/_components/overview-chart";
import { Metadata } from "next";
type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: note } = await getNoteById(params.id);
  return {
    title: note ? note.title : "Vault Note",
    description: note?.content_text,
    openGraph: {
      images: [
        {
          url:
            note?.cover_url ||
            "https://wymuicbyisnovfjqtfjc.supabase.co/storage/v1/object/public/note-images/image/Vault%20Planning%20Logo.png",
        },
      ],
    },
  };
}

export default async function NoteDetailPage({ params }: Props) {
  // TODO: Protect this route, make it accessible only when it is published
  const { count, error } = await isNoteOwner(params.id);
  const isOwner = count && count > 1 ? true : false;
  const { data: note } = await getNoteById(params.id);

  if (!note) {
    notFound();
  }

  // TODO: Uncomment to enable increase view
  const { error: viewError } = await increaseView(params.id);
  if (viewError) {
    console.error("Failed to increase view count:", viewError);
  }

  const toggleLike = async () => {
    "use server";
    const { error } = await likeNote(note.id);
    if (!error) {
      revalidatePath("/note");
    }
    return error;
  };

  const toggleBookmark = async () => {
    "use server";
    const { error } = await bookmarkNote(note.id);
    if (!error) {
      revalidatePath("/note");
    }
    return error;
  };
  return (
    <div className="pb-10">
      <section className="flex gap-2 flex-col">
        <div className="flex justify-between items-center">
          <BackButton />
          {isOwner && (
            <Link
              href={`/create/${note.id}`}
              className="h-fit hover:text-second p-1"
            >
              <FaPen size={12} />
            </Link>
          )}
        </div>
        <h1 className="text-2xl">{note.title}</h1>
        {note?.categories && (
          <Tag color={note?.categories.color!} className="h-6">
            <p>{note?.categories.name!}</p>
          </Tag>
        )}
        <div className="flex justify-between items-end sm:items-center sm:flex-row flex-col mt-2 mb-6 gap-y-2">
          <div className="flex gap-4 sm:justify-start justify-between items-center w-full">
            <Link href={`/profile/${note.profile_id}`}>
              <div className="flex gap-2">
                <Avatar className="size-10">
                  {note.profile?.avatar_url && (
                    <AvatarImage src={note.profile.avatar_url} />
                  )}
                  <AvatarFallback>
                    {note.profile?.username.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">{note.profile.username}</p>
                  <p className="text-xs text-neutral-400">
                    {formatDate(note.published_at || "")}
                  </p>
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
          <InteractionButton
            note={note}
            toggleBookmark={toggleBookmark}
            toggleLike={toggleLike}
            bookmark={
              note.bookmarks &&
              note.bookmarks.length > 0 &&
              note.bookmarks[0].deleted_at === null
                ? true
                : false
            }
          />
        </div>
        <Render content={note.content} />
      </section>
      {/* <RelatedNoteCarousel /> */}
    </div>
  );
}
