import { createClient } from "@/lib/supabse/client";

export const getJobById = async (id: string) => {
  if (!id) return;
  const supabase = createClient();
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    data,
    message: "Fetch Job Successfully",
  };
};
