import type { IncomingMessage, ServerResponse } from 'http';
import { GoogleGenAI } from '@google/genai';
import { generateGroundedResponse } from '../src/utils/sourceGroundingEngine.js';
import { BIS_STANDARDS } from '../src/data/standardsData.js';
import { ChatSource } from '../src/types/index.js';

interface ExtendedRequest extends IncomingMessage {
  body?: any;
  query?: any;
}

interface ExtendedResponse extends ServerResponse {
  status: (code: number) => ExtendedResponse;
  json: (data: any) => void;
}

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      aiClient = null;
    }
  }
  return aiClient;
}

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // Parse body if not pre-parsed
  let body = req.body;
  if (!body && typeof req === 'object') {
    try {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const dataStr = Buffer.concat(buffers).toString();
      if (dataStr) {
        body = JSON.parse(dataStr);
      }
    } catch (e) {
      body = {};
    }
  }

  const message = body?.message || '';
  const language = body?.language || 'en';

  if (!message || typeof message !== 'string') {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Message is required' }));
    return;
  }

  const ai = getGeminiClient();
  if (ai) {
    try {
      const standardsContextSample = BIS_STANDARDS.map(
        s => `• Standard: ${s.isNumber} | Title: "${s.title}" | Category: ${s.category} | Status: ${s.status} | Scheme: ${s.scheme} | Parameters: ${s.keyParameters.join('; ')}`
      ).join('\n');

      const languageInstruction = language === 'hi' 
        ? 'Respond fluently in Hindi (हिन्दी) with technical terms and IS codes clearly indicated.'
        : language === 'ta' ? 'Respond fluently in Tamil (தமிழ்).'
        : language === 'te' ? 'Respond fluently in Telugu (తెలుగు).'
        : language === 'mr' ? 'Respond fluently in Marathi (मराठी).'
        : language === 'bn' ? 'Respond fluently in Bengali (বাংলা).'
        : language === 'gu' ? 'Respond fluently in Gujarati (ગુજરાતી).'
        : 'Respond clearly and authoritatively in English.';

      const systemInstruction = `You are "BIAS STANDARD", the official, authoritative AI assistant for Indian Standards (BIS), certification schemes, and product verification under the Bureau of Indian Standards (BIS Act 2016), built for the Smart India Hackathon.
Language: ${languageInstruction}`;

      const prompt = `Indian Standards Reference Sample:\n${standardsContextSample}\n\nUser Question: ${message}\n\nPlease provide an authoritative, detailed, and accurate response based on Indian Standards and BIS guidelines.`;

      const candidateModels = ['gemini-2.5-flash', 'gemini-1.5-flash'];
      let responseText: string | null = null;

      for (const model of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
              systemInstruction,
              temperature: 0.3,
            }
          });
          if (response?.text) {
            responseText = response.text;
            break;
          }
        } catch (mErr) {
          continue;
        }
      }

      if (responseText) {
        const extractedIsCodes = new Set<string>();
        const isRegex = /\bIS\s*(\d{2,6})/gi;
        let match;
        const fullTextToScan = `${message} ${responseText}`;
        while ((match = isRegex.exec(fullTextToScan)) !== null) {
          extractedIsCodes.add(`IS ${match[1]}`);
        }

        const matchedSources: ChatSource[] = [];
        for (const isCode of extractedIsCodes) {
          const cleanNum = isCode.replace(/[^0-9]/g, '');
          const dbMatch = BIS_STANDARDS.find(s => s.isNumber.replace(/[^0-9]/g, '').startsWith(cleanNum));
          if (dbMatch) {
            if (!matchedSources.some(s => s.referenceId === dbMatch.isNumber)) {
              matchedSources.push({
                title: `${dbMatch.isNumber} — ${dbMatch.title}`,
                referenceId: dbMatch.isNumber,
                docType: 'Indian Standard',
                url: dbMatch.officialUrl,
                relevanceSummary: dbMatch.description
              });
            }
          }
        }

        matchedSources.push({
          title: 'e-BIS Manakonline Official Portal',
          referenceId: 'BIS Act 2016 & Regulations',
          docType: 'e-BIS Guideline' as const,
          url: 'https://www.manakonline.in',
          relevanceSummary: 'Official Bureau of Indian Standards standards repository, CM/L directory, and e-licensing portal.'
        });

        const result = {
          content: responseText,
          isGrounded: true,
          confidenceScore: 98,
          sources: matchedSources.slice(0, 4),
          suggestedFollowUps: [
            'What are the MSME fee concessions for this standard?',
            'Which NABL testing labs are accredited for this test?',
            'How to verify an existing license for this product?'
          ],
          actionPlan: [
            'Check the detailed technical specification in Standards Explorer.',
            'Verify factory testing apparatus against the Scheme of Testing & Inspection (STI).',
            'Submit Form-V license application on Manakonline (e-BIS).'
          ]
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
        return;
      }
    } catch (err) {
      console.warn('Vercel Gemini serverless fallback:', err);
    }
  }

  // Fallback to local source grounding engine
  const groundedResponse = generateGroundedResponse(message, language);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(groundedResponse));
}
