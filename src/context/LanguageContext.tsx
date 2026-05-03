import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import homeUz from '../locales/uz/home.json';
import homeRu from '../locales/ru/home.json';
import homeEn from '../locales/en/home.json';
import navbarUz from '../locales/uz/navbar.json';
import navbarRu from '../locales/ru/navbar.json';
import navbarEn from '../locales/en/navbar.json';
import dashboardUz from '../locales/uz/dashboard.json';
import dashboardRu from '../locales/ru/dashboard.json';
import dashboardEn from '../locales/en/dashboard.json';
import featuresUz from '../locales/uz/features.json';
import featuresRu from '../locales/ru/features.json';
import featuresEn from '../locales/en/features.json';
import authUz from '../locales/uz/auth.json';
import authRu from '../locales/ru/auth.json';
import authEn from '../locales/en/auth.json';
import teamUz from '../locales/uz/team.json';
import teamRu from '../locales/ru/team.json';
import teamEn from '../locales/en/team.json';

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
  uz: { ...homeUz, ...navbarUz, ...dashboardUz, ...featuresUz, ...authUz, ...teamUz },
  ru: { ...homeRu, ...navbarRu, ...dashboardRu, ...featuresRu, ...authRu, ...teamRu },
  en: { ...homeEn, ...navbarEn, ...dashboardEn, ...featuresEn, ...authEn, ...teamEn },
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
      console.log('Language changed to:', language);
    } catch (error) {
      console.error('Failed to save language to localStorage:', error);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    console.log('Setting language to:', lang);
    setLanguageState(lang);
  };

  const t = useCallback((key: string, defaultValue: string = key): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || defaultValue;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
