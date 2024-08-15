import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./main.scss";
import Providers from "@/providers/provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("", inter.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
