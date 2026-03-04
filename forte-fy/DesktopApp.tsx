import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NavSection, Demographics } from './types';
import { FORTE_EVENTS, HALL_OF_FAME, HERO_IMAGE_URL, COLLABORATIONS, AWARDS, PARTNER_LOGOS, SPONSORS, DEPARTMENT_LIST } from './constants';
import { jsPDF } from 'jspdf';
import { 
  Rocket, Users, Mail, Phone, 
  Quote, Menu, X, 
  Target, Laptop, GraduationCap,
  Activity as Pulse, Disc, Briefcase, Trophy,
  Shield, 
  Layers, Database,
  Linkedin, Facebook, Instagram, Download,
  Sun, Moon, ChevronRight, ArrowUpRight
} from 'lucide-react';

import ScrollReveal from './components/ScrollReveal';
import DepartmentCard from './components/DepartmentCard';
import DepartmentsView from './components/DepartmentsView';
import DepartmentDetailView from './components/DepartmentDetailView';

// Import New Pages
import { StoryPage } from './components/pages/StoryPage';
import { EventsPage } from './components/pages/EventsPage';
import { HallOfFamePage } from './components/pages/HallOfFamePage';
import { AlumniPage } from './components/pages/AlumniPage';
import { PanelPage } from './components/pages/PanelPage';
import { PCMenuMainPage } from './components/PCMenuMainPage';

// --- Utility Components ---

