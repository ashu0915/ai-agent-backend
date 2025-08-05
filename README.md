# AI Agent Backend (TypeScript + Express)

This is a pluggable AI Agent backend built in TypeScript with Express. It supports:
- OpenAI-powered chat completion
- Plugins for external tool use
- Memory management (simple in-memory store)
- RAG via document context (optional extension)

---

## 🚀 Live Deployment

This project is deployed on **Render**:

> 🔗 **POST** [`https://ai-agent-backend-xumy.onrender.com/agent/message`](https://ai-agent-backend-xumy.onrender.com/agent/message)

You can test it using **Postman** or `curl`. See examples below.

---

## 🚀 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/ai-agent-server.git
cd ai-agent-server
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Fill it with your API Keys(generate if you don't have one from the official sites):

```env
GEMINI_API_KEY=your_gemini_api_key
WEATHER_API_KEY=your_openweathermap_api_key
PORT=3000
```

4. **Start the server**

```bash
npm run dev
```

> You can also use `npm run build && npm start` for production.

---

## 🔁 Sample API Call

### `/agent/message` – Send message to the AI agent

```bash
curl -X POST http://localhost:3000/agent/message   -H "Content-Type: application/json"   -d '{
    "message": "weather in bangalore",
    "session_id": "abc124"
}'
```

### Sample Postman Body
```json
{
    "message": "weather in bangalore",
    "session_id": "abc124"
}
```

---

## 🧠 Architecture Overview

```plaintext
          +------------+          
          |  Frontend  |          
          +-----+------+          
                | POST /agent/message
                v
        +-------+--------+       
        |     Express     |       
        +-------+--------+       
                |                
         +------+-------+        
         | Agent Manager |        
         +------+-------+        
                |                
     +----------+----------+     
     | Context, Memory, RAG |     
     +----------+----------+     
                |                
     +----------+----------+     
     |    OpenAI Completion   |     
     +-----------------------+
```