import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, MessageSquare, Zap } from 'lucide-react';

const AboutSection: React.FC = () => {

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

  const missionCards = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Bizning Missiya',
      description: 'Har bir insonga o\'z potensialini topishda do\'stona ko\'mak berish.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Do\'stlik Ustuvor',
      description: 'Bizda usto-shogird emas, do\'st-buddy munosabatlari rivojlangan.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Ochiq Muloqot',
      description: 'Har bir muammo birgalikda, AI va jamoaviy tahlil bilan hal etiladi.',
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <section
      id="about-section"
      className="py-20 md:py-32 bg-gradient-to-b from-[#0a0a0c] to-[#1a1a2e] relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl opacity-20" />
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
            className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-6"
            variants={itemVariants}
          >
            <Shield className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">
              Biz Kimmiz?
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-white"
            variants={itemVariants}
          >
            Buddy — Bu shunchaki jamoa emas,
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              bu Oila.
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Buddy Team 2025-yilda o'zaro ishonch va do'stlik poydevorida tashkil topgan.
            Bizning logotipimizdagi mushuk va kuchukcha tasviri tasodifiy emas — u
            qarama-qarshi xarakterlar ham bitta maqsad yo'lida do'st bo'la olishini anglatadi.
          </motion.p>
        </motion.div>

        {/* Mission Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {missionCards.map((card, index) => (
            <motion.div
              key={index}
              className="group p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2"
              variants={itemVariants}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} p-3 mb-6 text-white group-hover:scale-110 transition-transform`}
              >
                {card.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {[
            { label: 'Mavsum', value: '1' },
            { label: 'Kuratorlar', value: '12' },
            { label: 'O\'quvchilar', value: '50+' },
            { label: 'Muvaffaqiyat', value: '100%' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-center hover:border-white/20 transition-all"
              variants={itemVariants}
            >
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-slate-400 font-semibold uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
