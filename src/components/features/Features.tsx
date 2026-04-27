
import React from 'react';
import { Zap } from 'lucide-react';
import { FEATURES } from '../../config/constants';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 md:py-32 bg-[#0a0a0c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 rounded-xl mb-6 border border-indigo-500/20">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] md:text-xs font-black text-indigo-300 uppercase tracking-widest">Nega aynan biz?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 md:mb-8 text-white tracking-tighter">
            Bizning <span className="bg-gradient-to-br from-[#60a5fa] to-[#a855f7] bg-clip-text text-transparent underline decoration-indigo-500/30 underline-offset-8">Ustunliklarimiz</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg font-medium">
            Jamoamiz har bir talaba bilan individual ishlash va sifatli natija ko'rsatishni asosiy maqsad deb biladi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="group p-8 md:p-10 bg-white/[0.03] backdrop-blur-[12px] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.07] hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-indigo-600/20 transition-all duration-500 text-indigo-400 ring-1 ring-white/10 group-hover:ring-indigo-500/30">
                  {React.cloneElement(feature.icon as React.ReactElement, { className: "w-7 h-7 md:w-8 md:h-8" })}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
