
import React from 'react';
import { ArrowLeft, Moon, Star, MapPin, Users, Globe, Calendar } from 'lucide-react';
import ScrollReveal from '../../../components/ScrollReveal.tsx';

export const SpiritualQuestMobile: React.FC<{ onBack: () => void; isDark: boolean }> = ({ onBack, isDark }) => {
  return (
    <div className={`min-h-screen pb-24 ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'} animate-fade-in`}>
      <div className="relative h-[40vh]">
         <img src="https://i.postimg.cc/7YGqWgdQ/487141776-659246366835738-2625351654236584058-n.jpg" className="w-full h-full object-cover" alt="Spiritual Quest" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
         <button onClick={onBack} className="absolute top-8 left-6 p-3 rounded-full bg-black/50 backdrop-blur-xl text-white border border-white/10">
            <ArrowLeft size={20} />
         </button>
         <div className="absolute bottom-6 left-6">
            <h1 className="text-4xl font-heading font-black uppercase italic tracking-tighter text-white">Spiritual Quest</h1>
            <p className="text-cyan-500 font-black uppercase tracking-widest text-[10px] mt-1">Ramadan Path of Discovery</p>
         </div>
      </div>

      <div className="px-6 py-12 space-y-12">
         <ScrollReveal>
            <h2 className="text-xl font-heading font-black uppercase tracking-tight mb-4 flex items-center gap-2">
               <Moon size={18} className="text-cyan-500" /> Mission Intent
            </h2>
            <p className="text-base font-light leading-relaxed opacity-70 italic">
               "We believe that what you seek is seeking you." — Rumi. Dive into the beauty of Islamic teachings on a path of spiritual discovery and community resilience.
            </p>
         </ScrollReveal>

         <div className="grid grid-cols-2 gap-4">
            {[
               { label: 'Reach', value: '95K+', icon: Globe },
               { label: 'Ambassadors', value: '110', icon: Users },
               { label: 'Participants', value: '840', icon: MapPin },
               { label: 'Cycle', value: '2024', icon: Calendar },
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
