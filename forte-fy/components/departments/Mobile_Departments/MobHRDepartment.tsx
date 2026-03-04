
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { 
  Users, Heart, ArrowUpRight, 
  Target, Quote, Calendar, Clock, Layers,
  Flag, Sparkles, ChevronLeft, CheckCircle2
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../../ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

// 1. Modified CountUp to support focus trigger
const CountUp: React.FC<{ end: number; duration?: number; suffix?: string; start?: boolean }> = ({ end, duration = 2000, suffix = "", start = true }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (start && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
         if (!startTime) startTime = currentTime;
         const progress = currentTime - startTime;
         const ease = (x: number): number => 1 - Math.pow(1 - x, 4);
         if (progress < duration) {
            setCount(Math.floor(end * ease(progress / duration)));
            requestAnimationFrame(animate);
         } else {
            setCount(end);
         }
      };
      requestAnimationFrame(animate);
    }
  }, [start, end, duration, hasAnimated]);
  return <span>{count}{suffix}</span>;
};

// 2. SmartHeadImage Component for Vintage-to-Color Effect
const SmartHeadImage: React.FC<{ src: string, alt: string, className?: string }> = ({ src, alt, className = "" }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [style, setStyle] = useState({ filter: 'grayscale(100%) sepia(30%)', transform: 'scale(1)' });

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - elementCenter);
      const threshold = window.innerHeight * 0.45;

      if (distance < threshold) {
        // Calculate intensity (0 to 1), 1 being center
        const intensity = 1 - (distance / threshold);
        
        // Vintage (100% Gray, 30% Sepia) -> Vibrant (0% Gray, 0% Sepia)
        const gray = Math.max(0, 100 - (intensity * 100));
        const sepia = Math.max(0, 30 - (intensity * 30));
        const scale = 1 + (intensity * 0.05);

        setStyle({
            filter: `grayscale(${gray}%) sepia(${sepia}%)`,
            transform: `scale(${scale})`
        });
      } else {
        setStyle({ filter: 'grayscale(100%) sepia(30%)', transform: 'scale(1)' });
      }
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
        className={className}
        style={{ 
            ...style,
            transition: 'filter 0.1s linear, transform 0.1s linear' // Fast linear transition for scroll responsiveness
        }} 
    />
  );
};

