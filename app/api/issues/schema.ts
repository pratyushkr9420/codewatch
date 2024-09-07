import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(1).max(250),
  description: z.string(),
});

export default createIssueSchema;
