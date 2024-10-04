"use client";
import React, { useTransition } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { Button } from "../button";
import { Note } from "@/types/note.type";
import { AuthError, PostgrestError } from "@supabase/supabase-js";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { toast } from "../use-toast";
import { cn } from "@/lib/utils";
type Props = {
  note: Note;
  toggleLike: () => Promise<AuthError | PostgrestError | null | undefined>;
  toggleBookmark: () => Promise<AuthError | PostgrestError | null | undefined>;
  bookmark?: boolean;
};
export default function InteractionButton({
  toggleBookmark,
  toggleLike,
  note,
  bookmark = false,
}: Props) {
  const [isLikePending, startLikeTransition] = useTransition();
  const [isBookmarkPending, startBookmarkTransition] = useTransition();
  const handleToggleBookmark = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      startBookmarkTransition(async () => {
        const error = await toggleBookmark();
        if (error) {
          toast({
            title: "Error Bookmark Post",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Add Note to Bookmark",
            variant: "success",
          });
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
        const error = await toggleLike();
        if (error) {
          toast({
            title: "Error Liking Post",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Successfully Like Post",
            variant: "success",
          });
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

          isLikePending ||
            (note.likes &&
              note.likes.length > 0 &&
              note.likes[0].deleted_at === null &&
              "border-0 bg-red-500 hover:opacity-80 hover:bg-red-500")
        )}
      >
        {isLikePending ||
        (note.likes &&
          note.likes.length > 0 &&
          note.likes[0].deleted_at === null) ? (
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

          (isBookmarkPending || bookmark) &&
            "border-0 bg-blue-500 hover:opacity-80 hover:bg-blue-500"
        )}
      >
        {isBookmarkPending || bookmark ? (
          <IoBookmark size={20} />
        ) : (
          <IoBookmarkOutline size={20} className="group-hover:text-blue-500" />
        )}
      </Button>
    </div>
  );
}
