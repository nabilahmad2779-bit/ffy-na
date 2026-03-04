
import React, { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react';
import { 
  Globe, Megaphone, MessageSquare, Users,
  Share2, ArrowUpRight, Mic2, Radio, Zap, Volume2, Pause, Play
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRHeader, PRFooter } from '../../code/PRHeaderFooter';

gsap.registerPlugin(ScrollTrigger);

interface DepartmentProps {
  dept: any;
  navigate: (path: string) => void;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

// --- HOOK: Scroll Active Detection ---
const useCenterTrigger = () => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      
      // Active if the element's center is within 25% of the viewport center
      const distance = Math.abs(viewportCenter - elementCenter);
      setIsActive(distance < windowHeight * 0.25);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, isActive };
};

// --- COMPONENT: Scroll Triggered CountUp ---
const ScrollTriggeredCountUp: React.FC<{ end: number; suffix?: string; start: boolean }> = ({ end, suffix = "", start }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (start && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
         if (!startTime) startTime = currentTime;
         const progress = currentTime - startTime;
         const duration = 2000;
         const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
         
         if (progress < duration) {
            setCount(Math.floor(end * easeOutQuart(progress / duration)));
            requestAnimationFrame(animate);
         } else {
            setCount(end);
         }
      };
      requestAnimationFrame(animate);
    }
  }, [start, end, hasAnimated]);

  return <span>{count}{suffix}</span>;
};

// --- COMPONENT: Scroll Aware Spokesperson Image ---
const ScrollAwarePRImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [filterStyle, setFilterStyle] = useState('grayscale(100%)');

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      
      const distance = Math.abs(viewportCenter - elementCenter);
      const range = viewportHeight * 0.35; 

      let grayscaleVal = 100;
      if (distance < range) {
        grayscaleVal = (distance / range) * 100;
      }
      
      setFilterStyle(`grayscale(${grayscaleVal}%)`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <img 
      ref={imgRef}
      src={src} 
      alt={alt} 
      className={`${className} hover:grayscale-0 transition-all duration-300`} 
      style={{ filter: filterStyle }} 
    />
  );
};

// --- UTILITY COMPONENTS ---

