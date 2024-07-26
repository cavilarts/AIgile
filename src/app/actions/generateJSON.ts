'use server'

import { extractJSONfromString } from "@/lib";
import { google } from "@ai-sdk/google";
import { CoreMessage, generateText  } from "ai";
import { submitProject } from "./submitProject";
import { ProjectGenerated } from "@/types";

const DEFAULT_ERROR_MESSAGE = "An error occurred while generating the visual output data.";

export async function generateJSON(messages: CoreMessage[]) {
  try {
    console.log("Generating JSON from messages:", messages);
    if (messages[messages.length - 1].role === "assistant") {
      messages.pop();
    }

    const { text } = await generateText({
      model: google("models/gemini-1.5-pro-latest"),
      system: `
      Generate a JSON with the following structure as defined in the conversation. Do not include any explanatory text, only output valid JSON
      {
        "projectName": string,
        "projectDescription": string,
        "boardName" string,
        "boardDescription": string,
        "tasks": {
          title: string
          description: string // gherkin format and using markdown in one single line
          priority: 'low' | 'medium' | 'high'
          tags: tags
        } []
      }
      `,
      messages,
    });
    console.log("text generated:", text);

    const extractedJSON = extractJSONfromString(text);
    if(!extractedJSON) throw new Error("No JSON found in the generated text");
    // Parse the JSON to ensure it's valid
    const parsedJSON = JSON.parse(extractedJSON) as ProjectGenerated;
    console.log("JSON to be stored:", parsedJSON);

    const response = submitProject(parsedJSON);
    console.log("Response from submitProject:", response);

    return { success: true, message: "Visual output data generated and ready for use!" };

  } catch (error) {
    console.error("Error generating JSON:", error);

    // @ts-ignore
    return { success: false, message: error?.message || DEFAULT_ERROR_MESSAGE };
  }
}