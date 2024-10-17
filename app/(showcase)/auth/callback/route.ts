import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCorrectOrigin } from "@/utils/string";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";
  if (code) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const { data: userProfile, error: userError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", data.user.id)
        .single();

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";

      let redirectUrl: string;
      const protocol = isLocalEnv ? "http" : "https";

      if (!userProfile) {
        redirectUrl = "/auth/register-username";
      } else {
        redirectUrl = "/dashboard";
      }

      if (isLocalEnv) {
        const correctOrigin = getCorrectOrigin(origin);
        return NextResponse.redirect(`${correctOrigin}${redirectUrl}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(
          `${protocol}://${forwardedHost}${redirectUrl}`
        );
      } else {
        return NextResponse.redirect(`${origin}${redirectUrl}`);
      }
    }
  }

  return NextResponse.redirect("/auth/auth-code-error");
}
