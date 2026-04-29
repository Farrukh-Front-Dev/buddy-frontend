import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../../hooks/useTranslation';
import { Language } from '../../../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string; fullName: string }[] = [
    { code: 'uz', label: 'UZ', fullName: 'O\'zbek' },
    { code: 'ru', label: 'RU', fullName: 'Русский' },
    { code: 'en', label: 'EN', fullName: 'English' },
  ];

  const currentLang = languages.find(l => l.code === language);
  const shadowColor = 'rgb(168, 85, 247)';
  const borderColor = 'rgb(79, 70, 229)';

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsOpen(false)}></div>
      )}
      
      {/* Circle Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center transition-all duration-200 hover:translate-x-[1px] hover:translate-y-[1px] font-black text-xs text-indigo-400"
        style={{
          border: `2px solid ${borderColor}`,
          boxShadow: `2px 2px 0px 0px ${shadowColor}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `1px 1px 0px 0px ${shadowColor}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${shadowColor}`;
        }}
      >
        {currentLang?.label}
      </button>

      {/* 3D Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-3 w-48 bg-slate-900 rounded-2xl overflow-hidden"
            style={{
              border: `2px solid ${borderColor}`,
              boxShadow: `4px 4px 0px 0px ${shadowColor}`,
            }}
          >
            <div className="py-2 px-2 flex flex-col gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    language === lang.code
                      ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{lang.fullName}</span>
                  {language === lang.code && (
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
