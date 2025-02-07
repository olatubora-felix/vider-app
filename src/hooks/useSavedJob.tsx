"use client";
import axiosInstance from "@/services/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export const useSavedJob = () => {
  const { id } = useParams() as {
    id: string;
  };
  // Access the client
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: FormData) => {
      if (!payload.id) {
        return toast.error("No Job Id Found");
      }
      const res = await axiosInstance.put(`/jobs/${payload.id}`, payload);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.success) {
        console.log(data);
        toast.success(data?.message);
        // Invalidate and refetch
        queryClient.invalidateQueries({
          queryKey: ["jobs"],
        });
        if (id) {
          window.location.reload();
        }
      }
    },
    onError(error) {
      toast.error(error);
    },
  });

  const toggleSaveJob = (
    event: React.MouseEvent<HTMLButtonElement>,
    jobId: string,
    bookmarked: boolean
  ) => {
    event.stopPropagation(); // Prevent navigation
    mutate({ id: jobId, bookmarked: !bookmarked });
  };

  return {
    isPending,
    toggleSaveJob,
  };
};
interface FormData {
  id: string;
  bookmarked: boolean;
}
