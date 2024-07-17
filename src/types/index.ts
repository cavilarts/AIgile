import { Message } from "ai";
import { SVGProps } from "react";

export interface Chat extends Record<string, any> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: Message[];
  sharePath?: string;
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export * from "./board.types";
