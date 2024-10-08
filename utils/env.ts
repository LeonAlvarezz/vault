import zod from "zod";
const envSchema = zod.object({
  NEXT_PUBLIC_SUPABASE_URL: zod.string().min(1),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: zod.string().min(1),
  // OPENAI_API_KEY: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
