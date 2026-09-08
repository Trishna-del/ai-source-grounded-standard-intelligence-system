import React from 'react';
import { ShieldCheck, ExternalLink, PhoneCall, AlertTriangle, Scale, BookOpen } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, isDarkMode = true }) => {
  return (
    <footer className={`border-t text-xs transition-colors ${
      isDarkMode ? 'bg-slate-950 text-slate-300 border-slate-800/90' : 'bg-slate-900 text-slate-300 border-slate-800'
    }`}>
      {/* Top Banner: Emergency helpline & fake ISI alert */}
      <div className="bg-slate-950/80 border-b border-slate-800 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-amber-300">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            <span className="font-semibold">Sub-Standard Goods or Misuse of ISI Mark?</span>
            <span className="text-slate-400 hidden sm:inline">Report counterfeit products directly to BIS Enforcement or NCH.</span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="tel:1915" 
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-colors font-mono"
            >
              <PhoneCall className="w-3 h-3" />
              <span>National Consumer Helpline: 1915</span>
            </a>
            <a 
              href="https://www.bis.gov.in" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-400 hover:text-white flex items-center space-x-1"
            >
              <span>bis.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & USP */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5 text-amber-300" />
              </div>
              <span className="font-bold text-base text-white tracking-wide">BIAS STANDARD</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              AI-powered Intelligent Assistant for Indian Standards & BIS Services. Developed for Smart India Hackathon.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
              <p className="text-[11px] text-emerald-400 font-semibold mb-1 flex items-center space-x-1">
                <Scale className="w-3 h-3" />
                <span>Source Grounding Promise</span>
              </p>
              <p className="text-[10px] text-slate-400 leading-normal">
                Every AI response is strictly grounded in official Indian Standards, Gazette QCOs, and Manakonline guidelines to eliminate hallucinations.
              </p>
            </div>
          </div>

          {/* Col 2: Core Portals */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Core Modules</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button 
                  onClick={() => setActiveTab('chat')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  AI Chatbot with Source Grounding
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('standards')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Indian Standards Explorer (IS Catalog)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('certification')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Step-by-Step Certification Guide (ISI/CRS)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('verify')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Product License & HUID Verification
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('about')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Knowledge Base & Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Certification Schemes */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">BIS Schemes</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Scheme I: ISI Product Certification</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Scheme II: Compulsory Registration (CRS)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Scheme IV: Gold & Silver Hallmarking</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Scheme X: Foreign Manufacturers (FMCS)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span>ECO Mark Scheme for Green Products</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Repositories */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Official BIS Portals</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a 
                  href="https://www.manakonline.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-amber-400 flex items-center justify-between"
                >
                  <span>e-BIS Manakonline</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.crsbis.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-amber-400 flex items-center justify-between"
                >
                  <span>CRS Electronics Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.services.bis.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-amber-400 flex items-center justify-between"
                >
                  <span>BIS Connect Services</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://dpiit.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-amber-400 flex items-center justify-between"
                >
                  <span>DPIIT Quality Control Orders</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>
            © {new Date().getFullYear()} BIAS STANDARD. Built for the Smart India Hackathon. Backed by Bureau of Indian Standards (BIS Act 2016) knowledge corpus.
          </p>
          <p className="text-slate-400">
            For statutory enforcement, refer to official Gazette of India notifications and Manakonline.
          </p>
        </div>
      </div>
    </footer>
  );
};
