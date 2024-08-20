"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import InputContent from "./_components/InputContent";
import { BiCategory } from "react-icons/bi";
import { ICON_COLOR, ICON_SIZE } from "@/components/ui/sidebar/sidebar";
import { MultiSelect } from "@/components/ui/multi-select";
import FormatMenu from "@/components/ui/format-menu";
import StatContainer from "@/components/ui/statistic/stat-container";
import ShareModal from "@/components/ui/modal/share-modal";
import { Button } from "@/components/ui/button";
import { FaTags } from "react-icons/fa";

export default function Page() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const TAG = [
    {
      value: "framework",
      label: "Framework",
    },
    {
      value: "Websocket",
      label: "Websocket",
    },
    {
      value: "tutorial",
      label: "Tutorial",
    },
  ];
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

  return (
    <>
      <div className="hidden xl:block fixed top-28 left-28 w-[200px]">
        <FormatMenu />
        <div className="flex flex-col gap-2 mt-4">
          <ShareModal>
            <Button variant={"main"}>Share</Button>
          </ShareModal>
          <Button variant={"main"}>Publish</Button>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <p>Statistic</p>
          <StatContainer label="Views" count={2000} rate={10} />
          <StatContainer label="Likes" count={100} />
          <StatContainer label="Bookmarks" count={50} />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          className="bg-app_background hover:bg-transparent focus:outline-none text-white text-2xl h-24 px-0"
          placeholder="Title"
        />
        <div className="flex gap-2 flex-col">
          <div className="flex sm:items-center items-start flex-col sm:flex-row sm:gap-0 gap-2">
            <div className="flex gap-2 w-1/3 ">
              <BiCategory
                size={ICON_SIZE}
                color={ICON_COLOR}
                className="flex-shrink-0"
              />
              <p className="text-sm">Category</p>
            </div>
            <MultiSelect
              options={TAG}
              placeholder="Click to select category "
              onValueChange={setSelectedFrameworks}
              defaultValue={selectedFrameworks}
              maxCount={2}
            />
          </div>
          <div className="flex sm:items-center items-start flex-col sm:flex-row sm:gap-0 gap-2 mb-6">
            <div className="flex gap-2 w-1/3 ">
              <FaTags
                size={ICON_SIZE}
                color={ICON_COLOR}
                className="flex-shrink-0"
              />
              <p className="text-sm">Tag</p>
            </div>
            <MultiSelect
              options={TAG}
              placeholder="Click to select tags"
              onValueChange={setSelectedFrameworks}
              defaultValue={selectedFrameworks}
              maxCount={2}
            />
          </div>
        </div>
        <InputContent />
      </form>
    </>
  );
}