// 3. ImpactCardMob with CountUp Trigger on Focus
const ImpactCardMob: React.FC<{ label: string; value: number; suffix: string; icon: any }> = ({ label, value, suffix, icon: Icon }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [focusIntensity, setFocusIntensity] = useState(0);
  const [shouldCount, setShouldCount] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = Math.abs(viewportCenter - elementCenter);
      const threshold = windowHeight * 0.4;

      if (distanceFromCenter < threshold) {
        const rawIntensity = 1 - (distanceFromCenter / threshold);
        setFocusIntensity(rawIntensity);
        
        // Trigger count when card comes into focus zone
        if (rawIntensity > 0.6) {
            setShouldCount(true);
        }
      } else {
        setFocusIntensity(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={cardRef}
      className="relative p-8 flex flex-col items-center justify-center text-center transition-all duration-300 border-r border-b border-white/5"
      style={{
        transform: `scale(${1 + focusIntensity * 0.1})`,
        backgroundColor: `rgba(191, 0, 255, ${focusIntensity * 0.1})`,
        boxShadow: focusIntensity > 0.2 ? `0 0 ${focusIntensity * 50}px rgba(191, 0, 255, ${focusIntensity * 0.4})` : 'none',
        borderColor: `rgba(191, 0, 255, ${focusIntensity * 0.5})`,
        zIndex: focusIntensity > 0.5 ? 10 : 1
      }}
    >
      <div 
        className="mb-4 transition-all duration-300"
        style={{ 
          color: '#bf00ff', 
          opacity: 0.4 + (focusIntensity * 0.6),
          transform: `scale(${1 + focusIntensity * 0.2})` 
        }}
      >
         <Icon size={24} />
      </div>
      <div 
        className="text-3xl font-heading font-black leading-normal pb-4"
        style={{ color: focusIntensity > 0.7 ? '#fff' : 'rgba(255,255,255,0.7)' }}
      >
         <CountUp end={value} suffix={suffix} start={shouldCount} />
      </div>
      <p 
        className="text-[8px] font-black uppercase tracking-widest transition-colors duration-300"
        style={{ color: focusIntensity > 0.7 ? '#bf00ff' : 'rgb(113, 113, 122)' }}
      >
        {label}
      </p>
    </div>
  );
};

export const MobHRDepartment: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hr-m-hero", { y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" });
      
      gsap.utils.toArray('.reveal-up').forEach((el: any) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 1,
          scrollTrigger: { trigger: el, start: "top 90%" }
        });
      });

      gsap.fromTo(".timeline-line-m", 
        { height: 0 },
        { height: "100%", ease: "none", scrollTrigger: { trigger: ".timeline-m-container", start: "top center", end: "bottom center", scrub: 0.5 } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const HR_STORY = [
    { title: "The Genesis", year: "Est. 2023", icon: Flag, content: "The Human Resources Department was founded in 2023. Beginning its journey with four committed members, the department was built with a clear purpose: to structure people, uphold values, and ensure growth with integrity." },
    { title: "Leadership", year: "Evolution", icon: Users, content: "Under the leadership of Kashfia Anjum Rahman, current Head of HR, the department evolved from a foundational unit into one of the organization’s most structured and impactful pillars." },
    { title: "The Framework", year: "Operations", icon: Layers, content: "Today, HR operates as the human framework of Forte-FY. It oversees recruitment, performance, and culture, ensuring that every member operates within a transparent and ethical system." }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#bf00ff] overflow-x-hidden">
      <header className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex items-center gap-4 bg-black/60 backdrop-blur-md border-b border-[#bf00ff]/10">
        <button onClick={onBack} className="p-2 rounded-full bg-[#bf00ff]/10 text-[#bf00ff] active:scale-90 transition-transform">
          <ChevronLeft size={22} />
        </button>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#bf00ff]">Human Resources</span>
      </header>

      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[#bf00ff]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
         <h1 className="hr-m-hero text-6xl font-heading font-black leading-[0.85] tracking-tighter uppercase mb-2">Human</h1>
         <h1 className="hr-m-hero text-6xl font-heading font-black leading-[0.85] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#bf00ff] to-[#4c1d95] mb-8">Resources</h1>
         <div className="hr-m-hero w-12 h-1 bg-[#bf00ff] rounded-full mb-8" />
         <p className="hr-m-hero text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">Where People Become Pillars</p>
         <div className="absolute bottom-12 animate-bounce">
            <Clock size={20} className="text-[#bf00ff]/40" />
         </div>
      </section>

      {/* COMPACT HEAD MESSAGE SECTION */}
      <section className="pt-12 pb-10 px-6 border-t border-[#bf00ff]/10 bg-gradient-to-b from-black to-[#0a0a0a]">
         <div className="reveal-up text-center mb-4">
            <span className="text-[9px] font-mosaic font-bold uppercase tracking-[0.4em] text-[#bf00ff]">Department Head</span>
         </div>
         <div className="reveal-up flex flex-col items-center">
            <div className="relative mb-4">
               <div className="absolute -inset-1 rounded-full border-2 border-dashed border-[#bf00ff]/30 animate-spin-slow" />
               <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#bf00ff] p-1">
                  <SmartHeadImage 
                    src="https://i.postimg.cc/W1HSq4Tn/Whats-App-Image-2026-01-31-at-9-57-06-PM.jpg" 
                    alt="Head" 
                    className="w-full h-full object-cover object-top rounded-full" 
                  />
               </div>
            </div>
            <h3 className="text-base font-heading font-black uppercase text-center mb-3 tracking-tight">KASHFIA ANJUM RAHMAN</h3>
            <div className="relative max-w-xs">
               <Quote className="absolute -left-2 -top-2 opacity-10 text-[#bf00ff]" size={20} />
               <p className="text-[13px] font-heading font-bold leading-tight text-center italic text-[#bf00ff] px-4 uppercase tracking-tighter">
                  "HR ISN'T ABOUT POLICING POLICIES; IT'S ABOUT UNLOCKING HUMAN POTENTIAL."
               </p>
            </div>
         </div>
      </section>

      {/* IMPACT ANALYTICS GRID (New Components using Home Page Focus logic) */}
      <section className="py-12 px-6">
         <div className="reveal-up text-center mb-6">
            <h2 className="text-sm font-heading font-black uppercase tracking-[0.2em] text-white">Impact Analytics</h2>
         </div>
         
         <div className="reveal-up overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.01]">
            <div className="grid grid-cols-2">
               {[
                 { l: "Recruits", v: 1500, s: "+", i: Users },
                 { l: "Sessions", v: 50, s: "+", i: Target },
                 { l: "Operations", v: 3, s: "Y+", i: Calendar },
                 { l: "Growth", v: 100, s: "%", i: Sparkles }
               ].map((m, i) => (
                 <ImpactCardMob key={i} label={m.l} value={m.v} suffix={m.s} icon={m.i} />
               ))}
            </div>
         </div>
      </section>

      <section className="py-24 px-6 timeline-m-container relative">
         <div className="absolute left-[34px] top-32 bottom-24 w-px bg-white/10">
            <div className="timeline-line-m w-full bg-[#bf00ff] shadow-[0_0_10px_#bf00ff]" />
         </div>
         <h2 className="reveal-up text-4xl font-heading font-black uppercase italic mb-20 ml-12">The Journey.</h2>
         <div className="space-y-20 relative">
            {HR_STORY.map((item, i) => (
              <div key={i} className="reveal-up flex gap-8 pl-4">
                 <div className="relative z-10">
                    <div className="w-10 h-10 rounded-full bg-black border border-[#bf00ff] flex items-center justify-center text-[#bf00ff]">
                       <item.icon size={18} />
                    </div>
                 </div>
                 <div className="flex-1 pb-10">
                    <span className="text-[10px] font-black text-[#bf00ff] uppercase tracking-widest">{item.year}</span>
                    <h4 className="text-2xl font-bold uppercase mb-4">{item.title}</h4>
                    <p className="text-base font-light leading-relaxed text-zinc-400 text-justify">{item.content}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>

      <footer className="py-20 text-center border-t border-white/5 opacity-20">
         <span className="text-[9px] font-mono uppercase tracking-[0.5em]">HR Directorate • Forte-FY</span>
      </footer>
    </div>
  );
};
