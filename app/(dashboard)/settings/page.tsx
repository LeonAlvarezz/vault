import React from "react";
import SettingGeneral from "./_feature/setting-general";
import SettingNotification from "./_feature/setting-notification";
import SettingLanguage from "./_feature/setting-language";
import { Metadata } from "next";
import SettingSubscription from "./_feature/setting-subscription";

export const metadata: Metadata = {
  title: "Vault - Settings",
  description:
    "Customize your Vault experience with user settings, shortcuts, and preferences.",
};

export default function SettingPage() {
  return (
    <div className="flex flex-col gap-20">
      <SettingGeneral />
      <SettingSubscription />
      <SettingNotification />
      {/* <SettingLanguage /> */}
    </div>
  );
}
