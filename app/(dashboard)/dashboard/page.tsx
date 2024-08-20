import { redirect, usePathname } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaEye } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaBookBookmark } from "react-icons/fa6";
import { OverviewChart } from "./_components/overview-chart";
import EditNoteDropdownMenu from "@/components/ui/dropdown/edit-note-dropdown";
import { MdHistory } from "react-icons/md";
import { createClient } from "@/utils/supabase/server";

export default async function page() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 ">Dashboard</h1>
      <div className="flex flex-col gap-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="w-full">
            <CardHeader>
              <div className="flex justify-between">
                <p className="text-sm">Total View</p>
                <FaEye />
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-2xl">2000</p>
              <p className="font-bold text-xs text-neutral-200">
                <span className="text-green-400"> +100%</span> more than last
                month
              </p>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <div className="flex justify-between">
                <p className="text-sm">Total Likes</p>
                <AiFillLike />
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-2xl">200</p>
              <p className="font-bold text-xs text-neutral-200">
                <span className="text-green-400"> +100%</span> more than last
                month
              </p>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <div className="flex justify-between">
                <p className="text-sm">Total Bookmark</p>
                <FaBookBookmark />
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-2xl">10</p>
              <p className="font-bold text-xs text-neutral-200">
                <span className="text-green-400"> +10</span> more than last
                month
              </p>
            </CardContent>
          </Card>
        </div>
        <OverviewChart />
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
      </div>
    </div>
  );
}
