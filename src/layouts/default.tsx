"use client";

import { usePathname } from "next/navigation";

import { Head } from "./head";

import Header from "@/components/Header/Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isRoot = usePathname() === "/";

  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Header />
      <main className={`container mx-auto max-w-7xl flex-grow`}>
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3" />
    </div>
  );
}
