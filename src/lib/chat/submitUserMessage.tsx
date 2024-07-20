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
import { Loading } from "@/components/Chat/Icons";

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

  const history = aiState.get().messages;

  const textStream = createStreamableValue("");
  const spinnerStream = createStreamableUI(<Loading />);
  const messageStream = createStreamableUI(null);
  const uiStream = createStreamableUI();

  (async () => {
    try {
      const { textStream: newMessageStream } = await streamText({
        model: google("models/gemini-1.5-pro-latest"),
        system: `
          As an AI assistant, your role is to guide the user through providing essential project information and requirements. Maintain the conversation in the dominant language used by the user and avoid referencing any specific applications for creating or managing boards. Your objective is to facilitate the collection of detailed information and confirm all details before generating clear and comprehensive user stories.  

          To create detailed user stories for your project, please provide the following information:

          1. Project Name

            •	What is the name of your project?

          2. Board Name

            •	What is the name of the board or team working on this project?

          3. Requirements

            •	List the primary requirements or objectives for this project. Be as detailed as possible.

          Guidelines:

            •	If you use words in another language, I will continue the conversation in the dominant language used.
            •	You don’t need to know any specific formats; I will handle the technical details.
            •	Focus on providing clear and comprehensive project and board details, along with requirements.
            •	Transform the requirements into user stories using gherkin syntax.

          Example:

            •	Project Name: [User Input]
            •	Board Name: [User Input]
            •	Requirements: 
              • [User Input]

          Please provide the information requested above. If you need any help or clarification, feel free to ask!

          Completion Indication:

          Once all necessary details are gathered and confirmed, I will display all the project data,
          and then explicitly state: [User stories are ready. Proceed to generate visual output.](#)
          This message will indicate that the user stories are complete and you can proceed with generating the visual output.
        `,
        messages: [...history],
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
      aiState.done({
        ...aiState.get(),
        messages: [
          ...aiState.get().messages,
          {
            id: nanoid(),
            role: "assistant",
            content: textContent,
          },
        ],
      });
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
