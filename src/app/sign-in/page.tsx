"use client";
import { AuthForm } from "@/components/Auth/AuthForm";
import { GoogleSignInButton } from "@/components/Auth/GoogleSignInButton";
import { Divider } from "@nextui-org/react";

export default function Login() {
  return (
    <section>
      <GoogleSignInButton />
      <Divider />
      <span>or</span>
      <AuthForm />
    </section>
  );
}
