"use client";

import { nanoid } from "@/lib";
import { AI } from "@/lib/chat/actions";
import { useEnterSubmit } from "@/lib/hooks/useEnterSubmit";
import { Button, Textarea } from "@nextui-org/react";
import { useActions, useUIState } from "ai/rsc";
import { ChangeEventHandler, useRef, useState } from "react";

export default function PromptForm() {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { submitMessage } = useActions();
  const [, setMessages] = useUIState<typeof AI>();
  const [input, setInput] = useState("");

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = input.trim();

    setInput("");

    if (message.length === 0) {
      return;
    }

    setMessages((prev) => ({
      ...prev,
      messages: [...prev, { id: nanoid(), content: message, from: "user" }],
    }));

    try {
      const responseMessage = submitMessage(message);

      setMessages((prev) => ({
        ...prev,
        messages: [...prev, responseMessage],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form ref={formRef}>
      <Textarea
        minRows={1}
        value={input}
        onChange={handleOnChange}
        ref={inputRef}
      />
      <Button type="submit">Send</Button>
    </form>
  );
}
