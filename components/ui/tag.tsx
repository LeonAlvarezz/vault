import { cn } from "@/lib/utils";
import React from "react";
type Props = {
  children: React.ReactNode;
  color?: string; // Limit color options
  className?: string;
};

export default function Tag({ className, color = "blue", children }: Props) {
  const colorClasses = {
    red: "border-red-300 text-red-300",
    violet: "border-violet-300 text-violet-300",
    green: "border-green-300 text-green-300",
    purple: "border-purple-300 text-purple-300",
    yellow: "border-yellow-300 text-yellow-300",
    orange: "border-orange-300 text-orange-300",
    gray: "border-gray-300 text-gray-300", // for neutral tones
    teal: "border-teal-300 text-teal-300", // for greenish blue
    indigo: "border-indigo-300 text-indigo-300", // for deeper blue tones
    blue: "border-blue-300 text-blue-300", // default color
  };

  return (
    <div
      className={cn(
        `w-fit h-6 border rounded-full text-[12px] items-center flex justify-center px-4`,
        colorClasses[color], // Apply the color-specific classes
        className
      )}
    >
      {children}
      {/* <p>{label}</p> */}
    </div>
  );
}
