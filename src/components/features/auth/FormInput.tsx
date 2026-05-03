import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: LucideIcon;
  disabled?: boolean;
  rightElement?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onKeyDown,
  placeholder,
  icon: Icon,
  disabled = false,
  rightElement
}) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          className="w-full bg-slate-900 text-white py-3.5 md:py-4 pl-12 pr-12 text-sm md:text-base rounded-2xl focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            border: '2px solid rgb(79, 70, 229)',
            boxShadow: '3px 3px 0px 0px rgb(168, 85, 247)',
          }}
          placeholder={placeholder}
        />
        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInput;
