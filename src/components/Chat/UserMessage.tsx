import { Avatar, Card, CardBody } from "@nextui-org/react";

export type UserMessageProps = {
  children: React.ReactNode;
};
export default function UserMessage({ children }: UserMessageProps) {
  return (
    <section className="flex justify-end">
      <Card className="flex max-w-xs md:max-w-sm lg:max-w-lg">
        <CardBody>{children}</CardBody>
      </Card>
    </section>
  );
}
