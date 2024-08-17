import React from "react";
type StatContainerProps = {
  label: string;
  count: number;
  rate?: number;
};
export default function StatContainer({
  label,
  count,
  rate,
}: StatContainerProps) {
  return (
    <div className="flex flex-col border border-neutral-700 p-3 w-full rounded-md">
      <p className="text-xs">{label}</p>
      <p className="text-2xl font-bold">
        {count}
        {rate && (
          <span className="text-green-200 text-sm ml-2 font-normal">+10%</span>
        )}
      </p>
    </div>
  );
}
