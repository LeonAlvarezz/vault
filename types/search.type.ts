import { Json } from "@/database.types";
import { Profile } from "./profiles.type";

export type SearchResultCol = {
  id: string;
  title: string;
  cover_url: string | null;
  content: Json | null;
  profiles: Profile | null;
};

export type SearchResult = {
  id: string;
  title: string;
  content: Json | null;
  profiles: Profile | null;
  published_at: string | null;
};
