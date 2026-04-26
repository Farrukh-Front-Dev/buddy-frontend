import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import GlassCard from '../../common/GlassCard/GlassCard';
import PrimaryButton from '../../common/PrimaryButton/PrimaryButton';
import Badge from '../../common/Badge/Badge';

interface CTASectionProps {
  onAuthNavigate: (mode: 'login' | 'signup') => void;
  isRegistrationOpen: boolean;
  user: any | null;
}

const CTASection: React.FC<CTASectionProps> = ({
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

  const benefits = [
    'Tajribali kuratorlar bilan o\'shing',
    'Jamoaviy qo\'llab-quvvatlash olish',
    'AI assistant bilan masalalarni hal qiling',
    'Haftalik maqsadlarni bajarilishini kuzating',
    'Boshqa o\'quvchilar bilan bog\'lanish',
    'Sertifikat va badge\'lar qo\'lga olish',
  ];

  return (
    <section
      id="cta-section"
      className="py-20 md:py-32 bg-gradient-to-b from-[#0a0a0c] to-[#1a1a2e] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-30" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Main CTA */}
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-6"
            variants={itemVariants}
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">
              Bugun Boshlang
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-white"
            variants={itemVariants}
          >
            Buddy-ga Qo'shiling va
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              O'z Potensialini Ochib Ber
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Mentorship, community va personal growth-ning eng yaxshi kombinatsiyasi.
            Bugun qo'shiling va o'zgarishni boshlang.
          </motion.p>

          {/* Benefits Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
            variants={containerVariants}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg hover:bg-white/10 transition-all"
                variants={itemVariants}
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300 font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Pricing Card */}
          <motion.div variants={itemVariants}>
            <GlassCard accent="indigo" className="p-8 mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <h3 className="text-3xl font-black text-white">Bepul</h3>
                <Badge status="active">Hech qanday kredit kartasi kerak emas</Badge>
              </div>
              <p className="text-slate-400 mb-6">
                Barcha xususiyatlardan to'liq foydalaning. Hech qanday to'lov yo'q.
              </p>
            </GlassCard>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
            ) : null}
          </motion.div>

          {/* Footer Note */}
          <motion.p
            className="mt-8 text-sm text-slate-500"
            variants={itemVariants}
          >
            Hech qanday kredit kartasi kerak emas. Bepul boshlang.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
