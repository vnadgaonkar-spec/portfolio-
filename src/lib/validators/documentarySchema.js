import { z } from "zod";

export const documentarySchema = z.object({
  title: z.string().min(3).max(200),
  subject: z.string().optional(),
  location: z.string().optional(),
  content: z.string().min(20),

  coverImage: z.string().url().optional(), // ✅ FIX

  credits: z
    .array(
      z.object({
        role: z.string().min(1),
        name: z.string().min(1),
      })
    )
    .optional(),

  tags: z.array(z.string()).optional(),
});
