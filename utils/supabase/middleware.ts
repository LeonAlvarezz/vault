import { CookieOptions, createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "../env";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });
  const url = request.nextUrl.clone();

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          supabaseResponse.cookies.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          supabaseResponse.cookies.set(name, "", options);
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();
  // const protectedPaths = [
  //   "/dashboard",
  //   "/explore",
  //   "/note",
  //   "/settings",
  //   "/profile",
  //   "/bookmark",
  // ];

  // const isProtectedPath = protectedPaths.some((path) =>
  //   request.nextUrl.pathname.startsWith(path)
  // );

  // if (!user && isProtectedPath && !request.url.startsWith("/auth")) {
  //   url.pathname = "/auth/login";
  //   return NextResponse.redirect(url);
  // }

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

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
