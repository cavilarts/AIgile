import { redirect } from "next/navigation";

export async function isRegistered() {
  // Edit this function to implement validation if user is registered
  redirect("/sign-up");
}
