import { z } from "zod";

export const VideoSchema = z.object({
  title: z.string().min(1),
  type: z.string().min(1),
  link: z.string().url(),
});
