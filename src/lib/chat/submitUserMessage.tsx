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
// import { isRegistered } from "./registered";
import { nanoid } from "@/lib/utils";

export async function submitUserMessage(content: string) {
  "use server";

  // await isRegistered();

  const aiState = getMutableAIState();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content: `${aiState.get().interactions.join("\n\n")}\n\n${content}`,
      },
    ],
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
        system: `You are a friendly assistance to get user requirements and transform them into actionable user stories in gherkin format (don't metion the word gherkin to the user).
          
          1. First you need to ask the project and first board name, if the user doesn't provide it, you can invent a creative one and suggest that to the user.
          2. If the user provides the project description you need to create the tasks given that description.
          3. You can help users to prioritize tasks and keep their team on the same page.
          If the user does not provide clear details, you need to ask questions to get more information. get as much informed about the project as possible. before generating the user stories, you can ask the user to confirm if all the details are included.

          Enforce the user to provides the following information.

          - Project Name
          - Board name
          - requirements
          And guide the user to find the needs to be solved, and based on that you can stop asking questions and display the generated tasks`,
        messages: history,
      });
      let textContent = "";
      spinnerStream.done(null);

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

  return {
    id: nanoid(),
    attachments: uiStream.value,
    spinner: spinnerStream.value,
    display: messageStream.value,
  };
}
