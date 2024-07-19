import Messages from "@/components/Chat/Messages";
import PromptForm from "@/components/Chat/PromptForm";
import { nanoid } from "@/lib";
import { AI } from "@/lib/chat/actions";
import { useRef } from "react";

export default function ChatPage() {
  const id = nanoid();

  return (
    <AI initialAIState={{ id: id, interactions: [], messages: [] }}>
      <section className="h-screen flex flex-col">
        <Messages />
        <div className="h-px w-full" />
        <PromptForm />
      </section>
    </AI>
  );
}
