import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EditNoteDropdownMenu from "@/components/ui/dropdown/edit-note-dropdown";
import { Note } from "@/types/note.type";
import Link from "next/link";
import React from "react";
import { MdHistory } from "react-icons/md";
type Props = {
  notes: Note[];
};
export default function RecentNoteCard({ notes }: Props) {
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <div className="flex gap-2">
            <MdHistory size={20} />
            <p className="text-sm">Recent Note</p>
          </div>
        </CardHeader>
        <CardContent>
          {notes?.map((note) => (
            <Link
              key={note.id}
              href={`/create/${note.id}`}
              className="flex justify-between items-center w-full py-3 px-4 hover:bg-neutral-700/50 cursor-pointer rounded-sm"
            >
              <h2>{note.title}</h2>
              <EditNoteDropdownMenu note={note} />
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
