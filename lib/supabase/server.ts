import { createServerClient } from "@supabase/ssr";
import { cookies, type UnsafeUnwrappedCookies } from "next/headers";
import { Database } from "@/database.types";
import { env } from "@/utils/env";

export async function createClient(roleKey?: string) {
  const cookieStore = await cookies();

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    // superAccess
    //   ? env.SUPABASE_SERVER_ROLE_KEY
    //   : env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    roleKey ? roleKey : env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.error(error);
          }
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            console.error(error);
          }
        },
      },
    }
  );
}
