
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, Moon, Sun, Rocket, Mail, 
  Linkedin, Facebook, Instagram, Trophy,
  Users, ChevronRight, ChevronLeft, Activity as Pulse, Quote, Zap, Plus, Info,
  MapPin, PieChart, Shield, Target, Smartphone, BarChart, Download, Sparkles,
  UserPlus, Grid, GraduationCap
} from 'lucide-react';
import { MobileMenuMainPage } from '../components/MobileMenuMainPage.tsx';
import { FORTE_EVENTS, HALL_OF_FAME, HERO_IMAGE_URL, COLLABORATIONS, AWARDS, DEPARTMENT_LIST, PARTNER_LOGOS } from '../constants.tsx';
import ScrollReveal from '../components/ScrollReveal.tsx';
import SmartImage from '../components/SmartImage.tsx';
import DepartmentDetailView from '../components/DepartmentDetailView.tsx';
import { KineticDepartmentCard } from '../components/KineticDepartmentCard.tsx';

// Import Event Detail Pages
import { MosaicStoriesMobile } from './pages/EventsForMobile/MosaicStories.tsx';
import { SpiritualQuestMobile } from './pages/EventsForMobile/SpiritualQuest.tsx';
import { CosmicQuestMobile } from './pages/EventsForMobile/CosmicQuest.tsx';
import { BrushFlashMobile } from './pages/EventsForMobile/BrushFlash.tsx';

// Import Main Menu Pages
import { EventsPageMobile } from '../components/MainMenuPages/MainMenuPagesMobile/EventsPageMobile.tsx';
import { StoryPageMobile } from '../components/MainMenuPages/MainMenuPagesMobile/StoryPageMobile.tsx';
import { AlumniPageMobile } from '../components/MainMenuPages/MainMenuPagesMobile/AlumniPageMobile.tsx';
import { PanelPage } from '../components/pages/PanelPage.tsx';
import { HallOfFamePageMobile } from '../components/MainMenuPages/MainMenuPagesMobile/HallOfFamePageMobile.tsx';
import { MobileDepartmentsView } from './pages/MobileDepartmentsView.tsx';

// Import Mobile Department Pages (Dark)
import { MobHRDepartment } from '../components/departments/Mobile_Departments/MobHRDepartment.tsx';
import { MobPRDepartment } from '../components/departments/Mobile_Departments/MobPRDepartment.tsx';
import { MobITDepartment } from '../components/departments/Mobile_Departments/MobITDepartment.tsx';
import { MobOpsDepartment } from '../components/departments/Mobile_Departments/MobOpsDepartment.tsx';
import { MobAcadDepartment } from '../components/departments/Mobile_Departments/MobAcadDepartment.tsx';

// Import Mobile Department Pages (Light)
import { MobHRDepartment_light } from '../components/departments/Mobile_Departments/Light_Mobile_Departments/MobHRDepartment_light.tsx';
import { MobPRDepartment_light } from '../components/departments/Mobile_Departments/Light_Mobile_Departments/MobPRDepartment_light.tsx';
import { MobITDepartment_light } from '../components/departments/Mobile_Departments/Light_Mobile_Departments/MobITDepartment_light.tsx';
import { MobOpsDepartment_light } from '../components/departments/Mobile_Departments/Light_Mobile_Departments/MobOpsDepartment_light.tsx';
import { MobAcadDepartment_light } from '../components/departments/Mobile_Departments/Light_Mobile_Departments/MobAcadDepartment_light.tsx';

