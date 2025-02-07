import * as z from "zod";

export const jobApplicationSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "FullName must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  coverLetter: z
    .string()
    .min(50, { message: "Cover letter must be at least 50 characters." })
    .max(500, { message: "Cover letter must not exceed 500 characters." }),
});

export type JobApplicationSchema = z.infer<typeof jobApplicationSchema>;
