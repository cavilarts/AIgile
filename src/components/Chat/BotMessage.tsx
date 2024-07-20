import { useStreamableText } from "@/lib/hooks/useStreamableText";
import { Avatar, Button, Card, CardBody } from "@nextui-org/react";
import { StreamableValue } from "ai/rsc";
import { MemoizedReactMarkdown } from "./MarkDown";
import { CodeBlock } from "./CodeBlock";
import GenerateJSONButton from "@/lib/chat/GenerateJSONButton";
import ReactMarkdown from "react-markdown";
import { Link } from "@nextui-org/react";

export type BotMessageProps = {
  content: string | StreamableValue<string>;
};
export default function BotMessage({ content }: BotMessageProps) {
  const text = useStreamableText(content);

  return (
    <section className="flex justify-start mb-2">
      <Card className="flex max-w-xs lg:max-w">
        <CardBody>
          <ReactMarkdown
            components={{
              p({ children}) {
                return <p className="text-sm">{children}</p>;
              },
              a({ children, href }) {
                if (children === "Generate visual output") {
                  // It's not possible to pass props to the component given the server nature of the component
                  return <GenerateJSONButton />;
                }

                return <Link href={href ?? '#'}>{children}</Link>;
              },
            }}
          >
            {String(text)}
          </ReactMarkdown>
        </CardBody>
      </Card>
    </section>
  );
}
