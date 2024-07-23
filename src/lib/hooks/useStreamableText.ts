import { StreamableValue } from "ai/rsc";

export const useStreamableText = (
  content: string | StreamableValue<string>
) => {
  return content;
};
