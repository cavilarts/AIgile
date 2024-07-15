import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  createStreamableUI,
  createStreamableValue,
  getMutableAIState,
} from "ai/rsc";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

import { nanoid } from "../utils";

import BotMessage from "@/components/Chat/BotMessage";

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? ""
);

export async function submitUserMessage(content: string) {
  "use server";

  // @TODO: check if the user is registered

  const prompt = `
  You are a friendly assistance to get user requirements and transform them into actionable user stories in gherkin format (don't metion the word gherkin to the user).

  1. First you need to ask the project and first board name, if the user doesn't provide it, you can invent a creative one and suggest that to the user.
  2. If the user provides the project description you need to create the tasks given that description.
  3. You can help users to prioritize tasks and keep their team on the same page.
  If the user does not provide clear details, you need to ask questions to get more information. get as much informed about the project as possible. before generating the user stories, you can ask the user to confirm if all the details are included.
  
  Enforce the user to provides the following information.
  
  - Project Name
  - Board name
  - requirements
  And guide the user to find the needs to be solved, and based on that you can stop asking questions and display the generated tasks`;

  const AIState = getMutableAIState();

  AIState.update({
    ...AIState.get().messages,
    id: nanoid(),
    role: "user",
    content: `${AIState.get().interactions.join("\n\n")}\n\n${content}`,
  });

  const history = AIState.get().messages.map((message: any) => ({
    role: message.role,
    content: message.content,
  }));

  const textStream = createStreamableValue("");
  const spinnerStream = createStreamableUI(<div />);
  const messageStream = createStreamableUI(null);
  const uiStream = createStreamableUI();

  (async () => {
    try {
      const result = await streamText({
        model: google("models/gemini-1.5-flash-latest"),
        temperature: 0.5,
        tools: {
          showUserStories: {
            description: "Display to the user the generated user stories",
            parameters: {
              userStories: {
                type: "string",
                description: "The generated user stories",
              },
            },
          },
        },
        system: prompt,
        messages: [...history],
      });

      let textConent = "";

      for await (const message of result.fullStream) {
        const { type } = message;

        if (type === "text-delta") {
          messageStream.update(<BotMessage content={textConent} />);

          AIState.update({
            ...AIState.get(),
            messages: [
              ...AIState.get().messages,
              {
                id: nanoid(),
                role: "assistant",
                content: textConent,
              },
            ],
          });
        } else if (type === "tool-call") {
          // const { toolName, args } = message;
          // if (toolName === "showUserStories") {
          //   const { userStories } = args;
          //   uiStream.update(<BotMessage content={userStories} />);
          //   AIState.done({
          //     ...AIState.get(),
          //     messages: [
          //       ...AIState.get().messages,
          //       {
          //         id: nanoid(),
          //         role: "assistant",
          //         content: "Here are the generated user stories",
          //         display: {
          //           name: "user-stories",
          //           props: {
          //             summary: userStories,
          //         }
          //       },
          //     }],
          //   });
          // }
        }
      }

      spinnerStream.done(null);
      textStream.done();
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
