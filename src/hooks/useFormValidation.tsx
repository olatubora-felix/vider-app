import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z, ZodType } from "zod";

// Define a generic type for the hook's parameters
type UseFormValidationProps<T extends ZodType> = {
  defaultValues: z.infer<T>; // Infer the default values type from the Zod schema
  searchParamsSchema: T; // Zod schema
};

const useFormValidation = <T extends ZodType>({
  defaultValues,
  searchParamsSchema,
}: UseFormValidationProps<T>): UseFormReturn<z.infer<T>> => {
  return useForm<z.infer<T>>({
    defaultValues,
    resolver: zodResolver(searchParamsSchema),
  });
};

export default useFormValidation;
