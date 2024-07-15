import { Card, CardBody } from "@nextui-org/react";
import { StreamableValue } from "ai/rsc/dist";

import { useStreamableText } from "@/lib/hooks/use-streamable-text";

export type BotMessageProps = {
  content: string | StreamableValue<string>;
  className?: string;
};
export default function BotMessage({ content }: BotMessageProps) {
  const text = useStreamableText(content);

  return (
    <Card>
      <CardBody>
        <p>{text}</p>
      </CardBody>
    </Card>
  );
}
