"use server";

import {
  EditProfileSchema,
  InsertUserPayload,
  LoginSchema,
  RegisterUsernameSchema,
  SignupSchema,
  SUBCRIPTION_TIER,
} from "@/types/profiles.type";
import { createClient } from "@/lib/supabase/server";
import { formatZodIssue } from "@/utils/zod";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { BlockNode, Note, SaveNotePayload } from "@/types/note.type";
import OpenAI from "openai";
import { CreateTag } from "@/types/tag.type";
import { headers } from "next/headers";
import { env } from "@/utils/env";
import { getCacheUser } from "@/data/server/profiles";
import { SearchResult, SearchResultCol } from "@/types/search.type";
import { SupabaseClient } from "@supabase/supabase-js";
// import { openai } from "@/lib/openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

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

export async function revalidatePathClient(path: string) {
  revalidatePath(path);
}

/*Vector Search OPENAI*/

export async function saveNote(payload: SaveNotePayload) {
  const supabase = await createClient();
  const embeddingText = [
    `Title: ${payload.title}`, // Explicitly mark title
    `Content: ${payload.content_text}`,
    `Created/Updated: ${new Date().toISOString()}`,
    // Add some semantic markers
    `This note is about: ${payload.title}`,
  ]
    .filter(Boolean)
    .join("\n"); // Use newlines for better text separation

  const result = await openai.embeddings.create({
    input: embeddingText,
    model: "text-embedding-3-small",
  });

  const [{ embedding }] = result.data;

  // 1. Update the note itself
  const { data: noteData, error: noteError } = await supabase
    .from("notes")
    .update({
      title: payload.title,
      content: payload.content as BlockNode[],
      category_id: +payload.category_id || null,
      cover_url: payload.cover_url,
      content_text: payload.content_text,
      embedding: JSON.stringify(embedding),
      updated_at: new Date().toISOString(),
    })
    .eq("id", payload.id)
    .select();

  if (noteError) {
    return { data: null, error: noteError };
  }

  // 2. Delete existing tag relationships for the note in rel_note_tag
  const { error: deleteError } = await supabase
    .from("rel_notes_tags")
    .delete()
    .eq("note_id", payload.id);

  if (deleteError) {
    return { data: null, error: deleteError };
  }

  // 3. Insert new tag relationships into rel_note_tag
  const tagInserts = payload.tags.map((tagId) => ({
    note_id: payload.id,
    tag_id: +tagId,
  }));

  const { error: insertError } = await supabase
    .from("rel_notes_tags")
    .insert(tagInserts);

  if (insertError) {
    return { data: null, error: insertError };
  }

  // revalidatePathClient("/note");

  return { data: noteData, error: null };
}

export async function vectorSearch(searchQuery: string) {
  const supabase = await createClient();
  const enhancedQuery = `Find notes about: ${searchQuery}`;

  const result = await openai.embeddings.create({
    input: enhancedQuery,
    model: "text-embedding-3-small",
  });

  const [{ embedding }] = result.data;
  const user = await getCacheUser(supabase);

  const { data: notes, error } = await supabase
    .rpc("vector_search_v2", {
      query_embedding: JSON.stringify(embedding),
      match_threshold: 0.25,
      user_id: user!.id,
      match_count: 5,
    })
    .select("*")
    .returns<SearchResult[]>();
  notes!.map((note) => {
    console.log(note.title + ": " + note.similarity);
  });
  return { notes, error };
}

export async function deleteSearch(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("searches").delete().match({ id });
  if (error) {
    return { error };
  }
  revalidatePath("/search");
  return { error: null };
}

export async function deleteNote(id: string) {
  const supabase = await createClient();
  const now = new Date().toISOString();

  const { error } = await supabase
    .from("notes")
    .update({ deleted_at: now })
    .match({ id });
  if (error) {
    return { error };
  }
  revalidatePath("/");
  return { error: null };
}

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

