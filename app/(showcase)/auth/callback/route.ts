import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL

  if (code) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Check if the user exists in your database
      const { data: userProfile, error: userError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", data.user.id)
        .single();

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      console.log("forwardedHost:", forwardedHost);
      const isLocalEnv = process.env.NODE_ENV === "development";
      console.log("isLocalEnv:", isLocalEnv);

      let redirectUrl: string;

      if (!userProfile) {
        // User doesn't exist, redirect to register username page
        redirectUrl = "/auth/register-username";
      } else {
        // User exists, redirect to dashboard
        redirectUrl = "/dashboard";
      }

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${redirectUrl}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${redirectUrl}`);
      } else {
        return NextResponse.redirect(`${origin}${redirectUrl}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
