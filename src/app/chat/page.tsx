import ChatPageWrapper from "@/components/Chat/ChatPageWrapper";
import { DashboardLayout } from "@/layouts";
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
    <DashboardLayout>
      <AI initialAIState={{ id: id, interactions: [], messages: [] }}>
        <ChatPageWrapper />
      </AI>
    </DashboardLayout>
  );
}