// --- UTILITY: COUNT UP ---
const CountUp: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const animate = (currentTime: number) => {
             if (!startTime) startTime = currentTime;
             const progress = currentTime - startTime;
             const ease = (x: number): number => 1 - Math.pow(1 - x, 3);
             if (progress < duration) {
                setCount(Math.floor(end * ease(progress / duration)));
                requestAnimationFrame(animate);
             } else {
                setCount(end);
             }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

// --- UTILITY: ANIMATED BAR ---
const AnimatedBar: React.FC<{ percentage: number; colorClass: string; isVertical?: boolean }> = ({ percentage, colorClass, isVertical = false }) => {
  const [size, setSize] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setSize(percentage), 200);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percentage]);

  return (
    <div 
      ref={ref} 
      className={`rounded-full transition-all duration-1000 ease-out ${colorClass}`} 
      style={isVertical ? { height: `${size}%`, width: '100%' } : { width: `${size}%`, height: '100%' }} 
    />
  );
};

// --- ANALYTICS SECTION ---
const MobileNeuralNexus: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [index, setIndex] = useState(0);
  const current = FORTE_EVENTS[index];
  const next = () => setIndex((prev) => (prev + 1) % FORTE_EVENTS.length);
  const prev = () => setIndex((prev) => (prev - 1 + FORTE_EVENTS.length) % FORTE_EVENTS.length);

  // Dynamic colors for Light/Dark modes
  const accentText = isDark ? 'text-cyan-500' : 'text-cyan-700';
  const subText = isDark ? 'text-cyan-400' : 'text-cyan-600';
  const barColor = isDark ? 'bg-cyan-500' : 'bg-cyan-600';
  const containerBg = isDark ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200';

  // Get Top 3 Regions for Mobile Display
  const topRegions = [
    { label: 'Dhaka', val: current.demographics.geoDhaka },
    { label: 'Chattogram', val: current.demographics.geoChattogram },
    { label: 'Sylhet', val: current.demographics.geoSylhet },
  ].sort((a, b) => b.val - a.val);

  // Academic Breakdown
  const academics = [
    { l: 'School', v: current.demographics.eduSchool },
    { l: 'College', v: current.demographics.eduCollege },
    { l: 'Uni', v: current.demographics.eduUndergrad }
  ];

  return (
    <section className={`py-24 px-6 border-t ${isDark ? 'bg-[#030303] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
      <ScrollReveal className="text-center mb-12">
        <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 block ${accentText}`}>Intelligence Suite</span>
        <h2 className={`text-4xl font-heading font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>System <span className={accentText}>Analysis.</span></h2>
      </ScrollReveal>

      <div className={`relative p-6 rounded-[2.5rem] border shadow-2xl overflow-hidden transition-all duration-500 ${isDark ? 'bg-black border-white/10' : 'bg-white border-slate-300'}`}>
         {/* Navigation */}
         <div className="relative z-10 flex items-center justify-between mb-10">
            <button onClick={prev} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${isDark ? 'bg-white/5 text-cyan-500' : 'bg-slate-100 text-slate-800'}`}>
               <ChevronLeft size={24} />
            </button>
            <div className="text-center flex-1 px-2">
               <h3 className={`text-xl font-heading font-black uppercase italic tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>{current.name}</h3>
               <p className={`text-[9px] font-bold uppercase tracking-widest mt-2 ${subText}`}>{current.year} Sequence</p>
            </div>
            <button onClick={next} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${isDark ? 'bg-white/5 text-cyan-500' : 'bg-slate-100 text-slate-800'}`}>
               <ChevronRight size={24} />
            </button>
         </div>

         <div className="space-y-6">
            {/* Primary Grid: Reach, Members, Ambassadors, Age */}
            <div className="grid grid-cols-2 gap-3">
               <div className={`p-5 rounded-2xl border text-center ${containerBg}`}>
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-2 block">Reach</span>
                  <p className={`text-2xl font-heading font-black italic ${accentText}`}>
                     <CountUp end={current.metrics.reach / 1000} suffix="K+" />
                  </p>
               </div>
               <div className={`p-5 rounded-2xl border text-center ${containerBg}`}>
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-2 block">Members</span>
                  <p className={`text-2xl font-heading font-black italic ${isDark ? 'text-white' : 'text-slate-900'}`}>
                     <CountUp end={current.metrics.participants} />
                  </p>
               </div>
               <div className={`p-5 rounded-2xl border text-center ${containerBg}`}>
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-2 block">Ambassadors</span>
                  <p className={`text-2xl font-heading font-black italic ${isDark ? 'text-white' : 'text-slate-900'}`}>
                     <CountUp end={current.metrics.ambassadors} />
                  </p>
               </div>
               <div className={`p-5 rounded-2xl border text-center ${containerBg}`}>
                  <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-2 block">Avg Age</span>
                  <p className={`text-xl font-heading font-black italic ${accentText}`}>
                     {current.demographics.ageRange}
                  </p>
               </div>
            </div>

            {/* Geographic Breakdown */}
            <div className={`p-6 rounded-3xl border ${containerBg}`}>
                <div className="flex items-center gap-2 mb-5">
                    <MapPin size={16} className={isDark ? 'text-cyan-500' : 'text-cyan-700'} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Geographic Dispersion</span>
                </div>
                <div className="space-y-4">
                    {topRegions.map((geo, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-[10px] uppercase font-bold mb-1.5 opacity-70">
                                <span>{geo.label}</span>
                                <span>{geo.val}%</span>
                            </div>
                            <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}>
                                <AnimatedBar percentage={geo.val} colorClass={barColor} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Educational Stats */}
            <div className={`p-6 rounded-3xl border ${containerBg}`}>
                <div className="flex items-center gap-2 mb-6">
                    <GraduationCap size={16} className={isDark ? 'text-cyan-500' : 'text-cyan-700'} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Academic Distribution</span>
                </div>
                <div className="flex items-end justify-between h-32 gap-3 px-2">
                    {academics.map((edu, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full justify-end group">
                            <span className={`text-[10px] font-bold ${accentText}`}>{edu.v}%</span>
                            <div className={`w-full rounded-t-lg overflow-hidden relative ${isDark ? 'bg-white/10' : 'bg-slate-200'} h-full flex items-end`}>
                                <AnimatedBar percentage={edu.v} colorClass={barColor} isVertical={true} />
                            </div>
                            <span className="text-[8px] font-black uppercase tracking-wider opacity-50 mt-1">{edu.l}</span>
                        </div>
                    ))}
                </div>
            </div>
         </div>
      </div>
    </section>
  );
};

