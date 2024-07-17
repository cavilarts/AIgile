import Messages from "@/components/Chat/Messages";
import PromptForm from "@/components/Chat/PromptForm";
import { nanoid } from "@/lib";
import { AI } from "@/lib/chat/actions";

export default function ChatPage() {
  const id = nanoid();

  return (
    <AI initialAIState={{ id: id, interactions: [], messages: [] }}>
      <Messages />
      <PromptForm />
    </AI>
  );
}
