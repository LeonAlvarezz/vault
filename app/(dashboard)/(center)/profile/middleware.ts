// middleware.js
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Check if the user is accessing "/profile" without query parameters
  if (url.pathname === "/profile" && !url.searchParams.has("view")) {
    // Redirect to "/profile?view=note"
    url.searchParams.set("view", "note");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
