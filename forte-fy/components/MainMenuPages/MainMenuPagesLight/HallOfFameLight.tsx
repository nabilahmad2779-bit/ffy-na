import React from 'react';

export const HallOfFameLight: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-heading font-black uppercase italic tracking-tighter">
          Hall of <span className="text-[#0066cc]">Fame</span>
        </h1>
      </div>
    </div>
  );
};
