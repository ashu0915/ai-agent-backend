# Project Notes

## 🤖 AI-Generated vs Manual

| Component                    | Status               |
|-----------------------------|----------------------|
| Project structure            | Manually designed    |
| `index.ts` (Express setup)   | Manually written     |
| Agent class + logic          | AI-guided (refined manually) |
| Plugin handling              | One manually written, one AI-generated mock |
| Memory store                 | Manually implemented |
| README / NOTES               | AI-generated & refined manually |

---

## 🪲 Bugs & Fixes

### 1. `src` not recognized as root in tsconfig
**Fix**: Set `baseUrl: "./src"` and `rootDir: "./src"` in `tsconfig.json`; ensured tools like `ts-node` respect path aliases.

### 2. `openweathermap` required latitude and longitude in request URL
**Fix**: Researched and integrated OpenWeatherMap's GeoCoding API to convert city name to coordinates.

### 3. OpenAI API required prepaid billing
**Fix**: Switched to Gemini API as a free alternative for LLM integration.

---

## 🔌 Agent Flow & Routing

### Message Flow:

1. Client sends a message via `POST /agent/message`
2. Agent retrieves previous messages from memory store (e.g., last 2 interactions)
3. Retrieves contextual chunks using RAG (vector similarity search)
4. Checks for plugin-relevant keywords or trigger patterns
5. Invokes plugin (e.g., Weather, Calculator) if applicable
6. Merges plugin output + memory + retrieved context into a single prompt
7. Sends final prompt to Gemini API
8. Saves interaction to in-memory session store
9. Sends the assistant's reply back to the client
