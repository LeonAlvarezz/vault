import { redirect, usePathname } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaEye } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FaBookBookmark } from "react-icons/fa6";
import { OverviewChart } from "./_components/overview-chart";
import EditNoteDropdownMenu from "@/components/ui/dropdown/edit-note-dropdown";
import { MdHistory } from "react-icons/md";
import RecentNoteCard from "./_components/recent-note-card";
import OverallStatistic from "./_components/overall-statistic";
import {
  getNoteMetricLast3Months,
  getNoteSummary,
} from "@/data/server/note-metric";

export default async function page() {
  const [{ data: noteSummary }, { data: noteMetrics }] = await Promise.all([
    getNoteSummary(),
    getNoteMetricLast3Months(),
  ]);
  console.log("noteSummary:", noteMetrics);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 ">Dashboard</h1>
      <div className="flex flex-col gap-2">
        <OverallStatistic summary={noteSummary} />
        <OverviewChart metrics={noteMetrics} />
        <RecentNoteCard />
      </div>
    </div>
  );
}
