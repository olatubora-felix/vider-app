import { z } from "zod";

// File upload schema with required check and type validation
const fileUploadSchema = z.object({
  file: z
    .instanceof(File, { message: "Resume is required" })
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      { message: "Only PDF or DOC files are allowed" }
    ),
});

// Example function to validate
export const validateFile = (file?: File) => {
  if (!file) return;
  const result = fileUploadSchema.safeParse({ file });

  if (!result.success) {
    return {
      messagae: result.error.errors[0].message,
      validate: false,
    };
  }

  return {
    messagae: "",
    validate: true,
  };
};

// Example testing
validateFile(undefined); // Will show "File is required"
validateFile(new File([""], "test.txt", { type: "text/plain" })); // Will show "Only PDF or DOC files are allowed"
