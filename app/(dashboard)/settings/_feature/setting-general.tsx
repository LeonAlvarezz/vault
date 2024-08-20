import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import React from "react";

export default function SettingGeneral() {
  return (
    <div>
      <h1 className="text-2xl font-bold">General</h1>
      <Separator className="bg-neutral-700 my-3" />{" "}
      <div className="flex gap-4 flex-col mt-8">
        <div className="flex gap-4 justify-between items-center">
          <div>
            <h3 className="text-sm">Command Search</h3>
            <p className="text-xs text-neutral-600 leading-normal sm:leading-loose">
              Enable vault advance search with keyboard shortcut
            </p>
          </div>
          <Switch />
        </div>
        <div className="flex gap-4 justify-between items-center">
          <div>
            <h3 className="text-sm">Command Search Shortcut</h3>
            <p className="text-xs text-neutral-600 leading-normal sm:leading-loose">
              Customize the shortcut used to trigger Command Search.
            </p>
          </div>
          <Button variant="outline" className="font-normal text-xs" size={"sm"}>
            Ctrl + Shift + F
          </Button>
        </div>
      </div>
    </div>
  );
}
