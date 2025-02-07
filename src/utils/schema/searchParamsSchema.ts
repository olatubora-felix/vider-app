import * as z from "zod";

export const searchParamsSchema = z.object({
  title: z.string().optional(),
  location: z.string().optional(),
});

export type SearchParamsSchema = z.infer<typeof searchParamsSchema>;
