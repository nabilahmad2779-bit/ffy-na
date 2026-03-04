
import React, { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react';
import { 
  ArrowLeft, Minimize2, 
  Brush, Box, PenTool, Code, 
  PaintBucket, MoveRight, Activity, ArrowUpRight,
  Sun, Moon, Terminal, Cpu, Layout, Globe, Database, Server, ChevronRight,
  Users, Clock, Zap, BarChart3, Radio, UploadCloud, Lock, CheckCircle, AlertCircle, Sparkles, ScanLine, ChevronDown, Info, CheckCircle2, Target, Quote
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ITHeader } from '../../code/ITHeaderFooter';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// UTILITY: SCROLL AWARE HEAD IMAGE
// ==========================================

const ScrollAwareHeadImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    gsap.to(img, {
      y: -30,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <img 
      ref={imgRef}
      src={src} 
      alt={alt} 
      className={className}
      referrerPolicy="no-referrer"
    />
  );
};

// ==========================================
// UTILITY: SCRAMBLE TEXT
// ==========================================

const ScrambleText: React.FC<{ text: string; className?: string; hoverTrigger?: boolean; speed?: number }> = ({ 
  text, 
  className = "", 
  hoverTrigger = false,
  speed = 40 
}) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}/[]*!@#";
  const intervalRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, speed);
  }, [text, speed]);

  useEffect(() => {
    if (!hoverTrigger) scramble();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [text]);

  return (
    <span 
      className={className}
      onMouseEnter={hoverTrigger ? scramble : undefined}
    >
      {display}
    </span>
  );
};

// ==========================================
// UTILITY: COUNT UP
// ==========================================

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
          let animationFrameId: number;

          const animate = (currentTime: number) => {
             if (!startTime) startTime = currentTime;
             const progress = currentTime - startTime;
             const ease = (x: number): number => 1 - Math.pow(1 - x, 4);
             
             if (progress < duration) {
                setCount(Math.floor(end * ease(progress / duration)));
                animationFrameId = requestAnimationFrame(animate);
             } else {
                setCount(end);
             }
          };
          animationFrameId = requestAnimationFrame(animate);
          return () => cancelAnimationFrame(animationFrameId);
        }
      }, { threshold: 0.2 } 
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);
  return <span ref={nodeRef}>{count.toLocaleString()}{suffix}</span>;
};

// ==========================================
// TYPES & DATA STRUCTURES
// ==========================================

interface DepartmentProps {
  dept: any;
  navigate: (path: string) => void;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CreativeTool {
  id: string;
  name: string;
  category: 'design' | 'dev';
  logo: string;
  description: string;
  color: string;
}

// ==========================================
// CONSTANTS
// ==========================================

const LOGOS = {
  ai: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
  ps: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
  ae: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
  pr: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
  canva: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  ts: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  js: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  vscode: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
};

const TOOLS: CreativeTool[] = [
  { id: 'ai', name: 'Illustrator', category: 'design', logo: LOGOS.ai, description: 'Vector Precision', color: '#ff9a00' },
  { id: 'ps', name: 'Photoshop', category: 'design', logo: LOGOS.ps, description: 'Raster Imaging', color: '#31a8ff' },
  { id: 'canva', name: 'Canva', category: 'design', logo: LOGOS.canva, description: 'Rapid Prototyping', color: '#00c4cc' },
  { id: 'ae', name: 'After Effects', category: 'design', logo: LOGOS.ae, description: 'Motion Graphics', color: '#9999ff' },
  { id: 'react', name: 'React', category: 'dev', logo: LOGOS.react, description: 'Frontend Logic', color: '#61dafb' },
  { id: 'ts', name: 'TypeScript', category: 'dev', logo: LOGOS.ts, description: 'Type Safety', color: '#3178c6' },
  { id: 'node', name: 'Node.js', category: 'dev', logo: LOGOS.node, description: 'Backend Systems', color: '#68a063' },
  { id: 'py', name: 'Python', category: 'dev', logo: LOGOS.python, description: 'Data Science', color: '#3776ab' },
];

// ==========================================
// FEATURE: TECH GRID BACKGROUND
// ==========================================

const TechGridBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-700">
       <div className={`absolute inset-0 ${isDark ? 'bg-[#020202] opacity-90' : 'bg-slate-50 opacity-95'} transition-colors duration-700`} />
       
