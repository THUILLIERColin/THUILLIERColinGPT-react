import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({ apiKey }) : null;

type ChatMessage = { role: 'user' | 'assistant'; content: string };

type AskGPTConfig = {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
};

export const askGPT = async (
  messages: ChatMessage[],
  config?: AskGPTConfig
): Promise<{ role: 'assistant'; content: string }> => {
  if (process.env.NODE_ENV === 'development' || !openai) {
    return {
      role: 'assistant',
      content: 'Hello, I am a bot.',
    };
  }

  const response = await openai.chat.completions.create({
    model: config?.model || 'gpt-4',
    messages,
    temperature: config?.temperature ?? 1,
    max_tokens: config?.max_tokens ?? 1024,
    top_p: config?.top_p ?? 1,
    frequency_penalty: config?.frequency_penalty ?? 0,
    presence_penalty: config?.presence_penalty ?? 0,
  });

  const content = response.choices[0]?.message?.content ?? '';

  return {
    role: 'assistant',
    content,
  };
};