import { createClient } from "@/lib/supabase/server";
import { NoteFilter } from "@/types/note.type";
import {
  searchBookmarkNote,
  searchPublishedNote,
  searchUserOwnNote,
} from "../server/search";
import { constructSearchQuery } from "@/utils/string";
import { CURSOR_LIMIT } from "../client/note";
import { User } from "@supabase/supabase-js";
import { getCacheUser } from "./profiles";

export async function getNoteById(id: string) {
  const supabase = await createClient();
  const user = await getCacheUser(supabase);
  let query = supabase
    .from("notes")
    .select(
      "*, content: content->content, categories!inner(*), profile:profiles!notes_profile_id_fkey!inner(*), tags:rel_notes_tags(tags!inner(id, name, color, profile_id)), likes(*), bookmarks(*)"
    )
    .eq("id", id);

  if (user) {
    query = query
      .eq("likes.profile_id", user!.id)
      .eq("bookmarks.profile_id", user!.id);
  }
  const { data, error } = await query.single();

  return { data, error };
}

export async function getAllNotesByProfileId(filter?: NoteFilter) {
  const supabase = await createClient();
  const user = await getCacheUser(supabase);
  // Determine the categories selection based on filter
  const categoriesSelection =
    filter && filter.category && filter.category !== "all"
      ? "categories!inner(*)"
      : "categories(*)";

  let query = supabase
    .from("notes")
    .select(
      `
      *, 
      content: content->content, 
      ${categoriesSelection}, 
      profile:profiles!notes_profile_id_fkey!inner(*), 
      tags:rel_notes_tags(tags!inner(id, name, color, profile_id)), 
      likes(*), 
      bookmarks(*)
    `
    )
    .eq("profile_id", user!.id)
    .eq("likes.profile_id", user!.id);

  if (filter?.category && filter?.category !== "all") {
    query = query
      .not("categories.name", "is", null)
      .eq("categories.name", filter.category);
  }

  if (filter?.status && filter?.status !== "all") {
    switch (filter.status) {
      case "published":
        query = query.not("published_at", "is", null);
        break;
      case "unpublished":
        query = query.is("published_at", null);
        break;
    }
  }

  if (filter?.tags) {
    const tagsArray = Array.isArray(filter.tags) ? filter.tags : [filter.tags];
    if (tagsArray.length > 0) {
      query = query.in("tags.tags.name", tagsArray).not("tags", "is", null);
    }
  }

  if (filter?.query) {
    const searchQuery = constructSearchQuery(filter.query, "|");
    const { data, error } = await searchUserOwnNote(searchQuery);
    return { data, error };
  }

  const { data, error } = await query;

  return { data, error };
}

export async function getNoteExplore(user: User | null, filter?: NoteFilter) {
  const supabase = await createClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // const user = session?.user;

  let query = supabase
    .from("notes")
    .select(
      "*, categories!inner(*), profile:profiles!notes_profile_id_fkey!inner(*), tags:rel_notes_tags(tags!inner(id, name, color, profile_id)), likes(*), bookmarks(*)"
    )
    .not("published_at", "is", null);
  if (user) {
    query = query
      .eq("likes.profile_id", user.id)
      .eq("bookmarks.profile_id", user.id);
  }

  if (filter?.category && filter?.category !== "all") {
    query = query
      .eq("categories.name", filter.category)
      .not("categories.name", "is", "NULL");
  }

  if (filter?.tags) {
    const tagsArray = Array.isArray(filter.tags) ? filter.tags : [filter.tags];
    if (tagsArray.length > 0) {
      query = query.in("tags.tags.name", tagsArray);
    }
  }

  if (filter?.sortBy) {
    switch (filter.sortBy) {
      case "recent":
        query = query.order("created_at", { ascending: false });
        break;

      case "most_liked":
        query = query.order("like", { ascending: false });
        break;

      case "most_popular":
        query = query.order("view", { ascending: true });
        break;

      case "trending":
        query = query
          .order("like", { ascending: false })
          .order("view", { ascending: false })
          .order("created_at", { ascending: false });
        break;
    }
  }
  if (filter?.query) {
    const constructedQuery = filter?.query.replace(/_/g, " ");
    const searchQuery = constructSearchQuery(constructedQuery, "|");
    const { data, error } = await searchPublishedNote(
      searchQuery || "",
      filter as NoteFilter
    );

    return { data, error };
  }

  const { data, error } = await query.limit(CURSOR_LIMIT);

  return { data, error };
}

