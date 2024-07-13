import { GoogleGenerativeAI } from "@google/generative-ai";

import { isRegistered } from "./registered";

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? ""
);

async function submitUserMessage(content: string) {
  "use server";

  await isRegistered();
}
