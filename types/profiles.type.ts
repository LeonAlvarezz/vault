import { Json } from "@/database.types";
import { z } from "zod";

export type Profile = {
  aboutMe: Json | null;
  auth_id: string;
  avatar_url: string | null;
  bios: string | null;
  created_at: string;
  email: string;
  githubLink: string | null;
  id: string;
  linkedinLink: string | null;
  occupation: string | null;
  updated_at: string | null;
  username: string;
  websiteLink: string | null;
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
