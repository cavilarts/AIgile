"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { createAI } from "ai/rsc";

import { nanoid } from "../utils";

import { Chat } from "@/types";
import { onGetUIState, onSetAIState } from "./onGetUIState";
import { submitUserMessage } from "./submitUserMessage";

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? ""
);

export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: {
    id: nanoid(),
    messages: [],
    interactions: [],
  },
  onGetUIState: onGetUIState,
  onSetAIState: onSetAIState,
});

export const getUIStateFromAIState = (aiState: Readonly<Chat>) => {
  return aiState.messages.map((message: { role: any; content: any }) => ({
    role: message.role,
    content: message.content,
  }));
};
