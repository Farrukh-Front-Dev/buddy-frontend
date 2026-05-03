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
  const shadowColor = 'rgb(168, 85, 247)';
  const borderColor = 'rgb(79, 70, 229)';

  return (
    <div className="hidden lg:flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="fixed inset-0 z-40 cursor-default" 
              onClick={() => setIsOpen(false)}
            ></motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-3 bg-slate-900 hover:bg-slate-800 rounded-xl border-2 transition-all min-w-0 cursor-pointer"
          style={{
            borderColor: borderColor,
            boxShadow: `2px 2px 0px 0px ${shadowColor}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `1px 1px 0px 0px ${shadowColor}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${shadowColor}`;
          }}
        >
          {user.avatar ? (
            <img src={user.avatar} className="w-6 h-6 rounded-full object-cover border border-indigo-400 shrink-0" />
          ) : (
            <UserCircle className="w-6 h-6 text-indigo-400 shrink-0" />
          )}
          <div className="flex flex-col min-w-0 text-left">
            <span className="text-[12px] font-bold text-white leading-tight truncate max-w-[140px]">{user.name || 'User'}</span>
            <span className="text-[10px] font-black uppercase text-indigo-300 tracking-tighter truncate">{user.role}</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 text-indigo-400 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-3 w-[340px] bg-slate-900 rounded-2xl z-50 overflow-hidden flex flex-col"
              style={{
                border: `2px solid ${borderColor}`,
                boxShadow: `4px 4px 0px 0px ${shadowColor}`,
              }}
            >
              <div className="flex justify-end p-4 pb-0">
                <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col items-center px-6 pb-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center border-2 border-indigo-400 shadow-lg mb-4 relative overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-black text-white">{(user.name || 'U').charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <p className="text-[12px] text-slate-400 font-medium mb-1">{user.email}</p>
                <h3 className="text-lg font-black text-white tracking-tight mb-5">Assalomu alaykum, {(user.name || 'User').split(' ')[0]}!</h3>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onProfileClick();
                  }}
                  className="px-6 py-2.5 bg-slate-800 border-2 border-indigo-500 hover:bg-slate-700 transition-all rounded-xl text-indigo-300 font-bold text-[11px] uppercase tracking-widest"
                  style={{
                    boxShadow: `2px 2px 0px 0px ${shadowColor}`,
                  }}
                >
                  Akkauntni boshqarish
                </button>
              </div>

              <div className="h-px w-full bg-white/5"></div>

              <div className="py-2 px-4 flex flex-col gap-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onSettingsClick();
                  }}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <ShieldAlert className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition-colors shrink-0" />
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Tizim sozlamalari</span>
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onLogoutClick();
                  }}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-colors group"
                >
                  <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-500 transition-colors shrink-0" />
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
