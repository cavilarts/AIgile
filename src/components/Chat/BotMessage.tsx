import { useStreamableText } from "@/lib/hooks/useStreamableText";
import { Avatar, Card, CardBody } from "@nextui-org/react";
import { StreamableValue } from "ai/rsc";

export type BotMessageProps = {
  content: string | StreamableValue<string>;
};
export default function BotMessage({ content }: BotMessageProps) {
  const text = useStreamableText(content);

  return (
    <Card>
      <Avatar name="Bot" />
      <CardBody>{content}</CardBody>
    </Card>
  );
}
