"use client";
import React, { useCallback, useEffect, useState } from "react";

type SparkleType = {
  id: string;
  translateX: number; // Randomized X-axis movement
  translateY: number; // Randomized Y-axis movement
  rotation: number; // Randomized rotation angle
  createdAt: number;
};
type Props = {
  animationDuration?: number;
  sparkleInterval?: number;
};
function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
export default function Sparkle({
  animationDuration = 2000,
  sparkleInterval = 200,
}: Props) {
  const [sparkles, setSparkles] = useState<SparkleType[]>([]);

  const createSparkle = useCallback(
    () => ({
      id: Math.random().toString(36).substr(2, 9),
      translateX: getRandom(-2000, 2000),
      translateY: getRandom(-2000, 2000),
      rotation: getRandom(180, 360),
      createdAt: Date.now(),
    }),
    []
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSparkles((currentSparkles) => {
        const now = Date.now();
        const newSparkles = currentSparkles.filter(
          (sparkle) => now - sparkle.createdAt < animationDuration
        );
        return [...newSparkles, createSparkle()];
      });
    }, sparkleInterval);

    return () => clearInterval(intervalId);
  }, [animationDuration, sparkleInterval, createSparkle]);

  return (
    <div className=" w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center -z-30">
      {sparkles.map((sparkle, index) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={
            {
              "--translateX": `${sparkle.translateX}%`,
              "--translateY": `${sparkle.translateY}%`,
              "--rotation": `${sparkle.rotation}deg`,
              "--delay": `${index * 0.1}s`,
              "--sparkle-animation-duration": `${animationDuration / 1000}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
