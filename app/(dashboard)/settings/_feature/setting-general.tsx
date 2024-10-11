"use client";
import { Button } from "@/components/ui/button";
import ShortcutButton from "@/components/ui/button/shortcut-button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useSettings } from "@/stores/setting";
import React, { use, useEffect } from "react";

export default function SettingGeneral() {
  const { disable_command_search, keyboard_shortcuts, setDisableSearch } =
    useSettings();
  const handleCheckChange = async () => {
    setDisableSearch(!disable_command_search);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">General</h1>
      <Separator className="bg-neutral-700 my-3" />{" "}
      <div className="flex gap-4 flex-col mt-8">
        <div className="flex gap-4 justify-between items-center">
          <div>
            <h3 className="text-sm">Disable Search</h3>
            <p className="text-xs text-neutral-500 leading-normal sm:leading-loose">
              Disable vault advance search with keyboard shortcut
            </p>
          </div>
          <Switch
            checked={disable_command_search}
            onCheckedChange={handleCheckChange}
          />
        </div>
        <div
          className={cn(
            "gap-4 justify-between items-center sm:flex hidden",
            disable_command_search && "opacity-50"
          )}
        >
          <div>
            <h3 className="text-sm">Command Search Shortcut</h3>
            <p className="text-xs text-neutral-500 leading-normal sm:leading-loose">
              Customize the shortcut used to trigger Command Search.
            </p>
          </div>
          <ShortcutButton disabled={disable_command_search} />
        </div>
      </div>
    </div>
  );
}
