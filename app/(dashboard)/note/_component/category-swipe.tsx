"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Category } from "@/types/category.type";
import Link from "next/link";
import { Suspense, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
type Props = {
  categories: Category[];
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function CategorySwipe({ categories, searchParams }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={sliderRef}
      onMouseDown={(e) => {
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current!.offsetLeft);
        setScrollLeft(sliderRef.current!.scrollLeft);
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={(e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current!.offsetLeft;
        const walk = (x - startX) * 1; // Adjust scrolling speed
        sliderRef.current!.scrollLeft = scrollLeft - walk;
      }}
      className="flex gap-4 overflow-x-auto no-scrollbar noselect cursor-grab"
    >
      <Suspense fallback={<Skeleton className="w-full rounded-md h-20" />}>
        <Link
          href={"?category=all"}
          className={cn(
            "rounded-full px-8 text-sm border w-fit h-10 py-2 hover:cursor-pointer border-neutral-700 hover:border-main hover:text-second capitalize flex justify-center items-center",
            (searchParams?.category === "all" || !searchParams?.category) &&
              "bg-main border-0 hover:text-white",
            isDragging && "cursor-grab"
          )}
        >
          <p className="w-full whitespace-nowrap">All Note</p>
        </Link>
        {categories ? (
          categories.map((category) => (
            <Link
              href={"?category=" + category.name}
              key={category.id}
              className={cn(
                "rounded-full px-8 text-sm border w-fit h-10 py-2 border-neutral-700 hover:border-main hover:text-second capitalize flex justify-center items-center",
                searchParams?.category === category.name &&
                  "bg-main border-0 hover:text-white"
              )}
            >
              <p className="w-full whitespace-nowrap">{category.name}</p>
            </Link>
          ))
        ) : (
          <Skeleton className="w-full rounded-md h-20" />
        )}
      </Suspense>
    </div>
  );
}
