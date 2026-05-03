import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors mb-8 group px-4 py-2 rounded-xl bg-slate-900"
      style={{
        border: '2px solid rgb(79, 70, 229)',
        boxShadow: '3px 3px 0px 0px rgb(168, 85, 247)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '1px 1px 0px 0px rgb(168, 85, 247)';
        e.currentTarget.style.transform = 'translate(2px, 2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '3px 3px 0px 0px rgb(168, 85, 247)';
        e.currentTarget.style.transform = 'translate(0, 0)';
      }}
    >
      <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="font-bold">Asosiyga qaytish</span>
    </button>
  );
};

export default BackButton;
