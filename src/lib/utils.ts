import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { ChatMessage } from "./types";

export async function callGptApi(
  messages: ChatMessage[],
  options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    onError?: (error: Error) => void;
  },
) {
  const {
    model = "gpt-4o",
    temperature = 0.7,
    maxTokens = 1000,
    onError,
  } = options || {};

  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error(
        "OpenAI API key is not configured. Please add it to your environment variables.",
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `API request failed with status ${response.status}: ${JSON.stringify(errorData)}`,
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    if (onError && error instanceof Error) {
      onError(error);
    } else {
      console.error("Error calling GPT API:", error);
    }
    return null;
  }
}