       <div 
         className="absolute inset-0"
         style={{
            backgroundImage: `linear-gradient(to right, ${isDark ? 'rgba(0, 247, 255, 0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px), linear-gradient(to bottom, ${isDark ? 'rgba(0, 247, 255, 0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            transform: 'perspective(500px) rotateX(60deg) translateY(0) scale(3)',
            transformOrigin: 'top center',
            animation: 'grid-move 20s linear infinite',
            opacity: isDark ? 0.3 : 0.6
         }}
       />
       
       <div className={`absolute inset-0 ${isDark ? 'opacity-40' : 'opacity-20'}`}>
          {[...Array(20)].map((_, i) => (
             <div 
               key={i}
               className={`absolute top-0 w-[1px] ${isDark ? 'bg-gradient-to-b from-transparent via-cyan-500 to-transparent' : 'bg-gradient-to-b from-transparent via-purple-500 to-transparent'} animate-rain`}
               style={{
                  left: `${Math.random() * 100}%`,
                  height: `${Math.random() * 40 + 10}%`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  animationDelay: `${Math.random() * 2}s`
               }}
             />
          ))}
       </div>

       <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
             <div
               key={`geo-${i}`}
               className={`absolute border rounded-full animate-float-slow blur-sm ${isDark ? 'border-purple-500/10 opacity-20' : 'border-purple-600/10 opacity-30'}`}
               style={{
                  width: `${Math.random() * 200 + 50}px`,
                  height: `${Math.random() * 200 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 15 + 10}s`,
               }}
             />
          ))}
       </div>

       <style>{`
          @keyframes grid-move { 0% { background-position: 0 0; } 100% { background-position: 0 60px; } }
          @keyframes rain { 0% { transform: translateY(-100%); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
          .animate-rain { animation: rain linear infinite; }
       `}</style>
    </div>
  );
};

// ==========================================
// FEATURE: HERO "THE ATELIER" (PARALLAX)
// ==========================================

const AtelierHero: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.from(".hero-char", { y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: "power3.out" });
      gsap.from(".hero-line", { scaleX: 0, duration: 1.2, ease: "expo.out", delay: 0.5 });
      gsap.from(".hero-sub", { y: 20, opacity: 0, duration: 1, delay: 0.8 });
      
      // Robust Icon Entrance
      gsap.fromTo(".floating-icon-entrance", 
         { scale: 0, opacity: 0 },
         { scale: 1, opacity: 1, duration: 0.8, delay: 1.2, stagger: 0.1, ease: "back.out(1.7)" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 40;
    const yPos = (clientY / window.innerHeight - 0.5) * 40;

    gsap.to(".parallax-layer-1", { x: xPos, y: yPos, duration: 1, ease: "power2.out" });
    gsap.to(".parallax-layer-2", { x: xPos * -1.5, y: yPos * -1.5, duration: 1.2, ease: "power2.out" });
    gsap.to(".parallax-layer-3", { x: xPos * 0.5, y: yPos * 0.5, duration: 1.5, ease: "power2.out" });
  };

  // Detailed Floating Icons Configuration - SHUFFLED & REPOSITIONED TO EDGES
  const floatingIcons = [
    { id: 'react', logo: LOGOS.react, label: 'React', position: 'top-[12%] right-[8%]', animation: 'animate-float-medium', layer: 'parallax-layer-1' },
    { id: 'ps', logo: LOGOS.ps, label: 'Photoshop', position: 'bottom-[15%] left-[5%]', animation: 'animate-float-medium', layer: 'parallax-layer-2' },
    { id: 'node', logo: LOGOS.node, label: 'Node.js', position: 'top-[45%] left-[12%]', animation: 'animate-float-slow', layer: 'parallax-layer-3' },
    { id: 'ai', logo: LOGOS.ai, label: 'Illustrator', position: 'bottom-[35%] right-[15%]', animation: 'animate-float-slow', layer: 'parallax-layer-1' },
    { id: 'ts', logo: LOGOS.ts, label: 'TypeScript', position: 'top-[20%] left-[8%]', animation: 'animate-float-slow', layer: 'parallax-layer-2' },
    { id: 'ae', logo: LOGOS.ae, label: 'After Effects', position: 'top-[50%] right-[2%]', animation: 'animate-float-medium', layer: 'parallax-layer-3' },
    { id: 'python', logo: LOGOS.python, label: 'Python', position: 'bottom-[10%] right-[15%]', animation: 'animate-float-slow', layer: 'parallax-layer-1' },
    { id: 'canva', logo: LOGOS.canva, label: 'Canva', position: 'top-[8%] right-[25%]', animation: 'animate-float-medium', layer: 'parallax-layer-2' },
    { id: 'js', logo: LOGOS.js, label: 'JavaScript', position: 'bottom-[35%] left-[2%]', animation: 'animate-float-medium', layer: 'parallax-layer-3' },
    { id: 'vscode', logo: LOGOS.vscode, label: 'VS Code', position: 'top-[30%] left-[15%]', animation: 'animate-float-slow', layer: 'parallax-layer-1' },
    { id: 'git', logo: LOGOS.git, label: 'Git', position: 'bottom-[8%] left-[20%]', animation: 'animate-float-medium', layer: 'parallax-layer-2' },
    { id: 'html', logo: LOGOS.html, label: 'HTML5', position: 'top-[75%] right-[8%]', animation: 'animate-float-slow', layer: 'parallax-layer-3' },
    { id: 'css', logo: LOGOS.css, label: 'CSS3', position: 'top-[80%] left-[10%]', animation: 'animate-float-medium', layer: 'parallax-layer-1' },
    { id: 'pr', logo: LOGOS.pr, label: 'Premiere Pro', position: 'bottom-[40%] right-[2%]', animation: 'animate-float-slow', layer: 'parallax-layer-2' },
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden z-20"
      onMouseMove={handleMouseMove}
    >
      
      {/* Interactive Floating Icons Container - Using Separated Wrappers */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {floatingIcons.map((item, i) => (
          <div 
            key={item.id}
            className={`absolute ${item.position} pointer-events-auto ${item.layer}`}
          >
             <div className="floating-icon-entrance">
                <div 
                  className={`interactive p-2 md:p-3 rounded-2xl border shadow-lg backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-125 hover:z-50 hover:shadow-[0_0_30px_rgba(0,247,255,0.5)] ${item.animation} group ${isDark ? 'bg-black/40 border-white/10 hover:border-cyan-500' : 'bg-white/60 border-slate-200 hover:border-purple-500'}`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className={`w-8 h-8 md:w-10 md:h-10 p-1.5 rounded-xl transition-colors ${isDark ? 'bg-white/5 group-hover:bg-black/80' : 'bg-white group-hover:bg-white'}`}>
                    <img src={item.logo} alt={item.label} className="w-full h-full object-contain" />
                  </div>
                  {/* Tooltip */}
                  <span className={`absolute top-full mt-2 px-2 py-1 text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 ${isDark ? 'bg-cyan-500 text-black' : 'bg-purple-600 text-white'}`}>
                    {item.label}
                  </span>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-[1400px] h-full flex flex-col items-center justify-center text-center px-4">
        
        {/* Decorative Circles */}
        <div className={`absolute inset-0 pointer-events-none flex items-center justify-center ${isDark ? 'opacity-30' : 'opacity-10'}`}>
           <div className={`w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] border rounded-full animate-spin-slow-reverse border-dashed ${isDark ? 'border-cyan-500/20' : 'border-purple-600/20'}`} />
           <div className={`absolute top-1/4 left-1/4 w-32 h-32 border rounded-lg animate-float-slow opacity-50 rotate-12 ${isDark ? 'border-purple-500/30' : 'border-cyan-600/30'}`} />
        </div>

        <div className="relative z-20 parallax-layer-3">
           <div className="flex items-center justify-center gap-4 mb-6">
              <Brush className="text-cyan-500 animate-pulse" size={24} />
              <ScrambleText text="DEPARTMENT OF" className={`hero-sub text-xs font-black uppercase tracking-[0.4em] ${isDark ? 'text-white' : 'text-slate-800'}`} hoverTrigger={true} />
              <PenTool className="text-purple-500 animate-pulse" size={24} />
           </div>

           <h1 className="text-4xl md:text-6xl lg:text-8xl font-heading font-black uppercase leading-[0.85] tracking-tighter mb-8 interactive">
              <div className="overflow-visible flex justify-center gap-4 px-4 py-0">
                 <span className={`hero-char text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-white via-zinc-200 to-zinc-500' : 'from-slate-900 via-slate-700 to-slate-500'}`}>Information</span>
              </div>
              <div className={`w-full h-1 md:h-2 bg-gradient-to-r rounded-full hero-line my-3 ${isDark ? 'from-cyan-500 via-purple-500 to-cyan-500 shadow-[0_0_20px_#00f7ff]' : 'from-purple-500 via-cyan-500 to-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]'}`} />
              
              {/* FIX: Technology Text Slicing, Spacing, & Clipping */}
              <div className="py-2 overflow-visible px-4">
                 <span 
                   className={`hero-char text-transparent bg-clip-text bg-gradient-to-r italic pr-6 pl-2 inline-block ${isDark ? 'from-cyan-400 to-purple-500' : 'from-purple-600 to-cyan-600'}`} 
                   style={{ lineHeight: 1.3, paddingBottom: '0.2em' }}
                 >
                   Technology
                 </span>
              </div>
           </h1>

           <p className={`hero-sub text-lg md:text-2xl font-light italic max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
              "We don't just code. We craft. From pixel-perfect posters to robust digital infrastructure."
           </p>
        </div>
      </div>
      
      <style>{`
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes float-medium { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-spin-slow-reverse { animation: spin-rev 60s linear infinite; }
        @keyframes spin-rev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
      `}</style>
    </section>
  );
};

// ==========================================
// FEATURE: BACKGROUND & DEVELOPMENT (VERTICAL TIMELINE)
// ==========================================

const BackgroundAndDevelopment: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
       // Line fill animation
       gsap.fromTo(".it-timeline-line-fill", 
          { height: "0%" },
          { 
            height: "100%", 
            ease: "none",
            scrollTrigger: { 
              trigger: ".it-timeline-wrapper", 
              start: "top center", 
              end: "bottom center", 
              scrub: 0.5 
            }
          }
       );

       // Nodes (Circles) filling with color
       gsap.utils.toArray('.it-timeline-node').forEach((node: any) => {
         gsap.to(node, {
           borderColor: isDark ? '#00f7ff' : '#9333ea',
           scale: 1.3,
           duration: 0.2,
           scrollTrigger: {
             trigger: node,
             start: "center 60%", // Activate when node reaches center-ish
             end: "bottom 40%",
             toggleActions: "play reverse play reverse",
           }
         });
       });

       // Content Reveal
       gsap.utils.toArray('.it-timeline-item').forEach((item: any) => {
         gsap.fromTo(item.querySelectorAll('.it-content-reveal'),
            { y: 50, opacity: 0 },
            { 
               y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
               scrollTrigger: { trigger: item, start: "top 80%" }
            }
         );
       });
    }, containerRef);

    // CRITICAL FIX: Force refresh of ScrollTrigger to account for any layout shifts
    const timer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);

    return () => {
        ctx.revert();
        clearTimeout(timer);
    };
  }, [isDark]);

  const milestones = [
    { 
       year: '2022', 
       title: 'System Initialization', 
       tag: 'ROOT_ACCESS',
       desc: 'The IT Department was initialized to digitize operations, migrating from manual analog logs to secure cloud databases.',
    },
    { 
       year: '2023', 
       title: 'The Portal Era', 
       tag: 'DEPLOYMENT',
       desc: 'Launched the first proprietary event registration engine, successfully handling 5,000+ concurrent users for "Cosmic Quest".',
    },
    { 
       year: '2024', 
       title: 'Full Stack Evolution', 
       tag: 'SCALING',
       desc: 'Established a dedicated development division. Implemented real-time analytics and dynamic content rendering for "Mosaic Stories".',
    }
  ];

  return (
    <section ref={containerRef} className={`py-32 relative ${isDark ? 'border-b border-white/5' : 'border-b border-black/5'} overflow-hidden`}>
       <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-24">
             <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 ${isDark ? 'bg-cyan-900/10 border-cyan-500/30 text-cyan-500' : 'bg-purple-50 border-purple-200 text-purple-600'}`}>
                <Terminal size={12} />
                <ScrambleText text="SYSTEM LOGS" className="text-[10px] font-mono font-bold uppercase tracking-widest" hoverTrigger={true} />
             </div>
             <h2 className={`text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-slate-900'} interactive`}>
                Background & <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-cyan-400 to-purple-500' : 'from-purple-600 to-cyan-600'}`}>Development</span>
             </h2>
          </div>

          {/* Timeline */}
          <div className="it-timeline-wrapper relative">
             {/* Central Line - Fixed Z-Index to be behind nodes, Adjusted BG Opacity for Dark Mode */}
             <div className={`absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 ${isDark ? 'bg-white/20' : 'bg-slate-200'} z-0`}>
                <div className={`it-timeline-line-fill absolute top-0 left-0 w-full ${isDark ? 'bg-cyan-500 shadow-[0_0_15px_#00f7ff]' : 'bg-purple-600'}`} />
             </div>

             <div className="space-y-24">
                {milestones.map((item, i) => (
                   <div key={i} className={`it-timeline-item relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} z-10`}>
                      
                      {/* Year / Tag Side */}
                      <div className={`md:w-1/2 flex ${i % 2 === 0 ? 'md:justify-start md:pl-24' : 'md:justify-end md:pr-24'} pl-12 md:pl-0 w-full`}>
                         <div className="it-content-reveal relative group interactive">
                            <span className={`text-6xl md:text-8xl font-heading font-black text-transparent stroke-text opacity-30 group-hover:opacity-100 transition-opacity duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                               <ScrambleText text={item.year} hoverTrigger={true} speed={60} />
                            </span>
                            <div className={`absolute -top-3 -right-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg transform group-hover:-translate-y-1 transition-transform ${isDark ? 'bg-cyan-500 text-black' : 'bg-purple-600 text-white'}`}>
                               {item.tag}
                            </div>
                         </div>
                      </div>

                      {/* Node Point (Circle) - Fixed Background to match Section BG to avoid overlap visibility */}
                      <div 
                        className={`it-timeline-node absolute left-[20px] md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full border-[3px] z-20 ${isDark ? 'bg-[#020202] border-zinc-700' : 'bg-slate-50 border-slate-300'} transition-all duration-300 interactive`} 
                      />

                      {/* Content Side */}
                      <div className={`md:w-1/2 w-full pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-24 md:text-right' : 'md:pl-24 md:text-left'}`}>
                         <div className="it-content-reveal">
                            <h3 className={`text-2xl md:text-3xl font-heading font-black uppercase italic mb-4 ${isDark ? 'text-white' : 'text-slate-900'} group-hover:text-cyan-500 transition-colors`}>
                               {item.title}
                            </h3>
                            <p className={`text-sm md:text-lg font-light leading-relaxed mb-4 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                               {item.desc}
                            </p>
                         </div>
                      </div>

                   </div>
                ))}
             </div>
          </div>

       </div>
       <style>{`.stroke-text { -webkit-text-stroke: 1px currentColor; }`}</style>
    </section>
  );
};

// ==========================================
// FEATURE: THE PALETTE (3D Tilt Cards)
// ==========================================

const ThePalette: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'design' | 'dev'>('all');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    gsap.to(card, { rotateX, rotateY, scale: 1.05, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" });
  };

  const filteredTools = activeCategory === 'all' ? TOOLS : TOOLS.filter(t => t.category === activeCategory);

  return (
    <section className={`py-32 px-6 relative border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
      <div className="max-w-7xl mx-auto">
         <div className="text-center mb-16 md:mb-24 relative z-10">
            <h2 className={`text-sm font-black uppercase tracking-[0.5em] mb-6 ${isDark ? 'text-cyan-500' : 'text-purple-600'}`}>Our Instruments</h2>
            
            <div className="py-4 overflow-visible">
               <h3 className={`text-5xl md:text-8xl font-heading font-black uppercase italic mb-8 ${isDark ? 'text-white' : 'text-slate-900'} interactive`}>
                  The <span className={`text-transparent bg-clip-text bg-gradient-to-r pr-6 pb-2 inline-block ${isDark ? 'from-cyan-400 to-purple-500' : 'from-purple-600 to-cyan-600'}`}>Palette</span>
               </h3>
            </div>
            
            <div className="flex items-center justify-center gap-4">
               {['all', 'design', 'dev'].map((cat) => (
                  <button 
                     key={cat}
                     onClick={() => setActiveCategory(cat as any)}
                     className={`interactive px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                        activeCategory === cat 
                           ? (isDark ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_20px_#00f7ff]' : 'bg-purple-600 text-white border-purple-600 shadow-[0_0_20px_rgba(147,51,234,0.4)]') 
                           : (isDark ? 'bg-black/50 text-zinc-500 border-white/10 hover:text-white hover:border-cyan-500' : 'bg-white text-slate-500 border-slate-200 hover:text-purple-600 hover:border-purple-600')
                     }`}
                  >
                     {cat === 'all' ? 'Full Stack' : cat === 'design' ? 'Visual Arts' : 'Engineering'}
                  </button>
               ))}
            </div>
         </div>

         <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 perspective-1000">
            {filteredTools.map((tool) => (
               <div 
                  key={tool.id} 
                  className="group relative aspect-square rounded-3xl cursor-pointer interactive"
                  style={{ transformStyle: "preserve-3d" }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
               >
                  <div className={`absolute inset-0 backdrop-blur-xl rounded-3xl border transition-colors shadow-lg overflow-hidden ${isDark ? 'bg-black/40 border-white/10 group-hover:border-cyan-500/50' : 'bg-white border-slate-200 group-hover:border-purple-500/50 shadow-xl'}`}>
                      {/* Internal Glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br rounded-3xl ${isDark ? 'from-white/5 to-transparent' : 'from-purple-500/5 to-transparent'}`} />
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10" style={{ transform: "translateZ(20px)" }}>
                         <div 
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 shadow-2xl p-3 overflow-hidden ${isDark ? 'bg-white/5 group-hover:shadow-[0_0_30px_rgba(0,247,255,0.3)]' : 'bg-slate-50 group-hover:shadow-[0_0_30px_rgba(147,51,234,0.2)]'}`}
                            style={{ borderColor: `1px solid ${tool.color}40` }}
                         >
                            <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain" />
                         </div>
                         <h4 className={`font-bold uppercase tracking-wide mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{tool.name}</h4>
                         <p className={`text-[10px] uppercase tracking-widest ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>{tool.description}</p>
                      </div>
                      
                      {/* Decorative Corners */}
                      <div className={`absolute top-2 left-2 w-2 h-2 border-t border-l ${isDark ? 'border-white/20' : 'border-black/10'}`} />
                      <div className={`absolute top-2 right-2 w-2 h-2 border-t border-r ${isDark ? 'border-white/20' : 'border-black/10'}`} />
                      <div className={`absolute bottom-2 left-2 w-2 h-2 border-b border-l ${isDark ? 'border-white/20' : 'border-black/10'}`} />
                      <div className={`absolute bottom-2 right-2 w-2 h-2 border-b border-r ${isDark ? 'border-white/20' : 'border-black/10'}`} />
                  </div>
               </div>
            ))}
         </div>
      </div>
    </section>
  );
};

// ==========================================
// FEATURE: SYSTEM METRICS (REDESIGNED)
// ==========================================

const ITStatsSection: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const metrics = [
    { id: 1, label: "Designs Shipped", value: 221, suffix: "", icon: PaintBucket, color: "text-pink-500", status: "OPTIMAL", bg: "from-pink-500/10 to-transparent", border: "group-hover:border-pink-500/50" },
    { id: 2, label: "Uptime Hours", value: 1000, suffix: "+", icon: Clock, color: "text-blue-500", status: "ACTIVE", bg: "from-blue-500/10 to-transparent", border: "group-hover:border-blue-500/50" },
    { id: 3, label: "Users Trained", value: 60, suffix: "+", icon: Users, color: "text-yellow-500", status: "EXPANDING", bg: "from-yellow-500/10 to-transparent", border: "group-hover:border-yellow-500/50" },
    { id: 4, label: "Workshops Executed", value: 14, suffix: "", icon: Layout, color: "text-purple-500", status: "COMPLETE", bg: "from-purple-500/10 to-transparent", border: "group-hover:border-purple-500/50" },
    { id: 5, label: "Lines of Code", value: 12500, suffix: "+", icon: Code, color: "text-cyan-500", status: "COMPILING", bg: "from-cyan-500/10 to-transparent", border: "group-hover:border-cyan-500/50" },
  ];

  return (
    <section ref={containerRef} className={`py-32 relative ${isDark ? 'border-t border-white/5' : 'border-t border-black/5'} overflow-hidden`}>
       <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
             <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 ${isDark ? 'bg-cyan-900/10 border-cyan-500/30 text-cyan-500' : 'bg-purple-50 border-purple-200 text-purple-600'}`}>
                <Activity size={12} className="animate-pulse" />
                <ScrambleText text="SYSTEM OUTPUT" className="text-[10px] font-mono font-bold uppercase tracking-widest" hoverTrigger={true} />
             </div>
             {/* Fix: Using overflow-visible on container, and applying inline-block with padding to span to prevent 'S' clipping */}
             <div className="overflow-visible pb-4">
                 <h2 className={`text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'} interactive`}>
                    Performance <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-cyan-400 to-purple-500' : 'from-purple-600 to-cyan-600'} inline-block pr-4 pb-2`}>Metrics</span>
                 </h2>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
             {metrics.map((m) => (
                <div key={m.id} className={`group relative h-[300px] rounded-xl border ${isDark ? 'bg-[#050505] border-white/10' : 'bg-white border-slate-200'} transition-all duration-500 ${m.border} hover:-translate-y-2 interactive overflow-hidden flex flex-col`}>
                   
                   {/* Background Gradient */}
                   <div className={`absolute inset-0 bg-gradient-to-b ${m.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                   
                   {/* Header Status */}
                   <div className="p-6 border-b border-white/5 flex justify-between items-center relative z-10">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-100'} ${m.color}`}>
                         <m.icon size={18} />
                      </div>
                      <div className="flex items-center gap-2">
                         <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-green-500' : 'bg-green-600'} animate-pulse`} />
                         <span className={`text-[9px] font-mono font-bold ${m.color} tracking-wider`}>{m.status}</span>
                      </div>
                   </div>

                   {/* Main Metric */}
                   <div className="flex-1 p-6 flex flex-col justify-center relative z-10">
                      <h3 className={`text-5xl font-heading font-black mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                         <CountUp end={m.value} suffix={m.suffix} />
                      </h3>
                      <p className={`text-[10px] font-mono uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-slate-500'} group-hover:text-white transition-colors`}>{m.label}</p>
                   </div>

                   {/* Footer Graph Effect */}
                   <div className="p-6 relative z-10">
                      <div className="flex items-end gap-1 h-8 w-full opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                         {[...Array(8)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`flex-1 rounded-sm ${m.color.replace('text-', 'bg-')}`} 
                              style={{ 
                                 height: `${Math.random() * 100}%`,
                                 animation: `bar-bounce 1s infinite ${i * 0.1}s`
                              }} 
                            />
                         ))}
                      </div>
                   </div>
                   
                   {/* Scanning Line Effect */}
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none" />
                </div>
             ))}
          </div>
       </div>
       <style>{`
          @keyframes scan { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
          @keyframes bar-bounce { 0%, 100% { transform: scaleY(0.5); } 50% { transform: scaleY(1); } }
          .animate-scan { animation: scan 2s linear infinite; }
       `}</style>
    </section>
  );
};

// ==========================================
// FEATURE: RECRUITMENT (Redesigned with Detail View)
// ==========================================

const RecruitmentStudio: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo(".roster-row", 
           { x: -50, opacity: 0 },
           { 
              x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
              scrollTrigger: { trigger: ".roster-container", start: "top 80%" }
           }
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const toggleRole = (id: string) => {
    setExpandedRole(expandedRole === id ? null : id);
  };

  const roles = [
    { 
       id: 'graphic', 
       title: 'Graphic Designer', 
       status: 'ACTIVE', 
       icon: PaintBucket,
       available: true,
       description: "We are looking for creative visionaries who can translate complex ideas into compelling visual narratives. You will work on branding, event assets, and social media content.",
       requirements: ["Proficiency in Adobe Photoshop & Illustrator", "Understanding of typography and layout", "Ability to work under tight deadlines", "Portfolio demonstrating creative versatility"],
       perks: ["Access to premium design tools", "Mentorship from senior designers", "Certificate of Contribution"]
    },
    { 
       id: 'dev-full', 
       title: 'Web Developer', 
       status: 'STANDBY', 
       icon: Code,
       available: false,
       description: "Architecting the digital future of our non-profit. This role involves maintaining our React-based platform, optimizing performance, and building new features.",
       requirements: ["Strong grasp of React & TypeScript", "Experience with Tailwind CSS", "Basic knowledge of backend integration", "Git version control workflow"],
       perks: ["Real-world project experience", "Code reviews by industry pros", "Letter of Recommendation"]
    }
  ];

  return (
    <section ref={containerRef} className="roster-section py-32 relative overflow-hidden">
       <div className={`absolute inset-0 opacity-[0.03] pointer-events-none ${isDark ? 'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)]'}`} style={{ backgroundSize: '40px 40px' }} />
       
       <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 roster-header">
             <div>
                {/* Fix: Added padding bottom (pb-4) and inline-block span padding to prevent 'O' clipping in 'Studio' */}
                <h2 className={`text-4xl md:text-6xl font-heading font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'} interactive pb-4 overflow-visible leading-tight`}>
                   Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 inline-block pr-4 pb-2">Studio</span>
                </h2>
                <p className={`text-sm md:text-base font-light mt-2 max-w-lg ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                   Scouting for specific creative talents to join our core unit.
                </p>
             </div>
             <div className={`px-4 py-2 border rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${isDark ? 'border-cyan-500/20 text-cyan-500 bg-cyan-500/5' : 'border-purple-200 text-purple-600 bg-purple-50'}`}>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
                Roster Status: Partial
             </div>
          </div>

          <div className={`roster-container rounded-3xl border overflow-hidden relative transition-all duration-500 ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200 shadow-xl'}`}>
             
             <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b ${isDark ? 'from-cyan-500/5' : 'from-purple-500/5'} to-transparent animate-scan-slow`} />
             </div>

             <div className={`hidden md:grid grid-cols-12 px-8 py-5 border-b text-[10px] font-black uppercase tracking-widest relative z-10 ${isDark ? 'border-white/5 text-zinc-500 bg-black/20' : 'border-slate-100 text-slate-400 bg-slate-50/50'}`}>
                <div className="col-span-5">Role Designation</div>
                <div className="col-span-3 text-center">System Status</div>
                <div className="col-span-4 text-right">Action Protocol</div>
             </div>

             <div className="divide-y divide-white/5 relative z-10">
                {roles.map((role) => (
                   <div key={role.id} className="group flex flex-col">
                      <div 
                        onClick={() => toggleRole(role.id)}
                        className={`roster-row grid grid-cols-1 md:grid-cols-12 px-8 py-6 items-center gap-4 transition-all duration-300 relative overflow-hidden cursor-pointer ${
                          isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-slate-50'
                        } ${expandedRole === role.id ? (isDark ? 'bg-white/[0.04]' : 'bg-slate-50') : ''}`}
                      >
                          {/* Highlight */}
                          {role.available && (
                             <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isDark ? 'bg-gradient-to-r from-cyan-500/10 via-transparent to-transparent' : 'bg-gradient-to-r from-purple-500/10 via-transparent to-transparent'}`} />
                          )}

                          {/* Title */}
                          <div className="col-span-12 md:col-span-5 flex items-center gap-5">
                             <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative overflow-hidden ${role.available ? (isDark ? 'bg-cyan-500/10 text-cyan-500 shadow-[0_0_15px_rgba(0,247,255,0.2)]' : 'bg-purple-100 text-purple-600') : (isDark ? 'bg-white/5 text-zinc-600' : 'bg-slate-100 text-slate-400')}`}>
                                <role.icon size={20} className="relative z-10" />
                             </div>
                             <div>
                                <h3 className={`text-lg font-bold tracking-tight ${role.available ? (isDark ? 'text-white' : 'text-slate-900') : (isDark ? 'text-zinc-600' : 'text-slate-400')}`}>{role.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                   <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Expand Details</span>
                                   <ChevronDown size={12} className={`text-zinc-500 transition-transform duration-300 ${expandedRole === role.id ? 'rotate-180' : ''}`} />
                                </div>
                             </div>
                          </div>

                          {/* Status */}
                          <div className="col-span-6 md:col-span-3 flex md:justify-center items-center">
                             <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                                role.available 
                                  ? (isDark ? 'border-green-500/30 bg-green-500/10 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]' : 'border-green-200 bg-green-50 text-green-600')
                                  : (isDark ? 'border-white/5 bg-white/5 text-zinc-600' : 'border-slate-100 bg-slate-400')
                             }`}>
                                {role.available ? <ScanLine size={12} className="animate-pulse" /> : <Lock size={12} />}
                                {role.available ? 'Recruiting' : 'Standby'}
                             </div>
                          </div>

                          {/* Action */}
                          <div className="col-span-6 md:col-span-4 flex md:justify-end">
                             <button 
                                onClick={(e) => {
                                   e.stopPropagation();
                                   if (role.available) window.open('https://forms.google.com', '_blank');
                                }}
                                disabled={!role.available}
                                className={`px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 relative overflow-hidden ${
                                   role.available 
                                     ? (isDark ? 'bg-cyan-500 text-black hover:bg-white hover:scale-105 shadow-[0_0_20px_rgba(0,247,255,0.3)]' : 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 shadow-lg')
                                     : 'bg-transparent border border-white/5 text-zinc-600 cursor-not-allowed opacity-50'
                                }`}
                             >
                                <span className="relative z-10 flex items-center gap-2">
                                    {role.available ? 'Apply Now' : 'Waitlist Only'}
                                    {role.available && <ArrowUpRight size={14} />}
                                </span>
                             </button>
                          </div>
                      </div>

                      {/* Expanded Details Panel */}
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedRole === role.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                         <div className={`px-8 py-8 ${isDark ? 'bg-black/40' : 'bg-slate-50/50'} border-t border-white/5 flex flex-col md:flex-row gap-8`}>
                            <div className="flex-1">
                               <h4 className={`text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 ${isDark ? 'text-cyan-500' : 'text-purple-600'}`}>
                                  <Info size={14} /> Role Intel
                               </h4>
                               <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                                  {role.description}
                               </p>
                               <div>
                                  <h5 className={`text-[10px] font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Core Requirements:</h5>
                                  <ul className="space-y-2">
                                     {role.requirements.map((req, i) => (
                                        <li key={i} className={`text-xs flex items-center gap-2 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                                           <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-cyan-500' : 'bg-purple-500'}`} />
                                           {req}
                                        </li>
                                     ))}
                                  </ul>
                               </div>
                            </div>
                            <div className={`w-full md:w-1/3 p-6 rounded-2xl border ${isDark ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200'}`}>
                               <h5 className={`text-[10px] font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Perks & Growth</h5>
                               <ul className="space-y-3">
                                  {role.perks.map((perk, i) => (
                                     <li key={i} className={`text-xs flex items-start gap-2 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                                        <CheckCircle2 size={14} className={isDark ? 'text-green-500' : 'text-green-600'} />
                                        {perk}
                                     </li>
                                  ))}
                               </ul>
                            </div>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
       <style>{`
          @keyframes scan-slow { 0% { transform: translateY(-100%); } 100% { transform: translateY(500%); } }
          .animate-scan-slow { animation: scan-slow 8s linear infinite; }
       `}</style>
    </section>
  );
};

