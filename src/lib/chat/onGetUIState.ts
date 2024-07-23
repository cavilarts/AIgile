"use server";

import { getAIState, getMutableAIState } from "ai/rsc";
import { getUIStateFromAIState } from "./actions";

export async function onGetUIState() {
  "use server";

  const aiState = getAIState();

  if (aiState) {
    const uiState = getUIStateFromAIState(aiState);
    return uiState;
  }
}

export async function onSetAIState(aiState: any) {
  "use server";

  const mutableAIState = getMutableAIState();
  mutableAIState.update(aiState);
}
