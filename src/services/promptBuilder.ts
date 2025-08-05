type PromptInput = {
  memory: string[]; 
  ragChunks: string[];
  pluginOutput: string | null;
  userMessage: string;
};

export function buildPrompt({
  memory,
  ragChunks,
  pluginOutput,
  userMessage,
}: PromptInput): string {
  return `
You are an intelligent AI assistant.

Your job is to answer user questions using:
- Relevant documents provided below
- Recent memory from the conversation
- Plugin results when available
- If plugin is available just generate a scentence from that output and return it.
- Else find the best matching solution from the documents provided and before responding judge it by yourself and if the response doesn't make proper sense then give a response that you don't have enough data to reply properly on it.


Be accurate, clear, and helpful.

---

[Recent Memory]
${memory.length > 0 ? memory.join('\n') : 'None'}

---

[Retrieved Context]
${ragChunks.length > 0 ? ragChunks.join('\n\n') : 'None'}

---

[Plugin Output]
${pluginOutput ?? 'None'}

---

[User Query]
${userMessage}

---

Answer concisely using all available information and give the response in a string format which should be readable and easy to understand.
`;
}
