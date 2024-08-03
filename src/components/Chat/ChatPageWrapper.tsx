"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Messages from "./Messages";
import PromptForm from "./PromptForm";
import { useEffect } from "react";

export default function ChatPageWrapper() {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/sign-in");
    }
  }, [router, status]);

  return (
    <>
      {status !== "authenticated" && <div>Loading...</div>}
      {status === "authenticated" && (
        <section className="h-[85vh] flex flex-col overflow-hidden">
          <Messages />
          <PromptForm />
        </section>
      )}
    </>
  );
}
