import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EditNoteDropdownMenu from "@/components/ui/dropdown/edit-note-dropdown";
import React from "react";
import { MdHistory } from "react-icons/md";

export default function RecentNoteCard() {
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
          <div className="flex justify-between items-center w-full py-1 px-4 hover:bg-neutral-700/50 cursor-pointer rounded-sm">
            <h2>{`What's React`}</h2>
            <EditNoteDropdownMenu />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
