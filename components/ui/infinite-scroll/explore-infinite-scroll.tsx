"use client";
import { Note, NoteFilter } from "@/types/note.type";
import React, { Suspense, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NoteCardPublished from "../note-card/note-card-published";
import NoteCard from "../note-card/note-card";
import { CURSOR_LIMIT, getCursorNote } from "@/data/client/note";
import Spinner from "../spinner";
import { toast } from "../use-toast";
import Masonry from "react-masonry-css";
import NoteList from "@/components/ui/list/note-list";

export const breakpointColumnsObj = {
  default: 3,
  1400: 2,
  400: 1,
};

type Props = {
  notes: Note[];
  searchParams?: { [key: string]: string | string[] | undefined };
};
export default function ExploreInfiniteScroll({ notes, searchParams }: Props) {
  const [noteItems, setNoteItems] = useState<Note[]>(notes);
  const [range, setRange] = useState({
    from: CURSOR_LIMIT,
    to: CURSOR_LIMIT + CURSOR_LIMIT,
  });
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    // Set hasMore based on the initial notes
    if (notes && notes.length >= CURSOR_LIMIT) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [notes]);

  const fetchMore = async () => {
    const { data, error } = await getCursorNote(
      searchParams as NoteFilter,
      range.from,
      range.to
    );

    if (error) {
      toast({
        title: "Failed to Fetch Notes",
      });
      // Stop further fetching if there was an error
      setHasMore(false);
      return;
    }

    if (data && data.length > 0) {
      setNoteItems((prev) => [...prev, ...data]);

      // Update range for the next fetch
      setRange((prevRange) => ({
        from: prevRange.to,
        to: prevRange.to + CURSOR_LIMIT,
      }));

      // If the number of returned notes is less than CURSOR_LIMIT, stop fetching
      if (data.length < CURSOR_LIMIT) {
        setHasMore(false);
      }
    } else {
      // No more data, stop fetching
      setHasMore(false);
    }
  };

  useEffect(() => {
    setNoteItems(notes);
  }, [notes]);

  return (
    <InfiniteScroll
      dataLength={noteItems.length} // use noteItems here, not notes
      next={fetchMore}
      hasMore={hasMore}
      scrollThreshold={0.5}
      loader={
        <div className="w-full grid grid-cols-1 place-items-center py-2.5">
          <Spinner size={18} />
        </div>
      }
      className="!overflow-visible mb-10"
    >
      <NoteList notes={noteItems} />
      {/* <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-2 my-6" // Ensure there's a gap between columns
        columnClassName="my-masonry-grid_column" // Add your own styling here if needed
      >
        {noteItems.map((note) =>
          note.published_at ? (
            <NoteCardPublished
              key={note.id}
              note={note}
              isBookmark={
                note.bookmarks &&
                note.bookmarks.length > 0 &&
                note.bookmarks[0].deleted_at === null
                  ? true
                  : false
              }
              isLike={
                note.likes &&
                note.likes.length > 0 &&
                note.likes[0].deleted_at === null
                  ? true
                  : false
              }
            />
          ) : (
            <NoteCard key={note.id} note={note} />
          )
        )}
      </Masonry> */}
    </InfiniteScroll>
  );
}