export async function deleteTag(id: number) {
  const supabase = await createClient();
  const { error: authErr } = await supabase.auth.getUser();

  if (authErr) {
    return { data: null, error: authErr };
  }
  const { error } = await supabase.from("tags").delete().match({ id: id });
  if (error) {
    return { data: null, error };
  }
  revalidatePath("/create");
  return { error };
}

export async function createTags(payload: CreateTag) {
  const supabase = await createClient();
  const user = await getCacheUser(supabase);
  const { data, error } = await supabase
    .from("tags")
    .insert({ name: payload.name, profile_id: user!.id })
    .select();
  if (error) {
    return { data: null, error };
  }
  revalidatePath("/");

  return { data, error };
}

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
//TODO: REFINE THIS BETTER
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

export async function likeNote(noteId: string) {
  const supabase = await createClient();
  let action;
  const today = new Date().toISOString().split("T")[0];

  // const {
  //   data: { user },
  //   error: authErr,
  // } = await supabase.auth.getCacheUser();
  // if (authErr) {
  //   return { error: authErr };
  // }
  const user = await getCacheUser(supabase);
  if (!user || user.is_anonymous) {
    return {
      error: {
        message: "You must login to like & bookmark note ",
      },
    };
  }
  //Check if note already like
  const { data: like, error: likeError } = await supabase
    .from("likes")
    .select("*")
    .eq("profile_id", user!.id)
    .eq("note_id", noteId)
    .single();
  if (likeError && likeError.code !== "PGRST116") {
    return { error: likeError };
  }
  if (like) {
    if (like.deleted_at === null) {
      //if null == note already liked, when user click then unlike
      const { error } = await supabase
        .from("likes")
        .update({ deleted_at: new Date().toISOString() })
        .eq("profile_id", user!.id)
        .eq("note_id", noteId);

      if (error) {
        return { error };
      }

      action = "unlike";
    } else {
      //if not null == note have not been liked, when user click then like note
      const { error } = await supabase
        .from("likes")
        .update({ deleted_at: null })
        .eq("profile_id", user!.id)
        .eq("note_id", noteId);

      if (error) {
        return { error };
      }

      action = "like";
    }
  } else {
    //If no record then create new one
    const { error } = await supabase
      .from("likes")
      .insert([{ note_id: noteId, profile_id: user!.id }])
      .eq("profile_id", user!.id)
      .eq("note_id", noteId);

    if (error) {
      return { error };
    }

    action = "like";
  }

  const { data: metric, error: metricError } = await supabase
    .from("note_metrics")
    .select("*")
    .eq("note_id", noteId)
    .gte("created_at", `${today}T00:00:00.000Z`)
    .lte("created_at", `${today}T23:59:59.999Z`)
    .single();
  if (metricError && metricError.code !== "PGRST116") {
    return { error: metricError };
  }

  if (metric) {
    const { error: updateError } = await supabase
      .from("note_metrics")
      .update({ like: action === "like" ? metric.like + 1 : metric.like - 1 })
      .eq("note_id", noteId)
      .gte("created_at", `${today}T00:00:00.000Z`)
      .lte("created_at", `${today}T23:59:59.999Z`);
    if (updateError) {
      return { error: updateError };
    }

    const like = action === "like" ? 1 : -1;
    const { error: addNoteLikeError } = await supabase.rpc("increment", {
      table_name: "notes",
      field_name: "like",
      x: like,
      row_id: noteId,
    });

    if (addNoteLikeError) {
      return { error: addNoteLikeError };
    }

    return { error: null };
  }

  const { error: createError } = await supabase
    .from("note_metrics")
    .insert([{ note_id: noteId, like: 1 }]);

  if (createError) {
    return { error: createError };
  }

  const { error: addNoteLikeError } = await supabase.rpc("increment", {
    table_name: "notes",
    field_name: "like",
    x: 1,
    row_id: noteId,
  });

  if (addNoteLikeError) {
    return { error: addNoteLikeError };
  }
  return { error: null };
}

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
