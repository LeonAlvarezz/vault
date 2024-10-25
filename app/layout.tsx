import type { Metadata, Viewport } from "next";
import { Inter as _font } from "next/font/google";
import "./globals.css";
import "./main.scss";
import "react-photo-view/dist/react-photo-view.css";
import ThemeProviders from "@/context/theme-context";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import CommandSearch from "@/components/ui/search/command-search";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {} from "@/context/categorization-context";
import { ProgressBar, ProgressBarProvider } from "react-transition-progress";
import { GoogleAnalytics } from "@next/third-parties/google";
import { createClient } from "@/lib/supabase/server";
import { getCacheUser } from "@/data/server/profiles";

// const inter = Inter({ subsets: ["latin"] });
const font = _font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vault",
  description:
    "Vault is a developer-centric platform that integrates personal note-taking, knowledge sharing, and professional networking.",
};
export const viewport: Viewport = {
  interactiveWidget: "resizes-content",
  userScalable: false,
};

export default async function RootLayout({
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
          "dark:bg-app_background bg-app_background overflow-x-hidden",
          font.className
        )}
      >
        <ThemeProviders>
          <ProgressBarProvider>
            <ProgressBar className="fixed h-1 shadow-lg shadow-sky-500/20 bg-main top-0 z-[999]" />
            {children}
            <CommandSearch />
          </ProgressBarProvider>
        </ThemeProviders>
        <Toaster />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-3MYVYZ3JNY" />
      </body>
    </html>
  );
}
