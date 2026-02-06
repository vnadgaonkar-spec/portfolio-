import { z } from "zod";

export const magazineSchema = z.object({
  title: z.string().min(1, "Title is required"),
  issue: z.string().min(1, "Issue is required"),
  image: z.object({
    url: z.string().url(),
    public_id: z.string().min(1),
  }),
});