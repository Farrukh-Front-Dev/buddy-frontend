import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';

interface AuthHeaderProps {
  mode: 'login' | 'signup';
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ mode }) => {
  const { t } = useTranslation('auth');

  return (
    <div className="text-center mb-8 md:mb-10">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4 leading-tight">
        {mode === 'login' ? (
          <span className="text-white">{t('header.login_title', 'Xush kelibsiz!')}</span>
        ) : (
          <>
            <span className="text-white">{t('header.signup_title_1', 'Jamoaga ')}</span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {t('header.signup_title_2', "qo'shiling")}
            </span>
          </>
        )}
      </h2>
      <p className="text-slate-300 text-sm md:text-base font-medium">
        {mode === 'login' 
          ? t('header.login_subtitle', 'Buddy Team platformasiga qayting.') 
          : t('header.signup_subtitle', 'School21dagi username va parolni kiriting.')}
      </p>
    </div>
  );
};

export default AuthHeader;
