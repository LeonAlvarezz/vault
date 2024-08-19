// middleware.js
import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(req: NextRequest) {
  return await updateSession(req);
  // const url = req.nextUrl.clone();

  // if (
  //   url.pathname === "/profile" ||
  //   (url.pathname.match(/^\/profile\/[^\/]+$/) &&
  //     url.pathname !== "/profile/edit")
  // ) {
  //   if (!url.searchParams.has("view")) {
  //     url.searchParams.set("view", "note");
  //     return NextResponse.redirect(url);
  //   }
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
