import { Json } from "@/database.types";
import { z } from "zod";

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
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const SignupSchema = z.object({
  username: z.string().trim().min(1).max(20, {
    message: "Username must not exceeed 20 characters",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});
export type Login = z.infer<typeof LoginSchema>;
export type Signup = z.infer<typeof SignupSchema>;
