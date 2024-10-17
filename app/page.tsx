import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const code = searchParams?.code;

  // Only redirect if the "code" parameter is not present
  if (!code) {
    redirect("/dashboard");
  }

  return <main>{/* <ThemeSwitch /> */}</main>;
}
