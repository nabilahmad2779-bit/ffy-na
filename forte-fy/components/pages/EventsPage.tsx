import React, { useState, useRef, useLayoutEffect } from 'react';
import { FORTE_EVENTS } from '../../constants';
import SmartImage from '../SmartImage';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';

// Import Individual Event Pages (Dark)
import { MosaicStories } from './event_pages/MosaicStories';
import { SpiritualQuest } from './event_pages/SpiritualQuest';
import { CosmicQuest } from './event_pages/CosmicQuest';
import { BrushFlash } from './event_pages/BrushFlash';

// Import Individual Event Pages (Light)
import { MosaicStoriesLight } from './event_pages_light/MosaicStoriesLight';
import { SpiritualQuestLight } from './event_pages_light/SpiritualQuestLight';
import { CosmicQuestLight } from './event_pages_light/CosmicQuestLight';
import { BrushFlashLight } from './event_pages_light/BrushFlashLight';

interface EventsPageProps {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  navigate: (path: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ isDark, setIsDark, navigate }) => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!selectedEventId) {
        const ctx = gsap.context(() => {
            gsap.fromTo(".archive-col", 
                { y: '100%', opacity: 0 },
                { y: '0%', opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
            );
            gsap.fromTo(".archive-header",
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
            );
        }, containerRef);
        return () => ctx.revert();
    }
  }, [selectedEventId]);

  if (selectedEventId === 'mosaic-stories') {
    return isDark ? 
      <MosaicStories isDark={isDark} setIsDark={setIsDark} onBack={() => setSelectedEventId(null)} /> : 
      <MosaicStoriesLight isDark={isDark} setIsDark={setIsDark} onBack={() => setSelectedEventId(null)} />;
  }
  
  if (selectedEventId === 'spiritual-quest') {
    return isDark ? 
      <SpiritualQuest isDark={isDark} setIsDark={setIsDark} onBack={() => setSelectedEventId(null)} /> : 
      <SpiritualQuestLight isDark={isDark} setIsDark={setIsDark} onBack={() => setSelectedEventId(null)} />;
  }
  
  if (selectedEventId === 'cosmic-quest') {
    return isDark ? 
      <CosmicQuest isDark={isDark} onBack={() => setSelectedEventId(null)} /> : 
      <CosmicQuestLight isDark={isDark} onBack={() => setSelectedEventId(null)} />;
  }
  
  if (selectedEventId === 'brush-flash') {
    return isDark ? 
      <BrushFlash isDark={isDark} onBack={() => setSelectedEventId(null)} /> : 
      <BrushFlashLight isDark={isDark} onBack={() => setSelectedEventId(null)} />;
  }

  const theme = {
    bg: isDark ? 'bg-[#050505]' : 'bg-[#f0f0f5]',
    text: isDark ? 'text-white' : 'text-slate-900',
    subText: isDark ? 'text-zinc-500' : 'text-slate-500',
    cardBorder: isDark ? 'border-white/10' : 'border-black/10',
  };

  return (
    <div ref={containerRef} className={`h-screen w-full overflow-hidden flex flex-col pt-24 pb-6 px-6 ${theme.bg} ${theme.text} transition-colors duration-700`}>
      
      {/* Minimal Header */}
      <header className="archive-header w-full mb-6 shrink-0">
        <div>
            <h1 className="text-xs font-black uppercase tracking-[0.4em] mb-1 opacity-50">Initiative Records</h1>
            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase italic tracking-tighter">The Archive</h2>
        </div>
      </header>

      {/* Flex Accordion - Expands on Hover */}
      <div className="flex-1 flex flex-col lg:flex-row gap-2 h-full w-full min-h-0">
        {FORTE_EVENTS.map((event, index) => (
            <div 
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className={`archive-col relative group h-full rounded-2xl overflow-hidden cursor-pointer border ${theme.cardBorder} flex-1 hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]`}
            >
                {/* Image Background */}
                <div className="absolute inset-0 bg-gray-900">
                    <SmartImage 
                        src={event.image} 
                        alt={event.name} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-700" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end items-start z-10">
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] w-full">
                        <div className="flex justify-between items-center mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-cyan-500/30">
                                {event.year}
                            </span>
                            <div className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                <ArrowUpRight className="text-white" size={16} />
                            </div>
                        </div>
                        
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black uppercase italic tracking-tighter text-white leading-[0.9] mb-3 drop-shadow-xl whitespace-nowrap overflow-hidden text-ellipsis">
                            {event.name}
                        </h3>
                        
                        <p className="text-xs md:text-sm font-medium text-zinc-300/90 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-2 max-w-lg">
                            {event.tagline}
                        </p>
                    </div>
                </div>

                {/* Vertical Text when collapsed (Desktop only) */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-100 group-hover:opacity-0 transition-opacity duration-500 hidden lg:block pointer-events-none">
                    <span className="writing-vertical-lr text-xs font-black uppercase tracking-[0.3em] text-white/50 whitespace-nowrap">
                        {event.name.split(' ')[0]}
                    </span>
                </div>

                {/* Hover Border Highlight */}
                <div className="absolute inset-0 border-2 border-cyan-500/0 group-hover:border-cyan-500/50 rounded-2xl transition-all duration-500 pointer-events-none" />
            </div>
        ))}
      </div>
      
      <style>{`
        .writing-vertical-lr {
            writing-mode: vertical-lr;
            transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
};