
import React from 'react';
import ScrollReveal from '../../ScrollReveal.tsx';
import { Globe, Users } from 'lucide-react';

export const AlumniPageMobile: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className={`pb-24 pt-24 px-6 min-h-screen ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'} animate-fade-in`}>
      <ScrollReveal className="mb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 mb-2 block">Past Contributors</span>
        <h1 className="text-5xl font-heading font-black uppercase italic tracking-tighter leading-[0.85]">
          Alumni <br/><span className="text-cyan-500">Network.</span>
        </h1>
      </ScrollReveal>

      <div className={`p-8 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
        <Globe size={40} className="text-cyan-500 mb-6" />
        <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">Expanding the Nexus</h2>
        <p className="text-sm font-light leading-relaxed opacity-60">
          Our alumni network spans across continents, with former members leading in technology, arts, and corporate governance. This registry is being synchronized.
        </p>
      </div>
      <div className="h-20" />
    </div>
  );
};
