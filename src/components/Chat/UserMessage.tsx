import { Avatar, Card, CardBody } from "@nextui-org/react";

export type UserMessageProps = {
  children: React.ReactNode;
};
export default function UserMessage({ children }: UserMessageProps) {
  return (
    <Card>
      <Avatar name="User" />
      <CardBody>{children}</CardBody>
    </Card>
  );
}
