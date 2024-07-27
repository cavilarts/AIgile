import ChatPageWrapper from "@/components/Chat/ChatPageWrapper";
import DefaultLayout from "@/layouts/default";
import { nanoid } from "@/lib";
import { AI } from "@/lib/chat/actions";

export const metadata = {
  title: "AI-gile",
  description:
    "Talk to an AI assistant to help you create your project requirements.",
};

export default function ChatPage() {
  const id = nanoid();

  return (
    <DefaultLayout>
      <AI initialAIState={{ id: id, interactions: [], messages: [] }}>
        <ChatPageWrapper />
      </AI>
    </DefaultLayout>
  );
}