const CountUp: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { 
        if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Only animate once
        }
    }, { threshold: 0.1 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = timestamp - startTime.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutExpo)
      const ease = (x: number) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      
      setCount(Math.floor(ease(percentage) * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <span ref={elementRef}>{count.toLocaleString()}{suffix}</span>;
};

// --- INTERACTIVE ARCHIVE: COLLABORATIONS & AWARDS ---

const InteractiveArchive: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <section id={NavSection.Laurels} className={`relative py-16 md:py-36 overflow-hidden border-t transition-colors duration-500 ${isDark ? 'bg-zinc-950 border-white/5' : 'bg-slate-100 border-slate-300'}`}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(rgba(0,247,255,0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className={`absolute top-0 right-0 w-[800px] h-[800px] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none ${isDark ? 'bg-cyan-500/[0.03]' : 'bg-cyan-600/[0.05]'}`} />
      
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <ScrollReveal className="mb-12 md:mb-24 flex flex-col items-center">
           <div className={`inline-flex items-center gap-3 px-5 py-1.5 rounded-full mb-6 md:mb-8 border ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-300 shadow-sm'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#00f7ff] shadow-[0_0_8px_#00f7ff]' : 'bg-[#0066cc]'}`} />
              <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isDark ? 'text-zinc-400' : 'text-slate-700'}`}>Archival Records & Synthesis</span>
           </div>
           <h2 className={`text-3xl sm:text-4xl md:text-7xl font-heading font-bold tracking-tight uppercase leading-[1] text-center mb-6 md:mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Institutional <br/> <span className={isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}>Excellence.</span>
           </h2>
           <div className={`w-16 md:w-20 h-1 ${isDark ? 'bg-[#00f7ff]/30' : 'bg-[#0066cc]'}`} />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-7 relative">
             <div className="flex items-center gap-4 mb-8 md:mb-14">
                <Layers size={20} className={isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'} />
                <h3 className={`text-xl md:text-2xl font-heading font-bold uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Strategic Partnerships</h3>
             </div>
             <div className={`absolute left-[20px] md:left-[214px] top-28 bottom-12 w-px hidden sm:block ${isDark ? 'bg-white/5' : 'bg-slate-300'}`} />
             <div className="space-y-8 md:space-y-16">
                {COLLABORATIONS.map((collab, i) => (
                  <ScrollReveal key={i} delay={i * 80} className="group relative flex flex-col md:flex-row items-start">
                    <div className="md:w-[190px] md:pr-12 md:text-right mb-2 md:mb-0 pt-1">
                       <span className={`text-[11px] font-mono uppercase font-bold tracking-wider block mb-1 ${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}`}>
                          {collab.date}
                       </span>
                       <h4 className={`text-sm md:text-base font-bold uppercase tracking-tight transition-colors ${isDark ? 'text-zinc-300 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'}`}>
                          {collab.name}
                       </h4>
                    </div>
                    <div className="relative z-20 shrink-0 md:mt-2.5 hidden sm:flex">
                       <div className={`w-10 h-10 md:w-11 md:h-11 rounded-full border flex items-center justify-center transition-all duration-500 ${isDark ? 'bg-zinc-900 border-white/10 group-hover:border-[#00f7ff]/50' : 'bg-white border-slate-300 group-hover:border-[#0066cc] shadow-md'}`}>
                          <div className={`w-2 h-2 rounded-full transition-colors ${isDark ? 'bg-zinc-700 group-hover:bg-[#00f7ff]' : 'bg-slate-400 group-hover:bg-[#0066cc]'}`} />
                       </div>
                    </div>
                    <div className="md:flex-1 md:pl-12 w-full">
                       <div className={`p-6 md:p-9 border rounded-2xl transition-all duration-500 shadow-sm ${isDark ? 'bg-white/[0.01] border-white/5 hover:bg-white/[0.02] group-hover:border-[#00f7ff]/20' : 'bg-white border-slate-200 hover:shadow-xl hover:border-[#0066cc]/30'}`}>
                          <h5 className={`text-sm md:text-xl font-heading font-bold leading-snug ${isDark ? 'text-zinc-400 group-hover:text-zinc-100' : 'text-slate-800 group-hover:text-black'}`}>
                             {collab.event}
                          </h5>
                          <div className="mt-4 md:mt-6 flex items-center gap-2">
                             <div className={`w-4 md:w-6 h-px ${isDark ? 'bg-[#00f7ff]/30' : 'bg-[#0066cc]/50'}`} />
                             <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-zinc-600' : 'text-slate-500'}`}>Verification ID: FP-0{i+1}</span>
                          </div>
                       </div>
                    </div>
                  </ScrollReveal>
                ))}
             </div>
          </div>

          <div className="lg:col-span-5">
             <div className="flex items-center gap-4 mb-8 md:mb-14">
                <Trophy size={20} className={isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'} />
                <h3 className={`text-xl md:text-2xl font-heading font-bold uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Merit Accomplishments</h3>
             </div>
             <div className="grid grid-cols-1 gap-5 md:gap-6">
                {AWARDS.map((award, i) => (
                  <ScrollReveal key={i} delay={(i + 2) * 100} className="group">
                    <div className={`p-6 md:p-8 border rounded-2xl transition-all duration-700 flex flex-col gap-5 md:gap-6 shadow-sm relative overflow-hidden ${isDark ? 'bg-white/[0.01] border-white/5 hover:border-[#00f7ff]/40' : 'bg-white border-slate-200 hover:shadow-xl hover:border-[#0066cc]/30'}`}>
                       <div className="flex items-start gap-4 md:gap-6 relative z-10">
                          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-500 ${isDark ? 'bg-white/[0.03] border-white/5 text-[#00f7ff] group-hover:bg-[#00f7ff] group-hover:text-black' : 'bg-slate-50 border-slate-200 text-[#0066cc] group-hover:bg-[#0066cc] group-hover:text-white'}`}>
                             <Trophy size={20} />
                          </div>
                          <div className="flex-1">
                             <h4 className={`text-base md:text-xl font-heading font-bold uppercase tracking-tight leading-tight ${isDark ? 'text-zinc-200 group-hover:text-white' : 'text-slate-800 group-hover:text-black'}`}>
                                {award.title}
                             </h4>
                             {award.subtitle && (
                               <p className={`text-[10px] font-bold uppercase tracking-wider mt-2 border-l-2 pl-3 md:pl-4 ${isDark ? 'text-zinc-500 border-[#00f7ff]/20' : 'text-slate-600 border-[#0066cc]/30'}`}>
                                  {award.subtitle}
                               </p>
                             )}
                          </div>
                       </div>
                       <div className={`flex justify-between items-center pt-5 md:pt-6 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                          <span className={`text-[9px] md:text-[10px] font-mono font-medium tracking-wider ${isDark ? 'text-zinc-700' : 'text-slate-500'}`}>AWD_REF_NO: {2023001 + i}</span>
                          <Shield size={14} className={`transition-colors ${isDark ? 'text-zinc-800 group-hover:text-[#00f7ff]/60' : 'text-slate-400 group-hover:text-[#0066cc]'}`} />
                       </div>
                    </div>
                  </ScrollReveal>
                ))}
             </div>
             <div className={`mt-8 md:mt-12 p-6 md:p-8 rounded-2xl border flex items-center justify-between group transition-all ${isDark ? 'border-white/5 bg-white/[0.01] hover:bg-white/[0.02]' : 'border-slate-300 bg-white hover:shadow-lg'}`}>
                <div className="flex items-center gap-4 md:gap-5">
                   <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-[#00f7ff]/5' : 'bg-[#0066cc]/10'}`}>
                      <Database size={16} className={isDark ? 'text-[#00f7ff]/60' : 'text-[#0066cc]'} />
                   </div>
                   <div className="flex flex-col">
                      <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-zinc-400' : 'text-slate-700'}`}>Historical Ledger</span>
                      <span className={`text-[8px] md:text-[9px] font-mono mt-1 uppercase ${isDark ? 'text-zinc-600' : 'text-slate-500'}`}>Synchronized Main-DB</span>
                   </div>
                </div>
                <div className="px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-1.5 md:gap-2">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                   <span className="text-[9px] md:text-[10px] font-mono font-bold text-green-600 uppercase">Online</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- DATA COMPARISON OVERLAY ---

interface ComparisonData {
  label: string;
  key: keyof Demographics | 'reach' | 'ambassadors' | 'participants';
  value: number;
  position: { x: number; y: number } | null;
}

const DataComparisonPopup: React.FC<{ data: ComparisonData | null; isDark: boolean }> = ({ data, isDark }) => {
  if (!data || !data.position) return null;
  const isNumeric = ['reach', 'ambassadors', 'participants'].includes(data.key);
  const popupWidth = 300;
  let leftPos = data.position.x - popupWidth / 2;
  let topPos = data.position.y - 350 - 20;
  if (leftPos < 20) leftPos = 20;
  if (leftPos + popupWidth > window.innerWidth - 20) leftPos = window.innerWidth - popupWidth - 20;
  if (topPos < 20) topPos = data.position.y + 20;

  return (
    <div 
      className={`fixed z-[100] w-[260px] md:w-[300px] p-6 rounded-[2rem] border animate-fade-in pointer-events-none hidden lg:block backdrop-blur-xl ${isDark ? 'bg-black/90 border-[#00f7ff]/30 shadow-[0_0_50px_rgba(0,247,255,0.2)]' : 'bg-white/95 border-slate-300 shadow-2xl text-slate-900'}`}
      style={{ left: `${leftPos}px`, top: `${topPos}px` }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Pulse className={isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'} size={12} />
        <span className={`text-[9px] font-black uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>Benchmark Data</span>
      </div>
      <h4 className={`text-lg font-heading font-black uppercase italic mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{data.label}</h4>
      <div className="space-y-4">
        {FORTE_EVENTS.map((event) => {
          let val = 0;
          if (['reach', 'ambassadors', 'participants'].includes(data.key)) {
            val = event.metrics[data.key as 'reach' | 'ambassadors' | 'participants'];
          } else {
            val = event.demographics[data.key as keyof Demographics] as number;
          }
          const isReach = data.key === 'reach';
          const displayVal = isNumeric ? (isReach ? (val / 1000).toFixed(0) + 'K' : val.toLocaleString()) : val + '%';
          const maxVal = isReach ? 200000 : (isNumeric ? 2000 : 100);
          const percentageWidth = Math.min((val / maxVal) * 100, 100);
          return (
            <div key={event.id} className="relative">
              <div className="flex justify-between items-end mb-1">
                <span className={`text-[9px] font-bold uppercase ${isDark ? 'text-zinc-500' : 'text-slate-600'}`}>{event.name}</span>
                <span className={`text-xs font-heading font-black italic ${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}`}>{displayVal}</span>
              </div>
              <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-200'}`}>
                <div className={`h-full ${isDark ? 'bg-[#00f7ff] shadow-[0_0_8px_#00f7ff]' : 'bg-[#0066cc]'}`} style={{ width: `${percentageWidth}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- NEURAL NEXUS: COMMAND CENTER ---

interface NeuralNexusCommandProps {
  onNav: (path: string) => void;
  onDownload: () => void;
  isDark: boolean;
}

const NeuralNexusCommand: React.FC<NeuralNexusCommandProps> = ({ onNav, onDownload, isDark }) => {
  const [selectedId, setSelectedId] = useState(FORTE_EVENTS[0].id);
  const [isUpdating, setIsUpdating] = useState(false);
  const [comparison, setComparison] = useState<ComparisonData | null>(null);
  const current = FORTE_EVENTS.find(e => e.id === selectedId) || FORTE_EVENTS[0];

  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 600);
    return () => clearTimeout(timer);
  }, [selectedId]);

  const handleMouseMove = (e: React.MouseEvent, label: string, key: any, value: number) => {
    if (window.innerWidth < 1024) return;
    setComparison({ label, key, value, position: { x: e.clientX, y: e.clientY } });
  };

  return (
    <div className={`w-full py-16 md:py-24 px-4 md:px-8 relative overflow-hidden min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${isDark ? 'bg-zinc-950' : 'bg-slate-100'}`}>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] md:h-[1200px] blur-[120px] md:blur-[200px] rounded-full pointer-events-none ${isDark ? 'bg-[#00f7ff]/5' : 'bg-blue-200/20'}`} />
      
      <div className="max-w-[1400px] mx-auto relative z-10 w-full">
        <div className="text-center mb-8 md:mb-16">
           <div className="flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-4">
              <div className={`w-6 md:w-12 h-px ${isDark ? 'bg-[#00f7ff]/40' : 'bg-[#0066cc]/40'}`} />
              <h2 className={`text-sm md:text-3xl font-black uppercase tracking-[0.4em] md:tracking-[1.2em] font-heading ${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}`}>Neural Nexus Command</h2>
              <div className={`w-6 md:w-12 h-px ${isDark ? 'bg-[#00f7ff]/40' : 'bg-[#0066cc]/40'}`} />
           </div>
           <p className={`text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] md:tracking-[0.8em] ${isDark ? 'text-zinc-600' : 'text-slate-600'}`}>Systematic Audience Synthesis</p>
        </div>

        {/* Scrollable Event Selector */}
        <div className={`flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap gap-2 md:gap-4 mb-8 md:mb-12 no-scrollbar p-1.5 md:p-2 rounded-[1.2rem] md:rounded-[2rem] border backdrop-blur-3xl shadow-xl snap-x ${isDark ? 'bg-black/20 border-white/5 shadow-black/50' : 'bg-white border-slate-300 shadow-slate-300/50'}`}>
          {FORTE_EVENTS.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedId(event.id)}
              className={`flex-none snap-start md:flex-1 min-w-[150px] md:min-w-[200px] px-5 py-3 md:px-8 md:py-6 rounded-lg md:rounded-2xl transition-all duration-700 relative overflow-hidden group border ${
                selectedId === event.id 
                ? (isDark ? 'bg-zinc-900 border-[#00f7ff]/60 text-white shadow-lg' : 'bg-[#0066cc] border-[#0066cc] text-white shadow-lg')
                : (isDark ? 'bg-transparent border-white/5 text-zinc-600 hover:border-white/20 hover:text-zinc-400' : 'bg-transparent border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-800')
              }`}
            >
              <div className="relative z-10 flex flex-col items-center">
                <span className="block text-sm sm:text-lg lg:text-2xl font-heading font-black uppercase italic tracking-tighter leading-none mb-1 md:mb-2 group-hover:scale-105 transition-transform">
                  {event.name}
                </span>
                <span className={`block text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] transition-colors ${selectedId === event.id ? (isDark ? 'text-[#00f7ff]' : 'text-blue-100') : 'text-inherit opacity-60'}`}>
                  {event.year}
                </span>
              </div>
              {selectedId === event.id && (
                <div className={`absolute bottom-0 left-0 h-[3px] w-full ${isDark ? 'bg-[#00f7ff]' : 'bg-white/50'}`} />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6 order-2 lg:order-1">
            <div 
              className={`rounded-[1.5rem] md:rounded-[2.5rem] border p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden group shadow-sm hover:shadow-xl cursor-help flex-1 min-h-[220px] transition-all duration-500 ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-slate-300'}`}
              onMouseMove={(e) => handleMouseMove(e, 'Total Resonance (Reach)', 'reach', current.metrics.reach)}
              onMouseLeave={() => setComparison(null)}
            >
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02]">
                 <div className={`w-[180px] md:w-[300px] h-[180px] md:h-[300px] border border-dashed rounded-full animate-spin-slow ${isDark ? 'border-[#00f7ff]' : 'border-slate-900'}`} />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.8em] mb-3 md:mb-6 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>Aggregate Impact</span>
                <h3 className={`text-4xl md:text-8xl font-heading font-black italic tracking-tighter leading-tight pb-2 mb-2 md:mb-4 transition-colors duration-1000 select-none ${isDark ? 'text-white group-hover:text-[#00f7ff]' : 'text-slate-900 group-hover:text-[#0066cc]'}`}>
                  <CountUp key={`reach-${selectedId}`} end={current.metrics.reach / 1000} suffix="K+" />
                </h3>
                <div className={`w-16 md:w-32 h-1 bg-gradient-to-r from-transparent via-current to-transparent mt-2 md:mt-4 ${isDark ? 'text-[#00f7ff]/30' : 'text-[#0066cc]/50'}`} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
               <div 
                 className={`rounded-[1.2rem] md:rounded-[2rem] border p-5 md:p-8 flex flex-col items-center justify-center text-center group transition-all cursor-help hover:shadow-lg ${isDark ? 'bg-zinc-900 border-white/10 hover:border-[#00f7ff]/30 hover:bg-zinc-800' : 'bg-white border-slate-300 hover:border-[#0066cc]/50'}`}
                 onMouseMove={(e) => handleMouseMove(e, 'Ambassadors', 'ambassadors', current.metrics.ambassadors)}
                 onMouseLeave={() => setComparison(null)}
               >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-4 transition-colors ${isDark ? 'bg-[#00f7ff]/5 text-[#00f7ff]/40 group-hover:text-[#00f7ff]' : 'bg-[#0066cc]/10 text-[#0066cc] group-hover:bg-[#0066cc] group-hover:text-white'}`}>
                    <Users size={20} />
                  </div>
                  <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2 ${isDark ? 'text-zinc-600 group-hover:text-zinc-400' : 'text-slate-500 group-hover:text-slate-700'}`}>Ambassadors</span>
                  <p className={`text-2xl md:text-4xl font-heading font-black italic pb-1 leading-tight transition-colors ${isDark ? 'text-white group-hover:text-[#00f7ff]' : 'text-slate-900 group-hover:text-[#0066cc]'}`}>
                    <CountUp key={`ambassadors-${selectedId}`} end={current.metrics.ambassadors} />
                  </p>
               </div>
               <div 
                 className={`rounded-[1.2rem] md:rounded-[2rem] border p-5 md:p-8 flex flex-col items-center justify-center text-center group transition-all cursor-help hover:shadow-lg ${isDark ? 'bg-zinc-900 border-white/10 hover:border-[#00f7ff]/30 hover:bg-zinc-800' : 'bg-white border-slate-300 hover:border-[#0066cc]/50'}`}
                 onMouseMove={(e) => handleMouseMove(e, 'Participants', 'participants', current.metrics.participants)}
                 onMouseLeave={() => setComparison(null)}
               >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-4 transition-colors ${isDark ? 'bg-[#00f7ff]/5 text-[#00f7ff]/40 group-hover:text-[#00f7ff]' : 'bg-[#0066cc]/10 text-[#0066cc] group-hover:bg-[#0066cc] group-hover:text-white'}`}>
                    <Target size={20} />
                  </div>
                  <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2 ${isDark ? 'text-zinc-600 group-hover:text-zinc-400' : 'text-slate-500 group-hover:text-slate-700'}`}>Participants</span>
                  <p className={`text-2xl md:text-4xl font-heading font-black italic pb-1 leading-tight transition-colors ${isDark ? 'text-white group-hover:text-[#00f7ff]' : 'text-slate-900 group-hover:text-[#0066cc]'}`}>
                    <CountUp key={`participants-${selectedId}`} end={current.metrics.participants} />
                  </p>
               </div>
            </div>
          </div>
          <div className={`lg:col-span-7 rounded-[1.5rem] md:rounded-[2.5rem] border p-6 md:p-12 shadow-sm hover:shadow-xl relative overflow-hidden flex flex-col h-full order-1 lg:order-2 transition-colors ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-slate-300'}`}>
            <div className="flex justify-between items-center mb-6 md:mb-10">
               <div className="flex items-center gap-3 md:gap-6">
                  <div className={`p-2.5 md:p-4 rounded-lg md:rounded-2xl border ${isDark ? 'bg-[#00f7ff]/5 border-[#00f7ff]/10 shadow-[0_0_20px_rgba(0,247,255,0.05)]' : 'bg-[#0066cc]/5 border-[#0066cc]/20'}`}>
                     <Pulse className={`animate-pulse w-4 h-4 md:w-6 md:h-6 ${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}`} />
                  </div>
                  <div>
                    <h4 className={`text-lg md:text-2xl font-heading font-black uppercase italic tracking-tight leading-none mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Demographic Scan</h4>
                    <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-zinc-600' : 'text-slate-500'}`}>Active System State</p>
                  </div>
               </div>
            </div>
            <div className="mb-6 md:mb-10">
              <div className={`flex justify-between items-center mb-4 md:mb-6 pb-2 md:pb-4 border-b ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                <span className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] ${isDark ? 'text-white' : 'text-slate-900'}`}>Geographic Dispersion</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 md:gap-x-12 gap-y-3 md:gap-y-6">
                {[
                  { label: 'Dhaka', key: 'geoDhaka' as keyof Demographics },
                  { label: 'Chattogram', key: 'geoChattogram' as keyof Demographics },
                  { label: 'Sylhet', key: 'geoSylhet' as keyof Demographics },
                  { label: 'Rajshahi', key: 'geoRajshahi' as keyof Demographics },
                  { label: 'Khulna', key: 'geoKhulna' as keyof Demographics }, 
                  { label: 'Barishal', key: 'geoBarishal' as keyof Demographics },
                  { label: 'Rangpur', key: 'geoRangpur' as keyof Demographics },
                  { label: 'Mymensingh', key: 'geoMymensingh' as keyof Demographics },
                ].map((div, i) => (
                  <div 
                    key={div.label} 
                    className="group cursor-help"
                    onMouseMove={(e) => handleMouseMove(e, `${div.label} Division`, div.key, current.demographics[div.key] as number)}
                    onMouseLeave={() => setComparison(null)}
                  >
                    <div className="flex justify-between items-end mb-1 md:mb-2">
                       <span className={`text-[8px] md:text-[11px] font-bold uppercase tracking-widest transition-colors truncate ${isDark ? 'text-zinc-600 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-900'}`}>{div.label}</span>
                       <span className={`text-sm md:text-xl font-heading font-black italic transition-colors ${isDark ? 'text-[#00f7ff]/60 group-hover:text-[#00f7ff]' : 'text-[#0066cc]/70 group-hover:text-[#0066cc]'}`}>
                          <CountUp key={`geo-${div.key}-${selectedId}`} end={current.demographics[div.key] as number} suffix="%" />
                       </span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-200'}`}>
                       <div className={`h-full transition-all duration-[1s] ease-out ${i === 0 ? (isDark ? 'bg-[#00f7ff] shadow-[0_0_12px_#00f7ff]' : 'bg-[#0066cc]') : 'bg-slate-400'}`} style={{ width: isUpdating ? '0%' : `${current.demographics[div.key]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6 md:mb-10">
              <div className={`flex justify-between items-center mb-4 md:mb-6 pb-2 md:pb-4 border-b ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                <span className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] ${isDark ? 'text-white' : 'text-slate-900'}`}>Academic Distribution</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
                {[
                  { label: 'School', key: 'eduSchool' as keyof Demographics, icon: <Disc size={8} /> },
                  { label: 'College', key: 'eduCollege' as keyof Demographics, icon: <Laptop size={8} /> },
                  { label: 'Undergrad', key: 'eduUndergrad' as keyof Demographics, icon: <GraduationCap size={8} /> },
                  { label: 'Postgrad', key: 'eduPostgrad' as keyof Demographics, icon: <Briefcase size={8} /> },
                ].map((edu, i) => (
                  <div 
                    key={edu.label} 
                    className={`p-2.5 md:p-4 rounded-lg md:rounded-2xl border group transition-all flex flex-col items-center cursor-help ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-[#00f7ff]/20' : 'bg-slate-50 border-slate-200 hover:shadow-md hover:border-[#0066cc]/30'}`}
                    onMouseMove={(e) => handleMouseMove(e, `${edu.label} Level`, edu.key, current.demographics[edu.key] as number)}
                    onMouseLeave={() => setComparison(null)}
                  >
                    <div className={`mb-1 md:mb-2 transition-colors ${isDark ? 'text-zinc-700 group-hover:text-[#00f7ff]' : 'text-slate-400 group-hover:text-[#0066cc]'}`}>{edu.icon}</div>
                    <span className={`text-[8px] md:text-[9px] font-black uppercase mb-0.5 md:mb-2 text-center tracking-widest ${isDark ? 'text-zinc-600' : 'text-slate-600'}`}>{edu.label}</span>
                    <p className={`text-lg md:text-2xl font-heading font-black italic transition-colors leading-none ${isDark ? 'text-white group-hover:text-[#00f7ff]' : 'text-slate-900 group-hover:text-[#0066cc]'}`}>
                      <CountUp key={`edu-${edu.key}-${selectedId}`} end={current.demographics[edu.key] as number} suffix="%" />
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`flex flex-col md:flex-row items-center gap-5 md:gap-8 pt-5 md:pt-8 border-t mt-auto ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
               <div className={`p-5 md:p-8 rounded-[1.2rem] md:rounded-[2rem] border flex flex-col items-center justify-center w-full md:w-auto md:min-w-[200px] shadow-sm relative group overflow-hidden ${isDark ? 'bg-zinc-800 border-white/10' : 'bg-slate-900 text-white border-slate-900'}`}>
                  <div className="text-center relative z-10">
                     <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-1 md:mb-2 ${isDark ? 'text-[#00f7ff]/60' : 'text-cyan-300'}`}>Target Cluster</p>
                     <p className="text-2xl md:text-4xl font-heading font-black italic text-white tracking-tighter leading-none">{current.demographics.ageRange}</p>
                  </div>
               </div>
               <div className="flex-1 text-center md:text-left">
                  <p className={`text-[11px] md:text-sm italic font-medium leading-relaxed mb-4 md:mb-0 ${isDark ? 'text-zinc-500' : 'text-slate-600'}`}>High resonance peak within the <span className={`${isDark ? 'text-white' : 'text-slate-900'} font-bold italic`}>{current.demographics.ageRange}</span> window.</p>
                  <button onClick={onDownload} className={`px-5 py-2.5 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 w-full sm:w-auto flex items-center justify-center gap-2 border ${isDark ? 'bg-white text-black border-transparent hover:bg-[#00f7ff]' : 'bg-white text-slate-900 border-slate-300 hover:bg-slate-100'}`}>Get Portfolio <Download size={14} /></button>
               </div>
            </div>
          </div>
        </div>
      </div>
      <DataComparisonPopup data={comparison} isDark={isDark} />
    </div>
  );
};

const DepartmentsSection: React.FC<{ navigate: (path: string) => void; isDark: boolean }> = ({ navigate, isDark }) => {
  return (
    <section id={NavSection.Architecture} className={`py-16 md:py-32 px-5 md:px-6 relative overflow-hidden border-t transition-colors duration-500 ${isDark ? 'bg-zinc-950 border-white/5' : 'bg-slate-100 border-slate-300'}`}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12 md:mb-24">
          <h2 className={`text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] mb-3 md:mb-4 ${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}`}>Architecture</h2>
          <h3 className={`text-3xl md:text-5xl font-heading font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Structural <span className={isDark ? 'text-white/40' : 'text-slate-400'}>Pillars</span></h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {DEPARTMENT_LIST.map((dept, i) => (
            <ScrollReveal key={i} delay={i * 100} className="h-full">
               <DepartmentCard dept={dept} navigate={navigate} isDark={isDark} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnersSection: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const partners = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section className={`py-16 md:py-32 overflow-hidden border-t relative transition-colors duration-500 ${isDark ? 'bg-zinc-950 border-white/5' : 'bg-white border-slate-300'}`}>
       <ScrollReveal className="text-center mb-16 md:mb-24">
          <h2 className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-2 md:mb-4 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>Ecosystem Network</h2>
          <h3 className={`text-2xl md:text-4xl font-heading font-bold uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Strategic Allies</h3>
       </ScrollReveal>
       
       <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 py-8 items-start">
             {partners.map((partner, i) => (
                <div key={i} className="flex flex-col items-center gap-6 md:gap-10 transition-all duration-700 group shrink-0">
                   <div className={`w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden border-2 p-3 md:p-6 transition-all duration-500 shadow-xl flex items-center justify-center ${isDark ? 'bg-zinc-900 border-white/20 shadow-cyan-500/10' : 'bg-slate-50 border-slate-200 shadow-slate-200'}`}>
                      <img src={partner.imageUrl} alt={partner.name} className="w-full h-full object-contain rounded-full brightness-110 contrast-110" />
                   </div>
                   <span className={`text-[12px] md:text-[15px] font-heading font-black uppercase tracking-[0.15em] text-center px-4 transition-colors whitespace-normal max-w-[140px] md:max-w-[240px] leading-tight ${isDark ? 'text-white group-hover:text-[#00f7ff]' : 'text-slate-900 group-hover:text-[#0066cc]'}`}>
                      {partner.name}
                   </span>
                </div>
             ))}
          </div>
       </div>

       <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .animate-marquee {
            display: flex;
            animation: marquee 80s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
       `}</style>
    </section>
  );
};

// --- VIEWS ---

const HomeView: React.FC<{ navigate: (path: string) => void; handleDownload: () => void; isDark: boolean }> = ({ navigate, handleDownload, isDark }) => {
  return (
    <>
      <section id={NavSection.Home} className="relative min-h-screen flex flex-col items-center justify-center pt-16 md:pt-20 px-5 overflow-hidden group/hero">
        <div className="absolute inset-0 z-0 overflow-hidden">
           <img src={HERO_IMAGE_URL} className={`w-full h-full object-cover object-center transition-all duration-[3000ms] group-hover/hero:scale-105 ${isDark ? 'grayscale brightness-[0.6]' : 'brightness-100'}`} alt="Hero Backdrop" />
           <div className={`absolute inset-0 bg-gradient-to-b transition-all duration-1000 ${isDark ? 'from-zinc-950 via-transparent to-zinc-950 opacity-60' : 'from-slate-100/80 via-slate-100/20 to-slate-100/80 opacity-100'}`} />
        </div>
        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
          <ScrollReveal>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2.5 glass rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mb-6 md:mb-10 ${isDark ? 'text-cyan-500 border-cyan-500/20 shadow-cyan' : 'text-slate-900 border-slate-400 bg-white/50 backdrop-blur-md shadow-lg'}`}>
              <span className={`w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-cyan-500' : 'bg-[#0066cc]'}`} /> For a Fortunate Future
            </div>
            
            <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-[10rem] font-heading font-black uppercase leading-[0.9] mb-6 md:mb-8 tracking-tighter w-full px-2 py-4">
              <span className={`italic ${isDark ? 'text-white' : 'text-slate-900'}`}>Manifest</span> <br />
              <span className={`italic ${isDark ? 'text-[#00f7ff] drop-shadow-sm' : 'text-[#0066cc]'}`}>Tomorrow.</span>
            </h1>
            
            <p className={`text-sm md:text-xl max-w-2xl mb-8 md:mb-12 leading-relaxed ${isDark ? 'font-light text-zinc-300' : 'font-medium text-slate-700'} px-2 mx-auto`}>Established May 26, 2022. We manufacture a generation of accomplished individuals through rigorous skill elevation.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3.5 md:gap-5 w-full max-w-xs sm:max-w-none mx-auto px-4">
              <button onClick={() => navigate('#history')} className={`px-7 py-3.5 md:px-10 md:py-5 font-black uppercase tracking-widest transition-all rounded-lg md:rounded-full flex items-center justify-center gap-2.5 md:gap-3 text-xs md:text-base group active:scale-95 shadow-xl min-w-[150px] ${isDark ? 'bg-[#00f7ff] hover:bg-white text-black' : 'bg-slate-900 text-white hover:bg-[#0066cc]'}`}>About Us <Rocket size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" /></button>
              
              <button 
                onClick={handleDownload} 
                className={`px-7 py-3.5 md:px-10 md:py-5 font-black uppercase tracking-widest transition-all rounded-lg md:rounded-full flex items-center justify-center gap-2.5 md:gap-3 text-xs md:text-base active:scale-95 min-w-[150px] ${isDark ? 'glass hover:bg-white/10 text-white border border-white/10' : 'bg-transparent border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'}`}
              >
                Portfolio PDF <Download size={18} className="shrink-0" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id={NavSection.History} className={`py-16 md:py-32 px-5 relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-white/[0.01] border-white/5' : 'bg-slate-100 border-slate-300'}`}>
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <ScrollReveal className="text-center mb-10 md:mb-24">
             <h2 className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] mb-3 md:mb-6 block ${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}`}>Vision-Action Convergence</h2>
             <h3 className={`text-3xl md:text-6xl font-heading font-black uppercase italic tracking-tighter leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>The First Step</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
             <ScrollReveal className="text-center lg:text-left order-2 lg:order-1">
                <div className="space-y-6 md:space-y-10">
                   <div>
                      <h4 className={`text-2xl md:text-5xl font-heading font-black italic uppercase mb-4 md:mb-6 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>May 26, 2022. <br/><span className={isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}>The Initiation.</span></h4>
                      <div className={`space-y-4 md:space-y-5 text-sm md:text-lg lg:text-xl font-light leading-relaxed ${isDark ? 'text-zinc-500' : 'text-slate-600'}`}>
                        <p>Forte-FY began with a singular focus: bridging the gap between raw talent and professional execution. Founded in Dhaka, we established a sanctuary where learning is intentional.</p>
                        <p>We believe that youth empowerment requires more than recognition—it requires consistent investment in systemic skill-building. Our mission is to manufacture a generation of accomplished individuals through rigorous skill elevation.</p>
                      </div>
                   </div>
                   <div className={`border-l-4 pl-6 lg:pl-10 relative text-left ${isDark ? 'border-[#00f7ff]' : 'border-[#0066cc]'}`}>
                      <Quote className={`absolute -top-6 -left-4 w-10 h-10 md:w-12 md:h-12 ${isDark ? 'text-[#00f7ff]/10' : 'text-[#0066cc]/10'}`} />
                      <p className={`text-sm md:text-xl italic font-medium leading-relaxed ${isDark ? 'text-zinc-300' : 'text-slate-800'}`}>"We don't just build skills; we manufacture community and resilient character."</p>
                      <p className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] mt-4 md:mt-6 ${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}`}>— FOUNDERS' COLLECTIVE</p>
                   </div>
                </div>
             </ScrollReveal>
             <ScrollReveal className="relative flex justify-center w-full order-1 lg:order-2" delay={200}>
                <div className={`w-full max-w-[400px] lg:max-w-none aspect-square rounded-2xl md:rounded-[3rem] overflow-hidden relative group shadow-xl ${isDark ? 'glass border-white/5' : 'bg-white border-slate-200 shadow-2xl'}`}>
                   <img src="https://i.postimg.cc/Nf2dQJwn/IMG_7751.jpg" className={`w-full h-full object-cover transition-all duration-[1500ms] group-hover:grayscale-0 group-hover:brightness-100 ${isDark ? 'grayscale brightness-50' : 'grayscale-0 brightness-100'}`} alt="Founding moment" />
                   <div className="absolute inset-0 bg-[#00f7ff]/5 group-hover:opacity-0 transition-opacity" />
                </div>
             </ScrollReveal>
          </div>
        </div>
      </section>

      <section id={NavSection.Initiatives} className={`py-16 md:py-32 px-5 flex flex-col items-center transition-colors duration-500 ${isDark ? 'bg-white/[0.01]' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
          <ScrollReveal className="text-center mb-10 md:mb-24">
            <h2 className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] mb-3 md:mb-6 block ${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}`}>Strategic Progression</h2>
            <h3 className={`text-3xl md:text-6xl font-heading font-black uppercase italic tracking-tighter leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>The Archive</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 w-full">
            {FORTE_EVENTS.map((event, idx) => (
              <ScrollReveal key={event.id} className={`delay-${idx * 150}`}>
                <div className={`group relative rounded-xl md:rounded-[2.5rem] overflow-hidden transition-all duration-700 flex flex-col items-center shadow-sm hover:shadow-2xl hover:-translate-y-1.5 h-full ${isDark ? 'glass hover:border-[#00f7ff]/30' : 'bg-white border border-slate-300 hover:border-[#0066cc]/50 shadow-lg'}`}>
                  <div className="w-full aspect-[16/10] relative overflow-hidden bg-black">
                     <img src={event.image} className={`w-full h-full object-cover transition-all duration-[1000ms] group-hover:grayscale-0 group-hover:brightness-100 group-hover:blur-0 group-hover:scale-105 ${isDark ? 'grayscale brightness-50 blur-[0.5px]' : 'grayscale-0 brightness-100 blur-0'}`} alt={event.name} />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-6 md:p-10 flex flex-col items-center text-center flex-1">
                    <div className="mb-4 md:mb-6">
                      <h4 className={`font-black text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.4em] mb-1.5 md:mb-3 block ${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}`}>{event.tagline}</h4>
                      <h3 className={`text-xl md:text-3xl font-heading font-black uppercase italic tracking-tighter group-hover:text-cyan-400 transition-colors leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>{event.name}</h3>
                    </div>
                    <p className={`text-xs md:text-base font-light leading-relaxed mb-6 md:mb-8 max-w-xl ${isDark ? 'text-zinc-500' : 'text-slate-600'}`}>{event.description}</p>
                    <div className={`mt-auto w-8 md:w-10 h-1 group-hover:w-full transition-all duration-500 ${isDark ? 'bg-[#00f7ff]/20' : 'bg-[#0066cc]/20'}`} />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id={NavSection.Analysis} className="py-0 relative w-full overflow-hidden">
        <NeuralNexusCommand onNav={navigate} onDownload={handleDownload} isDark={isDark} />
      </section>

      <DepartmentsSection navigate={navigate} isDark={isDark} />

      <section id={NavSection.HallOfFame} className={`py-16 md:py-32 px-5 relative overflow-hidden border-t transition-colors duration-500 ${isDark ? 'border-white/5' : 'border-slate-300 bg-slate-100'}`}>
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <ScrollReveal className="text-center mb-10 md:mb-24">
            <h2 className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] mb-3 md:mb-6 block ${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}`}>Resonant Figures</h2>
            <h3 className={`text-3xl md:text-6xl font-heading font-black uppercase italic tracking-tighter leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>The Apex Circle</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 w-full">
             {HALL_OF_FAME.map((member, i) => (
               <ScrollReveal key={i} className={`delay-${i * 100}`}>
                 <div className="group relative flex flex-col items-center text-center h-full">
                   <div className={`w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden p-1 mb-4 md:mb-8 transition-all duration-700 shadow-lg active:scale-95 shrink-0 mx-auto ${isDark ? 'border border-white/5 group-hover:border-[#00f7ff]/50' : 'border border-slate-300 group-hover:border-[#0066cc]/50 bg-white shadow-xl'}`}>
                     <img src={member.image} className={`w-full h-full object-cover rounded-full group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ${isDark ? 'grayscale' : 'grayscale-0'}`} alt={member.name} />
                   </div>
                   <h4 className={`text-sm md:text-xl font-heading font-black uppercase mb-1 italic tracking-tight group-hover:text-cyan-500 transition-colors leading-tight px-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{member.name}</h4>
                   <p className={`font-black uppercase text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] mb-2 md:mb-6 leading-none ${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}`}>{member.role}</p>
                   <div className="max-w-[150px] md:max-w-[240px] flex-1 block mx-auto">
                     <Quote size={12} className={`mb-2 md:mb-3 mx-auto transition-colors ${isDark ? 'text-[#00f7ff]/10 group-hover:text-[#00f7ff]/40' : 'text-[#0066cc]/10 group-hover:text-[#0066cc]/40'}`} />
                     <p className={`text-[11px] md:text-sm font-medium leading-relaxed italic transition-colors ${isDark ? 'text-zinc-500 group-hover:text-zinc-300' : 'text-slate-500 group-hover:text-slate-800'}`}>"{member.impact}"</p>
                   </div>
                 </div>
               </ScrollReveal>
             ))}
          </div>
        </div>
      </section>

      <InteractiveArchive isDark={isDark} />

      {/* --- CORPORATE SPONSORS SECTION --- */}
      <section className={`py-16 md:py-32 px-5 relative overflow-hidden border-t transition-colors duration-500 ${isDark ? 'bg-zinc-950 border-[#00f7ff]/10' : 'bg-white border-slate-300'}`}>
        <div className="max-w-6xl mx-auto flex flex-col items-center w-full">
          <ScrollReveal className="text-center mb-12 md:mb-24">
            <h2 className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] mb-4 md:mb-6 ${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}`}>Global Synergy</h2>
            <h3 className={`text-3xl md:text-6xl font-heading font-black uppercase italic tracking-tighter leading-none mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Strategic <span className={isDark ? 'text-white/40' : 'text-slate-400'}>Sponsors</span></h3>
            <p className={`text-sm md:text-lg font-light leading-relaxed max-w-3xl mx-auto italic ${isDark ? 'text-zinc-500' : 'text-slate-600'}`}>Partnering with corporate leaders to deliver institutional excellence and youth empowerment.</p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-4xl">
            {SPONSORS.map((sponsor, i) => (
              <ScrollReveal key={i} delay={i * 200}>
                <div className={`group relative rounded-2xl md:rounded-[3rem] p-8 md:p-12 overflow-hidden border transition-all duration-700 shadow-xl flex flex-col items-center ${isDark ? 'glass border-white/5 hover:border-[#00f7ff]/40' : 'bg-slate-50 border-slate-200 hover:border-[#0066cc]/20 shadow-2xl'}`}>
                   <div className="h-24 md:h-36 w-full flex items-center justify-center mb-8 relative z-10 group-hover:scale-105 transition-transform duration-700">
                      <img src={sponsor.imageUrl} alt={sponsor.name} className="h-full w-auto object-contain drop-shadow-[0_0_20px_rgba(0,247,255,0.2)]" />
                   </div>
                   <div className="text-center relative z-10">
                      <h4 className={`text-xl md:text-3xl font-heading font-black uppercase italic transition-colors ${isDark ? 'text-white group-hover:text-[#00f7ff]' : 'text-slate-900 group-hover:text-[#0066cc]'}`}>{sponsor.name}</h4>
                      <p className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] mt-2 ${isDark ? 'text-zinc-600' : 'text-slate-500'}`}>Core Institutional Partner</p>
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-b from-[#00f7ff]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT & SOCIAL SECTION --- */}
      <section id={NavSection.Contact} className={`py-16 md:py-32 px-5 relative overflow-hidden border-t transition-colors duration-500 ${isDark ? 'bg-zinc-950 border-white/5' : 'bg-slate-100 border-slate-300'}`}>
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center w-full">
          <ScrollReveal>
            <h2 className={`text-4xl sm:text-6xl md:text-8xl font-heading font-black uppercase italic mb-12 md:mb-24 leading-[0.8] tracking-tighter text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>Connect <br /> <span className={`${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'} not-italic`}>Nexus.</span></h2>
          </ScrollReveal>

          <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center md:text-left">
              <ScrollReveal delay={100}>
                <h4 className={`text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8 ${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}`}>Direct Outreach</h4>
                <div className="flex flex-col gap-5 md:gap-6 items-center md:items-start">
                  <a href="mailto:fortefy.org@gmail.com" className={`group flex items-center gap-4 transition-colors ${isDark ? 'text-white hover:text-[#00f7ff]' : 'text-slate-800 hover:text-[#0066cc]'}`}>
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all shrink-0 ${isDark ? 'bg-white/5 border-white/10 group-hover:bg-[#00f7ff] group-hover:text-black' : 'bg-white border-slate-300 group-hover:bg-[#0066cc] group-hover:text-white shadow-sm'}`}>
                      <Mail size={16} />
                    </div>
                    <span className="text-[12px] md:text-sm font-bold uppercase tracking-widest truncate max-w-[200px] sm:max-w-none">fortefy.org@gmail.com</span>
                  </a>
                  <a href="tel:01974362254" className={`group flex items-center gap-4 transition-colors ${isDark ? 'text-white hover:text-[#00f7ff]' : 'text-slate-800 hover:text-[#0066cc]'}`}>
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all shrink-0 ${isDark ? 'bg-white/5 border-white/10 group-hover:bg-[#00f7ff] group-hover:text-black' : 'bg-white border-slate-300 group-hover:bg-[#0066cc] group-hover:text-white shadow-sm'}`}>
                      <Phone size={16} />
                    </div>
                    <span className="text-[12px] md:text-sm font-bold uppercase tracking-widest">+880 1974 362254</span>
                  </a>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <h4 className={`text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8 ${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}`}>Digital Footprint</h4>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-5">
                   {[
                     { icon: <Linkedin size={18} />, label: 'LinkedIn', url: 'https://linkedin.com/company/fortefy' },
                     { icon: <Facebook size={18} />, label: 'Facebook', url: 'https://facebook.com/fortefy' },
                     { icon: <Instagram size={18} />, label: 'Instagram', url: 'https://instagram.com/fortefy' }
                   ].map((social, i) => (
                     <a key={i} href={social.url} target="_blank" rel="noreferrer" className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border flex items-center justify-center transition-all hover:scale-105 ${isDark ? 'bg-white/5 border-white/10 text-zinc-400 hover:text-black hover:bg-[#00f7ff]' : 'bg-white border-slate-300 text-slate-600 hover:text-white hover:bg-[#0066cc] shadow-md'}`} aria-label={social.label}>
                       {social.icon}
                     </a>
                   ))}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <h4 className={`text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8 ${isDark ? 'text-[#00f7ff]' : 'text-[#0066cc]'}`}>Action Array</h4>
                <button onClick={handleDownload} className={`w-full px-7 py-3.5 font-black uppercase tracking-widest rounded-lg transition-all shadow-xl flex items-center justify-center gap-2.5 text-xs md:text-sm active:scale-95 ${isDark ? 'bg-[#00f7ff] text-black hover:bg-white' : 'bg-slate-900 text-white hover:bg-[#0066cc]'}`}>
                  Get Portfolio PDF <Download size={16} />
                </button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      <PartnersSection isDark={isDark} />
    </>
  );
};

// --- Main App Component ---

const DesktopApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'departments' | 'detail' | 'story' | 'events' | 'hall-of-fame' | 'alumni' | 'panel'>('home');
  const [currentDeptId, setCurrentDeptId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Global Theme State with Persistence
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('forte_theme_preference');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('forte_theme_preference', JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (path: string) => {
    setIsMenuOpen(false);
    if (path.startsWith('/departments/')) {
      const id = path.split('/')[2];
      setCurrentDeptId(id);
      setCurrentView('detail');
      window.scrollTo(0, 0);
    } else if (path === '/departments') {
      setCurrentView('departments');
      window.scrollTo(0, 0);
    } else if (path === '/story') {
      setCurrentView('story');
      window.scrollTo(0, 0);
    } else if (path === '/events') {
      setCurrentView('events');
      window.scrollTo(0, 0);
    } else if (path === '/hall-of-fame') {
      setCurrentView('hall-of-fame');
      window.scrollTo(0, 0);
    } else if (path === '/alumni') {
      setCurrentView('alumni');
      window.scrollTo(0, 0);
    } else if (path === '/panel') {
      setCurrentView('panel');
      window.scrollTo(0, 0);
    } else if (path.startsWith('#')) {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
           const el = document.getElementById(path.substring(1));
           if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
         const el = document.getElementById(path.substring(1));
         if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setCurrentView('home');
      window.scrollTo(0, 0);
    }
  };

  const handleDownloadPortfolio = () => {
    const doc = new jsPDF();
    doc.text("Forte-FY Portfolio", 10, 10);
    doc.save("Forte-FY_Institutional_Portfolio.pdf");
  };

  const renderContent = () => {
    switch (currentView) {
      case 'departments': return <DepartmentsView navigate={navigate} />;
      case 'story': return <StoryPage isDark={isDark} />;
      case 'events': return <EventsPage isDark={isDark} setIsDark={setIsDark} navigate={navigate} />;
      case 'hall-of-fame': return <HallOfFamePage isDark={isDark} />;
      case 'alumni': return <AlumniPage isDark={isDark} />;
      case 'panel': return <PanelPage isDark={isDark} />;
      case 'detail':
        if (currentDeptId) {
          const dept = DEPARTMENT_LIST.find(d => d.id === currentDeptId);
          if (dept) return <DepartmentDetailView dept={dept} navigate={navigate} isDark={isDark} setIsDark={setIsDark} />;
        }
        return <HomeView navigate={navigate} handleDownload={handleDownloadPortfolio} isDark={isDark} />;
      default:
        return <HomeView navigate={navigate} handleDownload={handleDownloadPortfolio} isDark={isDark} />;
    }
  };

  const menuItems = [
    { label: "Home", path: "/", highlight: false },
    { label: "Legacy", path: "/story", highlight: true, sub: "Our Story" },
    { label: "Archive", path: "/events", highlight: false, sub: "The Events" },
    { label: "Apex Circle", path: "/hall-of-fame", highlight: false, sub: "Hall of Fame" },
    { label: "Alumni", path: "/alumni", highlight: false, sub: "Our Alumnus" },
    { label: "Leadership", path: "/panel", highlight: false, sub: "Current Panel" },
  ];

  return (
    <div className={`min-h-screen text-center selection:bg-[#00f7ff] w-full flex flex-col transition-colors duration-500 ${isDark ? 'bg-[#030303] text-white selection:text-black' : 'bg-slate-50 text-slate-900 selection:bg-[#0066cc] selection:text-white'}`}>
      
      {/* Global Nav */}
      {currentView !== 'detail' && (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 h-16 md:h-20 flex items-center px-4 md:px-0 ${scrolled ? (isDark ? 'bg-black/95 backdrop-blur-xl border-b border-[#00f7ff]/10' : 'bg-white/95 backdrop-blur-xl border-b border-slate-200') : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 lg:px-10 w-full flex justify-between items-center">
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => navigate('/')}>
              <div className={`w-8 h-8 md:w-10 md:h-10 border rounded-full flex items-center justify-center transition-transform group-hover:rotate-180 duration-1000 ${isDark ? 'border-[#00f7ff]/50' : 'border-slate-900'}`}>
                <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${isDark ? 'bg-[#00f7ff] shadow-[0_0_10px_#00f7ff]' : 'bg-slate-900'}`} />
              </div>
              <span className={`font-heading font-black text-sm md:text-xl tracking-tighter uppercase italic group-hover:text-[#00f7ff] transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Forte-FY</span>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-full transition-all ${isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'}`}>
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {/* Menu Trigger - Main Nav Button */}
              <button onClick={() => setIsMenuOpen(true)} className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border flex items-center gap-2 active:scale-95 ${isDark ? 'text-white border-white/20 hover:bg-white/10' : 'text-slate-900 border-slate-300 hover:bg-slate-100'}`}>
                 Menu <Menu size={14} />
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-4">
              <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-full transition-all ${isDark ? 'text-yellow-400' : 'text-slate-900'}`}>
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className={`p-2 z-50 rounded-full transition-colors ${isDark ? 'text-white active:bg-white/5' : 'text-slate-900 active:bg-slate-200'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-1 w-full">
        {renderContent()}
      </main>

      {/* Footer (Condensed for brevity in update, keeping existing logic) */}
      {currentView !== 'detail' && (
        <footer className={`py-12 md:py-16 px-5 relative flex flex-col items-center border-t transition-colors duration-500 ${isDark ? 'bg-black border-white/5' : 'bg-slate-100 border-slate-300'}`}>
          <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
            <div className="flex flex-col items-center gap-6 md:gap-8 group cursor-pointer" onClick={() => navigate('/')}>
              <div className={`w-10 h-10 md:w-12 md:h-12 border-2 rounded-full flex items-center justify-center p-1 group-hover:rotate-180 transition-transform duration-1000 ${isDark ? 'border-[#00f7ff]/50' : 'border-slate-900'}`}>
                <div className={`w-2 h-2 md:w-4 md:h-4 rounded-full animate-pulse ${isDark ? 'bg-[#00f7ff]' : 'bg-slate-900'}`} />
              </div>
              <div className="text-center">
                <p className={`font-heading font-black text-xl md:text-2xl uppercase italic tracking-tighter leading-none group-hover:text-[#00f7ff] transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Forte-FY</p>
                <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] mt-2 ${isDark ? 'text-zinc-700' : 'text-slate-500'}`}>Fortunate Future Initiative</p>
              </div>
            </div>
            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-8 items-center text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mt-10 text-center ${isDark ? 'text-zinc-800' : 'text-slate-500'}`}>
               <span>Est. May 26, 2022</span>
               <span className={`hidden sm:block w-1 h-1 rounded-full ${isDark ? 'bg-zinc-900' : 'bg-slate-400'}`} />
               <span>Dhaka, Bangladesh</span>
               <span className={`hidden sm:block w-1 h-1 rounded-full ${isDark ? 'bg-zinc-900' : 'bg-slate-400'}`} />
               <span>Systems Nominal</span>
               <span className={`hidden sm:block w-1 h-1 rounded-full ${isDark ? 'bg-zinc-900' : 'bg-slate-400'}`} />
               <Link to="/admin/login" className={`hover:text-cyan-500 transition-colors ${isDark ? 'text-zinc-800' : 'text-slate-500'}`}>Admin Access</Link>
            </div>
          </div>
        </footer>
      )}

      {/* UPDATED HAMBURGER MENU OVERLAY USING NEW COMPONENT */}
      {currentView !== 'detail' && isMenuOpen && (
        <PCMenuMainPage 
          isDark={isDark} 
          setIsDark={setIsDark} 
          setIsMenuOpen={setIsMenuOpen} 
          navigate={navigate} 
        />
      )}
    </div>
  );
};

export default DesktopApp;