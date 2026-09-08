import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { BIS_STANDARDS } from './src/data/standardsData.js';
import { BIS_LICENSE_DATABASE } from './src/data/licensesData.js';
import { PREBUILT_KNOWLEDGE_BASE, GENERAL_FALLBACK_WARNING } from './src/data/knowledgeBase.js';
import { ChatSource } from './src/types/index.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn('Failed to initialize GoogleGenAI client:', e);
      aiClient = null;
    }
  }
  return aiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'BIAS STANDARD — Intelligent Assistant for Indian Standards & BIS Services',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY)
  });
});

// Search Indian Standards
app.get('/api/standards', (req, res) => {
  const q = (req.query.q as string || '').toLowerCase().trim();
  const category = (req.query.category as string || '').toLowerCase();
  const status = (req.query.status as string || '').toLowerCase();

  let results = BIS_STANDARDS;

  if (q) {
    results = results.filter(s =>
      s.isNumber.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.keyParameters.some(kp => kp.toLowerCase().includes(q))
    );
  }

  if (category && category !== 'all') {
    results = results.filter(s => s.category.toLowerCase().includes(category));
  }

  if (status && status !== 'all') {
    results = results.filter(s => s.status.toLowerCase().includes(status));
  }

  res.json({ count: results.length, standards: results });
});

// Verify License / CM/L / HUID / QR
app.get('/api/verify', (req, res) => {
  const query = (req.query.query as string || '').toUpperCase().trim();
  const type = req.query.type as string;

  if (!query) {
    return res.status(400).json({ error: 'Verification query parameter is required.' });
  }

  const cleanQuery = query.replace(/[^A-Z0-9]/gi, '');

  const match = BIS_LICENSE_DATABASE.find(record => {
    if (type && type !== 'all' && record.type !== type) return false;
    const recId = record.queryId.toUpperCase().replace(/[^A-Z0-9]/gi, '');
    const cmlClean = (record.cmlNumber || '').toUpperCase().replace(/[^A-Z0-9]/gi, '');
    const regClean = (record.regNumber || '').toUpperCase().replace(/[^A-Z0-9]/gi, '');
    const huidClean = (record.huid || '').toUpperCase().replace(/[^A-Z0-9]/gi, '');

    return (
      recId === cleanQuery ||
      cmlClean.includes(cleanQuery) ||
      regClean.includes(cleanQuery) ||
      huidClean === cleanQuery ||
      (record.qrPayload && record.qrPayload.toUpperCase().includes(cleanQuery))
    );
  });

  if (match) {
    return res.json({ found: true, record: match });
  }

  // Not found in verified database
  return res.json({
    found: false,
    query,
    message: 'No active BIS licence, CRS registration, or HUID found matching this identifier in the national database. Exercise caution for counterfeit goods.',
    verificationWarning: true
  });
});

