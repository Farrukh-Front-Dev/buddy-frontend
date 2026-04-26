
import React from 'react';
import Hero from './Hero';
import { Page, UserData } from '../../types';
import { Shield, Users, Heart, Star, Zap, MessageSquare, ArrowRight, Lock } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (page: Page) => void;
  onAuthNavigate: (mode: 'login' | 'signup') => void;
  isRegistrationOpen?: boolean;
  user?: UserData | null;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onAuthNavigate, isRegistrationOpen = true, user }) => {
  return (
    <div className="bg-[#0a0a0c]">
      <Hero user={user} onNavigate={onNavigate} />

      {/* About Buddy Section */}
      <section className="py-16 md:py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-16 md:mb-24 lg:mb-32">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 bg-indigo-500/10 rounded-xl mb-6 border border-indigo-500/20">
                <Shield className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-[10px] md:text-xs font-black text-indigo-300 uppercase tracking-widest">Biz kimmiz?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black mb-5 md:mb-8 text-white leading-tight">
                Buddy — Bu shunchaki jamoa emas, <br className="hidden sm:block" />
                <span className="bg-gradient-to-br from-[#60a5fa] to-[#a855f7] bg-clip-text text-transparent">bu Oila.</span>
              </h2>
              <p className="text-sm md:text-lg text-slate-400 leading-relaxed mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0">
                Buddy Team 2025-yilda o'zaro ishonch va do'stlik poydevorida tashkil topgan. Bizning logotipimizdagi mushuk va kuchukcha tasviri tasodifiy emas — u qarama-qarshi xarakterlar ham bitta maqsad yo'lida do'st bo'la olishini anglatadi.
              </p>
              <div className="grid grid-cols-2 gap-3 md:gap-6 mb-7 md:mb-10 max-w-xs sm:max-w-sm mx-auto lg:mx-0">
                <div className="p-4 md:p-6 bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-2xl md:rounded-3xl border border-white/5 shadow-xl">
                  <h4 className="text-xl md:text-2xl font-black text-white mb-1">50+</h4>
                  <p className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest">Bitiruvchilar</p>
                </div>
                <div className="p-4 md:p-6 bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-2xl md:rounded-3xl border border-white/5 shadow-xl">
                  <h4 className="text-xl md:text-2xl font-black text-white mb-1">12</h4>
                  <p className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest">Barcha Kuratorlar</p>
                </div>
              </div>

              {isRegistrationOpen ? (
                <button
                  onClick={() => onAuthNavigate('signup')}
                  className="flex items-center justify-center lg:justify-start space-x-3 text-indigo-400 font-black hover:text-indigo-300 transition-colors group w-full lg:w-auto"
                >
                  <span>Hoziroq bizga qo'shiling</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              ) : (
                <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-500 font-bold italic">
                  <Lock className="w-4 h-4" />
                  <span>Mavsumga qabul yopilgan</span>
                </div>
              )}
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="aspect-square bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[30px] md:rounded-[60px] border border-white/5 shadow-2xl overflow-hidden p-3 md:p-4 relative group max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                <div className="absolute inset-0 bg-indigo-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200"
                  alt="Our Vision"
                  className="w-full h-full object-cover rounded-[20px] md:rounded-[50px] grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-24 md:h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 animate-pulse">
                    <Heart className="w-7 h-7 md:w-10 md:h-10 text-pink-500 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8 mb-16 md:mb-24 lg:mb-32">
            {[
              {
                title: "Bizning Missiya",
                desc: "Har bir insonga o'z potensialini topishda do'stona ko'mak berish.",
                icon: <Zap className="w-6 h-6 text-yellow-400" />
              },
              {
                title: "Do'stlik Ustuvor",
                desc: "Bizda usto-shogird emas, do'st-buddy munosabatlari rivojlangan.",
                icon: <Heart className="w-6 h-6 text-pink-400" />
              },
              {
                title: "Ochiq Muloqot",
                desc: "Har bir muammo birgalikda, AI va jamoaviy tahlil bilan hal etiladi.",
                icon: <MessageSquare className="w-6 h-6 text-blue-400" />
              }
            ].map((card, i) => (
              <div key={i} className="p-7 md:p-10 bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[28px] md:rounded-[40px] border border-white/5 shadow-xl hover:-translate-y-2 transition-all">
                <div className="w-11 h-11 md:w-14 md:h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-5 md:mb-8">
                  {card.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3">{card.title}</h3>
                <p className="text-sm md:text-base text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center p-6 sm:p-10 md:p-16 bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-3xl md:rounded-[60px] border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 -z-10"></div>
            <Zap className="w-9 h-9 md:w-12 md:h-12 text-purple-400 mx-auto mb-4 md:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 md:mb-6">Tayyormisiz?</h2>
            <p className="text-sm md:text-base text-slate-400 mb-7 md:mb-10 max-w-xl mx-auto font-medium">
              Bizning jamoa va kuratorlar ish rejasi bilan tanishish uchun bo'limlarga o'ting.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6">
              <button
                onClick={() => onNavigate('team')}
                className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-white text-[#0a0a0c] font-black rounded-xl md:rounded-2xl hover:scale-105 transition-transform text-xs md:text-sm active:scale-95"
              >
                Kuratorlarni Ko'rish
              </button>
              {isRegistrationOpen ? (
                <button
                  onClick={() => onAuthNavigate('signup')}
                  className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-xl md:rounded-2xl shadow-xl shadow-indigo-600/20 hover:scale-105 transition-transform text-xs md:text-sm active:scale-95"
                >
                  O'quvchi bo'lish
                </button>
              ) : (
                <button
                  onClick={() => onAuthNavigate('login')}
                  className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-white/5 text-slate-400 font-black rounded-xl md:rounded-2xl border border-white/5 transition-transform text-xs md:text-sm active:scale-95"
                >
                  Tizimga kirish
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
