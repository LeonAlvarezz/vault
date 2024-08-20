import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });
  const url = request.nextUrl.clone();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          const cookie = request.cookies.get(name);
          return cookie ? cookie.value : undefined;
        },
        set(name, value, options) {
          request.cookies.set(name, value);
          supabaseResponse = NextResponse.next({ request });
          supabaseResponse.cookies.set(name, value, options);
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
  const protectedPaths = [
    "/dashboard",
    "/explore",
    "/note",
    "/settings",
    "/profile",
    "/bookmark",
  ];

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!user && isProtectedPath && !request.url.startsWith("/auth")) {
    url.pathname = "/auth/login";
    console.log("url.pathnam:", url.pathname);
    return NextResponse.redirect(url);
  }

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
