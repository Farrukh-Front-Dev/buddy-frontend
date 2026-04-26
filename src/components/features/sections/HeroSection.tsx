import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Lock } from 'lucide-react';
import { useHomeStore } from '../../../store/homeStore';

interface HeroSectionProps {
  onAuthNavigate: (mode: 'login' | 'signup') => void;
  isRegistrationOpen: boolean;
  user: any | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onAuthNavigate,
  isRegistrationOpen,
  user,
}) => {
  const { setActiveSection } = useHomeStore();

  useEffect(() => {
    setActiveSection('hero');
  }, [setActiveSection]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0c] via-[#1a1a2e] to-[#0a0a0c] pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-8"
          variants={itemVariants}
        >
          <Zap className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">
            Buddy Team 2025
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight"
          variants={itemVariants}
        >
          <span className="text-white">Mentorship va</span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            O'zaro Rivojlanish
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Buddy Team - bu o'quvchilar va kuratorlar orasidagi do'stlik va o'zaro
          rivojlanish platformasi. Birgalikda o'rganamiz, birgalikda o'sishimiz.
        </motion.p>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-12 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          <div className="p-4 md:p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
            <div className="text-2xl md:text-3xl font-black text-indigo-400 mb-1">
              50+
            </div>
            <div className="text-xs md:text-sm text-slate-400 font-semibold uppercase tracking-wider">
              Bitiruvchilar
            </div>
          </div>

          <div className="p-4 md:p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
            <div className="text-2xl md:text-3xl font-black text-emerald-400 mb-1">
              12
            </div>
            <div className="text-xs md:text-sm text-slate-400 font-semibold uppercase tracking-wider">
              Kuratorlar
            </div>
          </div>

          <div className="p-4 md:p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all col-span-2 md:col-span-1">
            <div className="text-2xl md:text-3xl font-black text-purple-400 mb-1">
              100%
            </div>
            <div className="text-xs md:text-sm text-slate-400 font-semibold uppercase tracking-wider">
              Dedikatsiya
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          {isRegistrationOpen && !user ? (
            <>
              <button
                onClick={() => onAuthNavigate('signup')}
                className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <span>Hoziroq Qo'shiling</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onAuthNavigate('login')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all duration-300 backdrop-blur-xl"
              >
                Kirish
              </button>
            </>
          ) : user ? (
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <span>Dashboardga O'tish</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="flex items-center space-x-2 text-slate-400 font-semibold">
              <Lock className="w-5 h-5" />
              <span>Mavsumga qabul yopilgan</span>
            </div>
          )}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
              Scroll
            </span>
            <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-slate-500 rounded-full animate-bounce" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
