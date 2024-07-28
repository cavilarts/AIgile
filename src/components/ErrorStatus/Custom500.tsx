"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Custom500() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">500</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Internal Server Error.</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">We are already working to solve the problem. </p>
          <div className="flex justify-center space-x-4">
            <Button
              color="primary"
              variant="solid"
              size="lg"
              onPress={() => router.push("/")}
            >
              Go Home
            </Button>
            <Button
              color="default"
              variant="bordered"
              size="lg"
              onPress={() => router.refresh()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}