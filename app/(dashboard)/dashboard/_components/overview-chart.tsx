"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { NoteChartData, NoteMetric } from "@/types/note-metric.type";

export const description = "An interactive bar chart";
const mockData = [
  {
    date: "10/10/2024",
    views: 10,
  },
  {
    date: "10/11/2024",
    views: 11,
  },
  {
    date: "10/12/2024",
    views: 12,
  },
  {
    date: "10/13/2024",
    views: 14,
  },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
} satisfies ChartConfig;
type Props = {
  metrics: NoteChartData[] | null;
};
export function OverviewChart({ metrics }: Props) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("views");

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Overview</CardTitle>
          <CardDescription>
            Total note viewers for the last 3 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full "
        >
          {metrics && metrics.length > 0 ? (
            <BarChart
              accessibilityLayer
              data={metrics!}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                fill="000"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px] bg-popover"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar dataKey={activeChart} fill={"hsl(var(--second))"} />
            </BarChart>
          ) : (
            <div className="text-lg min-h-full w-full flex justify-center items-center ">
              No Data Available Yet
            </div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
