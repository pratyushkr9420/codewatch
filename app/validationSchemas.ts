import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1).max(250),
  description: z.string().min(1),
});
