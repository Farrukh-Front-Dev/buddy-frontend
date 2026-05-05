import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { UserData } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import imgCurator from '/curator.png';
import imgStudent from '/student.jpg';
import imgArt from '/buddy_team.jpg';

interface HeroProps {
  user?: UserData | null;
  onNavigate?: (page: any) => void;
}

const Hero: React.FC<HeroProps> = ({ user, onNavigate }) => {
  const { t } = useTranslation('home');
  
  const getHeroImage = () => {
    // Use local artwork instead of broken external link
    const defaultImg = imgArt;

    if (!user) return defaultImg;
    if (user.role === 'admin') return defaultImg;
    if (user.role === 'curator') return imgCurator;
    if (user.role === 'student') return imgStudent;
    return defaultImg;
  };
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-[#0a0a0c]">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[500px] md:w-[1000px] h-[250px] sm:h-[500px] md:h-[1000px] bg-purple-600/10 rounded-full blur-[60px] sm:blur-[100px] md:blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[150px] sm:w-[300px] md:w-[500px] h-[150px] sm:h-[300px] md:h-[500px] bg-indigo-600/10 rounded-full blur-[40px] sm:blur-[70px] md:blur-[100px] -z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 rounded-[10px] bg-white/5 border border-white/10 mb-6 md:mb-8 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400 shrink-0" />
              <span className="text-[9px] md:text-xs font-black text-purple-300 uppercase tracking-widest flex items-center gap-1.5 md:gap-2">{t('hero.badge')}</span>
            </div>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl font-black leading-[0.95] mb-6 md:mb-8 text-white tracking-tighter">
              {t('hero.title')} <br />
              <span className="bg-gradient-to-br from-[#60a5fa] to-[#a855f7] bg-clip-text text-transparent">{t('hero.subtitle')}</span>
            </h1>

            <p className="text-sm sm:text-base md:text-xl text-slate-400 mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) {
                    onNavigate('team');
                  } else {
                    document.querySelector('#team')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black rounded-[10px] flex items-center justify-center transition-all group shadow-2xl shadow-purple-600/40 hover:scale-105 active:scale-95"
              >
                {t('hero.cta_primary')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative mt-4 lg:mt-0 mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
            <div className="relative z-10 w-full aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-[10px] blur-[30px] md:blur-[60px]"></div>

              <div className="relative w-full max-w-[380px] sm:max-w-[450px] bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-[10px] shadow-2xl overflow-hidden flex flex-col items-center justify-center p-4 md:p-8">
                <div className="relative w-full h-full flex flex-col items-center justify-center space-y-4 md:space-y-8">
                  <div className="relative w-full bg-[#1a1a1e] rounded-[10px] p-1.5 md:p-2 border border-white/5 shadow-inner">
                    <img
                      src={getHeroImage()}
                      alt="Buddy System Art"
                      className="w-full h-auto rounded-[10px] shadow-2xl block mx-auto"
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-base sm:text-xl md:text-2xl lg:text-4xl font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white mb-1 md:mb-2">Baddy Guruhlar</p>
                    <div className="flex justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Zap key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 md:-top-10 md:-right-10 w-16 md:w-32 h-16 md:h-32 bg-indigo-500/20 rounded-full blur-2xl animate-bounce duration-[3s]"></div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-10 md:-left-10 w-16 md:w-32 h-16 md:h-32 bg-purple-500/20 rounded-full blur-2xl animate-bounce duration-[4s]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
