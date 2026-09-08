import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Bot, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  FileText, 
  Building2, 
  Cpu, 
  Sparkles, 
  Scale, 
  AlertTriangle, 
  TrendingUp, 
  ExternalLink,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { BIS_STANDARDS } from '../data/standardsData';

interface LandingViewProps {
  setActiveTab: (tab: string) => void;
  onInitiateQuery: (query: string) => void;
  isDarkMode?: boolean;
}

export const LandingView: React.FC<LandingViewProps> = ({ 
  setActiveTab, 
  onInitiateQuery,
  isDarkMode = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onInitiateQuery(searchQuery.trim());
      setActiveTab('chat');
    }
  };

  const samplePrompts = [
    { label: 'Drinking Water TDS Limits', query: 'What are the TDS and pH limits under IS 10500:2012?' },
    { label: 'Toys Mandatory QCO', query: 'What are the requirements under the DPIIT Toys Quality Control Order?' },
    { label: 'Verify Gold HUID', query: 'How do I verify a 6-digit Gold Hallmark HUID code?' },
    { label: 'MSME Fee Concessions', query: 'What fee concessions do Micro and Small enterprises get under BIS?' },
    { label: 'CRS for Li-ion Batteries', query: 'What is the CRS registration process for Lithium ion batteries under IS 16046?' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className={`relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b transition-colors ${
        isDarkMode 
          ? 'border-slate-800/80 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950' 
          : 'border-slate-200/80 bg-linear-to-b from-white via-slate-50/50 to-slate-100/60'
      }`}>
        {/* Subtle geometric pattern background */}
        <div className={`absolute inset-0 [size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none ${
          isDarkMode 
            ? 'bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] opacity-60' 
            : 'bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] opacity-35'
        }`} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* SIH Official Badge */}
            <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-2xs ${
              isDarkMode 
                ? 'bg-blue-950/80 border border-blue-800 text-blue-300' 
                : 'bg-blue-50 border border-blue-200/80 text-blue-900'
            }`}>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Smart India Hackathon Problem Solution</span>
              <span className={isDarkMode ? 'text-blue-500' : 'text-blue-300'}>•</span>
              <span className={isDarkMode ? 'text-amber-400' : 'text-blue-700'}>Indian Standards & BIS Services</span>
            </div>

            {/* Main USP Headline */}
            <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              One AI Assistant for <span className={`underline decoration-amber-400 decoration-wavy decoration-2 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-900'
              }`}>Indian Standards</span>, Backed by Official Sources.
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed font-normal ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Empowering Indian industries, MSMEs, exporters, and consumers with instant, source-grounded compliance intelligence. Eliminate hallucinations with answers cited directly from the Bureau of Indian Standards (BIS Act 2016, Gazette QCOs, & Manakonline).
            </p>

            {/* Interactive Hero Search & Query Input */}
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mt-6">
              <div className={`relative flex items-center rounded-2xl shadow-xl border p-1.5 transition-all ${
                isDarkMode 
                  ? 'bg-slate-900/90 border-slate-700 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-900/30' 
                  : 'bg-white border-slate-300/80 focus-within:border-blue-700 focus-within:ring-4 focus-within:ring-blue-100'
              }`}>
                <div className="pl-3.5 pr-2">
                  <Search className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask any question on IS codes, QCOs, or enter CM/L number..."
                  className={`w-full py-3 px-2 text-sm sm:text-base focus:outline-hidden bg-transparent ${
                    isDarkMode 
                      ? 'text-white placeholder:text-slate-500' 
                      : 'text-slate-900 placeholder:text-slate-400'
                  }`}
                />
                <button
                  type="submit"
                  className="shrink-0 flex items-center space-x-2 px-4 sm:px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-xs transition-colors"
                >
                  <Bot className="w-4 h-4 text-amber-300" />
                  <span>Ask AI</span>
                </button>
              </div>

              {/* Sample Prompt Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3 pt-1">
                <span className={`text-xs font-medium mr-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
                  Try asking:
                </span>
                {samplePrompts.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onInitiateQuery(item.query);
                      setActiveTab('chat');
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-colors shadow-2xs ${
                      isDarkMode 
                        ? 'bg-slate-850/80 border-slate-750 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-900 hover:border-blue-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </form>

            {/* Core Statistics Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-4xl mx-auto text-left">
              <div className={`p-3.5 rounded-xl border shadow-xs ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80'
              }`}>
                <div className={`text-2xl font-extrabold ${isDarkMode ? 'text-blue-400' : 'text-blue-900'}`}>21,000+</div>
                <div className={`text-xs font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Indian Standards</div>
                <div className="text-[11px] text-slate-400">Unified digital catalog</div>
              </div>
              <div className={`p-3.5 rounded-xl border shadow-xs ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80'
              }`}>
                <div className="text-2xl font-extrabold text-emerald-400">400+</div>
                <div className={`text-xs font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Mandatory QCOs</div>
                <div className="text-[11px] text-slate-400">Statutory Gazette tracking</div>
              </div>
              <div className={`p-3.5 rounded-xl border shadow-xs ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80'
              }`}>
                <div className="text-2xl font-extrabold text-amber-400">80%</div>
                <div className={`text-xs font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>MSME Fee Concession</div>
                <div className="text-[11px] text-slate-400">Subsidies for Micro units</div>
              </div>
              <div className={`p-3.5 rounded-xl border shadow-xs ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80'
              }`}>
                <div className="text-2xl font-extrabold text-indigo-400">100%</div>
                <div className={`text-xs font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Source Citations</div>
                <div className="text-[11px] text-slate-400">Zero-hallucination guard</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Target Audience & Persona Paths */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Tailored Compliance for Every Stakeholder
          </h2>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Whether you are a manufacturing MSME, an electronics importer, or a conscious consumer, BIAS STANDARD provides exact statutory pathways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Persona 1: MSMEs */}
          <div className={`p-6 rounded-2xl border shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
            isDarkMode 
              ? 'bg-slate-900/80 border-slate-800 hover:border-blue-500/50' 
              : 'bg-white border-slate-200 hover:border-blue-400'
          }`}>
            <div className="space-y-3">
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-blue-950/70 border-blue-800 text-blue-400' 
                  : 'bg-blue-50 border-blue-200 text-blue-800'
              }`}>
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                For MSMEs & Industry
              </h3>
              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Step-by-step guidance for ISI Mark Scheme I. Calculate 80% Micro & 50% Small enterprise fee concessions and review in-house lab checklists.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('certification')}
              className={`mt-5 inline-flex items-center space-x-1.5 text-xs font-semibold group ${
                isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-700 hover:text-blue-900'
              }`}
            >
              <span>Explore ISI Scheme</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Persona 2: Electronics & Importers */}
          <div className={`p-6 rounded-2xl border shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
            isDarkMode 
              ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/50' 
              : 'bg-white border-slate-200 hover:border-emerald-400'
          }`}>
            <div className="space-y-3">
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-emerald-950/70 border-emerald-800 text-emerald-400' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}>
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                For Tech & Importers
              </h3>
              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Navigate MeitY Compulsory Registration Scheme (CRS) and Foreign Manufacturers Certification (FMCS). Series formulation & NABL lab testing.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('certification')}
              className={`mt-5 inline-flex items-center space-x-1.5 text-xs font-semibold group ${
                isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              <span>View CRS & FMCS</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Persona 3: Consumers & Buyers */}
          <div className={`p-6 rounded-2xl border shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
            isDarkMode 
              ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/50' 
              : 'bg-white border-slate-200 hover:border-amber-400'
          }`}>
            <div className="space-y-3">
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-amber-950/70 border-amber-800 text-amber-400' 
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                For Consumers & Public
              </h3>
              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Verify genuine ISI mark CM/L numbers, scan product QR codes, and authenticate 6-character gold jewellery Hallmark Unique Identification (HUID).
              </p>
            </div>
            <button
              onClick={() => setActiveTab('verify')}
              className={`mt-5 inline-flex items-center space-x-1.5 text-xs font-semibold group ${
                isDarkMode ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              <span>Verify Product License</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Persona 4: Testing Labs & Consultants */}
          <div className={`p-6 rounded-2xl border shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
            isDarkMode 
              ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/50' 
              : 'bg-white border-slate-200 hover:border-purple-400'
          }`}>
            <div className="space-y-3">
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-purple-950/70 border-purple-800 text-purple-400' 
                  : 'bg-purple-50 border-purple-200 text-purple-800'
              }`}>
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                For Testing Labs & Auditors
              </h3>
              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Review official Scheme of Testing & Inspection (STI) benchmarks, required calibration tolerances, and NABL testing methods for any IS standard.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('standards')}
              className={`mt-5 inline-flex items-center space-x-1.5 text-xs font-semibold group ${
                isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-700 hover:text-purple-900'
              }`}
            >
              <span>Explore Standards Catalog</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured / Mandatory Standards Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className={`flex items-center space-x-2 font-semibold text-xs tracking-wider uppercase mb-1 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-900'
            }`}>
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>High-Impact Standards</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Mandatory Quality Control Orders (QCO)
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('standards')}
            className={`inline-flex items-center space-x-2 text-sm font-semibold px-4 py-2 rounded-xl border transition-colors ${
              isDarkMode 
                ? 'bg-slate-900 text-blue-300 border-slate-750 hover:bg-slate-800 hover:text-blue-200' 
                : 'text-blue-900 hover:text-blue-950 bg-blue-50 border-blue-200'
            }`}
          >
            <span>View All Standards</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BIS_STANDARDS.slice(0, 6).map((std) => (
            <div
              key={std.id}
              className={`p-5 rounded-2xl border shadow-xs transition-all flex flex-col justify-between ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:shadow-md' 
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded border ${
                    isDarkMode 
                      ? 'bg-slate-800 text-slate-200 border-slate-700' 
                      : 'bg-slate-100 text-slate-800 border-slate-200'
                  }`}>
                    {std.isNumber}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                    isDarkMode 
                      ? 'text-emerald-300 bg-emerald-950/80 border-emerald-800' 
                      : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                  }`}>
                    {std.status}
                  </span>
                </div>
                <h3 className={`font-bold text-sm line-clamp-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {std.title}
                </h3>
                <p className={`text-xs mt-1 line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {std.description}
                </p>

                <div className={`mt-4 pt-3 border-t space-y-1 text-[11px] ${
                  isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-600'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Scheme:</span>
                    <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{std.scheme}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Division:</span>
                    <span className={`font-medium truncate max-w-[180px] ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {std.division}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`mt-4 pt-3 border-t flex items-center justify-between ${
                isDarkMode ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <button
                  onClick={() => {
                    onInitiateQuery(`Tell me everything about ${std.isNumber} including mandatory test parameters and QCO status.`);
                    setActiveTab('chat');
                  }}
                  className={`text-xs font-semibold flex items-center space-x-1 ${
                    isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-700 hover:text-blue-900'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ask AI</span>
                </button>
                <button
                  onClick={() => setActiveTab('standards')}
                  className={`text-xs font-medium ${
                    isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Innovation: Why Source Grounding Matters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold mb-4">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>SIH Technical USP</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Combating LLM Hallucinations in Regulatory Engineering
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              In statutory standards, a hallucinated chemical limit or wrong IS code can result in commercial license revocation or hazardous safety failures. BIAS STANDARD is engineered with a strict 4-layer verification pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 relative z-10">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <div className="text-amber-400 text-xs font-mono font-bold mb-2">01. STATUTORY RETRIEVAL</div>
              <h3 className="font-bold text-sm text-white mb-1">BIS Gazette Vector Store</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Queries are cross-referenced with official Gazette notifications, e-BIS product codes, and Scheme of Testing & Inspection (STI) manuals.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <div className="text-emerald-400 text-xs font-mono font-bold mb-2">02. CITATION ATTACHMENT</div>
              <h3 className="font-bold text-sm text-white mb-1">Clause-Level Citations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every generated response attaches exact clause references, publication year, and direct links to official Manakonline documentation.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
              <div className="text-blue-400 text-xs font-mono font-bold mb-2">03. ACTIVE REFUSAL GUARD</div>
              <h3 className="font-bold text-sm text-white mb-1">Strict Fallback Notice</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                If verified information is unavailable in official documentation, the AI clearly states so rather than hallucinating fake technical parameters.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Want to see the technical architecture and grounding data flow?
            </div>
            <button
              onClick={() => setActiveTab('about')}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
            >
              <span>View Source Intelligence Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-linear-to-r from-blue-950 via-indigo-950 to-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-800 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ready to Verify or Certify Your Product?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Experience the conversational interface. Ask our intelligent assistant any question regarding Indian Standards, QCOs, or testing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('chat')}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-colors flex items-center space-x-2"
            >
              <Bot className="w-4 h-4" />
              <span>Launch AI Assistant</span>
            </button>
            <button
              onClick={() => setActiveTab('verify')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors flex items-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verify License Number</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
