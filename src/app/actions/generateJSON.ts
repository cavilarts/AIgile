"use server";

import { extractJSONfromString } from "@/lib";
import { google } from "@ai-sdk/google";
import { CoreMessage, generateText } from "ai";
import { submitProject } from "./submitProject";
import { ProjectGenerated } from "@/types";

const DEFAULT_ERROR_MESSAGE =
  "An error occurred while generating the visual output data.";

export async function generateJSON(messages: CoreMessage[]) {
  try {
    console.log("Generating JSON from messages:", messages);
    if (messages[messages.length - 1].role === "assistant") {
      messages.pop();
    }

    const { text } = await generateText({
      model: google("models/gemini-1.5-flash-latest"),
      system: `
      Generate a JSON with the following structure as defined in the conversation. Do not include any explanatory text, only output valid JSON, and don't ask more questions.
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

    try {
      const parsedJSON = JSON.parse(text) as ProjectGenerated;

      return {
        success: true,
        message: "Visual output data generated and ready for use!",
        response: JSON.stringify(parsedJSON),
      };
    } catch (error) {
      throw new Error("The generated JSON is not valid");
    }
    // let extractedJSON;
    // let parsedJSON;

    // if (typeof text === "string") {
    //   extractedJSON = extractJSONfromString(text);
    //   if (!extractedJSON)
    //     throw new Error("No JSON found in the generated text");
    //   // Parse the JSON to ensure it's valid
    //   parsedJSON = JSON.parse(extractedJSON) as ProjectGenerated;
    // }

    // if (typeof text === "object") {
    //   extractedJSON = JSON.stringify(text);
    // }

    // const response = await submitProject(parsedJSON);
    // console.log("Response from submitProject:", response);
  } catch (error) {
    console.error("Error generating JSON:", error);

    // @ts-ignore
    return { success: false, message: error?.message || DEFAULT_ERROR_MESSAGE };
  }
}
