"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  return <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something&rsquo;s missing.</p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page. </p>
        <div className="flex justify-center space-x-4">
          <Button
            color="primary"
            variant="solid"
            size="lg"
            onPress={() => router.push("/")}
          >
            Go Home
          </Button>
        </div>

      </div>
    </div>
  </section>;
}