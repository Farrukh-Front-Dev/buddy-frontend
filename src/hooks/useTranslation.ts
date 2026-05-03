import { useContext, useMemo } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export const useTranslation = (namespace?: string) => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider');
  }

  // If namespace is provided, prefix all keys with it
  // useMemo ensures the function is recreated when language or namespace changes
  const t = useMemo(() => {
    return (key: string, defaultValue?: string): string => {
      const fullKey = namespace ? `${namespace}.${key}` : key;
      return context.t(fullKey, defaultValue);
    };
  }, [context, namespace]);

  return {
    ...context,
    t
  };
};
