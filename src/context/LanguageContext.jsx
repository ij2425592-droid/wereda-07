'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, languages } from '../data/translations';

const LanguageContext = createContext({
  language: 'am',
  setLanguage: () => {},
  t: translations.am,
  languages: languages,
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('am');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('preferred_locale');
      if (savedLang && (savedLang === 'am' || savedLang === 'en' || savedLang === 'or')) {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang === 'or' ? 'om' : savedLang;
      }
    } catch (e) {
      console.error('Error loading language preference:', e);
    }
    setMounted(true);
  }, []);

  const setLanguage = (langCode) => {
    if (langCode === 'am' || langCode === 'en' || langCode === 'or') {
      setLanguageState(langCode);
      try {
        localStorage.setItem('preferred_locale', langCode);
        document.documentElement.lang = langCode === 'or' ? 'om' : langCode;
      } catch (e) {
        console.error('Error saving language preference:', e);
      }
    }
  };

  const t = translations[language] || translations.am;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages,
        isHydrated: mounted,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
