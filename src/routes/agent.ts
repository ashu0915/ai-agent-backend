import express from 'express';
import { handleMessage } from '../services/llmService';

const router = express.Router();

router.post('/message', async (req, res) => {
  const { message, session_id } = req.body;

  if (!message || !session_id) {
    return res.status(400).json({ error: 'Missing message or session_id' });
  }

  try {
    const reply = await handleMessage(message, session_id);
    res.json({ reply });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
