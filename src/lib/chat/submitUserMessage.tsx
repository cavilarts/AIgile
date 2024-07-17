"use server";

import BotMessage from "@/components/Chat/BotMessage";
import { google } from "@ai-sdk/google";
import { Spinner } from "@nextui-org/react";
import { streamText } from "ai";
import {
  getMutableAIState,
  createStreamableValue,
  createStreamableUI,
} from "ai/rsc";
import { isRegistered } from "./registered";
import { nanoid } from "@/lib/utils";

export async function submitUserMessage(content: string) {
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

  (async () => {
    try {
      const { textStream: newMessageStream } = await streamText({
        model: google("models/gemini-1.5-flash-latest"),
        system: aiState.get().content,
        messages: history,
      });
      let textContent = "";

      for await (const text of newMessageStream) {
        textStream.update(text);
        textContent += text;
        messageStream.update(<BotMessage content={textContent} />);
      }

      textStream.done();
      uiStream.done();
      messageStream.done();
    } catch (error) {
      console.error(error);
    }
  })();
}
