
import React from 'react';
import { FORTE_EVENTS } from '../../../constants.tsx';
import ScrollReveal from '../../ScrollReveal.tsx';
import SmartImage from '../../SmartImage.tsx';
import { ChevronRight, Calendar, Target, Users, ArrowUpRight } from 'lucide-react';

interface EventsPageMobileProps {
  isDark: boolean;
  navigate: (path: string) => void;
}

export const EventsPageMobile: React.FC<EventsPageMobileProps> = ({ isDark, navigate }) => {
  const textCyan = isDark ? 'text-cyan-500' : 'text-cyan-700';
  const cardBg = isDark ? 'bg-black' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-slate-200';

  return (
    <div className={`pb-24 pt-24 px-6 min-h-screen ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'} animate-fade-in`}>
      <ScrollReveal className="mb-12">
        <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 block ${textCyan}`}>Strategic Progression</span>
        <h1 className="text-5xl font-heading font-black uppercase italic tracking-tighter leading-[0.85]">
          The <br/><span className={textCyan}>Archive.</span>
        </h1>
        <div className={`w-16 h-1.5 mt-6 rounded-full ${isDark ? 'bg-cyan-500' : 'bg-cyan-600'}`} />
      </ScrollReveal>

      <div className="space-y-12">
        {FORTE_EVENTS.map((event, i) => (
          <ScrollReveal key={event.id} delay={i * 100}>
            <div 
              className={`rounded-[2.5rem] overflow-hidden border transition-all duration-300 relative group active:scale-[0.98] shadow-lg ${cardBg} ${borderColor}`}
              onClick={() => navigate(`/events/${event.id}`)}
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3]">
                <SmartImage src={event.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={event.name} />
                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black via-black/40 to-transparent' : 'from-slate-900/90 via-slate-900/20 to-transparent'}`} />
                
                {/* Year Badge */}
                <div className="absolute top-6 right-6">
                   <div className={`px-4 py-1.5 rounded-full backdrop-blur-md border ${isDark ? 'bg-black/30 border-white/20 text-white' : 'bg-white/90 border-white text-slate-900'}`}>
                      <span className="text-[10px] font-black tracking-widest">{event.year}</span>
                   </div>
                </div>

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 w-full p-8">
                   <h3 className="text-3xl font-heading font-black uppercase italic tracking-tight mb-2 text-white leading-none shadow-black drop-shadow-lg">
                      {event.name}
                   </h3>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-6 drop-shadow-md">
                      {event.tagline}
                   </p>
                   
                   {/* Metrics Row (Compact) */}
                   <div className="flex items-center gap-6 pt-6 border-t border-white/20">
                      <div className="flex flex-col">
                         <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-1">Reach</span>
                         <span className="text-lg font-heading font-black italic text-white">{event.metrics.reachLabel}</span>
                      </div>
                      <div className="w-px h-8 bg-white/20" />
                      <div className="flex flex-col">
                         <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-1">Members</span>
                         <span className="text-lg font-heading font-black italic text-white">{event.metrics.participants}</span>
                      </div>
                      
                      {/* Action Arrow */}
                      <div className={`ml-auto w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white text-slate-900 border-white'}`}>
                         <ArrowUpRight size={18} />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      
      <div className="mt-16 text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">End of Records</p>
      </div>
      <div className="h-20" />
    </div>
  );
};
