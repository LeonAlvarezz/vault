import { redirect } from "next/navigation";

export default async function Home(
  props: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  const code = searchParams?.code;

  // Only redirect if the "code" parameter is not present
  if (!code) {
    redirect("/dashboard");
  }

  return <main>{/* <ThemeSwitch /> */}</main>;
}
