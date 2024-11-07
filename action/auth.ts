"use server";
import { createClient } from "@/lib/supabase/server";
import { formatZodIssue } from "@/lib/zod";
import { LoginSchema, SignupSchema } from "@/types/profiles.type";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  formData: unknown,
  returnUrl: string | string[] | undefined
) {
  const supabase = await createClient();
  const result = LoginSchema.safeParse(formData);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = result.error.issues
        .map((issue) => `${issue.path[0]}: ${issue.message}`)
        .join(", ");
    });
    return {
      error: errorMessage,
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (!error) {
    revalidatePath("/", "layout");
    revalidateTag("*");
    returnUrl ? redirect(`/${returnUrl}`) : redirect("/dashboard");
  } else {
    return {
      error: error.message,
    };
  }
}
export async function signup(
  formData: unknown,
  returnUrl: string | string[] | undefined
) {
  const supabase = await createClient();
  const result = SignupSchema.safeParse(formData);

  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage += formatZodIssue(issue);
    });
    return {
      error: errorMessage,
    };
  }

  const { email, password, username } = result.data;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.is_anonymous) {
    const { data, error } = await supabase.auth.updateUser({ email, password });
    if (error) {
      return {
        error: error.message,
      };
    }

    const userId = data.user?.id;
    if (userId) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ auth_id: userId, username, email }]);
      if (profileError) {
        return { error: profileError.message };
      }
      const { error: settingError } = await supabase
        .from("settings")
        .insert([{ profile_id: userId }]);
      if (settingError) {
        return { error: settingError.message };
      }
    }

    if (!error) {
      revalidatePath("/", "layout");
      revalidateTag("*");
      returnUrl
        ? redirect(`/auth/login?returnUrl=${returnUrl}`)
        : redirect("/auth/login");
    }
  } else {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return {
        error: error.message,
      };
    }

    const userId = data.user?.id;
    if (userId) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ auth_id: userId, username, email }]);
      if (profileError) {
        return { error: profileError.message };
      }
      const { error: settingError } = await supabase
        .from("settings")
        .insert([{ profile_id: userId }]);
      if (settingError) {
        return { error: settingError.message };
      }
    }

    if (!error) {
      revalidatePath("/", "layout");
      revalidateTag("*");
      returnUrl
        ? redirect(`/auth/login?returnUrl=${returnUrl}`)
        : redirect("/auth/login");
    }
  }
}

export async function signout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  revalidateTag("*");
  redirect("/auth/login");
}

export const isUserAuthenticated = async (checkAnon: boolean) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (checkAnon) {
    if (!user || user.is_anonymous) {
      return { data: false, error: authErr };
    }

    // Return true if user is signed in and not anonymous
    return { data: true, error: authErr };
  }

  return { data: user ? true : false, error: authErr };
};

export const signInWithGoogle = async () => {
  const origin = (await headers()).get("origin");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.is_anonymous) {
    const { data, error } = await supabase.auth.linkIdentity({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      return { data: null, error: error.message };
    }
    if (data.url) {
      redirect(data.url);
    }
  } else {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      return { data: null, error: error.message };
    }
    if (data.url) {
      redirect(data.url);
    }
  }
};
