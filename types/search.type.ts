import { Database, Json } from "@/database.types";
import { Profile } from "./profiles.type";
import { Bookmark } from "./bookmark.type";

export enum SEARCH_SOURCE {
  COMMAND_SEARCH = "command_search",
  SEARCH_BAR = "search_bar",
}

export enum SEARCH_TYPE {
  NOTE = "note",
  PROFILE = "profile",
}

export type Search = {
  created_at: string;
  deleted_at: string | null;
  id: number;
  profile_id: string | null;
  query: string | null;
  search_source: Database["public"]["Enums"]["SEARCH_SOURCE"] | null;
  search_type: string | null;
};

export type SearchResultCol = {
  id: string;
  title: string;
  cover_url: string | null;
  // content: Json | null;
  content_text: string | null;
  profiles?: Profile | null;
  bookmarks?: Bookmark[] | null;
};

export type SearchResult = {
  id: string;
  title: string;
  // content: Json | null;
  content_text: string | null;
  profiles?: Profile | null;
  profile_id?: string;
  username?: string | null;
  avatar_url?: string | null;
  published_at?: string | null;
  similarity?: number;
};

export type CreateSearch = {
  query: string;
  search_source: SEARCH_SOURCE;
  search_type: SEARCH_TYPE;
};
