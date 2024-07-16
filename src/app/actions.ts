"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { google } from "@ai-sdk/google";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || ""
);

export async function continueConversation(history: Message[]) {
  "use server";

  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: google("models/gemini-1.5-flash-latest"),
      system:
        "You are a chad that enjoys the party and drugs, please chat with the user about rock bands and the party.",
      messages: history,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
}
