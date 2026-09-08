import React, { useState } from 'react';
import { X, ExternalLink, Bot, CheckCircle2, ShieldCheck, Copy, Check, Beaker, FileText, Scale } from 'lucide-react';
import { Standard } from '../types';

interface StandardDetailModalProps {
  standard: Standard | null;
  onClose: () => void;
  onAskAI: (query: string) => void;
  isDarkMode?: boolean;
}

export const StandardDetailModal: React.FC<StandardDetailModalProps> = ({
  standard,
  onClose,
  onAskAI,
  isDarkMode = true
}) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!standard) return null;

  const handleCopyIS = () => {
    navigator.clipboard.writeText(standard.isNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className={`rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border space-y-6 my-8 animate-in fade-in zoom-in-95 transition-colors ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800 text-white' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header with Title & Badges */}
        <div className={`flex items-start justify-between gap-4 pb-4 border-b ${
          isDarkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`font-mono font-bold text-sm px-2.5 py-1 rounded-lg border ${
                isDarkMode 
                  ? 'bg-blue-950/80 text-blue-300 border-blue-800' 
                  : 'bg-blue-50 text-blue-900 border-blue-200'
              }`}>
                {standard.isNumber}
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                standard.status === 'Mandatory (QCO)'
                  ? isDarkMode ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}>
                {standard.status}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                isDarkMode 
                  ? 'bg-amber-950/80 text-amber-300 border-amber-800' 
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}>
                {standard.scheme}
              </span>
            </div>
            <h2 className={`text-lg sm:text-xl font-extrabold mt-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {standard.title}
            </h2>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Technical Committee: {standard.technicalCommittee} | Division: {standard.division}
            </p>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors shrink-0 ${
              isDarkMode 
                ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description & Overview */}
        <div className="space-y-2">
          <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-800'
          }`}>
            <FileText className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`} />
            <span>Scope and Specification Summary</span>
          </h3>
          <p className={`text-xs sm:text-sm leading-relaxed p-4 rounded-xl border ${
            isDarkMode 
              ? 'text-slate-300 bg-slate-800/80 border-slate-700' 
              : 'text-slate-700 bg-slate-50 border-slate-200/80'
          }`}>
            {standard.description}
          </p>
        </div>

        {/* Quality Parameters and Testing Benchmarks */}
        <div className="space-y-2">
          <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-800'
          }`}>
            <Beaker className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`} />
            <span>Key Test Parameters & Quality Requirements</span>
          </h3>
          <div className={`p-4 rounded-xl border space-y-2 ${
            isDarkMode 
              ? 'bg-slate-800/80 border-slate-700' 
              : 'bg-slate-50 border-slate-200/80'
          }`}>
            <ul className={`space-y-1.5 text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {standard.keyParameters.map((param, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                    isDarkMode ? 'bg-emerald-400' : 'bg-emerald-600'
                  }`} />
                  <span>{param}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Testing Methods & Accredited Labs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border space-y-1.5 ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Test Methods & Apparatus</div>
            <div className={`text-xs font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              {standard.testMethods.join(', ')}
            </div>
          </div>
          <div className={`p-4 rounded-xl border space-y-1.5 ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`text-[11px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>NABL Lab Network Availability</div>
            <div className={`text-xs font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              Approx. <span className={`font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-900'}`}>{standard.nablLabCountApprox}</span> accredited laboratories across India.
            </div>
          </div>
        </div>

        {/* Statutory QCO & Fee Information */}
        <div className={`p-4 rounded-xl border space-y-2 text-xs ${
          isDarkMode 
            ? 'bg-blue-950/40 border-blue-800/60' 
            : 'bg-blue-50/70 border-blue-200'
        }`}>
          <div className={`flex items-center justify-between font-bold ${
            isDarkMode ? 'text-blue-300' : 'text-blue-900'
          }`}>
            <span className="flex items-center space-x-1.5">
              <Scale className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`} />
              <span>Statutory Quality Control Order (QCO) Details</span>
            </span>
            <span>{standard.qcoDate ? `Enforced: ${standard.qcoDate}` : 'Statutory'}</span>
          </div>
          <p className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
            <strong>Notifying Ministry:</strong> {standard.qcoMinistry || 'Bureau of Indian Standards'}
          </p>
          <p className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
            <strong>Marking Fee Benchmark:</strong> {standard.markingFeeInfo}
          </p>
        </div>

        {/* Action Controls */}
        <div className={`flex flex-wrap items-center justify-between gap-3 pt-4 border-t ${
          isDarkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyIS}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                isDarkMode 
                  ? 'border-slate-700 hover:bg-slate-800 text-slate-300' 
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied IS Code' : 'Copy IS Code'}</span>
            </button>
            <a
              href={standard.officialUrl}
              target="_blank"
              rel="noreferrer"
              className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                isDarkMode 
                  ? 'border-slate-700 hover:bg-slate-800 text-blue-400' 
                  : 'border-slate-200 hover:bg-slate-50 text-blue-800'
              }`}
            >
              <span>View on Manakonline</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onAskAI(`Explain the complete testing procedure, Scheme of Testing & Inspection (STI), and in-house lab equipment needed for ${standard.isNumber}.`);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-colors flex items-center space-x-1.5"
            >
              <Bot className="w-4 h-4 text-amber-300" />
              <span>Ask AI About This Standard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
