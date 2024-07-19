import { Avatar, Card, CardBody } from "@nextui-org/react";

export type UserMessageProps = {
  children: React.ReactNode;
};
export default function UserMessage({ children }: UserMessageProps) {
  return (
    <Card>
      <CardBody>{children}</CardBody>
    </Card>
  );
}
