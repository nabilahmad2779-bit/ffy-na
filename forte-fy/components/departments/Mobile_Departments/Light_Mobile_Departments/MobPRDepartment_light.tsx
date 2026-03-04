
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { 
  Megaphone, Globe, Share2, MessageSquare, ChevronLeft, 
  Mic2, Radio, Zap, Users, ArrowUpRight, CheckCircle2, Volume2, Activity,
  BarChart3, Wifi
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PARTNER_LOGOS } from '../../../../constants.tsx';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const AUDIO_SOURCE_URL = "https://audio.jukehost.co.uk/tbG7eNZAWIlGSQJhaniUPH7wHqQF9qHN";

const PR_STORY = [
  {
    title: "The Narrative Begins",
    year: "2023",
    tag: "ORIGIN",
    content: "Forte-FY's story needed a voice. The PR department was established to craft, curate, and communicate our mission to the world."
  },
  {
    title: "Building Bridges",
    year: "2024",
    tag: "EXPANSION",
    content: "We shifted focus to strategic partnerships, connecting with 30+ clubs. PR became the handshake of Forte-FY."
  },
  {
    title: "Global Presence",
    year: "NOW",
    tag: "DOMINANCE",
    content: "Managing a comprehensive brand ecosystem. From corporate sponsorships to nationwide campus ambassadorships."
  },
  {
    title: "Achievements",
    year: "HONORS",
    tag: "RECOGNITION",
    content: "Awarded 'Best Club Partner' at the National Quiz Showdown and recognized across 16+ major national platforms."
  }
];

// Reordered for 2-1-2 Layout
const PR_METRICS = [
  { label: "Campuses", value: 100, suffix: "+", icon: Globe },
  { label: "Partners", value: 150, suffix: "+", icon: Users },
  { label: "Events", value: 16, suffix: "", icon: MessageSquare, span: true }, // Centered
  { label: "Trained", value: 53, suffix: "", icon: Megaphone },
  { label: "Sponsors", value: 2, suffix: "", icon: Share2 },
];

const PR_QUALITIES = [
  "Ability to establish and maintain networks with external stakeholders.",
  "Strong interpersonal skills to engage with diverse groups.",
  "Creating a friendly, inclusive environment.",
  "Proficiency in coordination tools (Sheets, Forms).",
  "Adaptability to new communication technologies."
];

// --- UTILITY ---
const CountUp: React.FC<{ end: number; suffix?: string; play: boolean }> = ({ end, suffix = "", play }) => {
  const [count, setCount] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  
  useEffect(() => {
    if (play && !hasPlayed) {
        setHasPlayed(true);
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(start + (end - start) * ease));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    } else if (!play && !hasPlayed) {
        setCount(0); 
    }
  }, [play, end, hasPlayed]);

  return <span>{count}{suffix}</span>;
};

// Scroll Aware Image Component
const ScrollAwareImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = "" }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [filterVal, setFilterVal] = useState("grayscale(100%)");

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      
      // Calculate distance from center
      const distance = Math.abs(viewportCenter - elementCenter);
      const range = windowHeight * 0.25; 

      // Map distance to grayscale percentage
      let grayscale = 100;
      if (distance < range) {
        grayscale = (distance / range) * 100;
      }
      
      setFilterVal(`grayscale(${grayscale}%) contrast(1.1)`);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return <img ref={imgRef} src={src} alt={alt} className={`${className} transition-all duration-300 ease-out`} style={{ filter: filterVal }} />;
};

// Hook for center detection
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
      
      // Active if the element's center is within 15% of the viewport center
      const distance = Math.abs(viewportCenter - elementCenter);
      setIsActive(distance < windowHeight * 0.15);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, isActive };
};