// ==========================================
// FEATURE: SYSTEM HUD
// ==========================================

const SystemHUD: React.FC<{ scrollY: number; isDark: boolean }> = ({ scrollY, isDark }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden hidden lg:block">
      <div className={`absolute bottom-6 right-6 text-right ${isDark ? 'mix-blend-exclusion' : ''}`}>
         <div className={`text-[10px] font-mono mb-1 tracking-widest ${isDark ? 'text-white/50' : 'text-slate-400'}`}>DEPTH_SENSOR</div>
         <div className={`text-xl font-heading font-bold tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {Math.floor(scrollY)}<span className={`text-xs ${isDark ? 'text-white/50' : 'text-slate-400'}`}>px</span>
         </div>
      </div>
      
      {/* Corner Brackets */}
      <div className={`absolute top-6 right-6 w-4 h-4 border-t border-r ${isDark ? 'border-white/20' : 'border-black/20'} ${isDark ? 'mix-blend-exclusion' : ''}`} />
      <div className={`absolute bottom-6 left-6 w-4 h-4 border-b border-l ${isDark ? 'border-white/20' : 'border-black/20'} ${isDark ? 'mix-blend-exclusion' : ''}`} />
    </div>
  );
};

// ==========================================
// MAIN COMPONENT: IT DEPARTMENT
// ==========================================

const ITDepartment: React.FC<DepartmentProps> = ({ dept, navigate, isDark, setIsDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll handler for nav visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setLastScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div ref={containerRef} className={`relative min-h-screen font-sans overflow-x-hidden transition-colors duration-700 ${isDark ? 'bg-[#020202] text-white selection:bg-cyan-500 selection:text-black' : 'bg-slate-50 text-slate-900 selection:bg-purple-400 selection:text-white'}`}>
      
      {/* --- GLOBAL FIXED BACKGROUNDS (Unified World) --- */}
      <div className="fixed inset-0 z-0">
          {/* Removed LiquidCanvas to eliminate cursor fluid effect */}
          <TechGridBackground isDark={isDark} />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10">
          <SystemHUD scrollY={scrollY} isDark={isDark} />
          <div className={`fixed top-0 left-0 w-full h-1 bg-gradient-to-r z-[100] opacity-50 ${isDark ? 'from-cyan-500 via-purple-500 to-cyan-500' : 'from-purple-500 via-pink-500 to-purple-500'}`} />

          <ITHeader navigate={navigate} isDark={isDark} setIsDark={setIsDark} />

          <AtelierHero isDark={isDark} />

          {/* DEPARTMENT HEAD SECTION */}
          <section className={`py-20 md:py-32 px-6 relative z-10 border-t ${isDark ? 'border-white/5' : 'border-black/5'} overflow-hidden`}>
             <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                
                <div className="reveal-text mb-20 flex flex-col items-center">
                   <div className="flex items-center gap-4">
                      <div className={`h-px w-8 md:w-16 ${isDark ? 'bg-cyan-500/40' : 'bg-purple-600/40'}`} />
                      <h2 className={`text-2xl md:text-4xl ${isDark ? 'text-white font-serif font-light tracking-wider' : 'text-purple-600 font-heading font-bold uppercase tracking-[0.2em]'}`}>Department Head's message</h2>
                      <div className={`h-px w-8 md:w-16 ${isDark ? 'bg-cyan-500/40' : 'bg-purple-600/40'}`} />
                   </div>
                </div>

                <div className="reveal-text relative mb-16">
                   <div className={`absolute -inset-4 rounded-full border-[6px] border-dashed ${isDark ? 'border-cyan-500/30' : 'border-purple-600/50'} animate-spin-slow`} style={{ animationDuration: '30s' }} />
                   
                   <div className={`w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-tr ${isDark ? 'from-cyan-500 to-transparent shadow-black/50' : 'from-purple-600 to-transparent shadow-purple-200'} shadow-[0_0_40px_rgba(0,247,255,0.1)] relative z-10`}>
                      <div className={`w-full h-full rounded-full overflow-hidden ${isDark ? 'bg-black' : 'bg-white'} relative transition-colors duration-700`}>
                        <ScrollAwareHeadImage 
                          src="https://i.postimg.cc/Dwc7w14B/IMG-20260302-224634-jpg.jpg" 
                          alt="Mahima Anjum Rahman" 
                          className="w-full h-full object-cover object-top rounded-full"
                        />
                      </div>
                   </div>
                   
                   <div className={`absolute -top-2 -right-2 md:top-0 md:right-0 w-12 h-12 md:w-16 md:h-16 ${isDark ? 'bg-cyan-500' : 'bg-purple-600'} rounded-full flex items-center justify-center text-black shadow-lg z-20`}>
                      <Quote size={24} className="md:w-8 md:h-8 fill-current" />
                   </div>
                </div>
                
                <div className="space-y-8">
                   <h3 className={`reveal-text text-5xl md:text-7xl font-heading font-black uppercase tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-white via-cyan-500/50 to-white' : 'from-slate-900 via-purple-600 to-slate-900'}`}>
                      Mahima Anjum Rahman
                   </h3>
                   <div className="reveal-text max-w-3xl mx-auto relative">
                      <div className={`absolute -left-8 -top-8 ${isDark ? 'text-cyan-500/10' : 'text-purple-600/10'}`}>
                         <Quote size={64} />
                      </div>
                      <p className={`text-xl md:text-3xl font-heading font-light leading-relaxed ${isDark ? 'text-zinc-200' : 'text-purple-900'} relative z-10 transition-colors duration-700`}>
                        "Technology is the silent architect of modern connection. We build the bridges that ideas walk across."
                      </p>
                   </div>
                   <p className={`reveal-text text-xs font-bold tracking-[0.3em] uppercase ${isDark ? 'text-cyan-500/80' : 'text-purple-600/80'} mt-12`}>Head of Information Technology</p>
                </div>
             </div>
          </section>

          <BackgroundAndDevelopment isDark={isDark} />
          <ThePalette isDark={isDark} />
          <ITStatsSection isDark={isDark} />
          <RecruitmentStudio isDark={isDark} />
      </div>

    </div>
  );
};

export default ITDepartment;
