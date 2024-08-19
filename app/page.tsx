import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/theme/ThemeSwitch";
import supabase from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/dashboard");
  return <main>{/* <ThemeSwitch /> */}</main>;
}
