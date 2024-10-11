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
import { BlockNode, SaveNotePayload } from "@/types/note.type";
import OpenAI from "openai";
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
      category_id: +payload.category_id,
      cover_url: payload.cover_url,
      content_text: payload.content_text,
      embedding: JSON.stringify(embedding),
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

  revalidatePathClient("/note");

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
