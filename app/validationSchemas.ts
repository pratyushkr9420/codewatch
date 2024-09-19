import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1).max(250),
  description: z.string().min(1),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1).max(250).optional(),
  description: z.string().min(1).max(65000).optional(),
  developerId: z.string().min(1, "developerId").max(250).optional().nullable(),
});
