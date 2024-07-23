"use client";

import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AuthFormProps {
  csrfToken?: string;
}

export function AuthForm(props: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/chat");
    } else {
      console.log("Error: ", signInResponse);
      setError("Invalid email or password");
    }
  };

  return (
    <form
      className="w-full mt-8 text-xl text-black font-semibold flex flex-col"
      onSubmit={handleSubmit}
    >
      {error && (
        <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md">
          {error}
        </span>
      )}
      <Input type="email" name="email" placeholder="Email" required />

      <Input type="password" name="password" placeholder="Password" required />

      <Button type="submit" color="primary">
        Log in
      </Button>
    </form>
  );
}
