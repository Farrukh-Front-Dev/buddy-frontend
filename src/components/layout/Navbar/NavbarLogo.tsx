import React from 'react';
import imgArt from '/buddy_team.jpg';

interface NavbarLogoProps {
  onClick: () => void;
}

const NavbarLogo: React.FC<NavbarLogoProps> = ({ onClick }) => {
  const shadowColor = 'rgb(168, 85, 247)';
  const borderColor = 'rgb(79, 70, 229)';

  return (
    <div 
      onClick={onClick} 
      className="flex items-center gap-2 sm:gap-2.5 md:gap-3 group cursor-pointer shrink-0 transition-all duration-200 hover:translate-x-[1px] hover:translate-y-[1px]"
    >
      {/* Logo Container with 3D Shadow */}
      <div 
        className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center bg-slate-900 rounded-2xl overflow-hidden transition-all duration-200 shrink-0"
        style={{
          border: `2px solid ${borderColor}`,
          boxShadow: `2px 2px 0px 0px ${shadowColor}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `1px 1px 0px 0px ${shadowColor}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${shadowColor}`;
        }}
      >
        <img
          src={imgArt}
          alt="Buddy Team Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Logo Text - Visible on all screens */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-baseline gap-1">
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-tighter text-purple-400 leading-none">
            Buddy
          </span>
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-tighter text-indigo-400 leading-none">
            Team
          </span>
        </div>
        <p className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] text-purple-300 font-bold uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em] leading-none mt-0.5">
          System
        </p>
      </div>
    </div>
  );
};

export default NavbarLogo;
