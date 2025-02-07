"use client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export const useUpdateQuery = () => {
  const router = useRouter();
  const pathname = usePathname();

  const updateQueryParams = useCallback(
    (newParams: Record<string, string>) => {
      const currentParams = new URLSearchParams(window.location.search);

      for (const [key, value] of Object.entries(newParams)) {
        if (value === "" || value === "Filter Products By") {
          currentParams.delete(key); // Delete the parameter if the value is empty
        } else {
          currentParams.set(key, value); // Set or update the parameter if it has a value
        }
      }

      // Update the URL without a page reload
      router.replace(`${pathname}?${currentParams.toString()}`);
    },
    [router, pathname]
  );

  return updateQueryParams;
};
