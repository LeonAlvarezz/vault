import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import React from "react";

export default function SettingNotification() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Notification</h1>
      <Separator className="bg-neutral-700 my-3" />
      <div className="flex gap-4 flex-col mt-8">
        <div className="flex gap-4 justify-between items-center">
          <div>
            <h3 className="text-sm">Mobile Push Notification</h3>
            <p className="text-xs text-neutral-500 leading-normal sm:leading-loose">
              Receive push notifications through your mobile
            </p>
          </div>
          <Switch />
        </div>
        <div className="flex gap-4 justify-between items-center">
          <div>
            <h3 className="text-sm">Desktop Push Notification </h3>
            <p className="text-xs text-neutral-500 leading-normal sm:leading-loose">
              Receive push notifications through your desktop
            </p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
}
