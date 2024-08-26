import type { Metadata, Viewport } from "next";
import { Inter as font } from "next/font/google";
import "./globals.css";
import "./main.scss";
import Providers from "@/providers/provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import CommandSearch from "@/components/ui/search/command-search";

// const inter = Inter({ subsets: ["latin"] });
const test = font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vault",
  description:
    "Vault is a developer-centric platform that integrates personal note-taking, knowledge sharing, and professional networking.",
};
export const viewport: Viewport = {
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="dark"
      data-theme="dark "
    >
      <body
        className={cn(
          "dark:bg-app_background bg-app_background",
          test.className
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
        {/* <CommandSearch /> */}
      </body>
    </html>
  );
}
