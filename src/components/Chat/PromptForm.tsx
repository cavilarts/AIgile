"use client";

import { nanoid } from "@/lib";
import { AI } from "@/lib/chat/actions";
import { useEnterSubmit } from "@/lib/hooks/useEnterSubmit";
import { Button, Textarea } from "@nextui-org/react";
import { useActions, useUIState } from "ai/rsc";
import { ChangeEventHandler, useRef, useState } from "react";
import UserMessage from "./UserMessage";
import { IoSend } from "react-icons/io5";
import { Message } from "ai";
import { useScrollAnchor } from "@/lib/hooks/useScrollAnchor";

export default function PromptForm() {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { submitUserMessage } = useActions();
  const [messages, setMessages] = useUIState();
  const [input, setInput] = useState("");
  const { scrollToBottom } = useScrollAnchor();

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    scrollToBottom();

    const message = input.trim();

    setInput("");

    if (message.length === 0) {
      return;
    }

    setMessages((currentMessages: Array<Message>) => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage>{message}</UserMessage>,
      },
    ]);

    try {
      const responseMessage = await submitUserMessage(message);
      setMessages((prev: Array<Message>) => {
        return prev ? [...prev, responseMessage] : [responseMessage];
      });

      scrollToBottom();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmitForm} className="flex p-2">
      <Textarea
        minRows={1}
        value={input}
        onChange={handleOnChange}
        ref={inputRef}
      />
      <Button type="submit" isIconOnly>
        <IoSend />
      </Button>
    </form>
  );
}
