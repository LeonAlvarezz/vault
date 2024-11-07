import { z } from "zod";

export type Report = {
  created_at: string;
  description: string | null;
  id: number;
  images: string[] | null;
  resolved_at: string | null;
  subject: string | null;
};
export const ReportSchema = z.object({
  subject: z.string().max(200, {
    message: "Subject cannot exceed 200 character",
  }),
  description: z.string().max(500, {
    message: "Description cannot exceed 500 character",
  }),
  contact_email: z.string().email(),
  images: z.string().array().optional(),
});

export type CreateReport = z.infer<typeof ReportSchema>;
