import { useStreamableText } from "@/lib/hooks/useStreamableText";
import { Avatar, Button, Card, CardBody } from "@nextui-org/react";
import { StreamableValue } from "ai/rsc";
import { MemoizedReactMarkdown } from "./MarkDown";
import { CodeBlock } from "./CodeBlock";

export type BotMessageProps = {
  content: string | StreamableValue<string>;
};
export default function BotMessage({ content }: BotMessageProps) {
  const text = useStreamableText(content);

  const createBoard = () => {
    console.log("Create board");
  };

  return (
    <section className="flex justify-start mb-2">
      <Card className="flex max-w-xs lg:max-w">
        <CardBody>
          <MemoizedReactMarkdown
            components={{
              p({ children }) {
                return <p className="text-sm">{children}</p>;
              },
              link({ children }) {
                if (typeof children === "string") {
                  return (
                    <Button color="primary" onClick={createBoard}>
                      {children}
                    </Button>
                  );
                }

                return null;
              },
            }}
          >
            {text}
          </MemoizedReactMarkdown>
        </CardBody>
      </Card>
    </section>
  );
}