// --- APEX CIRCLE SECTION (CAROUSEL) ---
const MobileApexCircle: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const accentText = isDark ? 'text-cyan-500' : 'text-cyan-700';

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HALL_OF_FAME.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HALL_OF_FAME.length) % HALL_OF_FAME.length);
  };

  return (
    <section className={`py-24 px-6 border-t ${isDark ? 'bg-black border-white/5' : 'bg-white border-slate-200'}`}>
       <ScrollReveal className="text-center mb-12">
          <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 block ${accentText}`}>Honored Members</span>
          <h2 className={`text-4xl font-heading font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Apex <span className={accentText}>Circle.</span></h2>
       </ScrollReveal>
       
       <div className="relative">
          <div className="relative overflow-hidden min-h-[400px]">
             {HALL_OF_FAME.map((member, i) => (
                <div 
                  key={i}
                  className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform ${
                    i === currentIndex ? 'opacity-100 translate-x-0 scale-100 z-10' : 'opacity-0 translate-x-10 scale-95 z-0'
                  }`}
                >
                   <div className={`p-8 rounded-[2.5rem] border flex flex-col items-center text-center shadow-2xl ${isDark ? 'bg-zinc-900/50 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-cyan-500/30 p-1 mb-6 shadow-lg shadow-cyan-500/20">
                         <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" />
                      </div>
                      <h3 className={`text-2xl font-heading font-black uppercase italic mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{member.name}</h3>
                      <p className={`text-[10px] font-bold uppercase tracking-widest mb-6 px-3 py-1 rounded-full ${isDark ? 'text-cyan-500 bg-cyan-500/10' : 'text-cyan-700 bg-cyan-100'}`}>{member.role}</p>
                      <div className="relative">
                         <Quote size={20} className="text-cyan-500/20 absolute -top-4 -left-2" />
                         <p className={`text-base italic font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>"{member.impact}"</p>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

const MobileHome: React.FC<{ isDark: boolean; onNavigate: (view: string) => void }> = ({ isDark, onNavigate }) => {
  const textCyan = isDark ? 'text-cyan-500' : 'text-cyan-700';
  
  return (
    <div className="animate-fade-in relative z-10">
       
       {/* 1. HERO SECTION */}
       <section className="relative h-[100vh] w-full flex flex-col justify-end px-6 pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
               src={HERO_IMAGE_URL} 
               className={`w-full h-full object-cover transition-all duration-[3000ms] ${isDark ? 'brightness-[0.9]' : 'brightness-100'}`} 
               style={{ transform: 'scale(1.1)' }}
               alt="Hero" 
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black via-black/40 to-transparent' : 'from-slate-200 via-slate-100/50 to-transparent mix-blend-multiply opacity-80'}`} />
            <div className={`absolute top-0 left-0 w-full h-64 bg-gradient-to-b z-10 pointer-events-none ${isDark ? 'from-black/80 to-transparent' : 'from-slate-300/80 to-transparent'}`} />
            {!isDark && <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />}
          </div>

          <div className="relative z-10 w-full mt-auto">
            <ScrollReveal className="flex flex-col items-center text-center">
              <div className="mb-8">
                 <h1 className={`text-[17vw] font-heading font-black uppercase italic leading-[0.8] tracking-tighter drop-shadow-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                   Manifest <br/> <span className={`${textCyan} drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]`}>Tomorrow.</span>
                 </h1>
              </div>
              
              <p className={`text-base font-bold leading-relaxed max-w-[280px] mx-auto mb-12 drop-shadow-lg ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>
                We manufacture a generation of excellence through systemic skill elevation.
              </p>

              <div className="grid grid-cols-2 gap-4 w-full px-2">
                 <button 
                    onClick={() => { document.getElementById('first-steps')?.scrollIntoView({ behavior: 'smooth' }); }} 
                    className={`py-5 font-black uppercase tracking-widest text-[11px] rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-90 border backdrop-blur-md hover:scale-[1.02] shadow-lg ${isDark ? 'border-white/30 text-white bg-white/10 active:bg-white/20 active:border-cyan-500 shadow-cyan-500/20' : 'border-slate-400 text-slate-900 bg-white/90 shadow-slate-400/20'}`}
                 >
                   About Us <Rocket size={16} className="animate-pulse" />
                 </button>
                 <button 
                    onClick={() => window.open('https://forms.google.com', '_blank')} 
                    className={`py-5 bg-gradient-to-r text-white font-black uppercase tracking-widest text-[11px] rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-90 shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-white/20 hover:scale-[1.02] ${isDark ? 'from-cyan-500 to-blue-600' : 'from-cyan-600 to-blue-700'}`}
                 >
                   Join Us <UserPlus size={16} />
                 </button>
              </div>
            </ScrollReveal>
          </div>
       </section>

       {/* 2. HISTORY */}
       <section id="first-steps" className={`py-24 px-6 border-t ${isDark ? 'bg-[#050505] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
          <ScrollReveal>
             <h2 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-4 block ${textCyan}`}>Our Origin</h2>
             <h2 className={`text-4xl font-heading font-black uppercase italic tracking-tighter mb-10 ${isDark ? 'text-white' : 'text-slate-900'}`}>The Genesis.</h2>
             
             <div className="rounded-[3rem] mb-12 shadow-2xl border border-white/10 overflow-hidden aspect-square">
                <SmartImage src={HERO_IMAGE_URL} alt="Founding" className="w-full h-full" />
             </div>
             
             <div className={`relative pl-6 border-l-2 mb-10 ${isDark ? 'border-cyan-500' : 'border-cyan-600'}`}>
                <p className={`text-xl font-medium italic leading-relaxed ${isDark ? 'text-white' : 'text-slate-900'}`}>
                   "We don't just build skills; we manufacture community and resilient character."
                </p>
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-4 ${textCyan}`}>— Founders' Collective</p>
             </div>

             <div className={`space-y-6 text-lg font-light leading-relaxed text-justify ${isDark ? 'text-zinc-400' : 'text-slate-700'}`}>
                <p>Forte-FY began with a singular focus: bridging the gap between raw talent and professional execution.</p>
                <p>Founded in Dhaka, we established a sanctuary where learning is intentional, disciplined, and designed for global scalability.</p>
             </div>
          </ScrollReveal>
       </section>

       {/* 3. ARCHIVE */}
       <section className="py-24 px-6">
          <ScrollReveal className="text-center mb-16">
            <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 block ${textCyan}`}>Initiative Records</span>
            <h2 className={`text-4xl font-heading font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>The Archive</h2>
          </ScrollReveal>
          <div className="space-y-16">
             {FORTE_EVENTS.map((event, i) => (
               <ScrollReveal key={event.id} delay={i * 100}>
                 <div 
                   className={`rounded-[3rem] overflow-hidden border transition-all active:scale-[0.98] ${isDark ? 'bg-black border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}
                   onClick={() => onNavigate(`/events/${event.id}`)}
                 >
                    <div className="relative aspect-[16/10]">
                       <SmartImage src={event.image} alt={event.name} className="w-full h-full" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="p-10">
                       <h3 className={`text-3xl font-heading font-black uppercase italic tracking-tight mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>{event.name}</h3>
                       <button className={`w-full py-5 font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all group border shadow-lg relative overflow-hidden ${isDark ? 'bg-white/5 border-white/20 text-white' : 'bg-slate-100 text-slate-900 border-slate-200'}`}>
                          <span className="relative z-10">Learn More</span>
                          <ChevronRight size={18} className="text-cyan-500 group-hover:translate-x-1 transition-transform relative z-10" />
                       </button>
                    </div>
                 </div>
               </ScrollReveal>
             ))}
          </div>
       </section>

       <MobileNeuralNexus isDark={isDark} />

       {/* 5. PILLARS (UPDATED ORDER: IT IS WIDE) */}
       <section className={`py-24 px-5 border-y ${isDark ? 'bg-[#030303] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
          <ScrollReveal className="mb-14 text-center">
            <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 block ${textCyan}`}>Core Architecture</span>
            <h2 className={`text-4xl font-heading font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Structural <span className={textCyan}>Pillars.</span></h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 gap-4 perspective-1000">
             {/* HR - Small */}
             <KineticDepartmentCard dept={DEPARTMENT_LIST[0]} isWide={false} isDark={isDark} onClick={() => onNavigate(`/departments/${DEPARTMENT_LIST[0].id}`)} index={0} />
             {/* PR - Small */}
             <KineticDepartmentCard dept={DEPARTMENT_LIST[1]} isWide={false} isDark={isDark} onClick={() => onNavigate(`/departments/${DEPARTMENT_LIST[1].id}`)} index={1} />
             {/* IT - Wide (Moved from slot 4 to slot 3) */}
             <KineticDepartmentCard dept={DEPARTMENT_LIST[2]} isWide={true} isDark={isDark} onClick={() => onNavigate(`/departments/${DEPARTMENT_LIST[2].id}`)} index={2} />
             {/* Ops - Small */}
             <KineticDepartmentCard dept={DEPARTMENT_LIST[3]} isWide={false} isDark={isDark} onClick={() => onNavigate(`/departments/${DEPARTMENT_LIST[3].id}`)} index={3} />
             {/* Academics - Small (Moved from slot 3 to slot 5) */}
             <KineticDepartmentCard dept={DEPARTMENT_LIST[4]} isWide={false} isDark={isDark} onClick={() => onNavigate(`/departments/${DEPARTMENT_LIST[4].id}`)} index={4} />
          </div>
       </section>

       {/* 6. APEX CIRCLE */}
       <MobileApexCircle isDark={isDark} />

       {/* 7. PARTNERS */}
       <section className={`py-24 border-t ${isDark ? 'bg-black border-white/5' : 'bg-slate-50 border-slate-200'}`}>
          <ScrollReveal className="text-center mb-12">
             <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 block ${textCyan}`}>Institutional Network</span>
             <h2 className={`text-4xl font-heading font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Our <span className={textCyan}>Partners.</span></h2>
          </ScrollReveal>
          <div className="flex overflow-hidden relative group">
             <div className="flex animate-marquee-fast gap-8 px-6 py-4">
                {[...PARTNER_LOGOS, ...PARTNER_LOGOS].slice(0, 14).map((p, i) => (
                   <div key={i} className={`w-28 h-28 rounded-full border shrink-0 flex items-center justify-center p-6 transition-all duration-700 hover:scale-110 shadow-lg ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-slate-200'}`}>
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100" />
                   </div>
                ))}
             </div>
          </div>
       </section>

       <section className={`py-24 px-6 border-t ${isDark ? 'bg-black border-white/5' : 'bg-white border-slate-200'}`}>
          <h2 className={`text-4xl font-heading font-black uppercase italic tracking-tighter mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>Connect <br/><span className={textCyan}>Nexus.</span></h2>
          <div className="space-y-12">
             <a href="mailto:fortefy.org@gmail.com" className="flex items-center gap-6 group">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border ${isDark ? 'bg-white/5 border-white/10 text-cyan-500' : 'bg-slate-100 border-slate-200 text-blue-600 shadow-lg'}`}>
                   <Mail size={28} />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Direct Hub</span>
                   <span className="text-sm font-bold uppercase tracking-widest truncate max-w-[200px]">fortefy.org@gmail.com</span>
                </div>
             </a>
             <div className="flex gap-4">
                {[Linkedin, Facebook, Instagram].map((Icon, i) => (
                  <div key={i} className={`w-16 h-16 rounded-full border flex items-center justify-center active:scale-95 transition-all ${isDark ? 'bg-white/5 border-white/10 text-zinc-400' : 'bg-white border-slate-200 text-slate-600 shadow-lg'}`}>
                     <Icon size={26} />
                  </div>
                ))}
             </div>
             <div className="mt-8">
                <button 
                  onClick={() => onNavigate('/admin/login')}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity ${isDark ? 'text-white' : 'text-slate-900'}`}
                >
                  Admin Access
                </button>
             </div>
          </div>
       </section>
       <div className="h-12" />
       <style>{`
          @keyframes marquee-fast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee-fast { display: flex; animation: marquee-fast 20s linear infinite; width: max-content; }
       `}</style>
    </div>
  );
};

const MobileApp: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentDeptId, setCurrentDeptId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('forte_theme_preference');
    if (saved !== null) setIsDark(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('forte_theme_preference', JSON.stringify(isDark));
  }, [isDark]);

  const navigate = (path: string) => {
    setIsMenuOpen(false);
    window.scrollTo(0,0);

    if (path === '/') {
      setCurrentView('home');
    } else if (path.startsWith('/departments/')) {
      setCurrentDeptId(path.split('/')[2]);
      setCurrentView('department-detail');
    } else if (path === '/departments') {
      setCurrentView('departments');
    } else if (path.startsWith('/events/')) {
      setEventId(path.split('/')[2]);
      setCurrentView('event-detail');
    } else if (path === '/events') {
      setCurrentView('events');
    } else if (path === '/story') {
      setCurrentView('story');
    } else if (path === '/hall-of-fame') {
      setCurrentView('hall-of-fame');
    } else if (path === '/alumni') {
      setCurrentView('alumni');
    } else if (path === '/panel') {
      setCurrentView('panel');
    } else {
      setCurrentView('home');
    }
  };

  const renderDepartment = () => {
    if (!currentDeptId) return null;
    
    if (isDark) {
        switch (currentDeptId) {
            case 'hr': return <MobHRDepartment onBack={() => navigate('/departments')} />;
            case 'pr': return <MobPRDepartment onBack={() => navigate('/departments')} isDark={isDark} />;
            case 'it': return <MobITDepartment onBack={() => navigate('/departments')} isDark={isDark} />;
            case 'ops': return <MobOpsDepartment onBack={() => navigate('/departments')} isDark={isDark} />;
            case 'acad': return <MobAcadDepartment onBack={() => navigate('/departments')} />;
            default: return null;
        }
    } else {
        switch (currentDeptId) {
            case 'hr': return <MobHRDepartment_light onBack={() => navigate('/departments')} />;
            case 'pr': return <MobPRDepartment_light onBack={() => navigate('/departments')} />;
            case 'it': return <MobITDepartment_light onBack={() => navigate('/departments')} />;
            case 'ops': return <MobOpsDepartment_light onBack={() => navigate('/departments')} />;
            case 'acad': return <MobAcadDepartment_light onBack={() => navigate('/departments')} />;
            default: return null;
        }
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'} transition-colors duration-500`}>
        {/* Header restored */}
        <header className={`fixed top-0 left-0 w-full h-18 flex items-center justify-between px-6 z-[120] backdrop-blur-md border-b ${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-slate-200'}`}>
          <div className="flex items-center gap-3" onClick={() => navigate('/')}>
             <div className="w-8 h-8 rounded-full border border-cyan-500/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
             </div>
             <span className="font-heading font-black uppercase italic text-xl tracking-tighter">Forte-FY</span>
          </div>
          <div className="flex items-center gap-2">
             <button onClick={() => setIsDark(!isDark)} className={`p-3 rounded-full ${isDark ? 'bg-white/10 text-yellow-400' : 'bg-slate-100 text-slate-900 shadow-md'}`}>
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button onClick={() => setIsMenuOpen(true)} className={`p-3 rounded-full ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
                <Menu size={26} />
             </button>
          </div>
       </header>

        {isMenuOpen && <MobileMenuMainPage isDark={isDark} setIsDark={setIsDark} onClose={() => setIsMenuOpen(false)} navigate={navigate} />}
        
        <main className={`min-h-screen ${currentView === 'panel' ? '' : 'pt-20'}`}>
            {currentView === 'home' && <MobileHome isDark={isDark} onNavigate={navigate} />}
            {currentView === 'departments' && <MobileDepartmentsView isDark={isDark} navigate={navigate} />}
            {currentView === 'department-detail' && renderDepartment()}
            {currentView === 'events' && <EventsPageMobile isDark={isDark} navigate={navigate} />}
            {currentView === 'story' && <StoryPageMobile isDark={isDark} />}
            {currentView === 'hall-of-fame' && <HallOfFamePageMobile isDark={isDark} />}
            {currentView === 'alumni' && <AlumniPageMobile isDark={isDark} />}
            {currentView === 'panel' && <PanelPage isDark={isDark} />}
            {currentView === 'event-detail' && (
                <>
                    {eventId === 'mosaic-stories' && <MosaicStoriesMobile onBack={() => navigate('/events')} isDark={isDark} />}
                    {eventId === 'spiritual-quest' && <SpiritualQuestMobile onBack={() => navigate('/events')} isDark={isDark} />}
                    {eventId === 'cosmic-quest' && <CosmicQuestMobile onBack={() => navigate('/events')} isDark={isDark} />}
                    {eventId === 'brush-flash' && <BrushFlashMobile onBack={() => navigate('/events')} isDark={isDark} />}
                </>
            )}
        </main>
        <style>{` .h-18 { height: 4.5rem; } `}</style>
    </div>
  );
};

export default MobileApp;
