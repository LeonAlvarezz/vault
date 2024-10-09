import { Json } from "@/database.types";
import { Profile } from "./profiles.type";
import { Bookmark } from "./bookmark.type";

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
  published_at: string | null;
};
