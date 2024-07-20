"use client";

import { useUIState } from "ai/rsc";
import { EmptyMessages } from "./Emptymessages";
import { useScrollAnchor } from "@/lib/hooks/useScrollAnchor";
import { Button } from "@nextui-org/react";
import { FaChevronDown } from "react-icons/fa";

export type MessagesProps = {};

export default function Messages({}: MessagesProps) {
  const [messages] = useUIState();
  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  if (!messages.length) {
    return (
      <section className="w-full flex-auto overflow-auto flex items-center justify-center flex-col">
        <EmptyMessages />
      </section>
    );
  }

  return (
    <section
      className="w-full h-full overflow-hidden flex items-center justify-end flex-col"
      ref={scrollRef}
    >
      <div
        key={crypto.randomUUID()}
        className="w-full h-fit overflow-y-scroll"
        ref={messagesRef}
      >
        <div className="h-px w-full" ref={visibilityRef} />
        <Button
          color="primary"
          radius="full"
          isIconOnly
          className={`absolute right-4 -top-10 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2 ${
            isAtBottom ? "opacity-0" : "opacity-100"
          }`}
          onClick={() => scrollToBottom()}
        >
          <FaChevronDown />
          <span className="sr-only">Scroll to bottom</span>
        </Button>
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
