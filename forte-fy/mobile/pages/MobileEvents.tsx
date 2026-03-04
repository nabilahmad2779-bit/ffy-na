
import React from 'react';

export const MobileEvents: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className={`pb-24 pt-24 px-6 animate-fade-in min-h-screen ${isDark ? 'text-white' : 'text-slate-900'}`}>
      <div className="mb-8">
        <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>Initiative Records</span>
        <h2 className="text-4xl font-heading font-black uppercase italic mt-2">The <span className="text-cyan-500">Archive</span></h2>
      </div>
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
        <p className="opacity-70 italic">Content for "The Events" will be designed here.</p>
      </div>
    </div>
  );
};
