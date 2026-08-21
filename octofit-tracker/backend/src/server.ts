import express from 'express';
import './config/database.js';
import { apiRouter } from './routes.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Octofit API listening on port ${port}`);
});
