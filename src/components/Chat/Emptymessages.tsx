import { Button, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

export function EmptyMessages() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <Card>
        <CardBody>
          <p>
            Create your next project with AI-gile the first AI-driven tool to
            help you manage your projects.
          </p>
        </CardBody>
      </Card>
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 sm:p-8 p-4 text-sm sm:text-base">
        <h1 className="text-2xl sm:text-3xl tracking-tight font-semibold max-w-fit inline-block">
          Getting Started
        </h1>
        <p className="leading-normal text-zinc-900">
          AI-gile is a project management tool that uses AI to help you manage
          your projects. It helps you keep track of your tasks, deadlines, and
          resources.
        </p>
        <p className="leading-normal text-zinc-900">
          To get started, describe your project by typing in the chat box below.
        </p>
      </div>
    </div>
  );
}
