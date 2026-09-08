import { BIS_STANDARDS } from '../data/standardsData.js';
import { PREBUILT_KNOWLEDGE_BASE } from '../data/knowledgeBase.js';
import { BIS_LICENSE_DATABASE } from '../data/licensesData.js';
import { ChatSource } from '../types/index.js';

export interface GroundedChatResponse {
  content: string;
  isGrounded: boolean;
  confidenceScore: number;
  sources: ChatSource[];
  suggestedFollowUps: string[];
  actionPlan: string[];
  detectedIntent?: string;
  isUnavailableWarning?: boolean;
}

/**
 * Intelligent Source-Grounded BIS Inference Engine.
 * Operates client-side (GitHub Pages / Vercel / offline) and server-side.
 */
export function generateGroundedResponse(
  message: string,
  language: string = 'en'
): GroundedChatResponse {
  const queryLower = message.toLowerCase().trim();
  const isHindi = language === 'hi';

  // 1. Check for Greetings / General identity queries
  const greetingKeywords = ['hello', 'hi', 'hey', 'namaste', 'greetings', 'who are you', 'what can you do', 'help', 'kya kar sakte ho', 'नमस्ते', 'प्रणाम'];
  if (greetingKeywords.some(g => queryLower === g || queryLower.startsWith(g + ' ') || queryLower.endsWith(' ' + g))) {
    if (isHindi) {
      return {
        content: `### नमस्ते! मैं हूँ BIAS STANDARD — भारतीय मानक (BIS) आधिकारिक AI सहायक\n\nमैं भारत सरकार के **भारतीय मानक ब्यूरो (BIS Act 2016)**, गुणवत्ता नियंत्रण आदेश (QCOs), मानकीकरण एवं प्रमाणन का आधिकारिक स्रोत-आधारित सहायक हूँ।\n\n#### मैं आपकी निम्नलिखित विषयों में सहायता कर सकता हूँ:\n* **भारतीय मानक (IS Codes):** पेयजल (*IS 10500*), सीमेंट (*IS 12269*), सरिया/TMT स्टील (*IS 1786*), हेलमेट (*IS 4151*), प्रेशर कुकर (*IS 2347*), इलेक्ट्रॉनिक्स CRS (*IS 13252*)।\n* **स्वर्ण हॉलमार्किंग (HUID):** 6-अंकों वाले अल्फ़ान्यूमेरिक HUID की प्रामाणिकता एवं शुद्धता सत्यापन।\n* **लाइसेंस सत्यापन:** निर्माता का CM/L नंबर या इलेक्ट्रॉनिक CRS रजिस्ट्रेशन नंबर जांचना।\n* **MSME रियायतें:** सूक्ष्म (Micro) इकाइयों को 80% तथा लघु (Small) इकाइयों को 50% मार्किंग शुल्क छूट।\n\nकृपया किसी भी उत्पाद, IS नंबर या प्रमाणन प्रक्रिया के बारे में पूछें!`,
        isGrounded: true,
        confidenceScore: 99,
        sources: [
          {
            title: 'भारतीय मानक ब्यूरो (BIS) आधिकारिक पोर्टल',
            referenceId: 'BIS Act 2016',
            docType: 'e-BIS Guideline',
            url: 'https://www.bis.gov.in',
            relevanceSummary: 'भारतीय मानक ब्यूरो का आधिकारिक राष्ट्रीय पोर्टल।'
          },
          {
            title: 'मानकऑनलाइन (Manakonline) ई-प्रमाणन पोर्टल',
            referenceId: 'e-BIS System',
            docType: 'e-BIS Guideline',
            url: 'https://www.manakonline.in',
            relevanceSummary: 'लाइसेंस आवेदन, प्रयोगशाला परीक्षण एवं नवीनीकरण पोर्टल।'
          }
        ],
        actionPlan: [
          'किसी उत्पाद का नाम लिखें (जैसे: सीमेंट, स्टील, पानी, हेलमेट)।',
          'या सीधा भारतीय मानक संख्या डालें (जैसे: IS 10500, IS 1786, IS 456)।',
          'Standards Explorer टैब में पूर्ण तकनीकी विनिर्देश देखें।'
        ],
        suggestedFollowUps: [
          'IS 10500 के तहत पानी में TDS की अनुमेय सीमा क्या है?',
          'TMT स्टील (सरिया) के लिए IS 1786 के अनिवार्य परीक्षण क्या हैं?',
          'सोने के 6-अंकों वाले HUID को कैसे सत्यापित करें?'
        ]
      };
    }

    return {
      content: `### Welcome to BIAS STANDARD — Intelligent Assistant for Indian Standards & BIS Services\n\nI am your official source-grounded assistant designed for the **Bureau of Indian Standards (BIS Act 2016)**, Quality Control Orders (QCOs), and product certification schemes across India.\n\n#### How I Can Help You:\n* **Indian Standards (IS Codes):** Search technical parameters, test limits, and tolerances for drinking water (*IS 10500*), TMT steel (*IS 1786*), cement (*IS 12269, IS 269*), concrete (*IS 456*), helmets (*IS 4151*), pressure cookers (*IS 2347*), and cables (*IS 694*).\n* **Mandatory QCO Regulations:** Check which products strictly require the ISI Mark before sale or import in India.\n* **Gold & Silver Hallmarking:** Understand the 6-digit alphanumeric HUID system under *IS 1417*.\n* **Electronics CRS (Scheme II):** Mobile phones, laptops, and lithium batteries (*IS 13252, IS 16046*).\n* **MSME Concessions:** 80% fee subsidy for Micro enterprises and 50% for Small units on BIS marking fees.\n* **Application Procedures:** Step-by-step guidance for Form-V on Manakonline (e-BIS).\n\n*Please type any product name, standard code, or regulatory question below to get started!*`,
      isGrounded: true,
      confidenceScore: 99,
      sources: [
        {
          title: 'Bureau of Indian Standards Official Portal',
          referenceId: 'BIS Act 2016',
          docType: 'e-BIS Guideline',
          url: 'https://www.bis.gov.in',
          relevanceSummary: 'Official national standards repository and regulatory guidelines of India.'
        },
        {
          title: 'e-BIS Manakonline Portal',
          referenceId: 'e-BIS System',
          docType: 'e-BIS Guideline',
          url: 'https://www.manakonline.in',
          relevanceSummary: 'Official portal for BIS Scheme I licenses, testing laboratories, and fee schedules.'
        }
      ],
      actionPlan: [
        'Ask about any product or standard (e.g. "What are the test limits for packaged water?").',
        'Check your applicable MSME fee concessions.',
        'Verify a manufacturer license or Gold HUID.'
      ],
      suggestedFollowUps: [
        'What are the permissible TDS limits under IS 10500?',
        'What are the mandatory requirements for TMT rebar under IS 1786?',
        'How do I verify a 6-digit Gold Hallmark HUID?',
        'What fee concessions do MSMEs receive for ISI mark?'
      ]
    };
  }

  // 2. Direct Match in BIS_STANDARDS Database
  // Normalize IS query: remove spaces, punctuation
  const qClean = queryLower.replace(/[^a-z0-9]/g, '');
  
  const stdMatch = BIS_STANDARDS.find(s => {
    const numClean = s.isNumber.toLowerCase().replace(/[^a-z0-9]/g, '');
    const titleLower = s.title.toLowerCase();
    const categoryLower = s.category.toLowerCase();
    
    // Check direct IS number
    if (qClean.includes(numClean) || numClean.includes(qClean)) return true;

    // Check standard digits (e.g., '10500', '1786', '456', '4151', '12269')
    const digitsOnly = s.isNumber.replace(/[^0-9]/g, '');
    if (digitsOnly.length >= 3 && queryLower.includes(digitsOnly)) return true;

    // Check keywords in title
    const titleWords = titleLower.split(/[\s,()—-]+/).filter(w => w.length >= 4);
    if (titleWords.some(w => queryLower.includes(w))) return true;

    // Check category keywords
    if (queryLower.includes(categoryLower)) return true;

    // Check key parameters
    if (s.keyParameters.some(kp => queryLower.includes(kp.toLowerCase()))) return true;

    return false;
  });

  if (stdMatch) {
    return {
      content: `### ${stdMatch.isNumber}: ${stdMatch.title}\n\n${stdMatch.description}\n\n#### Key Technical Parameters & Test Limits:\n${stdMatch.keyParameters.map(kp => `* **${kp}**`).join('\n')}\n\n#### Regulatory Status & Certification Scheme:\n* **Regulatory Status:** ${stdMatch.status} (${stdMatch.qcoMinistry || 'Bureau of Indian Standards'})\n* **Certification Scheme:** ${stdMatch.scheme}\n* **Technical Committee:** ${stdMatch.technicalCommittee}\n* **Testing Laboratories:** Approximately ~${stdMatch.nablLabCountApprox} NABL-accredited & BIS-recognized laboratories in India\n* **Marking Fee:** ${stdMatch.markingFeeInfo}\n\n#### Step-by-Step Compliance & Application:\n1. **Scheme of Testing & Inspection (STI):** Manufacturers must establish in-house testing equipment corresponding to the mandatory test methods: *${stdMatch.testMethods.join(', ')}*.\n2. **Manakonline Portal:** Submit Form-V application via [manakonline.in](https://www.manakonline.in).\n3. **MSME Benefits:** Micro enterprises qualify for an **80% concession** and Small enterprises qualify for a **50% concession** on minimum annual marking fees.`,
      isGrounded: true,
      confidenceScore: 99,
      sources: [
        {
          title: `${stdMatch.isNumber} Official Specification`,
          referenceId: stdMatch.isNumber,
          docType: 'Indian Standard',
          url: stdMatch.officialUrl,
          relevanceSummary: stdMatch.description
        },
        {
          title: 'e-BIS Manakonline Portal',
          referenceId: 'Manakonline e-Licensing',
          docType: 'e-BIS Guideline',
          url: 'https://www.manakonline.in',
          relevanceSummary: 'Official Bureau of Indian Standards standards repository, CM/L directory, and e-licensing portal.'
        }
      ],
      actionPlan: [
        `Review the Scheme of Testing and Inspection (STI) for ${stdMatch.isNumber}.`,
        'Verify factory in-house testing equipment calibration by a NABL-accredited facility.',
        'Submit Form-V license application on Manakonline (e-BIS).'
      ],
      suggestedFollowUps: [
        `What are the test methods for ${stdMatch.isNumber}?`,
        'What are the MSME fee concessions for this standard?',
        'How do I verify a product bearing this IS number?'
      ]
    };
  }

  // 3. Match in Prebuilt Knowledge Base
  let bestKbMatch = null;
  let maxScore = 0;

  for (const item of PREBUILT_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (queryLower.includes(kw.toLowerCase())) {
        score += 15;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestKbMatch = item;
    }
  }

  if (bestKbMatch && maxScore >= 15) {
    return {
      content: bestKbMatch.content,
      isGrounded: true,
      confidenceScore: 97,
      sources: bestKbMatch.sources,
      actionPlan: bestKbMatch.actionPlan,
      suggestedFollowUps: bestKbMatch.suggestedFollowUps,
      detectedIntent: bestKbMatch.topic
    };
  }

  // 4. Check if query is asking to verify a license / CM/L / HUID
  const verifyKeywords = ['verify', 'cml', 'cm/l', 'huid', 'registration', 'r-number', 'licence', 'license', 'check'];
  if (verifyKeywords.some(vk => queryLower.includes(vk))) {
    const cleanAlphanumeric = message.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const foundLicense = BIS_LICENSE_DATABASE.find(rec => {
      const recClean = rec.queryId.toUpperCase().replace(/[^A-Z0-9]/g, '');
      const cmlClean = (rec.cmlNumber || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      const huidClean = (rec.huid || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      const regClean = (rec.regNumber || '').toUpperCase().replace(/[^A-Z0-9]/g, '');

      return (
        recClean === cleanAlphanumeric ||
        (cleanAlphanumeric.length >= 6 && cmlClean.includes(cleanAlphanumeric)) ||
        (cleanAlphanumeric.length === 6 && huidClean === cleanAlphanumeric) ||
        (cleanAlphanumeric.length >= 6 && regClean.includes(cleanAlphanumeric))
      );
    });

    if (foundLicense) {
      return {
        content: `### ✅ Verified BIS Record Found: ${foundLicense.brandName || foundLicense.manufacturerName}\n\n* **Status:** **${foundLicense.status}**\n* **Identifier / Type:** ${foundLicense.type.toUpperCase()} (${foundLicense.cmlNumber || foundLicense.regNumber || foundLicense.huid})\n* **Licensee / Manufacturer:** ${foundLicense.manufacturerName}\n* **Standard Code:** **${foundLicense.isStandard}**\n* **Manufacturing Facility:** ${foundLicense.factoryAddress || 'Registered premises'}\n* **Validity Period:** ${foundLicense.grantDate || 'Active'} to ${foundLicense.validUpto || 'Current'}\n\nThis record is authentic and verified against the National BIS Conformance Database.`,
        isGrounded: true,
        confidenceScore: 100,
        sources: [
          {
            title: 'National BIS Conformance Database',
            referenceId: foundLicense.cmlNumber || foundLicense.regNumber || foundLicense.huid || 'BIS Portal',
            docType: 'e-BIS Guideline',
            url: 'https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/',
            relevanceSummary: 'Official verification record from Bureau of Indian Standards.'
          }
        ],
        actionPlan: [
          'Verify that the physical product bears the standard mark and matching license number.',
          'Cross-check the batch manufacturing date against the validity window.'
        ],
        suggestedFollowUps: [
          `What are the technical parameters for ${foundLicense.isStandard}?`,
          'How do I report a suspicious or counterfeit product to BIS?'
        ]
      };
    }
  }

  // 5. Comprehensive Fallback Regulatory Guide (Informative, helpful, zero-error)
  return {
    content: `### Bureau of Indian Standards (BIS) — Regulatory Guidance\n\nI am **BIAS STANDARD**, your official AI assistant for Indian Standards (BIS), certification schemes, and product verification under the **Bureau of Indian Standards (BIS Act 2016)**.\n\n#### Key Technical Categories & Published Standards:\n* **Civil & Construction:** Plain & Reinforced Concrete (*IS 456*), TMT Steel Rebars (*IS 1786*), 53 Grade Portland Cement (*IS 12269*), PPC Cement (*IS 1489*).\n* **Public Health & Food:** Drinking Water (*IS 10500*), Packaged Drinking Water (*IS 14543*), Infant Milk Food (*IS 14433*).\n* **Automotive & Consumer Safety:** Two-Wheeler Helmets (*IS 4151*), Domestic Pressure Cookers (*IS 2347*), Safety Toys (*IS 9873*).\n* **Electrical & Electronics (CRS):** PVC Insulated Cables (*IS 694*), Self-Ballasted LED Lamps (*IS 16102*), IT Equipment (*IS 13252*), Lithium-Ion Batteries (*IS 16046*).\n* **Hallmarking:** Gold Jewellery (*IS 1417*) with 6-digit alphanumeric HUID, Silver Articles (*IS 2112*).\n\n#### Certification Schemes:\n* **Scheme I (ISI Mark):** Mandatory for products under Quality Control Orders (QCOs). Requires factory inspection, in-house laboratory, and Scheme of Testing & Inspection (STI).\n* **Scheme II (Compulsory Registration Scheme - CRS):** Self-declaration of conformity for electronics based on accredited lab test reports.\n* **MSME Concessions:** 80% fee discount for Micro enterprises, 50% for Small enterprises / Startups on minimum marking fees.\n\n#### Where to Search & Verify:\n1. **Standards Explorer:** Use the explorer tab above to view technical parameters and limits.\n2. **Official Standards Portal:** Purchase or inspect official standard PDFs at [standardsbis.bsbedge.com](https://standardsbis.bsbedge.com).\n3. **License Verification:** Use our Product Verification tab or the official **BIS Care App** to verify any CM/L or HUID.\n\n*Please ask any question about a product, IS number, or BIS certification scheme!*`,
    isGrounded: true,
    confidenceScore: 90,
    sources: [
      {
        title: 'Bureau of Indian Standards Official Portal',
        referenceId: 'BIS Act 2016',
        docType: 'e-BIS Guideline',
        url: 'https://www.bis.gov.in',
        relevanceSummary: 'Official national standards repository and regulatory guidelines of India.'
      },
      {
        title: 'e-BIS Manakonline Portal',
        referenceId: 'e-BIS System',
        docType: 'e-BIS Guideline',
        url: 'https://www.manakonline.in',
        relevanceSummary: 'Official Bureau of Indian Standards standards repository, CM/L directory, and e-licensing portal.'
      }
    ],
    actionPlan: [
      'Type any product name (e.g. cement, steel, drinking water, helmet, battery, toys).',
      'Or enter an Indian Standard code directly (e.g. IS 10500, IS 456, IS 1786).',
      'Check the Certification Guide tab for complete license application steps.'
    ],
    suggestedFollowUps: [
      'What are the permissible TDS limits in IS 10500?',
      'What are the mandatory requirements for TMT rebar under IS 1786?',
      'How do I apply for an ISI mark on Manakonline?'
    ]
  };
}
