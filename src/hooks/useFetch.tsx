import axiosInstance from "@/services/axios";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";

export const useFetch = <T = AxiosResponse,>({
  endpoint,
  key,
  pageParam = 8,
  queryParam = true,
  bookmarked,
}: {
  endpoint: string;
  key: string | string[];
  queryParam?: boolean;
  pageParam: number;
  bookmarked?: boolean;
}): UseQueryResult<T, Error> => {
  const searchParams = useSearchParams();

  const values = {
    title: searchParams.get("title") as string,
    location: searchParams.get("location") as string,
    pageParam: pageParam ?? 1,
    pageSize: 6,
    bookmarked,
  };

  const controller = new AbortController();

  const fetchData = async () => {
    if (queryParam) {
      const params = new URLSearchParams(
        values as unknown as Record<string, string>
      ).toString();
      const { data } = await axiosInstance(`${endpoint}?${params}`, {
        signal: controller.signal,
      });
      return data;
    }
    const { data } = await axiosInstance.get(endpoint, {
      signal: controller.signal,
    });
    return data;
  };

  return useQuery({
    queryKey: [
      key,
      values.pageParam ?? "",
      values.title ?? "",
      values.location ?? "",
      values.bookmarked ?? "",
    ],
    queryFn: fetchData,
  });
};
