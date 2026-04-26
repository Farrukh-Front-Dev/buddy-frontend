import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Target,
  Zap,
  MessageCircle,
  BarChart3,
  Award,
  Sparkles,
  Shield,
} from 'lucide-react';
import GlassCard from '../../common/GlassCard/GlassCard';
import PrimaryButton from '../../common/PrimaryButton/PrimaryButton';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Mentorship Program',
      description: 'Tajribali kuratorlar bilan birgalikda o\'shing va o\'rgan.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Goal Tracking',
      description: 'Haftalik maqsadlarni belgilang va ularni bajarilishini kuzating.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'AI Assistant',
      description: 'Gemini AI bilan masalalarni hal qiling va savollarga javob oling.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Community Chat',
      description: 'Jamoaviy chatda boshqa o\'quvchilar bilan muloqot qiling.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Progress Analytics',
      description: 'Sizning rivojlanishingizni grafiklarda ko\'ring va tahlil qiling.',
      color: 'from-rose-500 to-pink-500',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Achievements',
      description: 'Muvaffaqiyatlarni qo\'lga olish va badge\'lar yig\'ing.',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Weekly Highlights',
      description: 'Haftalik eng yaxshi momentlarni rasm va video bilan ulashing.',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Safe Environment',
      description: 'Xavfsiz va qabul qiluvchi muhitda o\'z-o\'zingizni ifodalang.',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="features-section"
      className="py-20 md:py-32 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0c] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-20"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20 mb-6"
            variants={itemVariants}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
              Xususiyatlar
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-white"
            variants={itemVariants}
          >
            Buddy-da Nima Bor?
          </motion.h2>

          <motion.p
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Mentorship, community va personal growth uchun barcha kerakli vositalar.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassCard hover className="p-6 h-full">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} p-2.5 mb-4 text-white flex items-center justify-center`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-slate-400 mb-6">
            Barcha bu xususiyatlardan foydalanish uchun Buddy-ga qo'shiling
          </p>
          <PrimaryButton
            size="lg"
            color="purple"
          >
            Batafsil O'rganish
          </PrimaryButton>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
