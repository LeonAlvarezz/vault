"use client";
import React from "react";
import { FaBold, FaCode, FaItalic, FaLink, FaList } from "react-icons/fa";
import { RiCodeBlock } from "react-icons/ri";
import { TbBlockquote } from "react-icons/tb";
import { MdFormatListBulleted } from "react-icons/md";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Toggle } from "./toggle";
import { Button } from "./button";
import StatContainer from "./statistic/stat-container";
import ShareModal from "./modal/share-modal";

export default function FormatMenu() {
  return (
    <div className="flex gap-2 flex-col">
      <div className="flex justify-between">
        <Toggle variant="outline" aria-label="Toggle bold">
          <FaBold size={14} />
        </Toggle>
        <Toggle variant={"outline"} aria-label="Toggle italic">
          <FaItalic size={14} />
        </Toggle>
        <Toggle variant={"outline"} aria-label="Toggle code">
          <FaCode size={14} />
        </Toggle>
        <Toggle variant={"outline"} aria-label="Toggle codeblock">
          <RiCodeBlock size={14} />
        </Toggle>
      </div>
      <Select>
        <SelectTrigger className="w-full ">
          <SelectValue placeholder="Heading" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="heading1">Heading 1</SelectItem>
          <SelectItem value="heading2">Heading 2</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex justify-between">
        <Toggle variant={"outline"} aria-label="Toggle blockquote">
          <TbBlockquote size={14} />
        </Toggle>
        <Toggle variant={"outline"} aria-label="Toggle bulleted list">
          <MdFormatListBulleted size={14} />
        </Toggle>
        <Toggle variant={"outline"} aria-label="Toggle list">
          <FaList size={14} />
        </Toggle>
        <Button
          variant={"outline"}
          aria-label="Toggle link"
          className="p-3 w-fit h-fit"
        >
          <FaLink size={14} />
        </Button>
      </div>
    </div>
  );
}
