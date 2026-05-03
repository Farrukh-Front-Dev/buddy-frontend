import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div 
      className="mb-6 p-4 bg-red-900/30 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300"
      style={{
        border: '2px solid rgb(239, 68, 68)',
        boxShadow: '3px 3px 0px 0px rgba(239, 68, 68, 0.5)',
      }}
    >
      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
      <p className="text-red-300 text-xs font-bold flex-1">{message}</p>
    </div>
  );
};

export default ErrorMessage;