// Sub-component for Timeline Item to handle individual Intersection Logic
const TimelineItemLight: React.FC<{ item: any }> = ({ item }) => {
    const { ref, isActive } = useCenterTrigger();

    return (
        <div ref={ref} className="pr-reveal pl-16 relative">
            {/* Dot - Perfectly Centered on Lines */}
            <div className={`absolute left-[19px] top-2 w-3 h-3 rounded-full border-2 transition-all duration-500 z-10 ${isActive ? 'bg-rose-600 border-rose-600 scale-150 shadow-md shadow-rose-300' : 'bg-white border-rose-600 scale-100'}`}>
                {isActive && <div className="absolute inset-0 rounded-full animate-ping bg-rose-600 opacity-50" />}
            </div>
            
            <div className="flex flex-col gap-2">
            <span className={`text-4xl font-heading font-black transition-all duration-500 ${isActive ? 'text-rose-600 scale-105 translate-x-2 drop-shadow-sm' : 'text-transparent stroke-text-light opacity-40'}`}>
                {item.year}
            </span>
            <div className={`inline-block px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest w-max mb-2 transition-colors duration-500 ${isActive ? 'bg-rose-600 text-white border-rose-600' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
                {item.tag}
            </div>
            <h3 className={`text-xl font-bold uppercase transition-colors duration-500 ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{item.title}</h3>
            <p className="text-sm font-light text-slate-500 leading-relaxed">{item.content}</p>
            </div>
        </div>
    );
};

// HUD Metric Item Light (No Card Background)
const MetricItemHUDLight: React.FC<{ item: any }> = ({ item }) => {
    const { ref, isActive } = useCenterTrigger();

    return (
        <div 
            ref={ref} 
            className={`relative flex flex-col justify-between py-8 border-b border-rose-100 transition-all duration-500 group ${item.span ? 'col-span-2 items-center text-center' : ''} ${isActive ? 'opacity-100' : 'opacity-40'}`}
        >
            <div className={`flex justify-between items-start mb-4 ${item.span ? 'w-full px-8' : ''}`}>
                <item.icon size={28} className={`transition-colors duration-300 ${isActive ? 'text-rose-600' : 'text-slate-300'}`} />
                <Wifi size={16} className={`transition-opacity duration-300 ${isActive ? 'opacity-100 text-rose-600 animate-pulse' : 'opacity-0'}`} />
            </div>
            
            <div>
                <h3 className={`text-5xl font-heading font-black italic tracking-tighter mb-2 transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-300'}`}>
                    <CountUp end={item.value} suffix={item.suffix} play={isActive} />
                </h3>
                <p className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-300 ${isActive ? 'text-rose-600' : 'text-slate-400'}`}>
                    {item.label}
                </p>
            </div>

            {/* Scanning Bar on Active */}
            <div className={`absolute bottom-0 left-0 h-[2px] bg-rose-600 shadow-sm transition-all duration-1000 ease-out ${isActive ? 'w-full' : 'w-0'}`} />
        </div>
    );
};

export const MobPRDepartment_light: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Metric Focus State
  const [focusedMetricIndex, setFocusedMetricIndex] = useState<number>(0);
  const metricRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Toggle Audio
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

  useEffect(() => {
    return () => { if (audioRef.current) audioRef.current.pause(); };
  }, []);

  // Metric Intersection Observer
  useEffect(() => {
    const handleScroll = () => {
      let closestIndex = 0;
      let minDistance = Infinity;
      const windowCenter = window.innerHeight / 2;

      metricRefs.current.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(windowCenter - elementCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });
      setFocusedMetricIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pr-hero-text", { y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out" });
      gsap.to(".pr-orbit", { rotation: 360, duration: 20, repeat: -1, ease: "linear" });
      
      gsap.utils.toArray('.pr-reveal').forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 30, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" }
          }
        );
      });

      // 3. Timeline Line Scrub Animation (Light)
      gsap.fromTo(".timeline-progress-bar-light", 
        { height: "0%" },
        { 
          height: "100%", 
          ease: "none",
          scrollTrigger: { 
            trigger: ".timeline-wrapper", 
            start: "top 60%", // Start earlier
            end: "bottom 90%", 
            scrub: 0.1 
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fff0f2] text-slate-900 selection:bg-rose-500 selection:text-white pb-24 overflow-x-hidden font-sans">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-rose-200">
        <button onClick={onBack} className="p-2 rounded-full bg-rose-50 text-rose-600 active:scale-90 transition-transform">
          <ChevronLeft size={22} />
        </button>
        <div className="flex items-center gap-2">
           <Radio size={16} className="text-rose-600 animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600">PR Division</span>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
         <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-100">
            <div className="pr-orbit w-[80vw] h-[80vw] border border-rose-400/30 rounded-full border-dashed" />
            <div className="pr-orbit w-[60vw] h-[60vw] border border-rose-400/50 rounded-full absolute" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
            
            {/* UPDATED PULSE EFFECT - Breathing Glow (PC Style) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none">
                <div className="absolute w-[60vw] h-[60vw] bg-rose-500 rounded-full blur-[100px] animate-breathing-glow opacity-60" />
                <div className="absolute w-[35vw] h-[35vw] bg-rose-500 rounded-full blur-[60px] animate-pulse-fast opacity-80" />
            </div>
         </div>

         <div className="relative z-10 text-center">
            <span className="pr-hero-text text-xs font-mono font-bold tracking-[0.4em] uppercase text-slate-400 mb-4 block">Department of</span>
            <h1 className="pr-hero-text text-6xl font-heading font-black uppercase tracking-tighter leading-[0.85] mb-2 text-slate-900">Public</h1>
            <h1 className="pr-hero-text text-6xl font-heading font-black uppercase tracking-tighter leading-[0.85] text-rose-600 mb-8 drop-shadow-sm">Relations</h1>
            <div className="pr-hero-text w-16 h-1 bg-rose-600 mx-auto mb-8 rounded-full" />
            <p className="pr-hero-text text-xs font-mono uppercase tracking-[0.3em] text-slate-500 max-w-xs mx-auto">The Voice That Represents Our Values</p>
         </div>
      </section>

      {/* TICKER (Straight) - UPDATED FONTS */}
      <div className="bg-rose-600 py-4 overflow-hidden shadow-lg relative z-20 border-y border-white/20">
         <div className="flex whitespace-nowrap animate-marquee-fast items-center">
            {[...Array(4)].map((_, i) => (
               <div key={i} className="flex items-center">
                  <span className="text-[14px] font-heading font-black uppercase tracking-wider text-white mx-6 drop-shadow-sm">Institutional Voice</span>
                  <span className="text-white/50 text-[10px]">•</span>
                  <span className="text-[14px] font-serif italic font-bold tracking-tight text-white mx-6">Public Engagement</span>
                  <span className="text-white/50 text-[10px]">•</span>
                  <span className="text-[12px] font-mono font-bold uppercase tracking-[0.1em] text-white mx-6 bg-white/20 px-2 py-1 rounded">Official Representation</span>
                  <span className="text-white/50 text-[10px]">•</span>
                  <span className="text-[12px] font-sans font-extrabold uppercase tracking-[0.2em] text-white mx-6">Strategic Communication</span>
                  <span className="text-white/50 text-[10px]">•</span>
               </div>
            ))}
         </div>
      </div>

      {/* SPOKESPERSON */}
      <section className="px-6 py-20 relative z-10">
         <div className="pr-reveal text-center mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600">The Spokesperson</span>
            <h2 className="text-3xl font-heading font-black uppercase italic mt-2 text-slate-900">Amplifying <br/><span className="text-rose-600">Truth.</span></h2>
         </div>

         <div className="pr-reveal relative rounded-[2rem] overflow-hidden border border-rose-200 shadow-xl bg-white">
            <button 
               onClick={toggleAudio}
               className={`absolute top-4 right-4 z-20 p-3 rounded-full border backdrop-blur-md transition-all duration-300 ${isPlaying ? 'bg-rose-600 text-white border-rose-600 animate-pulse' : 'bg-white/80 text-rose-600 border-rose-200'}`}
            >
               {isPlaying ? <Volume2 size={20} /> : <Mic2 size={20} />}
            </button>

            <div className="aspect-[4/5] relative">
               <ScrollAwareImage src="https://i.postimg.cc/3xyqGVyh/cca44d09-d92f-4c0d-987a-b8520bb2f212.jpg" alt="Head" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-transparent to-transparent opacity-80" />
               <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-2xl font-bold uppercase text-white mb-1">Arpita Das Richi</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-rose-200">Head of Public Relations</p>
               </div>
            </div>
            
            <div className="p-8 border-t border-rose-100 bg-white">
               {/* UPDATED QUOTE STYLE */}
               <p className="text-lg font-heading font-medium tracking-tight uppercase leading-relaxed text-center text-slate-800">
                  "PR isn't about spinning stories. It's about revealing the <span className="text-rose-600 font-black">heart</span> of the organization with clarity and elegance."
               </p>
            </div>
         </div>
      </section>

      {/* SIGNAL PATH (Timeline) - FIXED & SCROLL LINKED */}
      <section className="px-6 py-12 relative">
         <div className="pr-reveal text-center mb-16">
            <h2 className="text-3xl font-heading font-black uppercase italic text-slate-900">The <span className="text-rose-600">Signal Path</span></h2>
         </div>

         <div className="timeline-wrapper relative">
            {/* Background Line (Static) */}
            <div className="absolute left-[24px] top-0 bottom-0 w-[2px] bg-rose-200 rounded-full" />
            
            {/* Foreground Line (Scroll Scrub) */}
            <div className="timeline-progress-bar-light absolute left-[24px] top-0 w-[2px] bg-rose-600 rounded-full origin-top h-0" />

            <div className="space-y-16 pt-4 pb-4">
               {PR_STORY.map((item, i) => (
                  <TimelineItemLight key={i} item={item} />
               ))}
            </div>
         </div>
         <style>{`.stroke-text-light { -webkit-text-stroke: 1px #e11d48; }`}</style>
      </section>

      {/* SIGNAL TRENDS (Metrics) - REDESIGNED "HUD GRID" (LIGHT) */}
      <section className="px-6 py-20 relative overflow-hidden">
         {/* No background color */}
         <div className="pr-reveal text-center mb-16 relative z-10">
            <h2 className="text-3xl font-heading font-black uppercase italic text-slate-900">Signal <span className="text-rose-600">Strength</span></h2>
            <div className="flex items-center justify-center gap-2 mt-2">
               <Activity size={14} className="text-rose-600 animate-pulse" />
               <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Live Telemetry</p>
            </div>
         </div>
         
         <div className="grid grid-cols-2 gap-x-8 gap-y-12 relative z-10 pb-12">
            {PR_METRICS.map((m, i) => (
               <MetricItemHUDLight key={i} item={m} />
            ))}
         </div>
      </section>

      {/* STRATEGIC ALLIES (Partners Marquee) */}
      <section className="py-20 border-b border-rose-100 bg-[#fff0f2] overflow-hidden">
         <div className="pr-reveal text-center mb-10 px-6">
            <h2 className="text-2xl font-heading font-black uppercase italic text-slate-900">Strategic <span className="text-rose-600">Allies</span></h2>
         </div>
         <div className="flex animate-marquee-fast w-max">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((p, i) => (
               <div key={i} className="mx-4 w-24 h-24 rounded-full border border-rose-100 bg-white p-4 flex items-center justify-center shadow-md">
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain grayscale opacity-60" />
               </div>
            ))}
         </div>
      </section>

      {/* RECRUITMENT */}
      <section className="px-6 py-20 relative overflow-hidden bg-[#fff0f2]">
         <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-rose-200/40 rounded-full blur-[80px] pointer-events-none" />
         
         <div className="pr-reveal mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-300 text-rose-600 mb-4 bg-white">
               <Radio size={12} className="animate-pulse" />
               <span className="text-[9px] font-black uppercase tracking-widest">Recruitment Open</span>
            </div>
            <h2 className="text-4xl font-heading font-black uppercase italic leading-none mb-6 text-slate-900">Join the <br/><span className="text-rose-600">Transmission.</span></h2>
            <p className="text-sm font-light text-slate-600">Initiate your sequence. Become the signal in the noise.</p>
         </div>

         <div className="pr-reveal p-8 rounded-3xl border border-rose-200 bg-white relative overflow-hidden mb-8 shadow-lg">
            <div className="relative z-10">
               <h3 className="text-2xl font-heading font-black uppercase italic text-slate-900 mb-2">Role: <span className="text-rose-600">Intern</span></h3>
               <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  As a PR Intern, you will operate the machinery of our external communications. Expect rigor, anticipate growth.
               </p>
               <a href="https://forms.google.com" target="_blank" rel="noreferrer" className="w-full py-4 bg-rose-600 text-white font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-rose-700 transition-colors">
                  Apply Now <ArrowUpRight size={16} />
               </a>
            </div>
         </div>

         <div className="space-y-3">
            {PR_QUALITIES.map((q, i) => (
               <div key={i} className="pr-reveal flex gap-4 p-4 rounded-xl border border-rose-100 bg-white">
                  <CheckCircle2 size={16} className="text-rose-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-snug">{q}</p>
               </div>
            ))}
         </div>
      </section>

      <footer className="py-12 text-center border-t border-rose-200 opacity-40">
         <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-slate-500">PR Directorate • Forte-FY</span>
      </footer>
      
      <style>{`
        @keyframes marquee-fast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee-fast { display: flex; animation: marquee-fast 30s linear infinite; width: max-content; }
        
        @keyframes breathing-glow {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.3); opacity: 0.6; }
        }
        .animate-breathing-glow { animation: breathing-glow 5s ease-in-out infinite; }

        @keyframes pulse-fast {
            0%, 100% { opacity: 0.4; transform: scale(0.9); }
            50% { opacity: 0.8; transform: scale(1.1); }
        }
        .animate-pulse-fast { animation: pulse-fast 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
