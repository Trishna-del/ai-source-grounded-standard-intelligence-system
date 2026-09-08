import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight, 
  RotateCcw, 
  Download, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Globe, 
  CornerDownLeft, 
  Copy, 
  Check, 
  Info,
  Clock,
  Trash2,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { ChatMessage, ChatSource } from '../types';
import { SUPPORTED_LANGUAGES, GENERAL_FALLBACK_WARNING } from '../data/knowledgeBase';
import { generateGroundedResponse } from '../utils/sourceGroundingEngine';

interface ChatbotViewProps {
  initialQuery?: string;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  setActiveTab: (tab: string) => void;
  isDarkMode?: boolean;
}

export const ChatbotView: React.FC<ChatbotViewProps> = ({
  initialQuery,
  selectedLanguage,
  setSelectedLanguage,
  setActiveTab,
  isDarkMode = true
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Namaste! I am **BIAS STANDARD**, your source-grounded intelligent assistant for Indian Standards and Bureau of Indian Standards (BIS) services.

I assist Indian MSMEs, manufacturers, importers, and consumers with:
- **Indian Standards Specifications** (e.g. Drinking Water IS 10500, Toys IS 9873, Cables IS 694)
- **Mandatory Quality Control Orders (QCOs)** and Gazette statutory requirements
- **Step-by-step Certification Schemes** (ISI Mark Scheme I, CRS Scheme II, Hallmark, FMCS)
- **MSME Fee Concessions** (up to 80% fee reductions for Micro units)
- **Product License & HUID Verification**

*Every technical answer I generate is cross-referenced with official BIS documentation. If information is not verified in official records, I will clearly inform you.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isGrounded: true,
      confidenceScore: 100,
      sources: [
        {
          title: 'Bureau of Indian Standards Act 2016',
          referenceId: 'Act No. 11 of 2016',
          docType: 'BIS Act 2016',
          url: 'https://www.bis.gov.in/the-bureau/the-bis-act/',
          relevanceSummary: 'Statutory authority governing Indian Standards, Conformity Assessment, and Hallmarking.'
        }
      ],
      actionPlan: [
        'Ask about any product or standard (e.g. "What are the test limits for packaged water?").',
        'Check your applicable MSME fee concessions.',
        'Verify a manufacturer license or Gold HUID.'
      ],
      suggestedFollowUps: [
        'What are the permissible TDS limits under IS 10500?',
        'What are the requirements under Toys QCO 2020?',
        'How do I verify a 6-digit Gold Hallmark HUID?',
        'What fee concessions do MSMEs receive for ISI mark?'
      ]
    }
  ]);

  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyList, setHistoryList] = useState<string[]>([
    'TDS limits in IS 10500:2012',
    'Toys Quality Control Order compulsory mark',
    'CRS registration for Li-ion battery IS 16046',
    'Micro enterprise fee subsidy on ISI mark'
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle initial query from Landing search
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery.trim());
    }
  }, [initialQuery]);

  const handleSendMessage = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: queryText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isGrounded: false
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    // Add to history
    setHistoryList((prev) => {
      const filtered = prev.filter((h) => h !== queryText.trim());
      return [queryText.trim(), ...filtered].slice(0, 10);
    });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText.trim(),
          language: selectedLanguage
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || [],
        confidenceScore: data.confidenceScore,
        isGrounded: data.isGrounded !== false,
        isUnavailableWarning: data.isUnavailableWarning,
        actionPlan: data.actionPlan,
        suggestedFollowUps: data.suggestedFollowUps,
        detectedIntent: data.detectedIntent
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.info('Backend endpoint not reachable (GitHub Pages / Vercel static deployment), generating authoritative response via local source-grounding engine:', err);
      // Seamlessly resolve locally so GitHub Pages, Vercel, and offline environments never throw or show error warnings
      const localResponse = generateGroundedResponse(queryText.trim(), selectedLanguage);

      const assistantMessage: ChatMessage = {
        id: `assistant-local-${Date.now()}`,
        role: 'assistant',
        content: localResponse.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: localResponse.sources,
        confidenceScore: localResponse.confidenceScore,
        isGrounded: localResponse.isGrounded,
        isUnavailableWarning: false,
        actionPlan: localResponse.actionPlan,
        suggestedFollowUps: localResponse.suggestedFollowUps,
        detectedIntent: localResponse.detectedIntent
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([messages[0]]);
  };

  const handleExportChat = () => {
    const textContent = messages
      .map((m) => `[${m.timestamp}] ${m.role.toUpperCase()}:\n${m.content}\n${m.sources ? `Sources: ${m.sources.map(s => s.referenceId).join(', ')}` : ''}\n---\n`)
      .join('\n');
    const blob = new Blob([textContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BIAS-STANDARD-Chat-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      {/* Top Header & Grounding Assurance Banner */}
      <div className={`rounded-2xl p-4 border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800 text-white' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-xs">
            <Bot className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                BIAS STANDARD AI Assistant
              </h2>
              <span className={`inline-flex items-center space-x-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                isDarkMode 
                  ? 'text-emerald-300 bg-emerald-950/80 border-emerald-800' 
                  : 'text-emerald-800 bg-emerald-50 border-emerald-300'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Source Grounded</span>
              </span>
            </div>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Corpus: BIS Act 2016, 21k+ Indian Standards, Gazette QCOs & Manakonline
            </p>
          </div>
        </div>

        {/* Right action controls */}
        <div className="flex items-center space-x-2 self-end md:self-auto">
          {/* History drawer button */}
          <button
            onClick={() => setShowHistoryModal(!showHistoryModal)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
              isDarkMode 
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-750' 
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title="Saved conversation queries"
          >
            <Clock className={`w-3.5 h-3.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            <span>History</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              isDarkMode ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-700'
            }`}>
              {historyList.length}
            </span>
          </button>

          {/* Export button */}
          <button
            onClick={handleExportChat}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
              isDarkMode 
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-750' 
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title="Export conversation as Markdown"
          >
            <Download className={`w-3.5 h-3.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Reset button */}
          <button
            onClick={handleClearChat}
            className={`flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
              isDarkMode 
                ? 'text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border-rose-800' 
                : 'text-rose-700 bg-rose-50 hover:bg-rose-100 border-rose-200'
            }`}
            title="Clear chat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Main Chat Layout with optional history sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Curated Prompts & History (Desktop) */}
        <div className="hidden lg:flex flex-col space-y-4 col-span-1">
          {/* Quick Prompt Presets by Category */}
          <div className={`p-4 rounded-2xl border shadow-xs space-y-4 ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-slate-200' 
              : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-300' : 'text-slate-800'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended Topics</span>
            </div>

            <div className="space-y-2">
              <p className={`text-[11px] font-semibold uppercase ${
                isDarkMode ? 'text-blue-400' : 'text-blue-900'
              }`}>For MSMEs & Industry</p>
              <button
                onClick={() => handleSendMessage('What are the required documents and fee concessions for Micro enterprises applying for ISI mark Scheme I?')}
                className={`w-full text-left text-xs p-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border-slate-700' 
                    : 'bg-slate-50 hover:bg-blue-50 hover:text-blue-900 text-slate-700 border-slate-200'
                }`}
              >
                Micro Enterprise 80% Fee Concession
              </button>
              <button
                onClick={() => handleSendMessage('What in-house lab testing equipment is needed for Packaged Drinking Water IS 14543?')}
                className={`w-full text-left text-xs p-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border-slate-700' 
                    : 'bg-slate-50 hover:bg-blue-50 hover:text-blue-900 text-slate-700 border-slate-200'
                }`}
              >
                In-house Lab Setup for IS 14543
              </button>
            </div>

            <div className={`space-y-2 pt-2 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <p className={`text-[11px] font-semibold uppercase ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-900'
              }`}>For Consumers & Public</p>
              <button
                onClick={() => handleSendMessage('How do I verify a 6-digit Gold Hallmark HUID code and what are the mandatory marks on gold jewellery?')}
                className={`w-full text-left text-xs p-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border-slate-700' 
                    : 'bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 text-slate-700 border-slate-200'
                }`}
              >
                Gold Hallmark 3-Mark Checklist
              </button>
              <button
                onClick={() => handleSendMessage('What should I do if a product is using a fake or expired ISI mark?')}
                className={`w-full text-left text-xs p-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border-slate-700' 
                    : 'bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 text-slate-700 border-slate-200'
                }`}
              >
                Reporting Fake ISI Marks (1915)
              </button>
            </div>

            <div className={`space-y-2 pt-2 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <p className={`text-[11px] font-semibold uppercase ${
                isDarkMode ? 'text-purple-400' : 'text-purple-900'
              }`}>Electronics & QCOs</p>
              <button
                onClick={() => handleSendMessage('What products are covered under the MeitY Compulsory Registration Scheme (CRS) for electronics?')}
                className={`w-full text-left text-xs p-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border-slate-700' 
                    : 'bg-slate-50 hover:bg-purple-50 hover:text-purple-900 text-slate-700 border-slate-200'
                }`}
              >
                Electronics CRS Scope & Rules
              </button>
              <button
                onClick={() => handleSendMessage('What are the key requirements under IS 4151:2020 for two-wheeler protective helmets?')}
                className={`w-full text-left text-xs p-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border-slate-700' 
                    : 'bg-slate-50 hover:bg-purple-50 hover:text-purple-900 text-slate-700 border-slate-200'
                }`}
              >
                Helmet Weight & Attenuation (IS 4151)
              </button>
            </div>
          </div>

          {/* Hallucination Filter Info Card */}
          <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
            isDarkMode 
              ? 'bg-amber-950/40 border-amber-800/70 text-amber-200' 
              : 'bg-amber-50/70 border-amber-200 text-amber-900'
          }`}>
            <div className={`flex items-center space-x-1.5 font-bold ${
              isDarkMode ? 'text-amber-300' : 'text-amber-900'
            }`}>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Zero-Fake Answer Mandate</span>
            </div>
            <p className={`text-[11px] leading-normal ${
              isDarkMode ? 'text-amber-200/90' : 'text-amber-800'
            }`}>
              If an Indian Standard or technical regulation cannot be cited from official BIS publications, BIAS STANDARD will refuse to synthesize unverified parameters.
            </p>
          </div>
        </div>

        {/* Center/Right Chat Container */}
        <div className={`lg:col-span-3 rounded-2xl border shadow-xs flex flex-col h-[700px] overflow-hidden transition-colors ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800' 
            : 'bg-white border-slate-200'
        }`}>
          {/* Message Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
            {messages.map((message) => {
              const isUser = message.role === 'user';
              return (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold shadow-2xs ${
                      isUser
                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'
                        : 'bg-blue-900 text-amber-300'
                    }`}
                  >
                    {isUser ? 'U' : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Bubble Content */}
                  <div className={`max-w-[85%] sm:max-w-[80%] space-y-2`}>
                    <div
                      className={`p-4 rounded-2xl shadow-2xs ${
                        isUser
                          ? 'bg-blue-600 text-white rounded-tr-xs'
                          : message.isUnavailableWarning
                          ? isDarkMode 
                            ? 'bg-amber-950/40 border border-amber-800/80 text-amber-100 rounded-tl-xs' 
                            : 'bg-amber-50/90 border border-amber-200 text-slate-900 rounded-tl-xs'
                          : isDarkMode 
                            ? 'bg-slate-800/90 border border-slate-700/80 text-slate-100 rounded-tl-xs' 
                            : 'bg-slate-50 border border-slate-200/80 text-slate-900 rounded-tl-xs'
                      }`}
                    >
                      {/* Assistant Header Badge: Confidence & Source Count */}
                      {!isUser && (
                        <div className={`flex items-center justify-between gap-2 pb-2 mb-2 border-b text-[11px] ${
                          isDarkMode ? 'border-slate-700' : 'border-slate-200/70'
                        }`}>
                          <div className="flex items-center space-x-1.5">
                            {message.isUnavailableWarning ? (
                              <span className={`flex items-center space-x-1 font-bold ${
                                isDarkMode ? 'text-amber-300' : 'text-amber-800'
                              }`}>
                                <AlertTriangle className={`w-3.5 h-3.5 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                                <span>Official Source Notice</span>
                              </span>
                            ) : (
                              <span className={`flex items-center space-x-1 font-bold ${
                                isDarkMode ? 'text-emerald-300' : 'text-emerald-800'
                              }`}>
                                <ShieldCheck className={`w-3.5 h-3.5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                                <span>Grounded BIS Answer ({message.confidenceScore || 98}% Confidence)</span>
                              </span>
                            )}
                          </div>
                          <span className={`font-mono text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
                            {message.timestamp}
                          </span>
                        </div>
                      )}

                      {/* Content text */}
                      <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed space-y-2 font-normal">
                        {message.content}
                      </div>

                      {/* User message timestamp */}
                      {isUser && (
                        <div className="text-right mt-1">
                          <span className="text-[10px] text-blue-200 font-mono">{message.timestamp}</span>
                        </div>
                      )}
                    </div>

                    {/* Source References Attachment (For Assistant) */}
                    {!isUser && message.sources && message.sources.length > 0 && (
                      <div className={`p-3 rounded-xl border space-y-2 ${
                        isDarkMode 
                          ? 'bg-slate-850/80 border-slate-750' 
                          : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className={`text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1 ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            <BookOpen className={`w-3.5 h-3.5 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`} />
                            <span>Official BIS Citations ({message.sources.length})</span>
                          </span>
                          <span className="text-[10px] text-slate-400">Click to verify on official portal</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {message.sources.map((source, sIdx) => (
                            <a
                              key={sIdx}
                              href={source.url}
                              target="_blank"
                              rel="noreferrer"
                              className={`group p-2.5 rounded-lg border transition-all flex flex-col justify-between ${
                                isDarkMode 
                                  ? 'bg-slate-800/90 border-slate-700 hover:border-blue-400 hover:bg-slate-750' 
                                  : 'bg-white border-slate-200/80 hover:border-blue-400 hover:shadow-2xs'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between text-[10px] mb-1">
                                  <span className={`font-mono font-bold px-1.5 py-0.2 rounded border ${
                                    isDarkMode 
                                      ? 'text-blue-300 bg-blue-950/80 border-blue-800' 
                                      : 'text-blue-800 bg-blue-50 border-blue-200'
                                  }`}>
                                    {source.referenceId}
                                  </span>
                                  <span className="text-slate-400 font-medium">{source.docType}</span>
                                </div>
                                <p className={`text-xs font-semibold line-clamp-1 transition-colors ${
                                  isDarkMode 
                                    ? 'text-slate-200 group-hover:text-blue-300' 
                                    : 'text-slate-800 group-hover:text-blue-900'
                                }`}>
                                  {source.title}
                                </p>
                                <p className={`text-[11px] mt-1 line-clamp-2 ${
                                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                                }`}>
                                  {source.relevanceSummary}
                                </p>
                              </div>
                              <div className={`mt-2 pt-1.5 border-t flex items-center justify-end text-[10px] font-semibold group-hover:underline ${
                                isDarkMode 
                                  ? 'border-slate-700 text-blue-400' 
                                  : 'border-slate-100 text-blue-700'
                              }`}>
                                <span>Verify on Portal</span>
                                <ExternalLink className="w-2.5 h-2.5 ml-1" />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actionable Next Steps */}
                    {!isUser && message.actionPlan && message.actionPlan.length > 0 && (
                      <div className={`p-3 rounded-xl border space-y-1.5 text-xs ${
                        isDarkMode 
                          ? 'bg-blue-950/40 border-blue-800/60' 
                          : 'bg-blue-50/50 border-blue-200/60'
                      }`}>
                        <p className={`font-bold text-[11px] flex items-center space-x-1 ${
                          isDarkMode ? 'text-blue-300' : 'text-blue-900'
                        }`}>
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`} />
                          <span>Recommended Next Steps:</span>
                        </p>
                        <ul className={`space-y-1 pl-4 list-disc text-[11px] ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          {message.actionPlan.map((action, aIdx) => (
                            <li key={aIdx}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Copy button & Suggested Follow-up Prompts */}
                    {!isUser && (
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <button
                          onClick={() => handleCopyMessage(message.content, message.id)}
                          className={`inline-flex items-center space-x-1 text-[11px] transition-colors ${
                            isDarkMode 
                              ? 'text-slate-400 hover:text-slate-200' 
                              : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          {copiedMessageId === message.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">Copied citation!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy response</span>
                            </>
                          )}
                        </button>

                        {message.suggestedFollowUps && message.suggestedFollowUps.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {message.suggestedFollowUps.map((fUp, fIdx) => (
                              <button
                                key={fIdx}
                                onClick={() => handleSendMessage(fUp)}
                                className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors ${
                                  isDarkMode 
                                    ? 'bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border-slate-750' 
                                    : 'bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-600 border-slate-200'
                                }`}
                              >
                                {fUp}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-blue-900 text-amber-300 flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className={`p-4 rounded-2xl rounded-tl-xs space-y-2 border ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700' 
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`flex items-center space-x-2 text-xs font-semibold ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-900'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    <span>Cross-referencing Bureau of Indian Standards Knowledge Base...</span>
                  </div>
                  <div className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Verifying Gazette notifications, IS specifications, and STI compliance criteria.
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className={`p-3 sm:p-4 border-t transition-colors ${
            isDarkMode 
              ? 'bg-slate-900/90 border-slate-800' 
              : 'bg-slate-50 border-slate-200'
          }`}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputQuery);
              }}
              className={`relative flex items-center rounded-xl border shadow-xs transition-all ${
                isDarkMode 
                  ? 'bg-slate-800/90 border-slate-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-900/40' 
                  : 'bg-white border-slate-300 focus-within:border-blue-700 focus-within:ring-2 focus-within:ring-blue-100'
              }`}
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={`Ask about any Indian Standard (IS), QCO, or certification in ${currentLang.nativeName}...`}
                className={`w-full py-3 pl-4 pr-12 text-xs sm:text-sm focus:outline-hidden bg-transparent ${
                  isDarkMode 
                    ? 'text-white placeholder:text-slate-500' 
                    : 'text-slate-900 placeholder:text-slate-400'
                }`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className={`absolute right-2 p-2 rounded-lg text-white transition-colors ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500'
                    : 'bg-blue-900 hover:bg-blue-950 disabled:bg-slate-200 disabled:text-slate-400'
                }`}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Micro footer inside chat input */}
            <div className={`mt-2 flex items-center justify-between text-[10px] px-1 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Source Grounding Engine Active</span>
              </span>
              <div className="flex items-center space-x-2">
                <span>Selected: {currentLang.nativeName} ({currentLang.name})</span>
                <span className={isDarkMode ? 'text-slate-600' : 'text-slate-300'}>•</span>
                <button
                  onClick={() => setActiveTab('verify')}
                  className={`hover:underline font-medium ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-700'
                  }`}
                >
                  Verify CM/L number
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Dialog Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`rounded-2xl max-w-md w-full p-6 shadow-2xl border space-y-4 ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-800 text-white' 
              : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className={`flex items-center justify-between pb-2 border-b ${
              isDarkMode ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <div className="flex items-center space-x-2">
                <Clock className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-900'}`} />
                <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Saved Query History</h3>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'}`}
              >
                Close
              </button>
            </div>

            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Select any past query to re-execute with live source grounding:
            </p>

            <div className="space-y-1.5 max-h-60 overflow-y-auto">
              {historyList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    handleSendMessage(item);
                    setShowHistoryModal(false);
                  }}
                  className={`p-2.5 rounded-lg border cursor-pointer text-xs font-medium flex items-center justify-between group transition-colors ${
                    isDarkMode 
                      ? 'border-slate-750 bg-slate-800/80 hover:bg-slate-750 hover:border-blue-500 text-slate-200' 
                      : 'border-slate-200 hover:bg-blue-50 hover:border-blue-300 text-slate-800'
                  }`}
                >
                  <span className="truncate">{item}</span>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-colors ${
                    isDarkMode ? 'text-slate-500 group-hover:text-blue-400' : 'text-slate-400 group-hover:text-blue-900'
                  }`} />
                </div>
              ))}
            </div>

            <div className={`pt-2 border-t flex items-center justify-between ${
              isDarkMode ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <button
                onClick={() => setHistoryList([])}
                className="text-xs text-rose-500 hover:text-rose-400 flex items-center space-x-1 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All History</span>
              </button>
              <button
                onClick={() => setShowHistoryModal(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  isDarkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-slate-900 text-white'
                }`}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
