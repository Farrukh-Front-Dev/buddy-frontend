import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'compact';
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  icon,
  className = "",
  variant = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between gap-3 bg-[#121214] border border-white/5 rounded-[10px] px-4 h-[52px] text-white font-bold uppercase text-[10px] tracking-widest outline-none transition-all hover:bg-white/5 hover:border-indigo-500/30 group w-full ${isOpen ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'shadow-xl'}`}
        >
          <div className="flex items-center gap-2">
            {icon && <div className="text-slate-500 group-hover:text-indigo-500 transition-colors">{icon}</div>}
            <span className="text-slate-300 group-hover:text-indigo-400 transition-colors truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 min-w-[180px] z-[100] bg-[#161618] border border-white/5 rounded-[10px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 transition-all border-b border-white/5 last:border-0 hover:bg-white/5 ${value === opt.value ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-400'}`}
                >
                  {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                  <span className="truncate">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-[#1a1a1e] border border-white/5 rounded-[10px] py-4 pl-14 pr-6 text-white text-sm outline-none transition-all hover:bg-white/5 hover:border-indigo-600 group ${isOpen ? 'border-indigo-600 shadow-lg shadow-indigo-600/10' : 'shadow-xl'}`}
      >
        <div className="flex items-center gap-3">
          {icon && <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-indigo-500 transition-colors">{icon}</div>}
          <span className={selectedOption ? "text-white" : "text-slate-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-[100] bg-[#161618] border border-white/5 rounded-[10px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-6 py-4 text-sm flex items-center gap-3 transition-all border-b border-white/5 last:border-0 hover:bg-white/5 ${value === opt.value ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-400'}`}
              >
                {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                <span className="truncate">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
