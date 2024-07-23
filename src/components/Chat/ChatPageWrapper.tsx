"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Messages from "./Messages";
import PromptForm from "./PromptForm";
import { useEffect } from "react";

export default function ChatPageWrapper() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/login");
    }
  }, [router, status]);

  return (
    <>
      {status !== "authenticated" && <div>Loading...</div>}
      {status === "authenticated" && (
        <section className="h-screen flex flex-col">
          <Messages />
          <div className="h-px w-full" />
          <PromptForm />
        </section>
      )}
    </>
  );
}
