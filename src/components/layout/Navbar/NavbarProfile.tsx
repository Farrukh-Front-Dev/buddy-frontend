import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle, ChevronDown, X, ShieldAlert, LogOut } from 'lucide-react';
import { UserData } from '../../../types';

interface NavbarProfileProps {
  user: UserData;
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onLogoutClick: () => void;
}

const NavbarProfile: React.FC<NavbarProfileProps> = ({ user, onProfileClick, onSettingsClick, onLogoutClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hidden lg:flex items-center space-x-4 ml-4 pl-4 border-l border-white/10">
      <div className="relative">
        {isOpen && (
          <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsOpen(false)}></div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors min-w-0 cursor-pointer"
        >
          {user.avatar ? (
            <img src={user.avatar} className="w-6 h-6 rounded-full object-cover" />
          ) : (
            <UserCircle className="w-5 h-5 text-purple-400 shrink-0" />
          )}
          <div className="flex flex-col min-w-0 text-left">
            <span className="text-[11px] font-bold text-white leading-tight truncate max-w-[120px]">{user.name || 'Foydalanuvchi'}</span>
            <span className="text-[9px] font-black uppercase text-purple-400 tracking-tighter truncate">{user.role}</span>
          </div>
          <ChevronDown className={`w-3 h-3 transition-transform duration-300 ml-1 ${isOpen ? 'text-white rotate-180' : 'text-slate-400'}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-4 w-[320px] md:w-[360px] bg-[#1a1c23] border border-white/10 rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.9)] z-50 overflow-hidden flex flex-col"
            >
              <div className="flex justify-end p-4 pb-0">
                <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col items-center px-6 pb-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-[#1a1c23] shadow-xl mb-4 relative overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-black text-white">{(user.name || 'U').charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <p className="text-[12px] text-slate-400 font-medium mb-1">{user.email}</p>
                <h3 className="text-xl font-black text-white tracking-tight mb-5">Assalomu alaykum, {(user.name || 'Foydalanuvchi').split(' ')[0]}!</h3>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onProfileClick();
                  }}
                  className="px-6 py-2.5 bg-transparent border border-white/20 hover:bg-white/5 transition-colors rounded-full text-indigo-400 font-bold text-[11px] uppercase tracking-widest shadow-sm"
                >
                  Akkauntni boshqarish
                </button>
              </div>

              <div className="h-px w-full bg-white/5"></div>

              <div className="py-2 px-4 flex flex-col gap-1 bg-[#15171e]">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onSettingsClick();
                  }}
                  className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/5 transition-colors group"
                >
                  <ShieldAlert className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition-colors" />
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Tizim sozlamalari</span>
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onLogoutClick();
                  }}
                  className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-red-500/10 transition-colors group"
                >
                  <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-500 transition-colors" />
                  <span className="text-sm font-bold text-red-400 group-hover:text-red-500 transition-colors">Tizimdan chiqish</span>
                </button>
              </div>

              <div className="h-px w-full bg-white/5"></div>

              <div className="py-5 px-6 flex justify-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-black/40">
                <a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a>
                <span className="text-slate-700">•</span>
                <a href="#" className="hover:text-white transition-colors">Qoidalar</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NavbarProfile;
