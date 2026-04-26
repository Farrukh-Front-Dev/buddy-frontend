import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Lock, Sparkles } from 'lucide-react';
import GlassCard from '../../common/GlassCard/GlassCard';
import PrimaryButton from '../../common/PrimaryButton/PrimaryButton';
import StatCard from '../../common/StatCard/StatCard';

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0c] via-[#1a1a2e] to-[#0a0a0c] pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl opacity-20"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-20"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl opacity-10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
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
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">
            Buddy Team 2025 - Mentorship Platform
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
          className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Buddy Team - bu o'quvchilar va kuratorlar orasidagi do'stlik va o'zaro rivojlanish platformasi. 
          Birgalikda o'rganamiz, birgalikda o'sishimiz. AI assistant, community support, va personal growth.
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <StatCard
              icon={<Zap className="w-6 h-6" />}
              label="Bitiruvchilar"
              value="50+"
              color="indigo"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              icon={<Sparkles className="w-6 h-6" />}
              label="Kuratorlar"
              value="12"
              color="purple"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              icon={<ArrowRight className="w-6 h-6" />}
              label="Mavsum"
              value="1"
              color="emerald"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              icon={<Sparkles className="w-6 h-6" />}
              label="Dedikatsiya"
              value="100%"
              color="rose"
            />
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          variants={itemVariants}
        >
          {isRegistrationOpen && !user ? (
            <>
              <PrimaryButton
                size="lg"
                color="indigo"
                icon={<ArrowRight className="w-5 h-5" />}
                onClick={() => onAuthNavigate('signup')}
              >
                Hoziroq Qo'shiling
              </PrimaryButton>

              <PrimaryButton
                size="lg"
                variant="outline"
                color="indigo"
                onClick={() => onAuthNavigate('login')}
              >
                Kirish
              </PrimaryButton>
            </>
          ) : user ? (
            <PrimaryButton
              size="lg"
              color="indigo"
              icon={<ArrowRight className="w-5 h-5" />}
              onClick={() => window.location.href = '/dashboard'}
            >
              Dashboardga O'tish
            </PrimaryButton>
          ) : (
            <div className="flex items-center space-x-2 text-slate-400 font-semibold">
              <Lock className="w-5 h-5" />
              <span>Mavsumga qabul yopilgan</span>
            </div>
          )}
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
          variants={containerVariants}
        >
          {[
            { icon: '🎯', title: 'Mentorship', desc: 'Tajribali kuratorlar bilan' },
            { icon: '👥', title: 'Community', desc: 'Jamoaviy qo\'llab-quvvatlash' },
            { icon: '🚀', title: 'Growth', desc: 'Personal development' },
          ].map((feature, i) => (
            <motion.div key={i} variants={itemVariants}>
              <GlassCard hover accent="indigo" className="p-4 text-center">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                <p className="text-xs text-slate-400">{feature.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
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
              <motion.div
                className="w-1 h-2 bg-slate-500 rounded-full"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
