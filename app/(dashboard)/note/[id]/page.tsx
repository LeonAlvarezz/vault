import RenderWithTiptap from "@/components/tiptap/RenderWithTiptap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ContactButton from "@/components/ui/button/contact-button";
import Tag from "@/components/ui/tag";
import { Link } from "react-transition-progress/next";
import React, { cache, Suspense } from "react";
import { FaHeart, FaPen, FaRegHeart } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";

import { getNoteById, increaseView, isNoteOwner } from "@/data/server/note";
import BackButton from "@/components/ui/button/back-button";
import RelatedNoteCarousel from "@/components/ui/carousel/related-note-carousel";
import Render from "@/components/tiptap/Render";
import InteractionButton from "@/components/ui/note-card/interaction-button";
import { likeNote } from "@/data/server/like";
import { bookmarkNote } from "@/data/server/bookmark";
import { revalidatePath } from "next/cache";
import { formatDate } from "@/lib/date";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllAvailableNoteForParams } from "@/data/client/note";
import NoteDetailSkeleton from "@/components/ui/skeleton/note-detail-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
export const revalidate = 30;

type Props = {
  params: Promise<{ id: string }>;
};

const getNote = cache(async (noteId: string) => {
  const { data, error } = await getNoteById(noteId);
  return { data, error };
});

export async function generateStaticParams() {
  const { data: notes } = await getAllAvailableNoteForParams();
  return notes!
    .map(({ id }) => ({
      id,
    }))
    .slice(0, 100);
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: note } = await getNote(params.id);
  return {
    title: note ? note.title : "Vault Note",
    description: note?.content_text?.slice(0, 150),
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

export default async function NoteDetailPage(props: Props) {
  const params = await props.params;
  const { count, error } = await isNoteOwner(params.id);
  const isOwner = count && count > 0 ? true : false;
  const { data: note } = await getNote(params.id);
  const loading = true;

  if (!note) {
    notFound();
  }

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
  if (loading) {
  }
  return (
    <article className="pb-10">
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
        <Suspense fallback={<NoteDetailSkeleton />}>
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
                <ContactButton layout="mobile" profile={note.profile} />
              </div>
              <div className="hidden sm:block">
                <ContactButton layout="alternative" profile={note.profile} />
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
        </Suspense>
      </section>
      {/* <RelatedNoteCarousel /> */}
    </article>
  );
}
