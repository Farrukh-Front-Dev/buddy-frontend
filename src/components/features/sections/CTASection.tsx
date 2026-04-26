import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useHomeStore } from '../../../store/homeStore';

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
  const { setActiveSection } = useHomeStore();

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('cta-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2) {
          setActiveSection('cta');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-30" />
        </div>
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

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            {isRegistrationOpen && !user ? (
              <>
                <button
                  onClick={() => onAuthNavigate('signup')}
                  className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 w-full sm:w-auto"
                >
                  <span>Hoziroq Qo'shiling</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onAuthNavigate('login')}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all duration-300 backdrop-blur-xl w-full sm:w-auto"
                >
                  Kirish
                </button>
              </>
            ) : user ? (
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                <span>Dashboardga O'tish</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
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
