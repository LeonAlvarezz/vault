export const colorClasses = {
  red: "border-red-800 bg-red-900/30 text-white",
  violet: "border-violet-800 bg-violet-900/30 text-white",
  green: "border-green-800 bg-green-900/30 text-white",
  purple: "border-purple-800 bg-purple-900/30 text-white",
  yellow: "border-yellow-800 bg-yellow-900/30 text-white",
  orange: "border-orange-800 bg-orange-900/30 text-white",
  gray: "border-gray-800 bg-gray-900/30 text-white",
  teal: "border-teal-800 bg-teal-900/30 text-white",
  indigo: "border-indigo-800 bg-indigo-900/30 text-white",
  blue: "border-blue-800 bg-blue-900/30 text-white",
} as const;

export type Color = keyof typeof colorClasses;

// You can export the color classes for easier access
export const colors = Object.keys(colorClasses) as Color[];
