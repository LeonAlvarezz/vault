import { getAllNotes } from "@/data/server/note";
import Link from "next/link";
import React from "react";

export default async function page() {
  const notes = await getAllNotes();
  return (
    <div>
      <ul>
        {notes.data?.map((data) => (
          <Link href={`/feeds/${data.id}`}>
            <li
              className="text-blue-500 underline cursor-pointer"
              key={data.id}
            >
              {data.id}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
