import { cn } from "@/lib/utils";
import React from "react";
type Props = {
  color?: "red" | "violet" | "green" | "blue" | "violet" | "yellow" | "orange"; // Limit color options
  className?: string;
};

export default function Tag({ className, color = "blue" }: Props) {
  const colorClasses = {
    red: "border-red-300 text-red-300",
    violet: "border-violet-300 text-violet-300",
    green: "border-green-300 text-green-300",
    purple: "border-purple-300 text-purple-300",
    yellow: "border-yellow-300 text-yellow-300",
    orange: "border-orange-300 text-orange-300",
    blue: "border-blue-300 text-blue-300", // default color
  };

  return (
    <div
      className={cn(
        `w-fit h-5 border rounded-full text-[10px] items-center flex justify-center px-4`,
        colorClasses[color], // Apply the color-specific classes
        className
      )}
    >
      <p>React</p>
    </div>
  );
}
