import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import React from "react";

const LANGUAGE = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Chinese",
    value: "zh",
  },
];

export default function SettingLanguage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Language</h1>
      <Separator className="bg-neutral-700 my-3" />{" "}
      <div className="flex gap-4 flex-col mt-8">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm">Language</h3>
            <p className="text-xs text-neutral-600 leading-loose">
              Change language display in the user interface
            </p>
          </div>
          <Select defaultValue="en">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE.map((lang, index) => (
                <SelectItem key={index} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
