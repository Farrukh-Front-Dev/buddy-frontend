import React from 'react';
import imgArt from '/buddy_team.jpg';

interface NavbarLogoProps {
  onClick: () => void;
}

const NavbarLogo: React.FC<NavbarLogoProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className="flex items-center space-x-2 md:space-x-3 group cursor-pointer shrink-0">
      <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#1a1a1e] rounded-xl md:rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/10 overflow-hidden">
        <img
          src={imgArt}
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <span className="text-xl md:text-2xl font-black tracking-tighter text-white">Buddy<span className="text-purple-400">Team</span></span>
        <p className="text-[8px] md:text-[10px] text-purple-300 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] leading-none">Команды</p>
      </div>
    </div>
  );
};

export default NavbarLogo;
