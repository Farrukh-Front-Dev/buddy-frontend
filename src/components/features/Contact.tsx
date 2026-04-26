
import React from 'react';
import { Mail, Send, MessageCircle, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0a0a0c] relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-purple-600/10 rounded-full blur-[100px] md:blur-[150px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-600/10 rounded-full blur-[80px] md:blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/10 rounded-xl mb-6 border border-purple-500/20">
            <MessageCircle className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] md:text-xs font-black text-purple-300 uppercase tracking-widest">Bog'lanish</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 md:mb-8 text-white tracking-tighter leading-[0.9]">
            Savollaringiz <br />
            <span className="bg-gradient-to-br from-[#60a5fa] to-[#a855f7] bg-clip-text text-transparent italic">Bormi?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg font-medium leading-relaxed">
            Bizning jamoaga qo'shilish yoki hamkorlik qilish bo'yicha har qanday savollaringizni kutamiz. Har bir murojaat biz uchun muhim.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Contact Details Side */}
          <div className="lg:col-span-1 space-y-6">
            <div className="group p-8 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2rem] hover:bg-white/[0.07] hover:border-indigo-500/30 transition-all duration-500">
              <div className="w-14 h-14 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform ring-1 ring-white/10">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black text-white mb-2 tracking-tight">Elektron Pochta</h4>
              <p className="text-slate-400 font-bold group-hover:text-indigo-400 transition-colors">hello@buddyteam.uz</p>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-slate-400 transition-colors">
                24/7 Aloqada <ArrowRight className="w-3 h-3 ml-2" />
              </div>
            </div>

            <div className="group p-8 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2rem] hover:bg-white/[0.07] hover:border-purple-500/30 transition-all duration-500">
              <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform ring-1 ring-white/10">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black text-white mb-2 tracking-tight">Telegram Kanal</h4>
              <p className="text-slate-400 font-bold group-hover:text-purple-400 transition-colors">@buddyteam_official</p>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-slate-400 transition-colors">
                Jamoa Yangiliklari <ArrowRight className="w-3 h-3 ml-2" />
              </div>
            </div>
          </div>

          {/* Premium Contact Form */}
          <div className="lg:col-span-2">
            <div className="p-8 md:p-12 bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

              <form className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">To'liq Ismingiz</label>
                    <input
                      type="text"
                      className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500 focus:bg-white/[0.08] transition-all placeholder:text-slate-700 font-bold"
                      placeholder="Asadbek Aliyev"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">Email Manzilingiz</label>
                    <input
                      type="email"
                      className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.08] transition-all placeholder:text-slate-700 font-bold"
                      placeholder="example@buddy.uz"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">Xabaringiz Mazmuni</label>
                  <textarea
                    className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.08] transition-all h-48 resize-none placeholder:text-slate-700 font-bold"
                    placeholder="Qanday masalada yordam bera olamiz?"
                  ></textarea>
                </div>

                <button className="w-full py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black rounded-2xl shadow-[0_20px_40px_rgba(79,70,229,0.3)] flex items-center justify-center space-x-4 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group/btn overflow-hidden relative">
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                  <Send className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  <span className="relative z-10 text-xs md:text-sm tracking-widest uppercase">Xabar Yuborish</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
