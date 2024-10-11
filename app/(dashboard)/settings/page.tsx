import React from "react";
import SettingGeneral from "./_feature/setting-general";
import SettingNotification from "./_feature/setting-notification";
import SettingLanguage from "./_feature/setting-language";

export default function SettingPage() {
  return (
    <div className="flex flex-col gap-20">
      <SettingGeneral />
      <SettingNotification />
      {/* <SettingLanguage /> */}
    </div>
  );
}
