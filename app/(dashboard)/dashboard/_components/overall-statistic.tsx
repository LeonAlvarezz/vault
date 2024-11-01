import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { NoteSummary } from "@/types/note-metric.type";
import { calculateDiffRate } from "@/utils/number";
import React from "react";
import { AiFillLike } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { IoBookmark } from "react-icons/io5";
type Props = {
  summary: NoteSummary | null;
};

export default function OverallStatistic({ summary }: Props) {
  const viewDiff = calculateDiffRate(
    summary?.total_view || 0,
    summary?.total_view_last_week || 0
  );
  const likeDiff = calculateDiffRate(
    summary?.total_like || 0,
    summary?.total_like_last_week || 0
  );
  const bookmarkDiff = summary?.total_bookmark_last_week || 0;
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between">
            <p className="text-sm">Total View</p>
            <FaEye />
          </div>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-2xl">{summary?.total_view || 0}</p>
          <p className="font-bold text-xs text-neutral-200">
            <span
              className={cn(
                "text-green-400",
                viewDiff < 0 && "text-red-400",
                viewDiff == 0 && "text-neutral-400"
              )}
            >
              {viewDiff > 0 && "+"}
              {viewDiff}%
            </span>{" "}
            more than last week
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
          <p className="font-bold text-2xl">{summary?.total_like || 0}</p>
          <p className="font-bold text-xs text-neutral-200">
            <span
              className={cn(
                "text-green-400",
                likeDiff < 0 && "text-red-400",
                likeDiff == 0 && "text-neutral-400"
              )}
            >
              {likeDiff > 0 && "+"}
              {likeDiff}%
            </span>{" "}
            more than last week
          </p>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between">
            <p className="text-sm">Total Bookmark</p>
            <IoBookmark />
          </div>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-2xl">{summary?.total_bookmark || 0}</p>
          <p className="font-bold text-xs text-neutral-200">
            <span
              className={cn(
                "text-green-400",
                bookmarkDiff < 0 && "text-red-400",
                bookmarkDiff == 0 && "text-neutral-400"
              )}
            >
              {bookmarkDiff >= 0 && "+"}
              {bookmarkDiff}
            </span>{" "}
            more than last week
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
