"use client";

import { useUIState } from "ai/rsc";
import { EmptyMessages } from "./Emptymessages";

export type MessagesProps = {};

export default function Messages({}: MessagesProps) {
  const [messages] = useUIState();

  if (!messages.length) {
    return (
      <section className="w-full flex-auto overflow-auto flex items-center justify-center flex-col">
        <EmptyMessages />
      </section>
    );
  }

  return (
    <section className="w-full h-full overflow-auto flex items-center justify-end flex-col">
      <div key={crypto.randomUUID()}>
        {messages.map((message: any) => (
          <div key={message.id}>
            {message.spinner}
            {message.display}
            {message.attachments}
          </div>
        ))}
      </div>
    </section>
  );
}
