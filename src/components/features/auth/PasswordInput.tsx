import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  id?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ 
  value, 
  onChange, 
  disabled = false,
  id = 'password-input'
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation('auth');

  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">
        {t('form.password_label', 'Parol')}
      </label>
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          id={id}
          name="password"
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full bg-slate-900 text-white py-3.5 md:py-4 pl-12 pr-12 text-sm md:text-base rounded-2xl focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            border: '2px solid rgb(79, 70, 229)',
            boxShadow: '3px 3px 0px 0px rgb(168, 85, 247)',
          }}
          placeholder={t('form.password_placeholder', '••••••••')}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
