"use client";

import { useUIState } from "ai/rsc";

export type MessagesProps = {};

export default function Messages({}: MessagesProps) {
  const [messages] = useUIState();

  return (
    <div key={crypto.randomUUID()}>
      {messages.map((message: any) => (
        <div key={message.id}>
          {message.spinner}
          {message.display}
          {message.attachments}
        </div>
      ))}
    </div>
  );
}
