import { useSearchParams } from "next/navigation";
import { useUpdateQuery } from "./useUpdateQuery";
import useFormValidation from "./useFormValidation";
import {
  SearchParamsSchema,
  searchParamsSchema,
} from "@/utils/schema/searchParamsSchema";

export const useSearch = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const location = searchParams.get("location");
  const updateUrlQuery = useUpdateQuery();
  const defaultValues = {
    title: "",
    location: "",
  };
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useFormValidation({
    defaultValues,
    searchParamsSchema,
  });

  const onSubmit = (data: SearchParamsSchema) => {
    if (data?.title) {
      updateUrlQuery({
        title: data.title,
      });
    }
    if (data?.location) {
      updateUrlQuery({
        location: data.location,
      });
    }
  };

  const handleClearQuery = () => {
    updateUrlQuery({
      title: "",
      location: "",
    });
    reset();
  };
  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    title,
    location,
    handleClearQuery,
    isValid,
  };
};
