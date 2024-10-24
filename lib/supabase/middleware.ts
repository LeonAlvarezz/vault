import { env } from "@/utils/env";
import { isProtectedRoute, shouldCreateAnonymousUser } from "@/utils/route";
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

  const createAnonymousUserRoute = ["/note", "/explore"];

  // const { data } = await supabase.auth.getSession();
  // const user = data.session?.user;
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;
  const { pathname } = url;
  if (!user && shouldCreateAnonymousUser(pathname, createAnonymousUserRoute)) {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.error("Failed to sign in anonymously:", error);
      return NextResponse.next();
    }
  }

  const protectedPaths = {
    dashboard: "/dashboard",
    note: {
      base: "/note",
      protected: true,
      exceptions: [/^\/note\/[0-9a-fA-F\-]{36}$/], // UUID pattern
    },
    profile: {
      base: "/profile",
      protected: true,
      exceptions: [/^\/profile\/[0-9a-fA-F\-]{36}$/],
      additionalProtected: ["/profile/edit"],
    },
    settings: "/settings",
    create: "/create",
    bookmark: "/bookmark",
  };
  const needsAuth =
    ((!user || user.is_anonymous) &&
      isProtectedRoute(request.nextUrl.pathname, protectedPaths) &&
      !request.url.startsWith("/auth")) ||
    (!user && request.nextUrl.pathname === "/profile/edit");

  if (needsAuth) {
    console.log("GOING TO LOGIN");
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

  // if (
  //   url.pathname === "/explore" ||
  //   url.pathname.match(/^\/explore\/[^\/]+$/)
  // ) {
  //   // Only add the sortBy param if it's not already set
  //   if (!url.searchParams.has("sortBy")) {
  //     url.searchParams.set("sortBy", "trending");
  //     return NextResponse.redirect(url);
  //   }
  // }
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
