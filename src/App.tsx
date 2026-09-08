/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingView } from './components/LandingView';
import { ChatbotView } from './components/ChatbotView';
import { StandardsExplorerView } from './components/StandardsExplorerView';
import { CertificationGuideView } from './components/CertificationGuideView';
import { ProductVerificationView } from './components/ProductVerificationView';
import { SourceIntelligenceView } from './components/SourceIntelligenceView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [chatInitiateQuery, setChatInitiateQuery] = useState<string>('');
  
  // Initialize dark mode as true (Dark Mode by default as requested)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('bias_theme');
    if (saved) return saved === 'dark';
    return true; // default to Dark Mode
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('bias_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('bias_theme', 'light');
    }
  }, [isDarkMode]);

  const handleInitiateQuery = (query: string) => {
    setChatInitiateQuery(query);
    setActiveTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDarkMode 
        ? 'dark bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200' 
        : 'bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900'
    }`}>
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingView
            setActiveTab={handleTabChange}
            onInitiateQuery={handleInitiateQuery}
            isDarkMode={isDarkMode}
          />
        )}

        {activeTab === 'chat' && (
          <ChatbotView
            initialQuery={chatInitiateQuery}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            setActiveTab={handleTabChange}
            isDarkMode={isDarkMode}
          />
        )}

        {activeTab === 'standards' && (
          <StandardsExplorerView
            onAskAI={handleInitiateQuery}
            setActiveTab={handleTabChange}
            isDarkMode={isDarkMode}
          />
        )}

        {activeTab === 'certification' && (
          <CertificationGuideView
            onAskAI={handleInitiateQuery}
            setActiveTab={handleTabChange}
            isDarkMode={isDarkMode}
          />
        )}

        {activeTab === 'verify' && (
          <ProductVerificationView 
            isDarkMode={isDarkMode} 
          />
        )}

        {activeTab === 'about' && (
          <SourceIntelligenceView
            onAskAI={handleInitiateQuery}
            setActiveTab={handleTabChange}
            isDarkMode={isDarkMode}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={handleTabChange} isDarkMode={isDarkMode} />
    </div>
  );
}

