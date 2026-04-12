import { z } from "zod";

const CATEGORIES = ["Beauty", "Fashion", "Celebrities", "Food", "Travel", "Others"];

export const magazineSchema = z.object({
  title: z.string().min(1),
  issue: z.string().min(1),
  category: z.enum(CATEGORIES),
  image: z.object({
    url: z.string().url(),
    public_id: z.string().min(1),
  }),
});