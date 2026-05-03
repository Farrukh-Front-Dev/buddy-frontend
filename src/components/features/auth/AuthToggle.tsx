import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';

interface AuthToggleProps {
  mode: 'login' | 'signup';
  onToggle: () => void;
  isRegistrationOpen: boolean;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ mode, onToggle, isRegistrationOpen }) => {
  const { t } = useTranslation('auth');

  if (!isRegistrationOpen && mode === 'login') {
    return (
      <p className="text-center text-slate-500 text-[10px] mt-8 uppercase font-bold tracking-widest">
        {t('toggle.registration_closed', 'Yangi mavsum qabul yopilgan. Faqat mavjud a\'zolar uchun.')}
      </p>
    );
  }

  if (!isRegistrationOpen) return null;

  return (
    <p className="text-center text-slate-400 text-xs md:text-sm mt-8">
      {mode === 'login' ? t('toggle.no_account', 'Hisobingiz yo\'qmi?') : t('toggle.have_account', 'Hisobingiz bormi?')}
      <button
        type="button"
        onClick={onToggle}
        className="ml-2 text-indigo-400 font-bold hover:text-indigo-300 hover:underline transition-colors"
      >
        {mode === 'login' ? t('toggle.signup', 'Ro\'yxatdan o\'tish') : t('toggle.login', 'Kirish')}
      </button>
    </p>
  );
};

export default AuthToggle;
