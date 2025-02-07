"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="h-screen grid place-content-center overflow-hidden p-10">
      <div className="flex justify-center items-center">
        <Image
          src={"/images/error-icon.svg"}
          alt="Error"
          width={100}
          height={100}
        />
      </div>
      <div className="">
        <h2 className="text-dark font-semibold text-sm text-center">
          Something Went Wrong
        </h2>
        <p className="text-center text-sm font-medium text-[#7A7A84] my-3">
          Our team is currently working on it. We apologize for any
          inconveniences caused.
        </p>
        <div className="flex justify-center items-center">
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </div>
    </main>
  );
}
