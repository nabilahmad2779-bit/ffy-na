
import React from 'react';
import ScrollReveal from '../ScrollReveal';
import { HallOfFameLight } from '../MainMenuPages/MainMenuPagesLight/HallOfFameLight';

export const HallOfFamePage: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  if (!isDark) {
    return <HallOfFameLight />;
  }

  return (
    <div className={`pt-32 pb-20 min-h-screen px-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span className={`text-xs font-black uppercase tracking-[0.3em] ${isDark ? 'text-cyan-500' : 'text-[#0066cc]'}`}>Honored Members</span>
          <h1 className="text-6xl md:text-8xl font-heading font-black uppercase italic tracking-tighter mt-4 mb-12">
            Apex <span className={isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600' : 'text-[#0066cc]'}>Circle</span>
          </h1>
          <div className={`p-12 rounded-[2.5rem] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
             <p className="text-xl font-light opacity-70 italic">
                Content for "Hall of Fame" will be designed here. Featuring the most impactful contributors.
             </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
