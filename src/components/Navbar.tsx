import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Bot, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Info, 
  Globe, 
  ChevronDown, 
  Menu, 
  X,
  ExternalLink,
  Moon,
  Sun
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../data/knowledgeBase';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  isDarkMode?: boolean;
  setIsDarkMode?: (dark: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage,
  isDarkMode = true,
  setIsDarkMode
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  const navItems = [
    { id: 'landing', label: 'Home', icon: ShieldCheck },
    { id: 'chat', label: 'AI Assistant', icon: Bot, badge: 'Source-Grounded' },
    { id: 'standards', label: 'Standards Explorer', icon: BookOpen },
    { id: 'certification', label: 'Certification Guide', icon: Award },
    { id: 'verify', label: 'Verify License / QR', icon: CheckCircle2 },
    { id: 'about', label: 'Source Intelligence', icon: Info },
  ];

  const toggleTheme = () => {
    if (setIsDarkMode) {
      setIsDarkMode(!isDarkMode);
    }
  };

  return (
    <header className={`sticky top-0 z-40 backdrop-blur transition-colors duration-200 border-b ${
      isDarkMode 
        ? 'bg-slate-950/95 border-slate-800/80 shadow-md shadow-black/20' 
        : 'bg-white/95 border-slate-200 shadow-xs'
    }`}>
      {/* Tricolor Subtle Top Border Accent */}
      <div className="h-1 w-full bg-linear-to-r from-amber-500 via-white to-emerald-600" />

      {/* Official Government Tech Header Bar */}
      <div className={`text-xs px-4 py-1.5 flex items-center justify-between border-b transition-colors ${
        isDarkMode 
          ? 'bg-slate-900/90 text-slate-300 border-slate-800' 
          : 'bg-slate-900 text-slate-300 border-slate-800'
      }`}>
        <div className="flex items-center space-x-2 font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-200 font-medium">Smart India Hackathon</span>
          <span className="text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-400">Intelligent Assistant for Indian Standards & BIS Services</span>
        </div>
        <div className="flex items-center space-x-4">
          <a 
            href="https://www.manakonline.in" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-amber-400 flex items-center space-x-1 transition-colors text-slate-300"
          >
            <span>Official e-BIS</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-600 hidden md:inline">•</span>
          <span className="text-emerald-400 font-medium hidden md:inline">100% Source Grounded</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Emblem */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-slate-900 to-blue-950 text-white flex items-center justify-center shadow-md border border-slate-700 group-hover:border-amber-400 transition-colors">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className={`font-extrabold text-lg sm:text-xl tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  BIAS
                </span>
                <span className={`font-light text-lg sm:text-xl ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-900'
                }`}>
                  STANDARD
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                  isDarkMode
                    ? 'bg-blue-950/80 text-blue-300 border-blue-800'
                    : 'bg-blue-100 text-blue-900 border-blue-300'
                }`}>
                  AI-BIS
                </span>
              </div>
              <p className={`text-[11px] font-medium leading-tight ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Indian Standards & Certification AI
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? isDarkMode
                        ? 'bg-blue-950/70 text-blue-200 border border-blue-800/80 shadow-xs font-semibold'
                        : 'bg-blue-50 text-blue-900 shadow-xs font-semibold'
                      : isDarkMode
                        ? 'text-slate-300 hover:text-white hover:bg-slate-850/80'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${
                    isActive 
                      ? isDarkMode ? 'text-blue-400' : 'text-blue-700' 
                      : isDarkMode ? 'text-slate-400' : 'text-slate-400'
                  }`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`ml-1 text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-full border ${
                      isDarkMode
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${
                      isDarkMode ? 'bg-amber-400' : 'bg-blue-700'
                    }`} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Theme Toggle, Language Selector & Quick Action */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Dark / Light Mode Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-750 text-amber-400 hover:bg-slate-800 hover:text-amber-300 hover:border-slate-600' 
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                id="lang-selector-btn"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center space-x-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  isDarkMode
                    ? 'border-slate-750 text-slate-200 bg-slate-900 hover:bg-slate-800'
                    : 'border-slate-300 text-slate-700 bg-white hover:bg-slate-50 shadow-2xs'
                }`}
                title="Select Language"
              >
                <Globe className={`w-3.5 h-3.5 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`} />
                <span>{currentLang.nativeName}</span>
                <span className="text-slate-400 text-[10px]">({currentLang.badge})</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangMenuOpen && (
                <div 
                  className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl border py-1.5 z-50 animate-in fade-in slide-in-from-top-1 ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-750 text-slate-200 divide-y divide-slate-800'
                      : 'bg-white border-slate-200 text-slate-700 divide-y divide-slate-100'
                  }`}
                  onMouseLeave={() => setIsLangMenuOpen(false)}
                >
                  <div className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-400'
                  }`}>
                    Select Language / भाषा चुनें
                  </div>
                  <div className="py-1">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                          selectedLanguage === lang.code
                            ? isDarkMode
                              ? 'bg-blue-950/80 text-blue-300 font-semibold'
                              : 'bg-blue-50/70 text-blue-900 font-semibold'
                            : isDarkMode
                              ? 'text-slate-300 hover:bg-slate-800'
                              : 'text-slate-700 hover:bg-blue-50'
                        }`}
                      >
                        <span className="font-medium">{lang.nativeName}</span>
                        <span className="text-[10px] text-slate-400 uppercase">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Button */}
            <button
              id="quick-verify-btn"
              onClick={() => setActiveTab('verify')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
              <span>Verify CM/L</span>
            </button>
          </div>

          {/* Mobile Menu Trigger & Theme Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border ${
                isDarkMode 
                  ? 'border-slate-750 text-amber-400 bg-slate-900' 
                  : 'border-slate-200 text-slate-600 bg-white'
              }`}
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`p-2 border rounded-lg ${
                isDarkMode 
                  ? 'border-slate-750 text-slate-300 bg-slate-900' 
                  : 'border-slate-200 text-slate-600 bg-white'
              }`}
              title="Change Language"
            >
              <Globe className="w-4 h-4 text-blue-400" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 border rounded-lg ${
                isDarkMode 
                  ? 'border-slate-750 text-slate-300 bg-slate-900' 
                  : 'border-slate-200 text-slate-600 bg-white'
              }`}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden border-t px-4 pt-3 pb-5 space-y-2 shadow-2xl ${
          isDarkMode 
            ? 'bg-slate-900 border-slate-800 text-slate-200' 
            : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? isDarkMode
                        ? 'bg-blue-950 text-blue-200 font-semibold border border-blue-800'
                        : 'bg-blue-50 text-blue-900 font-semibold'
                      : isDarkMode
                        ? 'text-slate-300 hover:bg-slate-800'
                        : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${
                      isActive 
                        ? isDarkMode ? 'text-blue-400' : 'text-blue-700' 
                        : 'text-slate-400'
                    }`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isDarkMode 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className={`pt-3 border-t flex items-center justify-between ${
            isDarkMode ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <span className="text-xs text-slate-400 font-medium">Language: {currentLang.nativeName}</span>
            <button
              onClick={() => {
                setActiveTab('verify');
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold"
            >
              Verify Product License
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

