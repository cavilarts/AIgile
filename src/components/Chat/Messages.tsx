"use client";

import { useUIState } from "ai/rsc";
import { EmptyMessages } from "./Emptymessages";

export type MessagesProps = {};

export default function Messages({}: MessagesProps) {
  const [messages] = useUIState();

  if (!messages.length) {
    return <EmptyMessages />;
  }

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
