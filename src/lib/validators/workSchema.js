// src/lib/validators/workSchema.js
import { z } from "zod";

export const workSchema = z.object({
  images: z
    .array(
      z.object({
        url: z.string().url(),
        public_id: z.string(),
      })
    )
    .min(1),
});
