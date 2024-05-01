import { Textarea } from "@/components/ui/textarea";
import React from "react";
import SlateEditor from "./SlateEditor";
import Markdown from "react-markdown";

export default function InputContent() {
  return (
    // <Textarea
    //   className="dark:bg-slate-800 bg-slate-100 dark:text-white focus:outline-none text-md h-24"
    //   placeholder="Content Goes Here..."
    // />
    // <SlateEditor />
    <Textarea
      className="dark:bg-slate-800 bg-slate-100 dark:text-white focus:outline-none text-md h-24"
      placeholder="Content Goes Here..."
    />
  );
}
