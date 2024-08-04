"use client";
import { AuthForm } from "@/components/Auth/AuthForm";
import { GoogleSignInButton } from "@/components/Auth/GoogleSignInButton";
import { Divider } from "@nextui-org/react";

export default function Login() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl font-extrabold sm:text-5xl text-center">
        Welcome to AIgile
      </h1>
      <p className="mt-4 max-w-lg sm:text-xl/relaxed text-secondary-900 text-center">
        Effortlessly transform requirements into actionable user stories,
        prioritize tasks, and keep your team on the same page.
      </p>
      <p className="mt-4 max-w-lg sm:text-xl/relaxed text-secondary-900 text-center">
        Please sign in to continue.
      </p>
      <div className="max-w-xs">
        <GoogleSignInButton />
      </div>
    </section>
  );
}
