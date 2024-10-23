"use client";
import { breakpointColumnsObj } from "@/components/ui/infinite-scroll/explore-infinite-scroll";
import NoteCard from "@/components/ui/note-card/note-card";
import NoteCardPublished from "@/components/ui/note-card/note-card-published";
import NoteSkeleton from "@/components/ui/skeleton/note-skeleton";
import { Note } from "@/types/note.type";
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
type Props = {
  notes: Note[];
  optionButton?: boolean;
};
export default function NoteList({ notes, optionButton = false }: Props) {
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
      {notes?.map((note) =>
        note.published_at ? (
          <NoteCardPublished
            key={note.id}
            note={note}
            optionButton={optionButton}
            isLike={
              note.likes &&
              note.likes.length > 0 &&
              note.likes[0].deleted_at === null
                ? true
                : false
            }
            isBookmark={
              note.bookmarks &&
              note.bookmarks.length > 0 &&
              note.bookmarks[0].deleted_at === null
                ? true
                : false
            }
          />
        ) : (
          <NoteCard key={note.id} note={note} />
        )
      )}
    </Masonry>
  );
}
