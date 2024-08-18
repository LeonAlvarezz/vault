// middleware.js
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (
    url.pathname === "/profile" ||
    (url.pathname.match(/^\/profile\/[^\/]+$/) &&
      url.pathname !== "/profile/edit")
  ) {
    if (!url.searchParams.has("view")) {
      url.searchParams.set("view", "note");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/profile/:path*"],
};
