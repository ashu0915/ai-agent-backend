import fs from 'fs';
import path from 'path';
import { cosineSimilarity } from '../utils/cosine';
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });

type Chunk = {
  text: string;
  embedding: number[];
};

let vectorStore: Chunk[] = [];

(async function loadDocuments() {
  const docsPath = path.join(__dirname, '../../data/docs');
  const files = fs.readdirSync(docsPath).filter(f => f.endsWith('.md') || f.endsWith('.txt'));

  for (const file of files) {
    const fullPath = path.join(docsPath, file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const chunks = chunkText(content, 300);

    for (const chunk of chunks) {
      const embedding = await getEmbedding(chunk);
      vectorStore.push({ text: chunk, embedding });
    }
  }

  console.log(`[VectorStore] Loaded ${vectorStore.length} chunks.`);
})();


export async function getRelevantChunks(query: string): Promise<string[]> {
  const queryEmbedding = await getEmbedding(query);

  const scored = vectorStore.map(chunk => ({
    text: chunk.text,
    score: cosineSimilarity(queryEmbedding, chunk.embedding)
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(chunk => chunk.text);
}

function chunkText(text: string, maxLen: number): string[] {
  const words = text.split(' ');
  const chunks = [];
  for (let i = 0; i < words.length; i += maxLen) {
    chunks.push(words.slice(i, i + maxLen).join(' '));
  }
  return chunks;
}

async function getEmbedding(text: string): Promise<number[]> {
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}
