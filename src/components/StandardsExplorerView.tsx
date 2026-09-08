import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Bot, 
  CheckCircle2, 
  ExternalLink, 
  SlidersHorizontal, 
  Info, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { BIS_STANDARDS } from '../data/standardsData';
import { Standard } from '../types';
import { StandardDetailModal } from './StandardDetailModal';

interface StandardsExplorerViewProps {
  onAskAI: (query: string) => void;
  setActiveTab: (tab: string) => void;
  isDarkMode?: boolean;
}

export const StandardsExplorerView: React.FC<StandardsExplorerViewProps> = ({
  onAskAI,
  setActiveTab,
  isDarkMode = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState('All');
  const [mandatoryOnly, setMandatoryOnly] = useState(false);
  const [activeModalStandard, setActiveModalStandard] = useState<Standard | null>(null);

  const categories = [
    'All',
    'Food & Agriculture',
    'Consumer Products',
    'Electrotechnical',
    'Electronics & IT',
    'Automotive',
    'Civil Engineering',
    'Precious Metals',
    'Renewable Energy'
  ];

  const filteredStandards = useMemo(() => {
    return BIS_STANDARDS.filter((std) => {
      // Keyword search
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        std.isNumber.toLowerCase().includes(q) ||
        std.title.toLowerCase().includes(q) ||
        std.description.toLowerCase().includes(q) ||
        std.keyParameters.some((kp) => kp.toLowerCase().includes(q));

      // Category filter
      const matchesCategory =
        selectedCategory === 'All' ||
        std.category.toLowerCase().includes(selectedCategory.toLowerCase());

      // Scheme filter
      const matchesScheme =
        selectedScheme === 'All' ||
        std.scheme.toLowerCase().includes(selectedScheme.toLowerCase());

      // Mandatory QCO filter
      const matchesMandatory = !mandatoryOnly || std.status === 'Mandatory (QCO)';

      return matchesSearch && matchesCategory && matchesScheme && matchesMandatory;
    });
  }, [searchTerm, selectedCategory, selectedScheme, mandatoryOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="space-y-3">
        <div className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-wider ${
          isDarkMode ? 'text-blue-400' : 'text-blue-900'
        }`}>
          <BookOpen className="w-4 h-4 text-blue-500" />
          <span>Unified Indian Standards Directory</span>
        </div>
        <h1 className={`text-2xl sm:text-4xl font-extrabold ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          Indian Standards (IS) & Quality Control Orders Explorer
        </h1>
        <p className={`text-sm max-w-3xl leading-relaxed ${
          isDarkMode ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Search and examine official specifications published by the Bureau of Indian Standards (BIS). Browse technical parameters, Scheme of Testing & Inspection (STI) criteria, and statutory Ministry Quality Control Orders (QCO).
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className={`p-6 rounded-2xl border shadow-xs space-y-5 transition-colors ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800' 
          : 'bg-white border-slate-200'
      }`}>
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by IS code (e.g. IS 10500, IS 9873), product title, or parameter (e.g. TDS, Choking, Compressive strength)..."
            className={`w-full pl-12 pr-4 py-3.5 border rounded-xl text-sm transition-all focus:outline-hidden focus:ring-2 ${
              isDarkMode 
                ? 'bg-slate-800/90 border-slate-750 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-900/40' 
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:ring-blue-100 focus:bg-white'
            }`}
          />
        </div>

        {/* Sector Category Filter Buttons */}
        <div className="space-y-2">
          <div className={`flex items-center justify-between text-xs font-semibold ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            <span>Filter by Industry Sector:</span>
            <span className={isDarkMode ? 'text-slate-400' : 'text-slate-400'}>{filteredStandards.length} Standards Found</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs font-semibold'
                    : isDarkMode
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750 hover:text-white'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters: Scheme & Mandatory Toggle */}
        <div className={`flex flex-wrap items-center justify-between pt-4 border-t gap-4 ${
          isDarkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div className="flex items-center space-x-3">
            <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Certification Scheme:
            </span>
            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className={`text-xs py-1.5 px-3 border rounded-lg focus:outline-hidden ${
                isDarkMode 
                  ? 'bg-slate-800 border-slate-700 text-slate-200 focus:border-blue-500' 
                  : 'bg-white border-slate-200 text-slate-700 focus:border-blue-700'
              }`}
            >
              <option value="All">All Schemes</option>
              <option value="ISI">Scheme I (ISI Mark)</option>
              <option value="CRS">Scheme II (CRS - Electronics)</option>
              <option value="Hallmark">Scheme IV (Jewellery Hallmark)</option>
            </select>
          </div>

          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={mandatoryOnly}
              onChange={(e) => setMandatoryOnly(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <span className={`text-xs font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-800'}`}>
              Show Mandatory Quality Control Orders (QCO) Only
            </span>
          </label>
        </div>
      </div>

      {/* Standards Grid */}
      {filteredStandards.length === 0 ? (
        <div className={`rounded-2xl p-12 text-center border space-y-4 ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800' 
            : 'bg-white border-slate-200'
        }`}>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto ${
            isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-400'
          }`}>
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            No Indian Standards matched your filters
          </h3>
          <p className={`text-xs max-w-md mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Try broadening your search term or select "All" sectors. You can also ask our AI Assistant to search the complete 21,000+ national directory.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedScheme('All');
              setMandatoryOnly(false);
            }}
            className={`text-xs px-4 py-2 font-semibold rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-blue-950/80 text-blue-300 border border-blue-800 hover:bg-blue-900/80' 
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
            }`}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStandards.map((standard) => (
            <div
              key={standard.id}
              className={`rounded-2xl border shadow-xs transition-all flex flex-col justify-between overflow-hidden ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 hover:border-blue-500/80 hover:shadow-lg' 
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="p-6 space-y-3">
                {/* IS Number and Status badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-mono font-bold text-xs px-2.5 py-1 rounded-md border ${
                    isDarkMode 
                      ? 'bg-blue-950/80 text-blue-300 border-blue-800' 
                      : 'bg-blue-50 text-blue-950 border-blue-200'
                  }`}>
                    {standard.isNumber}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      standard.status === 'Mandatory (QCO)'
                        ? isDarkMode ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {standard.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`font-bold text-sm sm:text-base leading-snug ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {standard.title}
                </h3>

                {/* Category & Scheme */}
                <div className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {standard.category} • <span className={isDarkMode ? 'text-blue-400 font-semibold' : 'text-blue-700 font-semibold'}>{standard.scheme}</span>
                </div>

                {/* Description excerpt */}
                <p className={`text-xs line-clamp-3 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {standard.description}
                </p>

                {/* Key parameters preview */}
                <div className={`pt-3 border-t space-y-1 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    Sample Benchmark:
                  </span>
                  <p className={`text-[11px] line-clamp-2 p-2 rounded border font-mono ${
                    isDarkMode 
                      ? 'bg-slate-800/80 border-slate-700 text-slate-300' 
                      : 'bg-slate-50 border-slate-200/60 text-slate-700'
                  }`}>
                    {standard.keyParameters[0]}
                  </p>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className={`px-6 py-3.5 border-t flex items-center justify-between ${
                isDarkMode 
                  ? 'bg-slate-850/90 border-slate-800' 
                  : 'bg-slate-50/80 border-slate-100'
              }`}>
                <button
                  onClick={() => setActiveModalStandard(standard)}
                  className={`text-xs font-bold flex items-center space-x-1 ${
                    isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-800 hover:text-blue-900'
                  }`}
                >
                  <span>Inspect Standard</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    onAskAI(`Provide a comprehensive compliance breakdown for ${standard.isNumber} (${standard.title}) including test parameters and lab setup.`);
                    setActiveTab('chat');
                  }}
                  className={`text-xs font-bold flex items-center space-x-1 ${
                    isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-700 hover:text-blue-950'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Deep Standard Inspection */}
      {activeModalStandard && (
        <StandardDetailModal
          standard={activeModalStandard}
          isDarkMode={isDarkMode}
          onClose={() => setActiveModalStandard(null)}
          onAskAI={(q) => {
            onAskAI(q);
            setActiveTab('chat');
          }}
        />
      )}
    </div>
  );
};
