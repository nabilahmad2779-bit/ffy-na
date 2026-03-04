
import React from 'react';
import ScrollReveal from '../../ScrollReveal.tsx';
import { Shield, Users } from 'lucide-react';

export const PanelPageMobile: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className={`pb-24 pt-24 px-6 min-h-screen ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'} animate-fade-in`}>
      <ScrollReveal className="mb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 mb-2 block">Executive Board</span>
        <h1 className="text-5xl font-heading font-black uppercase italic tracking-tighter leading-[0.85]">
          Current <br/><span className="text-cyan-500">Leadership.</span>
        </h1>
      </ScrollReveal>

      <div className={`p-8 rounded-3xl border flex flex-col gap-6 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
             <Shield size={24} />
           </div>
           <div>
              <h3 className="text-lg font-bold uppercase tracking-tight">Executive Council</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-cyan-500">Authority Level 5</p>
           </div>
        </div>
        <p className="text-sm font-light leading-relaxed opacity-60">
          The central governing body responsible for institutional strategy, departmental oversight, and long-term vision execution.
        </p>
      </div>
      <div className="h-20" />
    </div>
  );
};
