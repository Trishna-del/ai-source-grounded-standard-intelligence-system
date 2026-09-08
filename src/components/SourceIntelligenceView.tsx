import React from 'react';
import { 
  ShieldCheck, 
  Database, 
  Scale, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  BookOpen, 
  Search, 
  Layers, 
  GitBranch, 
  ArrowRight,
  Bot
} from 'lucide-react';
import { OFFICIAL_SOURCE_REPOSITORIES } from '../data/knowledgeBase';

interface SourceIntelligenceViewProps {
  onAskAI: (query: string) => void;
  setActiveTab: (tab: string) => void;
  isDarkMode?: boolean;
}

export const SourceIntelligenceView: React.FC<SourceIntelligenceViewProps> = ({
  onAskAI,
  setActiveTab,
  isDarkMode = true
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header Banner */}
      <div className="space-y-3">
        <div className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-wider ${
          isDarkMode ? 'text-blue-400' : 'text-blue-900'
        }`}>
          <Database className="w-4 h-4 text-blue-500" />
          <span>Source Grounding & Architecture Hub</span>
        </div>
        <h1 className={`text-2xl sm:text-4xl font-extrabold ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Source Intelligence, Grounding Architecture & Trust
        </h1>
        <p className={`text-sm max-w-3xl leading-relaxed ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          How BIAS STANDARD eliminates hallucinations and establishes statutory truth in regulatory AI for the Bureau of Indian Standards and Indian industry.
        </p>
      </div>

      {/* The Core Problem & Our SIH Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Why Generic LLMs Fail */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xs space-y-4 ${
          isDarkMode 
            ? 'bg-slate-900 border-rose-900/60' 
            : 'bg-white border-rose-200'
        }`}>
          <div className={`flex items-center space-x-3 ${isDarkMode ? 'text-rose-400' : 'text-rose-700'}`}>
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <h3 className="font-bold text-base sm:text-lg">The Problem: Why General LLMs Fail on BIS</h3>
          </div>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Standard conversational LLMs (like ChatGPT) rely on general internet crawl data. In technical regulation, this introduces critical hazards:
          </p>
          <ul className={`space-y-2 text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span><strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Fabricated IS Codes:</strong> Inventing non-existent standard numbers or mixing up amendments.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span><strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Outdated Test Limits:</strong> Quoting superseded chemical limits (e.g. archaic water arsenic limits) that violate current law.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span><strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Ghost QCO Deadlines:</strong> Hallucinating fake ministry extension dates, causing commercial non-compliance and customs blockages.</span>
            </li>
          </ul>
        </div>

        {/* Right: The BIAS STANDARD Solution */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xs space-y-4 ${
          isDarkMode 
            ? 'bg-slate-900 border-emerald-800/80' 
            : 'bg-white border-emerald-300'
        }`}>
          <div className={`flex items-center space-x-3 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
            <ShieldCheck className="w-6 h-6 shrink-0" />
            <h3 className="font-bold text-base sm:text-lg">The BIAS STANDARD Solution</h3>
          </div>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            BIAS STANDARD uses a tightly controlled Retrieval-Augmented Generation (RAG) architecture grounded strictly in statutory Indian publications:
          </p>
          <ul className={`space-y-2 text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span><strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Statutory Verification:</strong> Answers must cite published Indian Standard numbers, gazettes, or STI manuals.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span><strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Active Refusal Guard:</strong> If verified information is unavailable, our AI explicitly states so instead of guessing.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span><strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>Verifiable Portal Links:</strong> Every source reference includes direct links to official e-BIS / Manakonline records.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 5-Step Source Grounding Architecture Pipeline */}
      <div className={`rounded-3xl p-6 sm:p-10 border space-y-8 ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white' 
          : 'bg-slate-900 text-white border-slate-800'
      }`}>
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            Pipeline Architecture
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white">
            How Every User Query is Grounded
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            From user prompt to verifiable statutory output — zero hallucinations through a 5-step validation gateway.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
            <span className="font-mono text-amber-400 text-xs font-bold block">STEP 01</span>
            <h4 className="font-bold text-sm text-white">Intent Classification</h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              Extracts product category, IS code, scheme type (ISI, CRS, Hallmark, FMCS), or fee inquiry.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
            <span className="font-mono text-blue-400 text-xs font-bold block">STEP 02</span>
            <h4 className="font-bold text-sm text-white">Corpus Retrieval</h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              Queries vectorized embeddings of BIS Act 2016, Gazette QCOs, and STI test specifications.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
            <span className="font-mono text-purple-400 text-xs font-bold block">STEP 03</span>
            <h4 className="font-bold text-sm text-white">Citation Binding</h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              Binds exact standard clause, publication year, and official Manakonline URL to context.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
            <span className="font-mono text-rose-400 text-xs font-bold block">STEP 04</span>
            <h4 className="font-bold text-sm text-white">Refusal Guard</h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              If confidence &lt; 90% or unverified, triggers the Verified Source Notice. No synthetic answers.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
            <span className="font-mono text-emerald-400 text-xs font-bold block">STEP 05</span>
            <h4 className="font-bold text-sm text-white">Structured Output</h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              Renders response with interactive source pills, MSME guidance, and concrete action steps.
            </p>
          </div>
        </div>
      </div>

      {/* Official Verified Repositories Table */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-xs space-y-6 ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800' 
          : 'bg-white border-slate-200'
      }`}>
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b ${
          isDarkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div>
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Official Knowledge Repositories</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Live verified data sources synced with BIAS STANDARD</p>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border self-start sm:self-auto ${
            isDarkMode 
              ? 'text-emerald-300 bg-emerald-950/80 border-emerald-800' 
              : 'text-emerald-800 bg-emerald-50 border-emerald-200'
          }`}>
            100% Statutory Sources
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`uppercase tracking-wider font-semibold border-b ${
              isDarkMode 
                ? 'bg-slate-800/50 text-slate-400 border-slate-750' 
                : 'bg-slate-50 text-slate-500 border-slate-200'
            }`}>
              <tr>
                <th className="py-3 px-4">Repository / Source</th>
                <th className="py-3 px-4">Authoritative Body</th>
                <th className="py-3 px-4">Scope & Coverage</th>
                <th className="py-3 px-4">Freshness</th>
                <th className="py-3 px-4 text-right">Official Link</th>
              </tr>
            </thead>
            <tbody className={`divide-y font-medium ${
              isDarkMode 
                ? 'divide-slate-800 text-slate-300' 
                : 'divide-slate-100 text-slate-700'
            }`}>
              {OFFICIAL_SOURCE_REPOSITORIES.map((repo, idx) => (
                <tr key={idx} className={`transition-colors ${
                  isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/80'
                }`}>
                  <td className={`py-3.5 px-4 font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {repo.name}
                  </td>
                  <td className={`py-3.5 px-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {repo.authority}
                  </td>
                  <td className={`py-3.5 px-4 max-w-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {repo.scope}
                  </td>
                  <td className={`py-3.5 px-4 font-mono ${isDarkMode ? 'text-emerald-400 font-semibold' : 'text-emerald-700'}`}>
                    {repo.freshness}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center space-x-1 font-semibold ${
                        isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-700 hover:text-blue-900'
                      }`}
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Smart India Hackathon Problem Statement & Impact */}
      <div className="bg-linear-to-r from-blue-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 space-y-6 border border-slate-800">
        <div className="max-w-3xl space-y-3">
          <div className="inline-block text-xs font-mono text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2.5 py-1 rounded-md">
            Smart India Hackathon Problem Solution
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            AI-powered Intelligent Assistant for Indian Standards & BIS Services
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Developed to bridge the gap between complex regulatory standardisation documents and grassroots manufacturers. By providing source-grounded answers in multiple Indian languages, calculating MSME subsidies, and verifying genuine product licenses, BIAS STANDARD accelerates the "Make in India" quality mission.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-700 flex flex-wrap gap-4 items-center justify-between">
          <button
            onClick={() => setActiveTab('chat')}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center space-x-2"
          >
            <Bot className="w-4 h-4" />
            <span>Launch AI Assistant</span>
          </button>
          <div className="text-xs text-slate-400 font-mono">
            USP: "One AI assistant for Indian Standards, backed by official sources."
          </div>
        </div>
      </div>
    </div>
  );
};
