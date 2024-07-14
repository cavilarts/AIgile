import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  createStreamableUI,
  createStreamableValue,
  getMutableAIState,
} from "ai/rsc";
import { Spinner } from "@nextui-org/react";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

import { nanoid } from "../utils";

import { isRegistered } from "./registered";

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? ""
);

async function submitUserMessage(content: string) {
  "use server";

  await isRegistered();

  const aiState = getMutableAIState();

  aiState.update({
    ...aiState.get(),
    id: nanoid(),
    role: "user",
    content: `${aiState.get().interactions.join("\n\n")}\n\n${content}`,
  });

  const history = aiState
    .get()
    .messages.map((message: { role: any; content: any }) => ({
      role: message.role,
      content: message.content,
    }));

  const textStream = createStreamableValue("");
  const spinnerStream = createStreamableUI(<Spinner />);
  const messageStream = createStreamableUI(null);
  const uiStream = createStreamableUI();

  async function generateAIResponse() {
    try {
      const result = await streamText({
        model: google("models/gemini-1.5-flash-latest"),
        temperature: 0.5,
        tools: {},
        system: `
          You are a friendly assistance to get user requirements and transform them into actionable user stories.
          You can help users to prioritize tasks and keep their team on the same page.
          If the user does not provide clear details, you can ask questions to get more information.
          get as much informed about the project as possible.
          before generating the user stories, you can ask the user to confirm if all the details are included.
        `,
        messages: history,
      });
    } catch (error) {}
  }
}
