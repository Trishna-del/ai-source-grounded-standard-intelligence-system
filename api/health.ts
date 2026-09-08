import type { IncomingMessage, ServerResponse } from 'http';

export default function handler(req: IncomingMessage, res: ServerResponse) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    status: 'ok',
    service: 'BIAS STANDARD — Vercel Serverless Function',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY)
  }));
}
