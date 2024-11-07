"use server";
import { getCacheUser } from "@/data/server/profiles";
import { createClient } from "@/lib/supabase/server";
import { SearchResult } from "@/types/search.type";
import { revalidatePath } from "next/cache";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

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
