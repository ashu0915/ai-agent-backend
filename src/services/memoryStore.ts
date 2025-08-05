type Message = {
  user: string;
  assistant: string;
};

const memoryStore: Record<string, Message[]> = {};

export function getMemoryForSession(sessionId: string): string[] {
  const sessionMessages = memoryStore[sessionId] || [];
  return sessionMessages.flatMap(msg => [
    `User: ${msg.user}`,
    `Assistant: ${msg.assistant}`
  ]);
}

export function saveMessageToSession(sessionId: string, userMsg: string, assistantMsg: string): void {
  if (!memoryStore[sessionId]) {
    memoryStore[sessionId] = [];
  }
  memoryStore[sessionId].push({ user: userMsg, assistant: assistantMsg });
}
