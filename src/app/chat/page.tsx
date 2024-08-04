import ChatPageWrapper from "@/components/Chat/ChatPageWrapper";
import { DashboardLayout } from "@/layouts";
import { nanoid } from "@/lib";
import { authOptions } from "@/lib/auth/auth";
import { AI } from "@/lib/chat/actions";
import { getProjectByUser, getUserByEmail } from "@/lib/db";
import { Project } from "@/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "AI-gile",
  description:
    "Talk to an AI assistant to help you create your project requirements.",
};

export default async function ChatPage() {
  const id = nanoid();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const user = email ? await getUserByEmail(email) : null;
  const data = user?.data?._id
    ? ((await getProjectByUser(user.data._id)) as Project)
    : null;

  if (data && data.slug) {
    redirect(`/dashboard/${data.slug}`);
  }

  return (
    <DashboardLayout>
      <AI initialAIState={{ id: id, interactions: [], messages: [] }}>
        <ChatPageWrapper />
      </AI>
    </DashboardLayout>
  );
}
