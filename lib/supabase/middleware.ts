import { env } from "@/utils/env";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { NextFetchEvent, NextResponse, type NextRequest } from "next/server";

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

  const createAnonymousUserRoute = ["/note", "/profile", "/explore"];

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = url;
  if (
    !user &&
    createAnonymousUserRoute.some((path) => pathname.startsWith(path))
  ) {
    const { data: signInResult, error } =
      await supabase.auth.signInAnonymously();
    if (error) {
      console.error("Failed to sign in anonymously:", error);
      return NextResponse.next(); // You can handle this better, perhaps showing an error page
    }
  }

  const protectedPaths = [
    "/dashboard",
    "/note",
    "/create",
    "/settings",
    "/profile",
    "/bookmark",
  ];

  // Custom condition to exclude `/note/[id]` and `/profile/[id]` but protect `/note`, `/profile`, and `/profile/edit`
  const isProtectedPath = protectedPaths.some(
    (path) =>
      request.nextUrl.pathname.startsWith(path) &&
      !(
        path === "/note" && request.nextUrl.pathname.match(/^\/note\/[^\/]+$/)
      ) &&
      !(
        path === "/profile" &&
        request.nextUrl.pathname.match(/^\/profile\/[^\/]+$/)
      ) &&
      !(path === "/profile" && request.nextUrl.pathname === "/profile/edit")
  );

  if (
    ((user?.is_anonymous || !user) &&
      isProtectedPath &&
      !request.url.startsWith("/auth")) ||
    ((!user || user.is_anonymous) &&
      request.nextUrl.pathname === "/profile/edit")
  ) {
    url.pathname = "/auth/login";
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

  if (
    url.pathname === "/explore" ||
    url.pathname.match(/^\/explore\/[^\/]+$/)
  ) {
    // Only add the sortBy param if it's not already set
    if (!url.searchParams.has("sortBy")) {
      url.searchParams.set("sortBy", "trending");
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
