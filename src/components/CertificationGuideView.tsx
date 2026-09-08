import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Calculator, 
  AlertTriangle, 
  Building2, 
  ShieldCheck, 
  ChevronRight, 
  ExternalLink,
  Sparkles,
  Bot
} from 'lucide-react';
import { BIS_SCHEMES, MSME_FEE_CONCESSIONS } from '../data/certificationSchemes';

interface CertificationGuideViewProps {
  onAskAI: (query: string) => void;
  setActiveTab: (tab: string) => void;
  isDarkMode?: boolean;
}

export const CertificationGuideView: React.FC<CertificationGuideViewProps> = ({
  onAskAI,
  setActiveTab,
  isDarkMode = true
}) => {
  const [selectedSchemeId, setSelectedSchemeId] = useState('isi-scheme-1');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  // Fee Calculator State
  const [enterpriseCategory, setEnterpriseCategory] = useState<'micro' | 'small' | 'medium' | 'large'>('micro');
  const [calcScheme, setCalcScheme] = useState('isi');
  const [isStartup, setIsStartup] = useState(false);

  const currentScheme = BIS_SCHEMES.find((s) => s.id === selectedSchemeId) || BIS_SCHEMES[0];

  const handleDocToggle = (docId: string) => {
    setCheckedDocs((prev) => ({ ...prev, [docId]: !prev[docId] }));
  };

  // Fee calculation logic
  const calculateFees = () => {
    let baseAppFee = 1000;
    let baseMarkingFee = 84000;
    let auditCharges = 7000;
    let timelineWeeks = '6 - 8 Weeks';

    if (calcScheme === 'crs') {
      baseAppFee = 53000;
      baseMarkingFee = 0;
      auditCharges = 0; // No physical audit in CRS
      timelineWeeks = '3 - 4 Weeks';
    } else if (calcScheme === 'hallmark') {
      baseAppFee = 0; // Free jeweller registration
      baseMarkingFee = 0;
      auditCharges = 0;
      timelineWeeks = '1 - 2 Days';
    } else if (calcScheme === 'fmcs') {
      baseAppFee = 85000; // USD 1,000 approx converted
      baseMarkingFee = 160000;
      auditCharges = 120000; // Overseas inspector travel deposit
      timelineWeeks = '12 - 16 Weeks';
    }

    // Apply MSME Concession
    let discountPct = 0;
    if (calcScheme === 'isi') {
      if (enterpriseCategory === 'micro') discountPct = 80;
      else if (enterpriseCategory === 'small') discountPct = 50;
      else if (isStartup) discountPct = 50;
    }

    const discountedAppFee = Math.round(baseAppFee * (1 - discountPct / 100));
    const discountedMarkingFee = Math.round(baseMarkingFee * (1 - discountPct / 100));
    const totalEstimatedGovtFee = discountedAppFee + discountedMarkingFee + auditCharges;

    if (isStartup && calcScheme === 'isi') {
      timelineWeeks = '30 Days (Fast-Track DPIIT Window)';
    }

    return {
      baseAppFee,
      discountedAppFee,
      baseMarkingFee,
      discountedMarkingFee,
      auditCharges,
      discountPct,
      totalEstimatedGovtFee,
      timelineWeeks
    };
  };

  const feeSummary = calculateFees();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="space-y-3">
        <div className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-wider ${
          isDarkMode ? 'text-amber-400' : 'text-blue-900'
        }`}>
          <Award className="w-4 h-4 text-amber-500" />
          <span>Statutory Certification Frameworks</span>
        </div>
        <h1 className={`text-2xl sm:text-4xl font-extrabold ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Step-by-Step BIS Certification Roadmap & Fee Estimator
        </h1>
        <p className={`text-sm max-w-3xl leading-relaxed ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Detailed phase-by-phase compliance workflows for the Bureau of Indian Standards (BIS Act 2016). Understand Scheme of Testing & Inspection (STI), factory lab prerequisites, online Form-V filing, and MSME fee subsidies.
        </p>
      </div>

      {/* Scheme Selection Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {BIS_SCHEMES.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => setSelectedSchemeId(scheme.id)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedSchemeId === scheme.id
                ? isDarkMode
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-500/40'
                  : 'bg-blue-900 text-white border-blue-900 shadow-md ring-2 ring-blue-700/20'
                : isDarkMode
                ? 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50'
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider font-bold mb-1 opacity-80">
              {scheme.badge}
            </div>
            <div className="font-bold text-sm leading-snug">{scheme.title}</div>
            <div className="text-[11px] opacity-75 mt-1 font-mono">{scheme.schemeCode}</div>
          </button>
        ))}
      </div>

      {/* Active Scheme Overview & MSME Benefits Ribbon */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xs space-y-6 transition-colors ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800' 
          : 'bg-white border-slate-200'
      }`}>
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b ${
          isDarkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div>
            <div className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-md mb-2 ${
              isDarkMode 
                ? 'bg-blue-950/80 text-blue-300 border border-blue-800' 
                : 'bg-blue-50 text-blue-900'
            }`}>
              Target: {currentScheme.targetAudience}
            </div>
            <h2 className={`text-xl sm:text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>{currentScheme.title}</h2>
            <p className={`text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {currentScheme.overview}
            </p>
          </div>
          <button
            onClick={() => {
              onAskAI(`Guide me through the complete certification procedure for ${currentScheme.title}, including lab setup and pitfall avoidance.`);
              setActiveTab('chat');
            }}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-white text-xs font-bold flex items-center space-x-2 transition-colors self-start md:self-auto ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-900 hover:bg-blue-950'
            }`}
          >
            <Bot className="w-4 h-4 text-amber-300" />
            <span>Consult AI for this Scheme</span>
          </button>
        </div>

        {/* MSME Subsidies Highlight */}
        <div className={`p-4 rounded-2xl border space-y-2 ${
          isDarkMode 
            ? 'bg-amber-950/30 border-amber-800/50' 
            : 'bg-amber-50/80 border-amber-200/80'
        }`}>
          <div className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-wider ${
            isDarkMode ? 'text-amber-300' : 'text-amber-900'
          }`}>
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Special MSME Subsidies & Incentives:</span>
          </div>
          <ul className={`space-y-1.5 text-xs ${isDarkMode ? 'text-amber-200/90' : 'text-amber-950'}`}>
            {currentScheme.msmeBenefits.map((benefit, bIdx) => (
              <li key={bIdx} className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Phase-by-Phase Roadmap */}
        <div className="space-y-6 pt-4">
          <h3 className={`text-base font-bold flex items-center space-x-2 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            <Clock className="w-5 h-5 text-blue-500" />
            <span>Phase-by-Phase Execution Roadmap</span>
          </h3>

          <div className="space-y-4">
            {currentScheme.phases.map((phase) => (
              <div
                key={phase.step}
                className={`p-5 rounded-2xl border transition-all space-y-3 ${
                  isDarkMode 
                    ? 'bg-slate-850/80 border-slate-750 hover:bg-slate-800 hover:border-blue-500/60' 
                    : 'bg-slate-50/50 border-slate-200 hover:bg-white hover:border-blue-300 hover:shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                      {phase.step}
                    </span>
                    <h4 className={`font-bold text-sm sm:text-base ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>{phase.title}</h4>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border self-start sm:self-auto font-mono ${
                    isDarkMode 
                      ? 'text-slate-300 bg-slate-800 border-slate-700' 
                      : 'text-slate-500 bg-white border-slate-200'
                  }`}>
                    ⏱️ {phase.duration}
                  </span>
                </div>

                <p className={`text-xs leading-relaxed pl-10 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {phase.summary}
                </p>

                {/* Checklist & Document Manifest */}
                <div className="pl-10 grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className={`p-3 rounded-xl border space-y-1.5 ${
                    isDarkMode 
                      ? 'bg-slate-800/90 border-slate-700' 
                      : 'bg-white border-slate-200'
                  }`}>
                    <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Key Actions:
                    </span>
                    <ul className={`space-y-1 text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {phase.actions.map((act, aIdx) => (
                        <li key={aIdx} className="flex items-start space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-3 rounded-xl border space-y-1.5 ${
                    isDarkMode 
                      ? 'bg-slate-800/90 border-slate-700' 
                      : 'bg-white border-slate-200'
                  }`}>
                    <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Required Documents (Click to mark ready):
                    </span>
                    <div className="space-y-1">
                      {phase.requiredDocs.map((doc, dIdx) => {
                        const docKey = `${currentScheme.id}-${phase.step}-${dIdx}`;
                        const isChecked = checkedDocs[docKey];
                        return (
                          <div
                            key={dIdx}
                            onClick={() => handleDocToggle(docKey)}
                            className={`flex items-center space-x-2 text-xs cursor-pointer select-none transition-colors ${
                              isDarkMode 
                                ? 'text-slate-300 hover:text-white' 
                                : 'text-slate-700 hover:text-blue-900'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={Boolean(isChecked)}
                              onChange={() => {}}
                              className="w-3.5 h-3.5 text-blue-600 rounded border-slate-600"
                            />
                            <span className={isChecked ? 'line-through text-slate-500' : ''}>{doc}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Pitfall to avoid */}
                {phase.pitfallsToAvoid && (
                  <div className={`pl-10 text-[11px] flex items-center space-x-1.5 font-medium ${
                    isDarkMode ? 'text-rose-400' : 'text-rose-700'
                  }`}>
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                    <span><strong>Critical Pitfall:</strong> {phase.pitfallsToAvoid}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Statutory BIS Fee & Timeline Calculator */}
      <div className={`rounded-3xl p-6 sm:p-10 border space-y-8 transition-colors ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800 text-white' 
          : 'bg-slate-900 text-white border-slate-800'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
            <Calculator className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Interactive BIS Statutory Fee & Timeline Estimator</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Calculate official government application fees, minimum annual marking fees, and statutory MSME subsidies.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-1 space-y-4 bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Select Scheme:
              </label>
              <select
                value={calcScheme}
                onChange={(e) => setCalcScheme(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-hidden focus:border-amber-400"
              >
                <option value="isi">Scheme I: ISI Mark (Domestic Factory)</option>
                <option value="crs">Scheme II: Compulsory Registration (CRS)</option>
                <option value="hallmark">Scheme IV: Gold Hallmark Registration</option>
                <option value="fmcs">Scheme X: Foreign Manufacturers (FMCS)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Enterprise Scale (Udyam Classification):
              </label>
              <select
                value={enterpriseCategory}
                onChange={(e) => setEnterpriseCategory(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-hidden focus:border-amber-400"
              >
                <option value="micro">Micro Enterprise (Turnover &lt; ₹5 Cr) — 80% Subsidy</option>
                <option value="small">Small Enterprise (Turnover &lt; ₹50 Cr) — 50% Subsidy</option>
                <option value="medium">Medium Enterprise (Turnover &lt; ₹250 Cr)</option>
                <option value="large">Large Enterprise</option>
              </select>
            </div>

            <label className="flex items-center space-x-2 pt-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isStartup}
                onChange={(e) => setIsStartup(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded border-slate-600 bg-slate-900"
              />
              <span className="text-xs text-slate-200">
                DPIIT-Recognized Startup (Eligible for 30-day Fast-Track)
              </span>
            </label>

            <div className="pt-2 text-[11px] text-slate-400">
              *Lab testing charges billed directly by NABL accredited lab based on test volume.
            </div>
          </div>

          {/* Output Results Column */}
          <div className="lg:col-span-2 bg-slate-800/40 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Application Fee</span>
                <span className="text-lg font-mono font-bold text-white">
                  ₹{feeSummary.discountedAppFee.toLocaleString('en-IN')}
                </span>
                {feeSummary.discountPct > 0 && (
                  <span className="text-[10px] text-emerald-400 block font-semibold">
                    ({feeSummary.discountPct}% MSME Concession applied)
                  </span>
                )}
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Annual Marking Fee</span>
                <span className="text-lg font-mono font-bold text-white">
                  ₹{feeSummary.discountedMarkingFee.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {calcScheme === 'crs' ? 'CRS Registration Fee' : 'Annual minimum quota'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Timeline</span>
                <span className="text-sm font-mono font-bold text-amber-300 block">
                  {feeSummary.timelineWeeks}
                </span>
                <span className="text-[10px] text-slate-400 block">From application date</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400">Total Statutory Govt Fee Estimate:</span>
                <div className="text-2xl font-mono font-extrabold text-emerald-400">
                  ₹{feeSummary.totalEstimatedGovtFee.toLocaleString('en-IN')}
                </div>
              </div>

              <a
                href="https://www.manakonline.in"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-2 transition-colors self-start sm:self-auto"
              >
                <span>File Application on Manakonline</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
