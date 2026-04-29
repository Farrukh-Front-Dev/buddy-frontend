import React, { createContext, useState, ReactNode, useEffect } from 'react';
import homeUz from '../locales/home.uz.json';
import homeRu from '../locales/home.ru.json';
import homeEn from '../locales/home.en.json';

export type Language = 'uz' | 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultValue?: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const translations: Record<Language, Record<string, any>> = {
  uz: homeUz,
  ru: homeRu,
  en: homeEn,
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('buddy_language');
      return (saved as Language) || 'uz';
    } catch {
      return 'uz';
    }
  });

  // Save to localStorage when language changes
  useEffect(() => {
    try {
      localStorage.setItem('buddy_language', language);
    } catch (error) {
      console.error('Failed to save language to localStorage:', error);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string, defaultValue: string = key): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || defaultValue;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
