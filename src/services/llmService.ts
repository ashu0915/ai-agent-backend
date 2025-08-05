import { getMemoryForSession, saveMessageToSession } from './memoryStore';
import { getRelevantChunks } from './vectorStore';
import { detectAndRunPlugin } from './pluginManager';
import { buildPrompt } from './promptBuilder';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function handleMessage(message: string, session_id: string): Promise<string> {
  const memory = getMemoryForSession(session_id);
  const recentMemory = memory.slice(-2);
  const ragChunks = await getRelevantChunks(message);
  const pluginResult = await detectAndRunPlugin(message);
  
  const prompt = buildPrompt({
    memory: recentMemory,
    ragChunks,
    pluginOutput: pluginResult?pluginResult.output:null,
    userMessage: message
  });

  const fullPrompt = `
    System: ${prompt}
    User: ${message}
  `;

  const response = await model.generateContent(fullPrompt);
  const reply = response.response.text();

  saveMessageToSession(session_id, message, reply);
  return reply;
}
