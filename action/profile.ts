"use server";
import { getCacheUser } from "@/data/server/profiles";
import { createClient } from "@/lib/supabase/server";
import {
  EditProfileSchema,
  RegisterUsernameSchema,
  SUBCRIPTION_TIER,
} from "@/types/profiles.type";
import { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateUserCover = async (cover_url: string) => {
  const supabase = await createClient();
  const user = await getCacheUser(supabase);
  const { error } = await supabase
    .from("profiles")
    .update({ cover_url: cover_url })
    .eq("id", user!.id);
  if (error) {
    return { error };
  }
  revalidatePath("/profile");
  return { error };
};

export async function editProfile(id: string, formData: unknown) {
  const supabase = await createClient();
  const result = EditProfileSchema.safeParse(formData);
  if (!result.success) {
    // result.error.issues.forEach((issue) => {
    //   errorMessage = result.error.issues
    //     .map((issue) => `${issue.path[0]}: ${issue.message}`)
    //     .join(", ");
    // });

    return {
      error: result.error.format(),
    };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      aboutMe: result.data.aboutMe,
      username: result.data.username,
      avatar_url: result.data.avatar_url,
      bios: result.data.bios,
      githubLink: result.data.githubLink,
      linkedinLink: result.data.linkedinLink,
      websiteLink: result.data.websiteLink,
      occupation: result.data.occupation,
      updated_at: new Date().toISOString(),
    })
    .match({ id: id });
  if (error) {
    return {
      error: error.message,
    };
  }
  return { error: null };
}

export const getProfile = async () => {
  const supabase = await createClient();
  const user = await getCacheUser(supabase);

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();
  if (error) {
    return { data: null, error };
  }

  return { data, error };
};

export const registerUsername = async (formData: unknown) => {
  const supabase = await createClient();
  const result = RegisterUsernameSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) {
    return { error: authErr.message };
  }
  if (user) {
    const { error } = await supabase.from("profiles").insert([
      {
        email: user!.email!,
        username: result.data.username,
        auth_id: user!.id,
        id: user!.id,
      },
    ]);

    const { error: settingError } = await supabase
      .from("settings")
      .insert([{ profile_id: user.id }]);
    if (settingError) {
      return { error: settingError.message };
    }

    if (!error) {
      revalidatePath("/", "layout");
      redirect("/dashboard");
    } else {
      return {
        error: error.message,
      };
    }
  } else {
    revalidatePath("/", "layout");
    redirect("/auth/login");
  }
};

export async function updateSubscription(
  // userId: string,
  supabase: SupabaseClient,
  cid: string,
  tier: SUBCRIPTION_TIER
) {
  const { error } = await supabase
    .from("profiles")
    .update({ subscription_tier: tier })
    .match({ id: cid });
  if (error) {
    return { error };
  }
  return { error: null };
}
