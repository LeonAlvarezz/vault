"use client";
import React, { startTransition, useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Note } from "@/types/note.type";
import { formatDate } from "@/lib/date";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { Toggle } from "../toggle";
import { AuthError, PostgrestError } from "@supabase/supabase-js";
import { useToast } from "../use-toast";
import { useProgress } from "react-transition-progress";
import { likeNote } from "@/data/server/like";
import { bookmarkNote } from "@/data/server/bookmark";
type Props = {
  note: Note;
};
export default function NoteCardFooter({ note }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLikePending, startLikeTransition] = useTransition();
  const [isLike, setIsLike] = useState(
    note.likes && note.likes.length > 0 && note.likes[0].deleted_at === null
  );
  const [isBookmark, setIsBookmark] = useState(
    note.bookmarks &&
      note.bookmarks.length > 0 &&
      note.bookmarks[0].deleted_at === null
  );
  const [isBookmarkPending, startBookmarkTransition] = useTransition();
  const startProgress = useProgress();
  const handleToggleBookmark = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      startBookmarkTransition(async () => {
        const { error } = await bookmarkNote(note.id);
        if (error) {
          toast({
            title: "Error Bookmark Post",
            description: error.message,
            variant: "destructive",
          });
        } else {
          if (isBookmark) {
            toast({
              title: "Remove Note from Bookmark ",
              variant: "success",
            });
          } else {
            toast({
              title: "Add Note to Bookmark ",
              variant: "success",
            });
          }

          setIsBookmark((prev) => !prev);
        }
      });
    } catch (error) {
      toast({
        title: "Unexpected Error!",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    }
  };

  const handleToggleLike = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    try {
      startLikeTransition(async () => {
        const { error } = await likeNote(note.id);
        if (error) {
          toast({
            title: "Error Liking Post",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setIsLike((prev) => !prev);
        }
      });
    } catch (error) {
      toast({
        title: "Unexpected Error!",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    }
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    startTransition(() => {
      startProgress();
      router.push(`/profile/${note.profile?.id}`);
    });
  };
  return (
    <div className="flex justify-between w-full items-center mt-4">
      <div
        className="flex gap-2 rounded-sm p-0.5 transition-all hover:bg-neutral-700/50 items-center"
        onClick={handleProfileClick}
      >
        <Avatar className="w-7 h-7">
          {note.profile?.avatar_url && (
            <AvatarImage src={note.profile.avatar_url} />
          )}
          <AvatarFallback>
            {note.profile?.username.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <p className="text-sm text-neutral-200">{note.profile?.username}</p>
          <p className="text-xs text-neutral-500">
            {formatDate(note.published_at || "")}
          </p>
        </div>
      </div>
      <div className="flex gap-1 items-end">
        <Toggle
          aria-label="Toggle like"
          onClick={handleToggleLike}
          className="p-0 h-fit"
          disabled={isLikePending} // Optionally disable the button while the transition is in progress
        >
          {isLikePending || isLike ? (
            <IoIosHeart size={20} className="text-red-500 hover:opacity-50" />
          ) : (
            <IoIosHeartEmpty size={20} className="hover:text-red-500" />
          )}
        </Toggle>

        <Toggle
          aria-label="Toggle bookmark"
          onClick={handleToggleBookmark}
          className="p-0 h-fit "
          disabled={isBookmarkPending} // Optionally disable the button while the transition is in progress
        >
          {isBookmarkPending || isBookmark ? (
            <IoBookmark size={20} className="text-blue-500 hover:opacity-50" />
          ) : (
            <IoBookmarkOutline size={20} className="hover:text-blue-500" />
          )}
        </Toggle>
      </div>
    </div>
  );
}
