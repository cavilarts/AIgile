import { Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";

export const ChatPanel = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex items-center">
      <Textarea
        minRows={1}
        placeholder="Describe your project to us"
        value={message}
        onChange={(evt) => setMessage(evt.target.value)}
      />
      <Button isIconOnly aria-label="send" className="bg-transparent text-xl">
        <IoMdSend />
      </Button>
    </div>
  );
};
