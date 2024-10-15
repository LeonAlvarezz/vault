import { Json } from "@/database.types";
import { JSONContent } from "@tiptap/react";
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
  content?: Json | null;
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

export const EditProfileSchema = z.object({
  username: z
    .string()
    .trim()
    .max(20, {
      message: "Username must not exceeed 20 characters",
    })
    .optional(),
  avatar_url: z.string().optional(),
  occupation: z.string().optional(),
  bios: z
    .string()
    .trim()
    .max(150, {
      message: "Bios must not exceeed 150 characters",
    })
    .optional(),
  githubLink: z
    .string()
    .trim()
    .url({ message: "Invalid URL format" })
    .regex(/^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+$/, {
      message: "Must be a valid GitHub URL",
    })
    .optional(),
  linkedinLink: z
    .string()
    .trim()
    .url({ message: "Invalid URL format" })
    .regex(/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/, {
      message: "Must be a valid LinkedIn URL",
    })
    .optional(),
  websiteLink: z
    .string()
    .trim()
    .url({ message: "Invalid URL format" })
    .optional(),
  aboutMe: z
    .custom<JSONContent>(
      (value) => {
        return value !== null && typeof value === "object";
      },
      {
        message: "aboutMe must be a valid JSONContent object",
      }
    )
    .optional(),
});
export type Login = z.infer<typeof LoginSchema>;
export type Signup = z.infer<typeof SignupSchema>;
export type EditProfile = z.infer<typeof EditProfileSchema>;
