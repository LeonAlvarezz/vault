import { Json } from "@/database.types";

export type Profile = {
  about: Json | null;
  bios: string | null;
  contact_link: Json | null;
  created_at: string;
  email: string | null;
  id: number;
  occupation: string | null;
  profile_url: string | null;
  updated_at: string | null;
  user_id: string | null;
  username: string | null;
};

export type InsertUserPayload = {
  email: string;
  password: string;
  username: string;
};