export async function getBookmarkNote(filter?: NoteFilter) {
  const supabase = await createClient();
  const user = await getCacheUser(supabase);
  let query = supabase
    .from("notes")
    .select(
      "*, content: content->content, categories!inner(*), profile:profiles!notes_profile_id_fkey!inner(*), tags:rel_notes_tags!inner(tags!inner(id, name, color, profile_id)), likes(*), bookmarks(*))"
    )
    .eq("bookmarks.profile_id", user!.id)
    .eq("likes.profile_id", user!.id);

  if (filter?.category && filter?.category !== "all") {
    query = query.eq("categories.name", filter.category);
  }

  if (filter?.status && filter?.status !== "all") {
    switch (filter.status) {
      case "published":
        query = query.not("published_at", "is", null);
        break;

      case "unpublished":
        query = query.is("published_at", null);
        break;
    }
  }

  if (filter?.tags) {
    const tagsArray = Array.isArray(filter.tags) ? filter.tags : [filter.tags];
    if (tagsArray.length > 0) {
      query = query.in("tags.tags.name", tagsArray);
    }
  }

  if (filter?.query) {
    const query = constructSearchQuery(filter.query, "|");
    const { data, error } = await searchBookmarkNote(query);
    return { data, error };
  }

  const { data, error } = await query;

  return { data, error };
}

export async function increaseView(noteId: string) {
  "use server";
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: note, error: noteError } = await supabase
    .from("notes")
    .select("*")
    .match({ id: noteId })
    .single();
  if (noteError) {
    return { data: null, error: noteError };
  }
  const { error } = await supabase
    .from("notes")
    .update({ view: note.view ? note.view + 1 : 1 })
    .match({ id: noteId });
  if (error) {
    return { data: null, error };
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
      .update({ view: metric.view + 1 })
      .eq("note_id", noteId)
      .gte("created_at", `${today}T00:00:00.000Z`)
      .lte("created_at", `${today}T23:59:59.999Z`);
    if (updateError) {
      return { error: updateError };
    }

    return { error: null };
  }

  const { error: createError } = await supabase
    .from("note_metrics")
    .insert([{ note_id: noteId, view: 1 }]);

  if (createError) {
    return { error: createError };
  }

  return { error: null };
}

export const isNoteOwner = async (noteId: string) => {
  const supabase = await createClient();
  const user = await getCacheUser(supabase);
  if (!user) {
    return { count: 0 };
  }
  const { count, error } = await supabase
    .from("notes")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", user.id)
    .eq("id", noteId);
  if (error) {
    return { count: 0, error };
  }

  return { count, error };
};

export async function getPublishedNotesByProfileId(
  id: string,
  filter?: NoteFilter
) {
  const supabase = await createClient();
  let query = supabase
    .from("notes")
    .select(
      "*, content: content->content, categories!inner(*), profile:profiles!notes_profile_id_fkey!inner(*), tags:rel_notes_tags(tags!inner(id, name, color, profile_id, created_at)), likes(*), bookmarks(*)"
    )
    .eq("profile_id", id)
    .eq("likes.profile_id", id)
    .not("published_at", "is", null);

  if (filter?.sortBy) {
    switch (filter.sortBy) {
      case "recent":
        query = query.order("created_at", { ascending: false }); // Assuming you're sorting by creation date
        break;

      case "most_liked":
        query = query.order("like", { ascending: false });
        break;

      case "most_popular":
        query = query.order("view", { ascending: true });
        break;

      case "trending":
        query = query
          .order("like", { ascending: false })
          .order("view", { ascending: false })
          .order("created_at", { ascending: false });
        break;
    }
  }

  const { data, error } = await query;
  return { data, error };
}

export async function getUserPublishedNotes(
  userId: string,
  filter?: NoteFilter
) {
  const supabase = await createClient();
  let query = supabase
    .from("notes")
    .select(
      "*, content: content->content, categories!inner(*), profile:profiles!notes_profile_id_fkey!inner(*), tags:rel_notes_tags(tags!inner(id, name, color, profile_id, created_at)), likes(*), bookmarks(*)"
    )
    .eq("profile_id", userId)
    .eq("likes.profile_id", userId)
    .not("published_at", "is", null);

  if (filter?.sortBy) {
    switch (filter.sortBy) {
      case "recent":
        query = query.order("created_at", { ascending: false }); // Assuming you're sorting by creation date
        break;

      case "most_liked":
        query = query.order("like", { ascending: false });
        break;

      case "most_popular":
        query = query.order("view", { ascending: true });
        break;

      case "trending":
        query = query
          .order("like", { ascending: false })
          .order("view", { ascending: false })
          .order("created_at", { ascending: false });
        break;
    }
  }

  const { data, error } = await query;
  return { data, error };
}

export async function getRecentNote(count: number) {
  const supabase = await createClient();
  const user = await getCacheUser(supabase);
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("profile_id", user!.id)
    .order("updated_at", { ascending: false })
    .limit(count);
  if (error) {
    return { data: null, error };
  }
  return { data, error };
}

export async function getNoteContent(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select(
      `
    *,
    tags:rel_notes_tags(
     tags(id, name, profile_id, color, created_at)
    )
  `
    )
    .eq("id", id)
    .single();

  return { data, error };
}
