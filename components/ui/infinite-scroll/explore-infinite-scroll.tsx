"use client";
import { Note, NoteFilter } from "@/types/note.type";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NoteCardPublished from "../note-card/note-card-published";
import NoteCard from "../note-card/note-card";
import { CURSOR_LIMIT, getCusorNote } from "@/data/client/note";
import Spinner from "../spinner";

type Props = {
  notes: Note[];
  searchParams?: { [key: string]: string | string[] | undefined };
  isMore: boolean;
};

export default function ExploreInfiniteScroll({
  notes,
  searchParams,
  isMore,
}: Props) {
  const [noteItems, setNoteItems] = useState<Note[]>(notes);
  const [range, setRange] = useState({
    from: CURSOR_LIMIT,
    to: CURSOR_LIMIT + CURSOR_LIMIT,
  });
  const [hasMore, setHasMore] = useState(isMore);

  const fetchMore = async () => {
    console.log("fetch");
    const { data, error } = await getCusorNote(
      searchParams as NoteFilter,
      range.from,
      range.to
    );

    if (data && data.length > 0) {
      setNoteItems((prev) => [...prev, ...data]);
      setRange((prevRange) => ({
        from: prevRange.to,
        to: prevRange.to + CURSOR_LIMIT,
      }));
    }

    // If no more data is returned, set hasMore to false to stop loading
    if (data && data.length >= CURSOR_LIMIT) {
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
      loader={
        <div className="w-full grid grid-cols-1 place-items-center py-2.5">
          <Spinner size={18} />
        </div>
      }
    >
      <section className="columns-1 sm:columns-2 2xl:columns-3 gap-2 space-y-2 my-6 align-super">
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
      </section>
    </InfiniteScroll>
  );
}
