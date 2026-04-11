import Anthropic from "@anthropic-ai/sdk";

const apiKey = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;

if (!apiKey) {
  console.warn(
    "Warning: EXPO_PUBLIC_ANTHROPIC_API_KEY is not set. Claude API calls will fail.",
  );
}

const client = new Anthropic({
  apiKey: apiKey ?? "",
  dangerouslyAllowBrowser: true,
});

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ClaudeResponse {
  content: string;
  model: string;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
}

/**
 * Send a single message to Claude and get a response.
 */
export async function sendMessage(
  userMessage: string,
  options?: {
    model?: string;
    maxTokens?: number;
    systemPrompt?: string;
  },
): Promise<ClaudeResponse> {
  const {
    model = "claude-sonnet-4-5",
    maxTokens = 1024,
    systemPrompt,
  } = options ?? {};

  const response = await client.messages.create({
    model,
    max_tokens: maxTokens,
    ...(systemPrompt ? { system: systemPrompt } : {}),
    messages: [
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  const content = textBlock && textBlock.type === "text" ? textBlock.text : "";

  return {
    content,
    model: response.model,
    usage: {
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    },
  };
}

/**
 * Send a multi-turn conversation to Claude and get a response.
 */
export async function sendConversation(
  messages: Message[],
  options?: {
    model?: string;
    maxTokens?: number;
    systemPrompt?: string;
  },
): Promise<ClaudeResponse> {
  const {
    model = "claude-sonnet-4-5",
    maxTokens = 1024,
    systemPrompt,
  } = options ?? {};

  const response = await client.messages.create({
    model,
    max_tokens: maxTokens,
    ...(systemPrompt ? { system: systemPrompt } : {}),
    messages: messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
  });

  const textBlock = response.content.find((block) => block.type === "text");
  const content = textBlock && textBlock.type === "text" ? textBlock.text : "";

  return {
    content,
    model: response.model,
    usage: {
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    },
  };
}

/**
 * Stream a response from Claude, calling onChunk for each text delta.
 */
export async function streamMessage(
  userMessage: string,
  onChunk: (chunk: string) => void,
  options?: {
    model?: string;
    maxTokens?: number;
    systemPrompt?: string;
  },
): Promise<ClaudeResponse> {
  const {
    model = "claude-sonnet-4-5",
    maxTokens = 1024,
    systemPrompt,
  } = options ?? {};

  let fullContent = "";
  let responseModel = model;
  let inputTokens = 0;
  let outputTokens = 0;

  const stream = await client.messages.stream({
    model,
    max_tokens: maxTokens,
    ...(systemPrompt ? { system: systemPrompt } : {}),
    messages: [
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      fullContent += event.delta.text;
      onChunk(event.delta.text);
    }

    if (event.type === "message_delta" && event.usage) {
      outputTokens = event.usage.output_tokens;
    }

    if (event.type === "message_start" && event.message) {
      responseModel = event.message.model;
      inputTokens = event.message.usage.input_tokens;
    }
  }

  return {
    content: fullContent,
    model: responseModel,
    usage: {
      inputTokens,
      outputTokens,
    },
  };
}

export default {
  sendMessage,
  sendConversation,
  streamMessage,
};
