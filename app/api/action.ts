"use server";

import {
  InsertUserPayload,
  LoginSchema,
  SignupSchema,
} from "@/types/profiles.type";
import { createClient } from "@/lib/supabase/server";
import { formatZodIssue } from "@/utils/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: unknown) {
  const supabase = createClient();
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
    redirect("/dashboard");
  } else {
    return {
      error: error.message,
    };
  }
}
export async function signup(formData: unknown) {
  const supabase = createClient();
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
  }

  if (!error) {
    revalidatePath("/", "layout");
    redirect("/auth/login");
  }
}

export async function signout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/auth/login");
}

export async function revalidatePathClient(path: string) {
  revalidatePath(path);
}
