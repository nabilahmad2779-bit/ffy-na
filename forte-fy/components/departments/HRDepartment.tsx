
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { 
  Users, Heart, ArrowUpRight, 
  CheckCircle2,
  Target, Quote, Calendar, Clock, Layers,
  Flag, Sparkles
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HRHeader, HRFooter } from '../../code/HRHeaderFooter';

// Register GSAP ScrollTrigger
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

// --- COMPONENT: Scroll Aware Head Image ---
const ScrollAwareHeadImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [grayscale, setGrayscale] = useState(100);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      
      const distance = Math.abs(viewportCenter - elementCenter);
      const range = viewportHeight * 0.35; 

      let newGrayscale = 100;
      if (distance < range) {
        newGrayscale = (distance / range) * 100;
      }
      
      setGrayscale(newGrayscale);
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
      style={{ 
        filter: `grayscale(${grayscale}%)`,
      }} 
    />
  );
};

// --- COMPONENT: Timeline Item (Scroll Active) ---
const ScrollRevealText: React.FC<{ 
  item: any; 
  isDark: boolean; 
  theme: any 
}> = ({ item, isDark, theme }) => {
  const { ref, isActive } = useCenterTrigger();
  // Combine hover (desktop) and active (mobile scroll) states
  const activeClass = isActive ? "active-state" : "";

  return (
    <div ref={ref} className={`reveal-text group relative pl-4 md:pl-16 ${activeClass}`}>
       <div className={`absolute left-[3px] md:left-[4px] top-2 w-2.5 h-2.5 rounded-full ${isDark ? 'bg-[#050505]' : 'bg-[#fdfaff]'} border-2 border-[#bf00ff] z-10 hidden md:block transition-all duration-300 ${isActive ? 'bg-[#bf00ff]' : 'group-hover:bg-[#bf00ff]'}`} />
       
       <div className="relative z-10">
           <div className="flex items-center gap-4 mb-6">
               <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-[#bf00ff]/20 ${isDark ? 'bg-white/5' : 'bg-purple-50'} text-[#bf00ff] transition-all duration-500 ${isActive ? 'bg-[#bf00ff] text-white' : 'group-hover:bg-[#bf00ff] group-hover:text-white'}`}>
                  {item.icon}
               </div>
               <span className={`text-xs font-black uppercase tracking-[0.2em] ${theme.subText} transition-colors ${isActive ? 'text-[#bf00ff]' : 'group-hover:text-[#bf00ff]'}`}>
                   {item.year}
               </span>
           </div>
           
           <h3 className={`text-3xl md:text-5xl font-heading font-black uppercase italic mb-6 ${theme.text} transition-colors leading-none ${isActive ? 'text-[#bf00ff]' : 'group-hover:text-[#bf00ff]'}`}>
               {item.title}
           </h3>
           
           <div className="relative">
               <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[#bf00ff] transition-transform duration-500 origin-top ${isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`} />
               
               <p className={`text-lg md:text-xl font-light leading-relaxed text-justify ${theme.paragraphText} pl-6 border-l ${isDark ? 'border-white/10' : 'border-slate-200'} transition-colors ${isActive ? 'border-transparent' : 'group-hover:border-transparent'}`}>
                   {typeof item.content === 'function' ? item.content(isDark) : item.content}
               </p>
           </div>
       </div>
    </div>
  );
};

// --- COMPONENT: Metric Item (Scroll Active) ---
const ScrollMetricItem: React.FC<{ 
  item: any; 
  isDark: boolean; 
  theme: any 
}> = ({ item, isDark, theme }) => {
  const { ref, isActive } = useCenterTrigger();
  
  return (
    <div 
      ref={ref} 
      className={`flex flex-col items-center justify-center text-center group relative p-10 transition-all duration-700 ${isActive ? 'scale-110' : 'hover:scale-110'}`}
    >
       <div className={`absolute inset-0 bg-gradient-to-tr from-[#bf00ff]/20 to-cyan-500/20 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
       
       <div className={`relative z-10 mb-6 transition-all duration-500 ${isActive ? '-translate-y-4 rotate-12 text-white' : `group-hover:-translate-y-4 group-hover:rotate-12 group-hover:text-white ${isDark ? 'text-zinc-500' : 'text-purple-400'}`}`}>
           <item.icon size={64} strokeWidth={1.5} className="drop-shadow-[0_0_15px_rgba(191,0,255,0.5)]" />
       </div>
       
       <h3 className={`relative z-10 text-8xl md:text-[10rem] font-heading font-black tracking-tighter leading-none mb-4 text-transparent bg-clip-text bg-gradient-to-br transition-all duration-700 select-none ${isActive ? 'from-[#bf00ff] via-pink-500 to-cyan-500' : `group-hover:from-[#bf00ff] group-hover:via-pink-500 group-hover:to-cyan-500 ${isDark ? 'from-white via-zinc-400 to-zinc-600' : 'from-slate-900 via-slate-600 to-slate-400'}`}`}>
           <ScrollTriggeredCountUp end={item.value} suffix={item.suffix} start={isActive} />
       </h3>
       
       <p className={`relative z-10 text-sm font-black uppercase tracking-[0.5em] ${theme.subText} transition-colors duration-500 bg-black/20 backdrop-blur-sm px-4 py-1 rounded-full border ${isActive ? 'text-white border-white/20' : 'group-hover:text-white border-white/5 group-hover:border-white/20'}`}>
          {item.label}
       </p>
    </div>
  );
};

const HRDepartment: React.FC<DepartmentProps> = ({ navigate, isDark, setIsDark }) => {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hr-hero-text", 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.1 }
      );

      gsap.utils.toArray('.reveal-text').forEach((text: any) => {
        gsap.fromTo(text, 
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: text,
              start: "top 90%",
            }
          }
        );
      });
      
      gsap.fromTo(".quality-item",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
             trigger: "#qualities-list",
             start: "top 80%"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [isDark]);

  const HR_STORY = [
    {
      title: "The Genesis",
      year: "Est. 2023",
      icon: <Flag className="w-5 h-5" />,
      content: "The Human Resources Department of Forte-FY was founded in 2023, shortly after the organization itself was established. Beginning its journey with four committed members, the department was built with a clear purpose: to structure people, uphold values, and ensure that Forte-FY grows with integrity and discipline."
    },
    {
      title: "Leadership Evolution",
      year: "Leadership",
      icon: <Users className="w-5 h-5" />,
      content: (dark: boolean) => <>Under the leadership of <strong className={dark ? "text-white" : "text-slate-900"}>Kashfia Anjum Rahman</strong>, the current Head of the Human Resources Department, HR evolved from a foundational unit into one of the organization’s most structured and impactful departments.</>
    },
    {
      title: "The Human Framework",
      year: "Operations",
      icon: <Layers className="w-5 h-5" />,
      content: "Today, the Human Resources Department operates as the human framework of Forte-FY. It oversees recruitment, onboarding, performance evaluation, internal communication, and member development. Beyond administrative responsibilities, HR plays a strategic role in cultivating culture, resolving internal challenges, and ensuring that every member operates within a transparent and ethical system."
    },
    {
      title: "Ethical Guardian",
      year: "Philosophy",
      icon: <Heart className="w-5 h-5" />,
      content: "At Forte-FY, Human Resources is not limited to managing roles—it manages relationships, responsibility, and growth. The department ensures that opportunities are distributed fairly, contributions are recognized appropriately, and accountability remains consistent throughout the organization."
    }
  ];

  const METRICS = [
    { label: "Recruitments", value: 1500, suffix: "+", icon: Users },
    { label: "Sessions", value: 50, suffix: "+", icon: Target },
    { label: "Operations", value: 3, suffix: "y+", icon: Calendar },
    { label: "Events Supported", value: 20, suffix: "+", icon: Layers },
    { label: "Recruitment Cycles", value: 16, suffix: "", icon: Clock },
  ];

  const QUALITIES = [
    "Strong interpersonal and communication skills, with the ability to confidently approach, engage, and interact with individuals in a respectful and professional manner",
    "Working proficiency in Microsoft Office applications, including Word, Excel, and PowerPoint, to support documentation and internal processes",
    "Effective performance during organizational events and team activities, demonstrating coordination, adaptability, and a willingness to contribute where needed",
    "A strong sense of responsibility and accountability, with the ability to manage assigned tasks efficiently and meet expectations consistently",
    "Adaptability to changing organizational needs, with the flexibility to respond to evolving responsibilities, priorities, and situations",
    "The ability to work independently when assigned, showing initiative, reliability, and sound judgment while maintaining alignment with team objectives",
    "Openness to mentorship, guidance, and continuous learning, reflecting a growth-oriented mindset and receptiveness to feedback",
    "A long-term commitment to organizational growth and values, with an interest in contributing meaningfully to Forte-FY beyond short-term involvement"
  ];

  const theme = {
    bg: isDark ? "bg-[#050505]" : "bg-[#fdfaff]",
    text: isDark ? "text-white" : "text-slate-900",
    subText: isDark ? "text-zinc-400" : "text-slate-500",
    paragraphText: isDark ? "text-zinc-300" : "text-slate-700",
    heroOverlay: isDark ? "from-black/90 via-black/40 to-[#050505]" : "from-white/95 via-white/60 to-[#fdfaff]",
    heroTextGradient: isDark ? "from-white to-white/50" : "from-[#4c1d95] to-[#bf00ff]",
    contentGradient: isDark ? "from-[#050505] via-[#1a0520] to-[#050505]" : "from-[#fdfaff] via-[#f3e8ff] to-[#fdfaff]",
    quoteText: isDark ? "text-zinc-200" : "text-[#4c1d95]",
    border: isDark ? "border-[#bf00ff]/10" : "border-[#bf00ff]/20",
    profileBorder: isDark ? "border-[#bf00ff]/30" : "border-[#bf00ff]/50",
    headMsgHeader: isDark ? "text-white font-serif font-light tracking-wider" : "text-[#bf00ff] font-heading font-bold uppercase tracking-[0.2em]"
  };

  return (
    <>
      <div 
        ref={containerRef} 
        className={`min-h-screen font-sans selection:bg-[#bf00ff] selection:text-white overflow-x-hidden ${theme.bg} ${theme.text} transition-colors duration-700`}
      >
        <HRHeader navigate={navigate} isDark={isDark} setIsDark={setIsDark} />

        {/* 1. HERO SECTION */}
        <section className={`relative h-screen w-full flex items-center justify-center overflow-hidden ${isDark ? 'bg-black' : 'bg-white'} transition-colors duration-700`}>
          <div className="absolute inset-0 z-0">
            <video 
              ref={videoRef}
              autoPlay 
              muted
              loop 
              playsInline
              className="w-full h-full object-cover grayscale transition-opacity duration-700"
              style={{ opacity: isDark ? 0.4 : 0.08 }}
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-network-connection-complex-lines-2735-large.mp4" type="video/mp4" />
            </video>
            <div className={`absolute inset-0 bg-gradient-to-b ${theme.heroOverlay} transition-colors duration-700`} />
            
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#bf00ff] rounded-full blur-[160px] animate-pulse pointer-events-none transition-opacity duration-700 ${isDark ? 'opacity-40' : 'opacity-30'}`}
              style={{ animationDuration: '4s' }}
            />
          </div>

          <div className={`relative z-10 text-center px-4 w-full max-w-[90vw] ${theme.text}`}>
            <h1 className={`hr-hero-text text-[12vw] md:text-[13vw] font-heading font-black leading-[0.8] tracking-tighter w-full ${isDark ? 'text-white' : 'text-slate-900'} transition-colors duration-700`}>
              HUMAN
            </h1>
            <h1 className={`hr-hero-text text-[12vw] md:text-[13vw] font-heading font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b ${theme.heroTextGradient} w-full transition-all duration-700`}>
              RESOURCES
            </h1>
            
            <div className="flex flex-col items-center mt-12 gap-4">
               <p className={`text-xs md:text-sm font-mono tracking-[0.3em] uppercase ${theme.subText} transition-colors duration-700`}>
                  Where People Become Pillars
               </p>
               <div className="w-px h-24 bg-[#bf00ff] opacity-50" />
            </div>
          </div>
        </section>

        <div className={`relative bg-gradient-to-b ${theme.contentGradient} transition-colors duration-700`}>
          
          <section className={`py-20 md:py-32 px-6 relative z-10 border-t ${theme.border} overflow-hidden`}>
             <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                
                <div className="reveal-text mb-20 flex flex-col items-center">
                   <div className="flex items-center gap-4">
                      <div className="h-px w-8 md:w-16 bg-[#bf00ff]/40" />
                      <h2 className={`text-2xl md:text-4xl ${theme.headMsgHeader}`}>Department Head's message</h2>
                      <div className="h-px w-8 md:w-16 bg-[#bf00ff]/40" />
                   </div>
                </div>

                <div className="reveal-text relative mb-16">
                   <div className={`absolute -inset-4 rounded-full border-[6px] border-dashed ${theme.profileBorder} animate-spin-slow`} style={{ animationDuration: '30s' }} />
                   
                   <div className={`w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-tr from-[#bf00ff] to-transparent shadow-[0_0_40px_rgba(191,0,255,0.1)] relative z-10 ${isDark ? 'shadow-black/50' : 'shadow-purple-200'}`}>
                      <div className={`w-full h-full rounded-full overflow-hidden ${isDark ? 'bg-black' : 'bg-white'} relative transition-colors duration-700`}>
                        {/* Scroll-Aware Image */}
                        <ScrollAwareHeadImage 
                          src="https://i.postimg.cc/W1HSq4Tn/Whats-App-Image-2026-01-31-at-9-57-06-PM.jpg?auto=format&fit=crop&q=80" 
                          alt="Kashfia Anjum Rahman" 
                          className="w-full h-full object-cover object-top rounded-full"
                        />
                      </div>
                   </div>
                   
                   <div className="absolute -top-2 -right-2 md:top-0 md:right-0 w-12 h-12 md:w-16 md:h-16 bg-[#bf00ff] rounded-full flex items-center justify-center text-black shadow-lg z-20">
                      <Quote size={24} className="md:w-8 md:h-8 fill-current" />
                   </div>
                </div>
                
                <div className="space-y-8">
                   <h3 className={`reveal-text text-5xl md:text-7xl font-heading font-black uppercase tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-white via-[#bf00ff]/50 to-white' : 'from-slate-900 via-[#bf00ff] to-slate-900'}`}>
                      Kashfia Anjum Rahman
                   </h3>
                   <div className="reveal-text max-w-3xl mx-auto relative">
                      <div className="absolute -left-8 -top-8 text-[#bf00ff]/10">
                         <Quote size={64} />
                      </div>
                      <p className={`text-xl md:text-3xl font-heading font-light leading-relaxed ${theme.quoteText} relative z-10 transition-colors duration-700`}>
                        "HR isn't about policing policies; it's about <span className="text-[#bf00ff] font-bold">unlocking human potential</span>. We create the soil where the seeds of leadership can sprout."
                      </p>
                   </div>
                   <p className="reveal-text text-xs font-bold tracking-[0.3em] uppercase text-[#bf00ff]/80 mt-12">Head of Human Resources</p>
                </div>
             </div>
          </section>

          <section className={`py-20 md:py-32 px-6 relative z-10 border-b ${theme.border}`}>
             <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-20 right-0 w-[600px] h-[600px] bg-[#bf00ff]/5 rounded-full blur-[120px] translate-x-1/3`} />
             </div>

             <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">
                <div className="lg:col-span-4">
                   <div className="sticky top-32">
                      <h2 className={`reveal-text text-5xl md:text-7xl font-heading font-black uppercase leading-[0.85] mb-8 ${theme.text}`}>
                         Human<br/>Resources<br/><span className="text-[#bf00ff] text-4xl md:text-5xl block mt-2">at Forte-FY</span>
                      </h2>
                      <div className="w-24 h-2 bg-[#bf00ff] mb-8 rounded-full" />
                      <p className={`text-xs font-mono uppercase tracking-[0.3em] ${theme.subText} mb-12`}>
                          Timeline & Evolution
                      </p>
                   </div>
                </div>
                
                <div className="lg:col-span-8 flex flex-col gap-20 relative">
                     <div className={`absolute left-[7px] md:left-[8px] top-2 bottom-0 w-px bg-gradient-to-b from-[#bf00ff] via-[#bf00ff]/20 to-transparent hidden md:block`} />

                     {HR_STORY.map((item, index) => (
                         <ScrollRevealText key={index} item={item} isDark={isDark} theme={theme} />
                     ))}
                </div>
             </div>
          </section>

          <section className="py-20 md:py-40 px-6 relative z-10 border-b border-[#bf00ff]/10 overflow-hidden">
             <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '2s' }} />
             </div>

             <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-20 text-center">
                   <h2 className={`reveal-text text-4xl md:text-7xl font-heading font-black uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-r animate-gradient-x ${isDark ? 'from-white via-purple-200 to-white' : 'from-purple-900 via-purple-600 to-purple-900'}`}>
                      Our Impact In Numbers
                   </h2>
                   <div className="w-24 h-1.5 bg-gradient-to-r from-[#bf00ff] to-cyan-500 mx-auto rounded-full" />
                </div>

                <div className="flex flex-wrap justify-center gap-x-12 gap-y-20 items-center">
                   {METRICS.map((item, i) => (
                     <ScrollMetricItem key={i} item={item} isDark={isDark} theme={theme} />
                   ))}
                </div>
             </div>
             
             <style>{`
                @keyframes gradient-x {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                .animate-gradient-x {
                  background-size: 200% 200%;
                  animation: gradient-x 6s ease infinite;
                }
             `}</style>
          </section>

          <section className="py-24 md:py-40 px-6 relative overflow-hidden bg-black/20 border-t border-white/5">
             <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#bf00ff] rounded-full blur-[250px] opacity-[0.05] pointer-events-none" />

             <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20 md:mb-32">
                    <h2 className={`reveal-text text-5xl md:text-8xl font-heading font-black uppercase mb-6 text-transparent bg-clip-text bg-gradient-to-b ${isDark ? 'from-white via-white to-white/40' : 'from-slate-900 via-slate-700 to-slate-400'} tracking-tighter`}>
                       Be a Part of Our<br/><span className="text-[#bf00ff]">Human Resources</span> Team
                    </h2>
                    <div className="flex items-center justify-center gap-4">
                       <Sparkles className="text-[#bf00ff] animate-pulse" />
                       <span className={`text-sm md:text-lg font-mono uppercase tracking-[0.3em] ${theme.subText}`}>Official Recruitment Drive</span>
                       <Sparkles className="text-[#bf00ff] animate-pulse" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    <div className="lg:col-span-5 reveal-text">
                        <div className={`p-8 md:p-12 rounded-[2.5rem] ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-purple-100'} border shadow-2xl relative overflow-hidden group`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-[#bf00ff]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            
                            <h3 className="text-3xl md:text-4xl font-heading font-black uppercase italic mb-8 relative z-10 text-white">
                               Role: <span className="text-[#bf00ff]">Human Resources Intern</span>
                            </h3>
                            
                            <div className={`space-y-6 text-lg ${theme.paragraphText} font-light leading-relaxed relative z-10`}>
                               <p>
                                 At Forte-FY, internships are viewed as the foundation for future leadership. As a Human Resources Intern, you will work closely with the HR team to support people management, internal coordination, and the smooth functioning of organizational operations.
                               </p>
                               <p>
                                 This role is designed for individuals who demonstrate professionalism, responsibility, and a genuine interest in working with people within a structured and value-driven environment.
                               </p>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-2">
                                   <Clock className="w-5 h-5 text-[#bf00ff]" />
                                   <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Time Commitment: Flexible</span>
                                </div>
                                <div className="px-4 py-2 bg-[#bf00ff]/20 rounded-full border border-[#bf00ff]/30 text-[#bf00ff] text-xs font-bold uppercase tracking-wider">
                                   Internship
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-10 text-center lg:text-left">
                           <a 
                              href="https://forms.google.com" 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-4 px-10 py-5 bg-[#bf00ff] hover:bg-white text-black font-heading font-black uppercase tracking-widest rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(191,0,255,0.6)] group"
                           >
                              Apply Now
                              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                           </a>
                        </div>
                    </div>

                    <div className="lg:col-span-7" id="qualities-list">
                        <h3 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-tight text-white mb-10 flex items-center gap-4">
                           <Target className="text-[#bf00ff]" />
                           Qualities We Seek in Our Future Leaders
                        </h3>
                        
                        <div className="space-y-4">
                           {QUALITIES.map((quality, idx) => (
                              <div key={idx} className="quality-item group flex items-start gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#bf00ff]/30 transition-all duration-300">
                                 <div className="mt-1 w-6 h-6 rounded-full bg-[#bf00ff]/20 flex items-center justify-center shrink-0 border border-[#bf00ff]/40 group-hover:bg-[#bf00ff] group-hover:scale-110 transition-all duration-300">
                                    <CheckCircle2 size={14} className="text-[#bf00ff] group-hover:text-black transition-colors" />
                                 </div>
                                 <p className={`text-base md:text-lg ${theme.quoteText} font-light leading-snug group-hover:text-white transition-colors`}>
                                    {quality}
                                 </p>
                              </div>
                           ))}
                        </div>
                    </div>
                </div>
             </div>
          </section>

          <HRFooter />
        </div>
      </div>
    </>
  );
};

export default HRDepartment;
