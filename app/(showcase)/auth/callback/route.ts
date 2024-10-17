import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const { data: userProfile, error: userError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", data.user.id)
        .single();

      const forwardedHost = request.headers.get("x-forwarded-host");
      const protocol = request.headers.get("x-forwarded-proto") || "https";
      const isProduction = process.env.NODE_ENV === "production";

      let redirectUrl: string;

      if (!userProfile) {
        redirectUrl = "/auth/register-username";
      } else {
        redirectUrl = "/dashboard";
      }

      if (isProduction && forwardedHost) {
        // Use forwarded host for correct URL in production
        return NextResponse.redirect(
          `${protocol}://${forwardedHost}${redirectUrl}`
        );
      } else {
        // Default to original origin or localhost for development
        const origin = new URL(request.url).origin;
        return NextResponse.redirect(`${origin}${redirectUrl}`);
      }
    }
  }

  return NextResponse.redirect("/auth/auth-code-error");
}
