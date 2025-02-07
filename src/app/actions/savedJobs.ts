"use server";

import { createClient } from "@/lib/supabse/client";

export const savedJob = async (formData: FormData) => {
  const supabase = createClient();
  const id = formData.get("id");
  const bookmarked = formData.get("bookmarked");

  if (!id) {
    return {
      success: false,
      message: "Job Id not found",
    };
  }

  const { data, error } = await supabase
    .from("jobs")
    .update({ bookmarked: bookmarked === "true" ? true : false })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Job Bookmarked Successfully",
    data,
  };
};
