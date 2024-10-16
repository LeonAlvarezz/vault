"use server";

import {
  EditProfileSchema,
  InsertUserPayload,
  LoginSchema,
  SignupSchema,
} from "@/types/profiles.type";
import { createClient } from "@/lib/supabase/server";
import { formatZodIssue } from "@/utils/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BlockNode, SaveNotePayload } from "@/types/note.type";
import OpenAI from "openai";
import { CreateTag } from "@/types/tag.type";
// import { openai } from "@/lib/openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

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
    const { error: settingError } = await supabase
      .from("settings")
      .insert([{ profile_id: userId }]);
    if (settingError) {
      return { error: settingError.message };
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

/*Vector Search OPENAI*/

export async function saveNote(payload: SaveNotePayload) {
  const supabase = createClient();

  const result = await openai.embeddings.create({
    input: payload.title + payload.content_text,
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
  const supabase = createClient();

  const result = await openai.embeddings.create({
    input: searchQuery,
    model: "text-embedding-3-small",
  });

  const [{ embedding }] = result.data;

  const {
    error: authErr,
    data: { user },
  } = await supabase.auth.getUser();

  if (authErr) {
    return { data: null, error: authErr };
  }

  // let query = supabase.rpc("match_notes_global", {
  //   query_embedding: JSON.stringify(embedding),
  //   match_threshold: 0.8,
  //   match_count: 10,
  //   // user_id: user!.id,
  // });

  // if (!isGlobal) {
  //   query = query.eq("profile_id", user!.id);
  // } else {
  //   query = query.not("published_at", "is", null).neq("profile_id", user!.id);
  // }

  const { data: notes, error } = await supabase
    .rpc("match_notes_global", {
      query_embedding: JSON.stringify(embedding),
      match_threshold: 0.4,
      match_count: 10,
      user_id: user!.id,
    })
    .select("*");

  return { notes, error };
}

export async function deleteSearch(id: number) {
  const supabase = createClient();

  const { error } = await supabase.from("searches").delete().match({ id });
  if (error) {
    return { error };
  }
  revalidatePath("/search");
  return { error: null };
}

export async function deleteNote(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from("notes").delete().match({ id });
  if (error) {
    return { error };
  }
  revalidatePath("/");
  return { error: null };
}

export async function editProfile(formData: unknown) {
  const supabase = createClient();
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
  const {
    error: authErr,
    data: { user },
  } = await supabase.auth.getUser();

  if (authErr) {
    return { error: authErr.message };
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
    .match({ id: user!.id });
  if (error) {
    return {
      error: error.message,
    };
  }
  return { error: null };
}

export const getProfile = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) {
    return { data: null, error: authErr };
  }
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
  const supabase = createClient();
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
  const supabase = createClient();
  const {
    error: authErr,
    data: { user },
  } = await supabase.auth.getUser();

  if (authErr) {
    return { data: null, error: authErr };
  }
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
  const supabase = createClient();
  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (authErr) {
    return { error: authErr };
  }
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

export const isUserAuthenticated = async (checkAnon: boolean) => {
  const supabase = createClient();

  const {
    data: { user },
    error: authErr,
  } = await supabase.auth.getUser();
  if (checkAnon) {
    console.log("user:", user);
    if (!user || user.is_anonymous) {
      return { data: false, error: authErr };
    }

    // Return true if user is signed in and not anonymous
    return { data: true, error: authErr };
  }

  return { data: user ? true : false, error: authErr };
};
