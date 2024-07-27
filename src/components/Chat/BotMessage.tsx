import GenerateJSONButton from "@/lib/chat/GenerateJSONButton";
import { useStreamableText } from "@/lib/hooks/useStreamableText";
import { Card, CardBody, Link } from "@nextui-org/react";
import { StreamableValue } from "ai/rsc";
import { MemoizedReactMarkdown } from "./MarkDown";

export type BotMessageProps = {
  content: string | StreamableValue<string>;
};
export default function BotMessage({ content }: BotMessageProps) {
  const text = useStreamableText(content);

  return (
    <section className="flex justify-start mb-2">
      <Card className="flex max-w-xs lg:max-w">
        <CardBody>
          <MemoizedReactMarkdown
            components={{
              p({ children }) {
                return <p className="text-sm">{children}</p>;
              },
              a({ children, href }) {
                if (
                  children === "Generate visual output" ||
                  children === "Generar visual output"
                ) {
                  // It's not possible to pass props to the component given the server nature of the component
                  return <GenerateJSONButton />;
                }

                return <Link href={href ?? "#"}>{children}</Link>;
              },
            }}
          >
            {String(text)}
          </MemoizedReactMarkdown>
        </CardBody>
      </Card>
    </section>
  );
}
