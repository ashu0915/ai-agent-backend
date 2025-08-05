import express from 'express';
import bodyParser from 'body-parser';
import agentRouter from './routes/agent';
import 'dotenv/config';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/agent', agentRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
