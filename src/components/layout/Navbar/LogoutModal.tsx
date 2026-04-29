import React from 'react';
import { LogOut } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#0f0f12] border border-white/10 rounded-[2.5rem] p-10 max-w-sm w-full shadow-[0_50px_100px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-300 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <LogOut className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-2xl font-black text-white mb-2">Tizimdan chiqish</h3>
        <p className="text-slate-400 font-medium mb-10 leading-relaxed">Haqiqatan ham o'z profilingizdan chiqmoqchimisiz? Barcha saqlanmagan ma'lumotlar yo'qolishi mumkin.</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full py-5 bg-red-500 hover:bg-red-600 text-white font-black rounded-3xl transition-all shadow-lg shadow-red-500/20 active:scale-95"
          >
            HA, CHIQISH
          </button>
          <button
            onClick={onCancel}
            className="w-full py-5 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-3xl transition-all active:scale-95"
          >
            BEKOR QILISH
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