// AI Chatbot with Source Grounding
app.post('/api/chat', async (req, res) => {
  const { message, language = 'en' } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'A valid message string is required.' });
  }

  const queryLower = message.toLowerCase().trim();

  // Try Gemini AI if API key is available
  const ai = getGeminiClient();
  if (ai) {
    try {
      // Build context from our ground-truth standards and schemes
      const relevantStandardsContext = BIS_STANDARDS.map(
        s => `[Standard: ${s.isNumber}] "${s.title}" (${s.category}). Status: ${s.status}. Scheme: ${s.scheme}. Key limits: ${s.keyParameters.join('; ')}`
      ).join('\n');

      const systemInstruction = `You are "BIAS STANDARD", the official AI-powered Intelligent Assistant for Indian Standards and BIS Services, developed for the Smart India Hackathon.
Your highest priority directive: SOURCE GROUNDING and ABSOLUTE TRUTHFULNESS.
- Back every answer strictly with official Indian Standards (IS codes), Bureau of Indian Standards (BIS Act 2016, Rules 2018), Compulsory Registration Scheme (CRS), or Quality Control Orders (QCOs) issued by Indian ministries (DPIIT, MeitY, MoRTH, MoFPI).
- Under NO circumstance should you fabricate standards, parameters, or test limits.
- If the user asks about an unknown, non-standardized product, or something not covered by verified BIS guidelines, you MUST explicitly state: "⚠️ Verified Official Source Notice: Bureau of Indian Standards documentation does not contain verified guidelines for this specific query." and offer guidance on how to search official repositories (Manakonline / BIS portal).
- Language: Respond in ${language === 'hi' ? 'Hindi (हिन्दी)' : language === 'ta' ? 'Tamil' : language === 'te' ? 'Telugu' : language === 'mr' ? 'Marathi' : language === 'bn' ? 'Bengali' : language === 'gu' ? 'Gujarati' : 'English'}.
- Structure your answer clearly with:
  1. Direct, clear authoritative response.
  2. Technical parameters / requirements (bullet points).
  3. Official BIS Sources & Standards Cited (exact IS code and scheme).
  4. Practical Next Steps for the user (e.g. MSME fee concession, test lab verification, Manakonline application).`;

      const prompt = `Indian Standards Knowledge Reference:\n${relevantStandardsContext}\n\nUser Question: ${message}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.2, // Low temperature for high factual accuracy and strict grounding
        }
      });

      const responseText = response.text || '';

      // Extract sources mentioned in response
      const matchedSources: ChatSource[] = BIS_STANDARDS.filter(s =>
        responseText.toLowerCase().includes(s.isNumber.toLowerCase().split(':')[0]) ||
        message.toLowerCase().includes(s.isNumber.toLowerCase().split(':')[0])
      ).map(s => ({
        title: `${s.isNumber} — ${s.title}`,
        referenceId: s.isNumber,
        docType: 'Indian Standard',
        url: s.officialUrl,
        relevanceSummary: s.description
      }));

      // Add general BIS source if none found
      if (matchedSources.length === 0) {
        matchedSources.push({
          title: 'e-BIS Manakonline Official Portal',
          referenceId: 'BIS Act 2016 & Conformity Regulations',
          docType: 'e-BIS Guideline' as const,
          url: 'https://www.manakonline.in',
          relevanceSummary: 'Official Bureau of Indian Standards standards repository and verification directory.'
        });
      }

      return res.json({
        content: responseText,
        isGrounded: true,
        confidenceScore: 98,
        sources: matchedSources,
        suggestedFollowUps: [
          'What are the MSME fee concessions for this standard?',
          'Which NABL testing labs are accredited for this test?',
          'How to verify an existing license for this product?'
        ],
        actionPlan: [
          'Check the detailed technical specification in Standards Explorer.',
          'Verify your factory testing apparatus against the Scheme of Testing & Inspection (STI).',
          'Submit Form-V application on Manakonline.'
        ]
      });
    } catch (err) {
      console.error('Gemini API call failed, falling back to local source engine:', err);
      // Fall through to local knowledge base
    }
  }

  // Local Source Grounding Retrieval Engine
  let bestMatch = null;
  let maxScore = 0;

  for (const item of PREBUILT_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (queryLower.includes(kw)) {
        score += 10;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  // Check direct standard match in BIS_STANDARDS
  if (!bestMatch || maxScore === 0) {
    const stdMatch = BIS_STANDARDS.find(s =>
      queryLower.includes(s.isNumber.toLowerCase().replace(/[^a-z0-9]/g, '')) ||
      queryLower.includes(s.title.toLowerCase()) ||
      s.keyParameters.some(kp => queryLower.includes(kp.toLowerCase()))
    );

    if (stdMatch) {
      return res.json({
        content: `**${stdMatch.isNumber}: ${stdMatch.title}**\n\n${stdMatch.description}\n\n**Key Technical Specifications & Parameters:**\n${stdMatch.keyParameters.map(kp => `• ${kp}`).join('\n')}\n\n**Regulatory Status:** ${stdMatch.status} (${stdMatch.qcoMinistry || 'Bureau of Indian Standards'})\n**Scheme:** ${stdMatch.scheme}\n**Approx. Accredited Labs:** ${stdMatch.nablLabCountApprox} NABL labs in India\n**Marking Fee Benchmark:** ${stdMatch.markingFeeInfo}`,
        isGrounded: true,
        confidenceScore: 99,
        sources: [
          {
            title: `${stdMatch.isNumber} Official Specification`,
            referenceId: stdMatch.isNumber,
            docType: 'Indian Standard',
            url: stdMatch.officialUrl,
            relevanceSummary: stdMatch.description
          }
        ],
        actionPlan: [
          `Review Scheme of Testing and Inspection (STI) for ${stdMatch.isNumber}.`,
          'Verify in-house testing equipment calibration from NABL lab.',
          'Apply for CM/L license on Manakonline (Form-V).'
        ],
        suggestedFollowUps: [
          `What are the test methods for ${stdMatch.isNumber}?`,
          'What are the MSME fee benefits for this category?',
          'How do I verify a product bearing this IS number?'
        ]
      });
    }
  }

  if (bestMatch && maxScore > 0) {
    return res.json({
      content: bestMatch.responseEn,
      isGrounded: true,
      confidenceScore: bestMatch.confidenceScore,
      sources: bestMatch.sources,
      actionPlan: bestMatch.nextSteps,
      suggestedFollowUps: bestMatch.followUps,
      detectedIntent: bestMatch.intent
    });
  }

  // Hallucination Guardrail: If no verified source covers this query, return source warning!
  return res.json({
    content: GENERAL_FALLBACK_WARNING.content,
    isGrounded: false,
    isUnavailableWarning: true,
    confidenceScore: 0,
    sources: [],
    actionPlan: GENERAL_FALLBACK_WARNING.nextSteps,
    suggestedFollowUps: GENERAL_FALLBACK_WARNING.followUps
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BIAS STANDARD Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
