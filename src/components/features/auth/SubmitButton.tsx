import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

interface SubmitButtonProps {
  isLoading: boolean;
  role: 'student' | 'curator' | 'admin';
  mode: 'login' | 'signup';
  regStep?: number;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  isLoading, 
  role, 
  mode, 
  regStep = 1 
}) => {
  const { t } = useTranslation('auth');

  const getButtonText = () => {
    if (mode === 'login') return t('buttons.login', 'Kirish');
    if (regStep === 1) return t('buttons.next_step', 'Keyingi bosqich');
    return role === 'curator' ? t('buttons.send_request', "So'rov yuborish") : t('buttons.join', "Qo'shilish");
  };

  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full py-4 md:py-5 rounded-2xl text-white font-black transition-all hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] flex items-center justify-center space-x-2 mt-4 md:mt-6 disabled:opacity-70 disabled:cursor-not-allowed ${
        role === 'student' ? 'bg-indigo-600' : 'bg-purple-600'
      }`}
      style={{
        border: '2px solid rgb(79, 70, 229)',
        boxShadow: isLoading ? '2px 2px 0px 0px rgb(168, 85, 247)' : '4px 4px 0px 0px rgb(168, 85, 247)',
      }}
      onMouseEnter={(e) => {
        if (!isLoading) {
          e.currentTarget.style.boxShadow = '2px 2px 0px 0px rgb(168, 85, 247)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isLoading) {
          e.currentTarget.style.boxShadow = '4px 4px 0px 0px rgb(168, 85, 247)';
        }
      }}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          <span>{getButtonText()}</span>
          <ArrowRight className="w-5 h-5" />
        </>
      )}
    </button>
  );
};

export default SubmitButton;
