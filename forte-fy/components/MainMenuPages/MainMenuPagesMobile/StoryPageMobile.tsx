
import React from 'react';
import { History, Target, Zap, Rocket, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import ScrollReveal from '../../ScrollReveal.tsx';

export const StoryPageMobile: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const bg = isDark ? 'bg-black' : 'bg-slate-50';
  const text = isDark ? 'text-white' : 'text-slate-900';
  const cardBg = isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm';

  return (
    <div className={`pb-24 pt-24 px-6 min-h-screen ${bg} ${text} animate-fade-in transition-colors duration-700`}>
      <ScrollReveal className="mb-16">
        <span className={`text-[10px] font-black uppercase tracking-[0.3em] opacity-50`}>Organization History</span>
        <h1 className="text-5xl font-heading font-black uppercase italic tracking-tighter mt-2 leading-[0.85]">
          Our <br/><span className="text-cyan-500">Legacy.</span>
        </h1>
        <div className="w-12 h-1.5 bg-cyan-500 mt-6 rounded-full" />
      </ScrollReveal>

      <div className="space-y-16">
        <ScrollReveal className="space-y-6">
           <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-cyan-500/10' : 'bg-blue-50'}`}>
                <Target className="text-cyan-500" size={24} />
              </div>
              <h2 className="text-2xl font-heading font-black uppercase italic tracking-tight">The Realization</h2>
           </div>
           <p className="text-lg leading-relaxed opacity-80 font-light">
              Forte-FY was founded on <span className="text-cyan-500 font-bold">25 May 2022</span> in Bangladesh with a clear realization: youth platforms were active, but few focused on long-term capability building.
           </p>
           <p className="text-sm leading-relaxed opacity-60">
              We believed youth deserved more than stages. <strong>They deserved systems.</strong> That belief became the engine of our growth.
           </p>
        </ScrollReveal>

        <ScrollReveal className="space-y-6">
           <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
                <History className="text-purple-500" size={24} />
              </div>
              <h2 className="text-2xl font-heading font-black uppercase italic tracking-tight">Where It Began</h2>
           </div>
           <div className={`p-8 rounded-3xl border ${cardBg}`}>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 mb-4">The Foundation Team</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Rayhan', 'Rahat', 'Adib', 'Tanjim', 'Salman'].map(name => (
                  <span key={name} className={`px-3 py-1 rounded-full text-[10px] font-bold border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                    {name}
                  </span>
                ))}
              </div>
              <p className="text-sm italic opacity-70">"What remained was belief. We rebuilt from the ground up."</p>
           </div>
        </ScrollReveal>
      </div>

      <div className="h-20" />
    </div>
  );
};
