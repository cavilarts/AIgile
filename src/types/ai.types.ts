import { ReactNode } from "react";

export type ServerMessage = {
  role: 'user' | 'assistant';
  content: string;
}

export type ClientMessage = {
  id: string;
  role: 'user' | 'assistant';
  display: ReactNode;
}

export type Message = ServerMessage | ClientMessage;