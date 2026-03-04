
import React from 'react';
import { ArrowLeft, Camera, Brush, MapPin, Users, Globe, Calendar } from 'lucide-react';
import ScrollReveal from '../../../components/ScrollReveal.tsx';

export const BrushFlashMobile: React.FC<{ onBack: () => void; isDark: boolean }> = ({ onBack, isDark }) => {
  return (
    <div className={`min-h-screen pb-24 ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'} animate-fade-in`}>
      <div className="relative h-[40vh]">
         <img src="https://i.postimg.cc/HxsSP9ZQ/472338910-602616829123761-2863321119488148611-n.jpg" className="w-full h-full object-cover" alt="Brush & Flash" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
         <button onClick={onBack} className="absolute top-8 left-6 p-3 rounded-full bg-black/50 backdrop-blur-xl text-white border border-white/10">
            <ArrowLeft size={20} />
         </button>
         <div className="absolute bottom-6 left-6">
            <h1 className="text-4xl font-heading font-black uppercase italic tracking-tighter text-white">Brush & Flash</h1>
            <p className="text-cyan-500 font-black uppercase tracking-widest text-[10px] mt-1">Art & Photography Exhibition</p>
         </div>
      </div>

      <div className="px-6 py-12 space-y-12">
         <ScrollReveal>
            <h2 className="text-xl font-heading font-black uppercase tracking-tight mb-4 flex items-center gap-2">
               <Brush size={18} className="text-cyan-500" /> Visual Canvas
            </h2>
            <p className="text-base font-light leading-relaxed opacity-70 italic">
               A seamless integration of art and photography, celebrating the artistic prowess of participants through a dynamic platform powered by Valiant 360°.
            </p>
         </ScrollReveal>

         <div className="grid grid-cols-2 gap-4">
            {[
               { label: 'Reach', value: '86K+', icon: Globe },
               { label: 'Ambassadors', value: '42', icon: Users },
               { label: 'Participants', value: '352', icon: MapPin },
               { label: 'Cycle', value: '2022', icon: Calendar },
            ].map((stat, i) => (
               <ScrollReveal key={i} delay={i * 50} className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                  <stat.icon size={16} className="text-cyan-500 mb-2" />
                  <p className="text-2xl font-heading font-black italic">{stat.value}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">{stat.label}</p>
               </ScrollReveal>
            ))}
         </div>
      </div>
    </div>
  );
};
