"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import InputContent from "./_component/InputContent";
import { BiCategory } from "react-icons/bi";
import { ICON_COLOR, ICON_SIZE } from "@/components/ui/sidebar/sidebar";
import { Combobox } from "@/components/ui/combobox";
import { MultiSelect } from "@/components/ui/multi-select";
import { FaTag, FaTags } from "react-icons/fa";
import FormatMenu from "@/components/ui/format-menu";

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
      <FormatMenu />

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
