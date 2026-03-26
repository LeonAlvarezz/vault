import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { env } from "@/utils/env";
import { resolveAppOrigin } from "@/utils/string";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";
  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const { data: userProfile, error: userError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", data.user.id)
        .single();

      let redirectUrl: string;

      if (!userProfile) {
        redirectUrl = "/auth/register-username";
      } else {
        redirectUrl = "/dashboard";
      }

      const appOrigin = resolveAppOrigin({
        origin,
        forwardedHost: request.headers.get("x-forwarded-host"),
        forwardedProto: request.headers.get("x-forwarded-proto"),
        siteUrl: env.NEXT_PUBLIC_SITE_URL,
      });

      return NextResponse.redirect(`${appOrigin}${redirectUrl}`);
    }
  }

  return NextResponse.redirect("/auth/auth-code-error");
}
