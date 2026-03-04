
import React from 'react';
import { HALL_OF_FAME } from '../../../constants.tsx';
import ScrollReveal from '../../ScrollReveal.tsx';
import { Quote } from 'lucide-react';

export const HallOfFamePageMobile: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className={`pb-24 pt-24 px-6 min-h-screen ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'} animate-fade-in`}>
      <ScrollReveal className="mb-16">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 mb-2 block">Honored Members</span>
        <h1 className="text-5xl font-heading font-black uppercase italic tracking-tighter leading-[0.85]">
          Apex <br/><span className="text-cyan-500">Circle.</span>
        </h1>
      </ScrollReveal>

      <div className="space-y-20">
        {HALL_OF_FAME.map((member, i) => (
          <ScrollReveal key={i} delay={i * 100} className="flex flex-col items-center text-center">
             <div className={`w-44 h-44 rounded-full overflow-hidden border-2 p-1.5 mb-8 ${isDark ? 'border-cyan-500/30' : 'border-blue-600/30 shadow-xl'}`}>
                <img src={member.image} className="w-full h-full object-cover rounded-full grayscale" alt={member.name} />
             </div>
             <h3 className="text-2xl font-heading font-black uppercase italic tracking-tight">{member.name}</h3>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 mb-6">{member.role}</p>
             <div className="relative px-4">
                <Quote size={20} className="mx-auto opacity-20 mb-4" />
                <p className={`text-base italic leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>"{member.impact}"</p>
             </div>
          </ScrollReveal>
        ))}
      </div>
      <div className="h-20" />
    </div>
  );
};
