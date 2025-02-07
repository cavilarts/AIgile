// This route is used to generate JSON from the text generated by the AI model.
// used for testing purposes only
// TODO: Remove this route before deploying to production
import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { CoreMessage, generateText } from "ai";
import { extractJSONfromString } from "@/lib";

export async function POST(req: NextRequest) {
  try {
    if (!req.body) {
      throw new Error("No messages provided.");
    }

    const messages: CoreMessage[] = await req.json();

    const { text } = await generateText({
      model: google("models/gemini-1.5-flash-latest"),
      system: `
      return randomJSON
      {
        "projectName": string,
        "boardName" string,
        "tasks": {
          title: string
          description: string // gherkin format and using markdown in one single line
          priority: string
          tags: tags
        } []
      }
      `,
      messages,
    });

    const extractedJSON = extractJSONfromString(text);
    if (!extractedJSON) {
      throw new Error("No JSON found in the generated text");
    }
    // // Parse the JSON to ensure it's valid
    const parsedJSON = JSON.parse(extractedJSON);

    // Here you would typically store the JSON in your database
    console.log("JSON to be stored:", parsedJSON);

    return NextResponse.json({
      success: true,
      message: "Visual output data generated and ready for use!",
    });
  } catch (error) {
    console.error("Error generating JSON:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while generating the visual output data.",
      },
      { status: 500 }
    );
  }
}