// 1. SCRAMBLE TEXT EFFECT
const ScrambleText: React.FC<{ text: string; className?: string; hoverTrigger?: boolean }> = ({ text, className = "", hoverTrigger = false }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  const intervalRef = useRef<number | null>(null);
  const originalText = text;

  const scramble = useCallback(() => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplay(
        originalText
          .split("")
          .map((char, index) => {
            if (index < iteration) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, 30);
  }, [originalText]);

  useEffect(() => {
    if (!hoverTrigger) scramble();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <span 
      className={`inline-block font-mono ${className}`}
      onMouseEnter={hoverTrigger ? scramble : undefined}
    >
      {display}
    </span>
  );
};

// --- DATA ---

const AUDIO_SOURCE_URL = "https://audio.jukehost.co.uk/tbG7eNZAWIlGSQJhaniUPH7wHqQF9qHN"; 

const PR_STORY = [
  {
    title: "The Narrative Begins",
    year: "2023",
    tag: "ORIGIN",
    content: "Forte-FY's story needed a voice. The PR department was established to craft, curate, and communicate our mission to the world, turning events into movements."
  },
  {
    title: "Building Bridges",
    year: "2024",
    tag: "EXPANSION",
    content: "We shifted focus to strategic partnerships, connecting with 30+ clubs and organizations. PR became the handshake of Forte-FY, fostering collaboration over competition."
  },
  {
    title: "Global Presence",
    year: "NOW",
    tag: "DOMINANCE",
    content: "Today, we manage a comprehensive brand ecosystem. From corporate sponsorships with Nagad to nationwide campus ambassadorships, we ensure Forte-FY is seen and heard."
  },
  {
    title: "Achievements",
    year: "HONORS",
    tag: "RECOGNITION",
    content: "Awarded 'Best Club Partner' at the National Quiz Showdown and recognized for excellence in event representation across 16+ major national platforms."
  }
];

const PR_METRICS = [
  { label: "Campuses Covered", value: 100, suffix: "+", icon: Globe, desc: "Nationwide Presence" },
  { label: "Partner Clubs", value: 150, suffix: "+", icon: Users, desc: "Strategic Allies" },
  { label: "PR Members Trained", value: 53, suffix: "", icon: Megaphone, desc: "Skill Development" },
  { label: "Sponsorships", value: 2, suffix: "", icon: Share2, desc: "Corporate Backing" },
  { label: "Events Represented", value: 16, suffix: "", icon: MessageSquare, desc: "Official Presence" },
];

const PR_QUALITIES = [
  "Ability to establish and maintain networks with clubs, organizations, and external stakeholders.",
  "Strong interpersonal skills to approach, engage, and communicate effectively with diverse groups.",
  "Creating a friendly, inclusive, and engaging environment in both internal and external interactions.",
  "Working proficiency in Google Forms and Google Sheets for coordination and data handling.",
  "Working proficiency in Microsoft Office applications for documentation.",
  "Fast learner with adaptability to new tools, platforms, and communication technologies.",
  "Strong sense of responsibility to manage assigned tasks and handle diverse organizational duties."
];

// --- SUB-COMPONENTS FOR INTERACTION ---

const ScrollSignalItem: React.FC<{ item: any; index: number; isDark: boolean; colors: any }> = ({ item, index, isDark, colors }) => {
  const { ref, isActive } = useCenterTrigger();
  
  return (
    <div ref={ref} className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
       {/* Year / Tag */}
       <div className={`md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-start md:pl-24' : 'md:justify-end md:pr-24'} pl-12 md:pl-0`}>
          <div className={`relative group cursor-default transition-transform duration-500 ${isActive ? 'scale-110' : 'hover:scale-105'}`}>
             <span className={`text-6xl md:text-9xl font-heading font-black text-transparent stroke-text transition-opacity duration-500 ${isDark ? 'stroke-white' : 'stroke-black'} ${isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-100'}`}>
                {item.year}
             </span>
             <div className={`absolute -top-3 -right-2 md:-top-4 md:-right-4 bg-[#DC143C] text-white text-[9px] md:text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg transition-transform ${isActive ? 'rotate-12' : 'group-hover:rotate-12'}`}>
                {item.tag}
             </div>
          </div>
       </div>

       {/* Node Point */}
       <div className={`absolute left-[20px] md:left-1/2 w-3 h-3 md:w-5 md:h-5 -translate-x-1/2 rounded-full border-2 border-[#DC143C] timeline-node z-20 ${isDark ? 'bg-[#050002]' : 'bg-white'} shadow-[0_0_20px_rgba(220,20,60,0.5)] transition-all duration-300 ${isActive ? 'scale-150 bg-[#DC143C]' : ''}`} />

       {/* Content */}
       <div className={`md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-24 md:text-right' : 'md:pl-24 md:text-left'} transition-transform duration-300 ${isActive ? '-translate-y-2' : 'hover:-translate-y-1'}`}>
          <h3 className={`text-2xl md:text-3xl font-black uppercase mb-3 ${colors.text} transition-colors ${isActive ? 'text-[#DC143C]' : 'group-hover:text-[#DC143C]'}`}>{item.title}</h3>
          <p className={`text-base md:text-lg font-light leading-relaxed ${colors.textSub} transition-colors ${isActive ? 'text-[#DC143C]' : 'group-hover:text-[#DC143C]'}`}>{item.content}</p>
       </div>
    </div>
  );
};

const ScrollMetricItem: React.FC<{ item: any; isDark: boolean; colors: any }> = ({ item, isDark, colors }) => {
  const { ref, isActive } = useCenterTrigger();

  return (
    <div ref={ref} className={`metric-channel relative h-[250px] md:h-[400px] rounded-3xl ${colors.cardBg} border overflow-hidden group transition-all duration-500 cursor-crosshair shadow-lg ${isActive ? 'border-[#DC143C] scale-[1.02]' : `border ${colors.border} hover:border-[#DC143C]/50`}`}>
       {/* Vertical Matrix Lines */}
       <div className="absolute inset-0 flex justify-between px-6 opacity-10 pointer-events-none">
          <div className="w-px h-full bg-[#DC143C]" />
          <div className="w-px h-full bg-[#DC143C]" />
          <div className="w-px h-full bg-[#DC143C]" />
       </div>

       <div className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#DC143C]/20 to-transparent transition-all duration-700 ease-out z-0 ${isActive ? 'h-full' : 'h-0 group-hover:h-full'}`} />
       
       <div className="absolute inset-0 p-6 flex flex-col justify-between relative z-20">
          <div className="flex justify-between items-start">
             <item.icon size={28} className={`text-[#DC143C] transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
             <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-white/20' : 'bg-black/20'} transition-colors ${isActive ? 'bg-[#DC143C]' : 'group-hover:bg-[#DC143C]'}`} />
          </div>
          <div className="text-center md:text-left">
             <h3 className={`text-6xl md:text-7xl font-heading font-black italic mb-2 ${colors.text} drop-shadow-xl tracking-tighter`}>
                <ScrollTriggeredCountUp end={item.value} suffix={item.suffix} start={isActive} />
             </h3>
             <p className="text-xs font-bold uppercase tracking-widest text-[#DC143C] mb-1">{item.label}</p>
             <p className={`text-[10px] transition-opacity duration-500 ${isDark ? 'text-white/50' : 'text-black/50'} ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>{item.desc}</p>
          </div>
       </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

const PRDepartment: React.FC<DepartmentProps> = ({ navigate, isDark, setIsDark }) => {
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineWrapperRef = useRef<HTMLDivElement>(null);

  // Audio Toggle Function
  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(AUDIO_SOURCE_URL);
      audioRef.current.onended = () => setIsPlaying(false);
    }
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause(); 
      }
    };
  }, []);

  // MASTER GSAP TIMELINE
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Hero Text Reveal
      gsap.set(".hero-word", { y: "120%", opacity: 0, filter: "blur(20px)", rotateX: -10 });
      gsap.set(".hero-subtitle", { y: 20, opacity: 0 });

      tl.to(".hero-word", {
        y: "0%", opacity: 1, filter: "blur(0px)", rotateX: 0, duration: 2, stagger: 0.25, ease: "power3.out"
      })
      .to(".hero-subtitle", {
        y: 0, opacity: 1, duration: 1.5, ease: "power2.out"
      }, "-=1.5");

      // 2. Orbital Rotation
      gsap.to(".orbital-ring-1", { rotation: 360, duration: 60, ease: "linear", repeat: -1 });
      gsap.to(".orbital-ring-2", { rotation: -360, duration: 45, ease: "linear", repeat: -1 });
      gsap.to(".orbital-ring-3", { rotation: 360, duration: 30, ease: "linear", repeat: -1 });

      // 3. Signal Path (Timeline Line) Animation - Scroll Driven
      if (timelineWrapperRef.current) {
        gsap.fromTo(".signal-line-fill", 
          { height: "0%" },
          { 
            height: "100%", 
            ease: "none",
            scrollTrigger: { 
              trigger: timelineWrapperRef.current, 
              start: "top center", 
              end: "bottom center", 
              scrub: 0.5 
            }
          }
        );
      }

      // 6. Recruitment Animations
      const recruitTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".recruitment-section",
          start: "top 75%"
        }
      });
      
      recruitTl.fromTo(".recruit-title", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(".recruit-card",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(".protocol-item",
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" },
        "-=0.6"
      );

    }, containerRef);

    const timer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);

    return () => {
        ctx.revert();
        clearTimeout(timer);
    };
  }, [isDark]);

  // Mouse Parallax for Hero
  const handleHeroMouseMove = (e: React.MouseEvent) => {
     if (!heroRef.current) return;
     const { clientX, clientY } = e;
     const xPos = (clientX / window.innerWidth - 0.5) * 40;
     const yPos = (clientY / window.innerHeight - 0.5) * 40;
     
     gsap.to(".hero-orbitals", { rotationY: xPos, rotationX: -yPos, duration: 1.5, ease: "power2.out" });
     gsap.to(".hero-text-layer", { x: xPos * 0.8, y: yPos * 0.8, duration: 1.5, ease: "power2.out" });
  };

  // Colors & Theme Config
  const colors = {
    bg: isDark ? "bg-[#050002]" : "bg-[#fff0f2]", 
    text: isDark ? "text-white" : "text-[#2d0a0a]", 
    textSub: isDark ? "text-rose-200/60" : "text-rose-900/60",
    crimson: "text-[#DC143C]",
    crimsonBg: "bg-[#DC143C]",
    border: isDark ? "border-rose-900/20" : "border-rose-900/10",
    gradientText: "text-[#DC143C]",
    cardBg: isDark ? "bg-[#1a0505]" : "bg-white/60", 
  };

  const TickerSet = () => (
     <div className="flex items-center gap-8 mx-4 shrink-0">
        <span className="text-xl md:text-2xl font-heading font-black uppercase text-white drop-shadow-md whitespace-nowrap">Official Representation</span>
        <span className="text-[#DC143C] text-2xl">•</span>
        <span className="text-xl md:text-2xl font-serif italic text-white/90 whitespace-nowrap">Strategic Communication</span>
         <span className="text-[#DC143C] text-2xl">•</span>
        <span className="text-xl md:text-2xl font-heading font-black uppercase text-transparent whitespace-nowrap" style={{ WebkitTextStroke: '1px white' }}>Institutional Voice</span>
         <span className="text-[#DC143C] text-2xl">•</span>
        <span className="text-xl md:text-2xl font-heading font-black uppercase text-[#ffccd5] whitespace-nowrap">Public Engagement</span>
        <span className="text-[#DC143C] text-2xl">•</span>
     </div>
  );

  return (
    <div ref={containerRef} className={`min-h-screen font-sans overflow-x-hidden ${colors.bg} ${colors.text} transition-colors duration-700 selection:bg-[#DC143C] selection:text-white`}>
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[90] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* --- NAVIGATION --- */}
      <PRHeader navigate={navigate} isDark={isDark} setIsDark={setIsDark} />

      {/* --- HERO SECTION --- */}
      <section 
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-1000"
      >
         {/* Background Dim / Pulse Effect */}
         <div className={`absolute inset-0 transition-opacity duration-700 ${isDark ? 'bg-black/90' : 'bg-[#fff0f5]/80'}`}>
             <div className={`absolute inset-0 animate-pulse-slow ${isDark ? 'opacity-30 bg-[#DC143C]/10' : 'opacity-20 bg-[#DC143C]/20'}`} style={{ animationDuration: '4s' }} />
         </div>

         {/* Background Orbitals */}
         <div className={`hero-orbitals absolute inset-0 flex items-center justify-center pointer-events-none ${isDark ? 'mix-blend-screen' : ''}`} style={{ transformStyle: 'preserve-3d', opacity: isDark ? 0.6 : 0.8 }}>
            <div className={`orbital-ring-1 absolute w-[60vw] h-[60vw] border rounded-full border-t-[#FF0040] border-l-transparent ${isDark ? 'border-[#DC143C]/30' : 'hidden'}`} />
            <div className={`orbital-ring-1 absolute w-[50vw] h-[50vw] border border-dashed rounded-full ${isDark ? 'border-[#DC143C]/20' : 'border-[#DC143C]/30'}`} style={{ animationDirection: 'reverse' }} />
            <div className={`orbital-ring-2 absolute w-[70vw] h-[70vw] border rounded-full border-b-[#DC143C] ${isDark ? 'border-[#8B0000]/30' : 'border-[#8B0000]/40 shadow-[0_0_20px_rgba(139,0,0,0.05)]'}`} style={{ transform: 'rotateX(60deg)' }} />
            <div className={`orbital-ring-3 absolute w-[30vw] h-[30vw] border-[2px] rounded-full border-r-transparent ${isDark ? 'border-[#FF0040]/40' : 'border-[#FF0040]/60'}`} />
            <div className={`absolute w-[20vw] h-[20vw] bg-[#DC143C] rounded-full blur-[100px] animate-pulse ${isDark ? 'opacity-30' : 'opacity-20'}`} />
         </div>

         {/* Hero Typography */}
         <div className="hero-text-layer relative z-10 flex flex-col items-center gap-4 text-center px-4">
            <div className="flex flex-col items-center leading-[0.85] select-none py-4">
               <h1 className={`hero-word text-[12vw] font-heading font-black tracking-tighter uppercase ${isDark ? 'text-white' : 'text-black'} flex drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-2`}>PUBLIC</h1>
               <h1 className={`hero-word text-[12vw] font-heading font-black tracking-tighter uppercase flex text-[#DC143C] drop-shadow-[0_0_40px_rgba(220,20,60,0.4)]`}>RELATIONS</h1>
            </div>
            <p className={`hero-subtitle mt-8 text-sm md:text-xl max-w-2xl text-center font-light italic ${colors.textSub} border-l-2 border-[#DC143C] pl-6`}>The Voice That Represents Our Values</p>
         </div>
      </section>

      {/* --- TICKER TAPE --- */}
      <div className="w-full border-y border-[#DC143C]/30 bg-gradient-to-r from-[#8B0000] via-[#DC143C] to-[#8B0000] text-white py-3 relative z-20 overflow-hidden shadow-[0_0_30px_rgba(220,20,60,0.3)]">
         <div className="flex w-max animate-marquee-infinite">
             <div className="flex"><TickerSet /><TickerSet /><TickerSet /><TickerSet /></div>
             <div className="flex"><TickerSet /><TickerSet /><TickerSet /><TickerSet /></div>
         </div>
      </div>
      <style>{`
        .animate-marquee-infinite { animation: marquee 40s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.02); } }
        .animate-pulse-slow { animation: pulse-slow 5s ease-in-out infinite; }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 10px #DC143C, 0 0 20px rgba(220, 20, 60, 0.4); transform: translateX(-50%) scale(1); opacity: 0.9; } 50% { box-shadow: 0 0 35px #DC143C, 0 0 60px rgba(220, 20, 60, 0.7); transform: translateX(-50%) scale(1.2); opacity: 1; } }
        .pulse-node { animation: pulse-glow 3s infinite cubic-bezier(0.4, 0, 0.6, 1); }
      `}</style>

      {/* --- CONTENT WRAPPER --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32">
         
         {/* --- SECTION 1: SPOKESPERSON --- */}
         <section className="mb-20 md:mb-40 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6 order-2 md:order-1 relative group z-10">
                 <div className={`aspect-[4/5] rounded-[2rem] overflow-hidden relative border ${colors.border} shadow-2xl transition-all duration-500`}>
                    <div className="absolute inset-0 bg-[#DC143C]/10 z-10 mix-blend-overlay opacity-50 transition-opacity pointer-events-none" />
                    
                    {/* SCROLL AWARE IMAGE COMPONENT */}
                    <ScrollAwarePRImage 
                      src="https://i.postimg.cc/3xyqGVyh/cca44d09-d92f-4c0d-987a-b8520bb2f212.jpg?auto=format&fit=crop&q=80" 
                      alt="Arpita Das Richi" 
                      className="w-full h-full object-cover" 
                    />
                    
                    <div className="absolute top-6 left-6 z-20 flex gap-2"><div className="w-3 h-3 rounded-full bg-[#DC143C] animate-pulse" /><div className="w-3 h-3 rounded-full bg-white/50" /></div>
                    <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent z-20">
                       <h3 className="text-white font-bold text-2xl uppercase mb-1">Arpita Das Richi</h3>
                       <p className="text-[#DC143C] font-medium text-sm uppercase tracking-widest">Head of Public Relations</p>
                    </div>
                 </div>
               <div className={`absolute -z-10 top-10 -left-10 w-full h-full rounded-[2rem] border-2 ${isDark ? 'border-[#DC143C]/20' : 'border-[#DC143C]/10'} transition-transform duration-500`} />
            </div>

            <div className="md:col-span-6 order-1 md:order-2 pl-0 md:pl-10">
               <div className="flex items-center gap-4 mb-6">
                  {/* AUDIO PLAYER */}
                  <div 
                    onClick={toggleAudio}
                    className={`p-4 rounded-full ${isDark ? 'bg-[#DC143C]/10 border-[#DC143C]/30' : 'bg-[#DC143C]/5 border-[#DC143C]/20'} border text-[#DC143C] interactive relative overflow-hidden group/mic cursor-pointer hover:bg-[#DC143C] hover:text-white transition-all duration-300`}
                  >
                     {isPlaying && (
                       <>
                         <div className="absolute inset-0 bg-[#DC143C]/20 animate-ping rounded-full" />
                         <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse z-20 shadow-[0_0_10px_red]" />
                       </>
                     )}
                     <div className="relative z-10 flex items-center justify-center">
                        {isPlaying ? <Volume2 size={24} className="animate-pulse" /> : <Mic2 size={24} />}
                     </div>
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-xs font-black uppercase tracking-[0.2em] ${colors.textSub}`}>The Spokesperson</span>
                    {isPlaying && <span className="text-[10px] text-[#DC143C] font-mono animate-pulse">TRANSMISSION ACTIVE...</span>}
                  </div>
               </div>
               <h2 className={`text-5xl md:text-7xl font-heading font-black uppercase leading-[0.9] mb-8 ${colors.text} drop-shadow-md`}>
                  <span>Amplifying</span> 
                  <span>The Truth.</span>
               </h2>
               <div className={`pl-8 border-l-4 border-[#DC143C]`}>
                  <p className={`text-xl md:text-2xl font-serif italic leading-relaxed mb-6 ${colors.text}`}>
                     "PR isn't about spinning stories. It's about revealing the heart of the organization with clarity, elegance, and undeniable impact."
                  </p>
               </div>
            </div>
         </section>

         {/* --- SECTION 2: SIGNAL PATH (TIMELINE) --- */}
         <section className="mb-20 md:mb-40 timeline-wrapper relative" ref={timelineWrapperRef}>
            <div className="flex flex-col items-center mb-12 md:mb-24 text-center">
               <div className={`inline-block px-4 py-1 rounded-full border ${colors.border} ${isDark ? 'bg-[#DC143C]/5' : 'bg-white'} mb-6`}>
                  <ScrambleText text="CHRONOLOGY" className="text-current text-[10px] font-black uppercase tracking-[0.3em]" hoverTrigger={true} />
               </div>
               <h2 className={`text-4xl md:text-6xl font-heading font-black uppercase ${colors.text}`}>The <span className="text-[#DC143C]">Signal</span> Path</h2>
            </div>
            
            <div className="relative">
               {/* The Central Wire Line */}
               <div className={`absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] ${isDark ? 'bg-white/5' : 'bg-black/10'} -translate-x-1/2 overflow-hidden`}>
                  <div className="signal-line-fill w-full bg-[#DC143C] absolute top-0 left-0 shadow-[0_0_15px_#DC143C]" />
               </div>

               <div className="space-y-24 md:space-y-32">
                  {PR_STORY.map((item, i) => (
                     <ScrollSignalItem key={i} item={item} index={i} isDark={isDark} colors={colors} />
                  ))}
               </div>
            </div>
            <style>{`.stroke-text { -webkit-text-stroke: 1px currentColor; }`}</style>
         </section>

         {/* --- SECTION 3: METRICS (SIGNAL TRENDS) --- */}
         <section className="mb-20 md:mb-40 metrics-deck">
            <div className={`mb-12 md:mb-16 flex flex-col md:flex-row items-start md:items-end justify-between border-b ${colors.border} pb-6 gap-4`}>
               <div><h2 className={`text-4xl md:text-6xl font-heading font-black uppercase italic ${colors.text}`}>Signal <span className="text-[#DC143C]">Trends</span></h2></div>
               <div className="flex gap-2 opacity-50">{[1,2,3,4].map(i => <div key={i} className={`w-2 h-8 rounded-full ${isDark ? 'bg-[#DC143C]/40' : 'bg-[#DC143C]/20'} animate-pulse`} style={{ animationDelay: `${i*0.2}s`}} />)}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
               {PR_METRICS.map((item, i) => (
                  <ScrollMetricItem key={i} item={item} isDark={isDark} colors={colors} />
               ))}
            </div>
         </section>

         {/* --- SECTION 4: RECRUITMENT (TRANSMISSION HUB) --- */}
         <section className={`recruitment-section relative pt-12 md:pt-24 border-t ${colors.border}`}>
            <div className={`absolute inset-0 opacity-[0.05] pointer-events-none ${isDark ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-crimson-900 via-transparent to-transparent' : ''}`} />
            
            <div className="mb-16 md:mb-24 text-center recruit-title">
               <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${colors.border} ${isDark ? 'bg-[#DC143C]/10' : 'bg-white'} mb-6`}>
                  <Radio size={14} className="text-[#DC143C] animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#DC143C]">Recruitment Frequency Open</span>
               </div>
               <h2 className={`text-4xl sm:text-6xl md:text-8xl font-heading font-black uppercase italic tracking-tighter ${colors.text} mb-4 leading-[1.1] pb-6 relative z-10`}>
                  Be a Part of Our <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC143C] to-[#ff4d6d] inline-block pb-3 px-2">Public Relations</span> Team
               </h2>
               <p className={`max-w-xl mx-auto text-base md:text-xl ${colors.textSub} font-light mt-6`}>
                  Initiate your sequence. Become the signal in the noise.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
               {/* Left: Role Card */}
               <div className="recruit-card sticky top-28 order-2 lg:order-1">
                  <div className={`rounded-[2.5rem] p-8 md:p-12 border ${colors.border} ${colors.cardBg} backdrop-blur-md relative overflow-hidden group`}>
                     <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                        <Zap size={120} className={isDark ? 'text-white' : 'text-black'} />
                     </div>
                     <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DC143C] to-transparent opacity-50" />

                     <div className="relative z-10">
                        <h3 className={`text-xs font-black uppercase tracking-[0.4em] ${colors.textSub} mb-4`}>Mission Briefing</h3>
                        <h4 className={`text-3xl md:text-5xl font-heading font-black uppercase italic mb-8 ${colors.text}`}>
                           Role: <span className="text-[#DC143C]">Intern</span>
                        </h4>
                        
                        <div className={`space-y-6 text-base md:text-lg ${colors.textSub} font-light leading-relaxed mb-10`}>
                           <p>Forte-FY seeks individuals ready to amplify our narrative. As a PR Intern, you will not just observe; you will operate the machinery of our external communications.</p>
                           <p>This is a gateway to leadership. Expect rigor, anticipate growth, and prepare to represent an ecosystem of excellence.</p>
                        </div>

                        <a href="https://forms.google.com" target="_blank" rel="noreferrer" className="w-full group relative inline-flex items-center justify-center px-8 py-5 overflow-hidden font-black uppercase tracking-[0.2em] text-white transition-all duration-300 bg-[#DC143C] rounded-xl hover:bg-[#B01030] shadow-[0_0_30px_rgba(220,20,60,0.4)] hover:shadow-[0_0_50px_rgba(220,20,60,0.6)] active:scale-[0.98]">
                           <span className="mr-3 relative z-10">Initiate Sequence</span>
                           <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </a>
                     </div>
                  </div>
               </div>

               {/* Right: Qualities */}
               <div className="order-1 lg:order-2">
                  <div className="flex items-center gap-3 mb-8 md:mb-12">
                     <div className="w-2 h-2 rounded-full bg-[#DC143C] animate-pulse" />
                     <h3 className={`text-sm font-black uppercase tracking-[0.3em] ${colors.text}`}>Protocol Requirements</h3>
                  </div>

                  <div className="space-y-4">
                     {PR_QUALITIES.map((q, i) => (
                        <div key={i} className="protocol-item group relative pl-8 md:pl-10 py-4 md:py-6 border-l-2 border-dashed border-[#DC143C]/20 hover:border-[#DC143C] transition-colors duration-300 cursor-default">
                           <div className={`absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${isDark ? 'bg-black' : 'bg-white'} border-2 border-[#DC143C] group-hover:scale-150 group-hover:bg-[#DC143C] transition-all duration-300 shadow-[0_0_10px_rgba(220,20,60,0)] group-hover:shadow-[0_0_15px_rgba(220,20,60,0.8)]`} />
                           <div className="relative z-10 transition-all duration-300 group-hover:translate-x-2">
                              <div className="flex items-center gap-3 mb-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                 <span className="text-[10px] font-mono text-[#DC143C]">SIGNAL_0{i+1}</span>
                              </div>
                              <p className={`text-lg md:text-xl ${colors.text} font-light leading-snug group-hover:text-[#DC143C] transition-colors duration-300`}>
                                 {q}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

         </section>

         <PRFooter />
      </div>
    </div>
  );
};

export default PRDepartment;
