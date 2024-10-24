"use client";
import React, { useState, useTransition } from "react";
import { FaRegHeart } from "react-icons/fa";
import {
  IoBookmark,
  IoBookmarkOutline,
  IoShare,
  IoShareOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import { Button } from "../button";
import { Note } from "@/types/note.type";
import { AuthError, PostgrestError } from "@supabase/supabase-js";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { toast } from "../use-toast";
import { cn } from "@/lib/utils";
import ShareModal from "../modal/share-modal";
import { bookmarkNote } from "@/data/server/bookmark";
import { likeNote } from "@/app/api/action";
type Props = {
  note: Note;
  bookmark?: boolean;
};
export default function InteractionButton({ note, bookmark = false }: Props) {
  const [isLikePending, startLikeTransition] = useTransition();
  const [isLike, setIsLike] = useState(
    note.likes && note.likes.length > 0 && note.likes[0].deleted_at === null
  );
  const [isBookmarkPending, startBookmarkTransition] = useTransition();
  const [isBookmark, setIsBookmark] = useState(
    note.bookmarks &&
      note.bookmarks.length > 0 &&
      note.bookmarks[0].deleted_at === null
  );
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
          // Toggle the isLike state on success
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
  return (
    <div className="flex gap-2 items-end">
      <Button
        onClick={handleToggleLike}
        variant={"icon"}
        className={cn(
          "group size-9 hover:border-red-500 self-end border border-neutral-600 p-1 rounded-full",

          (isLikePending || isLike) &&
            "border-0 bg-red-500 hover:opacity-80 hover:bg-red-500"
        )}
        disabled={isLikePending}
      >
        {isLikePending || isLike ? (
          <IoIosHeart size={20} />
        ) : (
          <IoIosHeartEmpty size={20} className="group-hover:text-red-500" />
        )}
      </Button>
      <Button
        onClick={handleToggleBookmark}
        variant={"icon"}
        className={cn(
          "group size-9 hover:border-blue-500 self-end border border-neutral-600 p-1 rounded-full",

          (isBookmarkPending || isBookmark) &&
            "border-0 bg-blue-500 hover:opacity-80 hover:bg-blue-500"
        )}
        disabled={isBookmarkPending}
      >
        {isBookmarkPending || isBookmark ? (
          <IoBookmark size={20} />
        ) : (
          <IoBookmarkOutline size={20} className="group-hover:text-blue-500" />
        )}
      </Button>
      <ShareModal>
        <Button
          // onClick={handleToggleBookmark}
          variant={"icon"}
          className={cn(
            "group size-9 hover:border-blue-500 self-end border border-neutral-600 p-1 rounded-full"
          )}
        >
          <IoShareSocialOutline size={20} />
        </Button>
      </ShareModal>
    </div>
  );
}
