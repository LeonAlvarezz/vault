"use client";
import { breakpointColumnsObj } from "@/components/ui/infinite-scroll/explore-infinite-scroll";
import NoteCard from "@/components/ui/note-card/note-card";
import NoteCardPublished from "@/components/ui/note-card/note-card-published";
import NoteSkeleton from "@/components/ui/skeleton/note-skeleton";
import { Bookmark } from "@/types/bookmark.type";
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
type Props = {
  bookmarks: Bookmark[];
  optionButton?: boolean;
};
export default function BookmarkList({
  bookmarks,
  optionButton = false,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);

  // This effect will run only on the client
  useEffect(() => {
    setIsLoading(false); // Set loading to false once the component has hydrated
  }, []);

  if (isLoading) {
    return <NoteSkeleton />;
  }

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-2 my-6" // Ensure there's a gap between columns
      columnClassName="my-masonry-grid_column" // Add your own styling here if needed
    >
      {bookmarks?.map((bookmark) =>
        bookmark.note?.published_at ? (
          <NoteCardPublished
            key={bookmark.id}
            note={bookmark.note}
            optionButton={optionButton}
            isLike={
              bookmark.note.likes &&
              bookmark.note.likes.length > 0 &&
              bookmark.note.likes[0].deleted_at === null
                ? true
                : false
            }
            isBookmark={true}
          />
        ) : (
          <NoteCard key={bookmark.id} note={bookmark.note} />
        )
      )}
    </Masonry>
  );
}
