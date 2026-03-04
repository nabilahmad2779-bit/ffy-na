
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { 
  Code, Terminal, Cpu, Layout, Globe, Database, ChevronLeft, Zap, 
  PaintBucket, Clock, Users, ArrowUpRight, CheckCircle2, Lock, ScanLine, Activity, Quote, Server, GitBranch, Command, ChevronRight
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- COUNT UP COMPONENT ---
const CountUp: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
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
      }, { threshold: 0.1 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={nodeRef}>{count.toLocaleString()}{suffix}</span>;
};

// --- DATA & CONSTANTS ---
const LOGOS = {
  ai: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
  ps: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  ae: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
  vscode: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  ts: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  canva: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
  js: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  pr: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg"
};

const TOOLS = [
  { id: 'react', name: 'React', logo: LOGOS.react, color: '#61dafb', cat: 'fullstack' },
  { id: 'node', name: 'Node.js', logo: LOGOS.node, color: '#68a063', cat: 'engineering' },
  { id: 'ai', name: 'Illustrator', logo: LOGOS.ai, color: '#ff9a00', cat: 'visual' },
  { id: 'ps', name: 'Photoshop', logo: LOGOS.ps, color: '#31a8ff', cat: 'visual' },
  { id: 'figma', name: 'Figma', logo: LOGOS.figma, color: '#F24E1E', cat: 'visual' },
  { id: 'py', name: 'Python', logo: LOGOS.python, color: '#3776ab', cat: 'engineering' },
  { id: 'ts', name: 'TypeScript', logo: LOGOS.ts, color: '#3178c6', cat: 'engineering' },
  { id: 'ae', name: 'After Effects', logo: LOGOS.ae, color: '#9999ff', cat: 'visual' },
  { id: 'git', name: 'Git', logo: LOGOS.git, color: '#f05032', cat: 'engineering' },
  { id: 'vscode', name: 'VS Code', logo: LOGOS.vscode, color: '#007acc', cat: 'fullstack' },
];

const MILESTONES = [
  { year: '2022', title: 'System Initialization', tag: 'ROOT', desc: 'Digitizing operations from manual logs to cloud databases.' },
  { year: '2023', title: 'The Portal Era', tag: 'DEPLOY', desc: 'Launched proprietary registration engine for 5000+ users.' },
  { year: '2024', title: 'Full Stack Evolution', tag: 'SCALE', desc: 'Real-time analytics and dynamic content rendering.' }
];

// UPDATED METRICS DATA (Light Mode)
const METRICS = [
  { id: 1, label: "Designs Created", value: 221, suffix: "", icon: PaintBucket, color: "text-[#f43f5e]", bg: "bg-[#f43f5e]", status: "OPTIMAL" },
  { id: 2, label: "Active Hours", value: 1000, suffix: "+", icon: Clock, color: "text-[#3b82f6]", bg: "bg-[#3b82f6]", status: "ACTIVE" },
  { id: 3, label: "Users Trained", value: 60, suffix: "+", icon: Users, color: "text-[#eab308]", bg: "bg-[#eab308]", status: "EXPANDING" },
  { id: 4, label: "Workshops Executed", value: 14, suffix: "", icon: Layout, color: "text-[#a855f7]", bg: "bg-[#a855f7]", status: "COMPLETE" },
  { id: 5, label: "Lines of Code Written", value: 18794, suffix: "", icon: Code, color: "text-[#06b6d4]", bg: "bg-[#06b6d4]", status: "COMPILING" },
];

const ROLES = [
  { 
     title: 'Graphic Designer', 
     status: 'ACTIVE', 
     available: true,
     desc: "Crafting visual narratives for branding and events."
  },
  { 
     title: 'Web Developer', 
     status: 'STANDBY', 
     available: false,
     desc: "Architecting the digital future of our platform."
  }
];

export const MobITDepartment_light: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'fullstack' | 'visual' | 'engineering'>('fullstack');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.from(".it-hero-reveal", { y: 30, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out" });
      gsap.from(".floating-icon", { scale: 0, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.5, ease: "back.out(1.7)" });

      // Standard Reveals
      gsap.utils.toArray('.it-section-reveal').forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 40, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%" }
          }
        );
      });

      // Metric Cards Entrance - Adjusted Trigger
      gsap.fromTo(".metric-card-mob", 
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { 
            trigger: ".metric-grid-mob", 
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      setTimeout(() => ScrollTrigger.refresh(), 500);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const filteredTools = TOOLS.filter(t => {
      if (activeTab === 'fullstack') return true; 
      return t.cat === activeTab;
  });

  return (
    <div ref={containerRef} className="min-h-screen pb-24 bg-slate-50 text-slate-900 transition-colors duration-500 font-sans overflow-x-hidden selection:bg-purple-500 selection:text-white">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-slate-200">
        <button onClick={onBack} className="p-2 rounded-full bg-cyan-50 text-cyan-600 active:scale-90 transition-transform">
          <ChevronLeft size={22} />
        </button>
        <div className="flex items-center gap-2">
           <Terminal size={16} className="text-cyan-600" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600">IT Division</span>
        </div>
      </header>

      {/* HERO SECTION - "THE ATELIER" */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background Pulse & Icons */}
        <div className="absolute inset-0 pointer-events-none">
            {/* Core Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-cyan-500/5 rounded-full blur-[100px] animate-breathing-glow opacity-60" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-purple-600/5 rounded-full blur-[80px]" />
            
            {/* Floating Icons with Higher Opacity & Animation */}
            <div className="absolute top-[15%] left-[5%] floating-icon animate-float-slow"><img src={LOGOS.react} className="w-10 h-10 opacity-30" alt="" /></div>
            <div className="absolute top-[20%] right-[8%] floating-icon animate-float-medium"><img src={LOGOS.ps} className="w-12 h-12 opacity-30" alt="" /></div>
            <div className="absolute bottom-[20%] left-[10%] floating-icon animate-float-medium"><img src={LOGOS.node} className="w-10 h-10 opacity-30" alt="" /></div>
            <div className="absolute bottom-[15%] right-[5%] floating-icon animate-float-slow"><img src={LOGOS.ai} className="w-11 h-11 opacity-30" alt="" /></div>
            
            <div className="absolute top-[10%] left-[40%] floating-icon animate-float-slow"><img src={LOGOS.ts} className="w-8 h-8 opacity-30" alt="" /></div>
            <div className="absolute bottom-[10%] left-[30%] floating-icon animate-float-medium"><img src={LOGOS.git} className="w-9 h-9 opacity-30" alt="" /></div>
            <div className="absolute top-[35%] right-[5%] floating-icon animate-float-slow"><img src={LOGOS.ae} className="w-10 h-10 opacity-30" alt="" /></div>
            <div className="absolute bottom-[40%] left-[5%] floating-icon animate-float-medium"><img src={LOGOS.figma} className="w-8 h-8 opacity-30" alt="" /></div>
            <div className="absolute top-[65%] left-[8%] floating-icon animate-float-slow"><img src={LOGOS.vscode} className="w-8 h-8 opacity-20" alt="" /></div>
            <div className="absolute top-[70%] left-[80%] floating-icon animate-float-medium"><img src={LOGOS.python} className="w-9 h-9 opacity-30" alt="" /></div>
        </div>

        <div className="relative z-10 text-center w-full">
            <div className="it-hero-reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-200 bg-white/80 text-cyan-600 mb-6 shadow-sm">
                <Code size={12} />
                <span className="text-[10px] font-mono uppercase tracking-widest">Sys_Admin_Access</span>
            </div>
            
            <span className="it-hero-reveal text-xs font-mono font-bold tracking-[0.4em] uppercase text-slate-400 mb-4 block">Department of</span>
            
            <div className="it-hero-reveal px-2">
                <h1 className="text-5xl font-heading font-black uppercase italic tracking-tighter leading-[0.85] mb-8 text-slate-900 w-full">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 block">Information</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 block pr-2">Technology.</span>
                </h1>
            </div>
            
            <div className="it-hero-reveal w-16 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 mx-auto mb-8 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
            <p className="it-hero-reveal text-xs font-mono uppercase tracking-[0.2em] text-slate-500 max-w-xs mx-auto">
                "The Technical Backbone"
            </p>
        </div>
      </section>

      {/* DEPARTMENT HEAD SECTION */}
      <section className="py-32 px-6 border-b border-slate-200 bg-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-100 rounded-full blur-[80px]" />
         <div className="it-section-reveal flex flex-col items-center text-center relative z-10">
            <div className="mb-10 relative">
               <div className="w-40 h-40 rounded-full p-1.5 bg-gradient-to-br from-cyan-600 to-purple-600 shadow-lg">
                  <img 
                    src="https://i.postimg.cc/Dwc7w14B/IMG-20260302-224634-jpg.jpg" 
                    alt="Mahima Anjum Rahman" 
                    className="w-full h-full object-cover rounded-full border-4 border-white"
                  />
               </div>
               <div className="absolute -bottom-2 -right-2 bg-cyan-600 text-white p-3 rounded-full border-4 border-white shadow-md">
                  <Quote size={16} fill="currentColor" />
               </div>
            </div>
            
            <h3 className="text-3xl font-heading font-black uppercase italic text-slate-900 mb-2 tracking-tight">Mahima Anjum Rahman</h3>
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-600 mb-8">Head of IT</p>
            
            <p className="text-xl md:text-2xl font-light italic text-slate-500 leading-relaxed max-w-md">
               "Technology is the silent architect of modern connection. We build the bridges that ideas walk across."
            </p>
         </div>
      </section>

      {/* TIMELINE (Background & Development) - FIXED INTERSECTION */}
      <section className="px-6 py-24 relative timeline-container border-b border-slate-200 bg-white">
         {/* Vertical Line - Fixed at left-8 (32px) */}
         <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100 -translate-x-1/2">
            <div className="w-full h-full bg-gradient-to-b from-cyan-500 to-purple-500" />
         </div>
         
         <div className="it-section-reveal mb-16 pl-12">
            <h2 className="text-3xl font-heading font-black uppercase italic text-slate-900">Background & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600">Development.</span>
            </h2>
         </div>

         <div className="space-y-16">
            {MILESTONES.map((item, i) => (
               <div key={i} className="it-section-reveal relative pl-12 group">
                  {/* Dot - Centered exactly at 32px (left-8) with translate-x */}
                  <div className="absolute left-2 top-2 w-3 h-3 -translate-x-1/2 rounded-full bg-white border-2 border-cyan-500 z-10 shadow-sm" />
                  
                  <div className="flex items-center gap-3 mb-2">
                     <span className="text-[10px] font-black font-mono text-cyan-600">{item.year}</span>
                     <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[8px] font-bold uppercase tracking-wider text-slate-500">{item.tag}</span>
                  </div>
                  <h3 className="text-xl font-bold uppercase text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">{item.title}</h3>
                  <p className="text-sm font-light text-slate-600 leading-relaxed">{item.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* THE PALETTE (Tools) */}
      <section className="py-24 px-6 border-b border-slate-200 bg-slate-50">
         <div className="it-section-reveal text-center mb-10">
            <h2 className="text-3xl font-heading font-black uppercase italic text-slate-900">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600">Palette.</span></h2>
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mt-2">Core Instruments</p>
         </div>

         {/* Category Filters */}
         <div className="it-section-reveal flex justify-center gap-3 mb-10">
            {['fullstack', 'visual', 'engineering'].map((cat) => (
                <button 
                    key={cat}
                    onClick={() => setActiveTab(cat as any)}
                    className={`px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all border ${
                        activeTab === cat 
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md' 
                        : 'bg-white text-slate-500 border-slate-200 hover:text-purple-600'
                    }`}
                >
                    {cat === 'fullstack' ? 'Full Stack' : cat === 'visual' ? 'Visual Arts' : 'Engineering'}
                </button>
            ))}
         </div>
         
         <div className="grid grid-cols-2 gap-4 min-h-[300px] content-start">
            {filteredTools.map((tool) => (
               <div 
                 key={tool.id} 
                 className="it-section-reveal p-6 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center text-center gap-4 transition-all shadow-sm group hover:shadow-lg"
               >
                  <div className="w-10 h-10 transition-transform group-hover:scale-110 relative">
                     <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300"
                        style={{ backgroundColor: tool.color }}
                     />
                     <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain relative z-10" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 group-hover:text-purple-600 transition-colors">{tool.name}</span>
               </div>
            ))}
         </div>
      </section>

      {/* SYSTEM OUTPUT (REDESIGNED - CENTERED & BOLDER - LIGHT) */}
      <section className="py-24 px-6 bg-slate-50 border-b border-slate-200">
         <div className="it-section-reveal mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-black uppercase italic text-slate-900 tracking-tighter">
                System <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600">Output.</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 mx-auto mt-4 rounded-full shadow-sm" />
         </div>
         
         <div className="metric-grid-mob grid grid-cols-2 gap-3">
            {METRICS.map((m) => (
               <div key={m.id} className={`metric-card-mob group relative h-[200px] rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm ${m.id === 5 ? 'col-span-2' : ''}`}>
                  
                  {/* Header Status */}
                  <div className="p-4 flex justify-between items-start">
                      <div className={`w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center ${m.color}`}>
                          <m.icon size={16} />
                      </div>
                      <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${m.bg} animate-pulse`} />
                          <span className={`text-[8px] font-black uppercase tracking-wider ${m.color}`}>{m.status}</span>
                      </div>
                  </div>

                  {/* Main Metric */}
                  <div className="px-4 text-center">
                      <h3 className={`text-3xl font-heading font-black mb-1 text-slate-900`}>
                         <CountUp end={Number(m.value)} suffix={m.suffix || ""} />
                      </h3>
                      <p className={`text-[8px] font-black uppercase tracking-[0.2em] text-slate-400`}>{m.label}</p>
                  </div>

                  {/* Footer Graph Effect - Equalizer */}
                  <div className="px-4 pb-4 flex items-end justify-center gap-1 h-8">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-1.5 rounded-t-sm ${m.bg}`} 
                          style={{ 
                              height: '30%',
                              animation: `equalizer 1s infinite ease-in-out ${i * 0.15}s` 
                          }} 
                        />
                      ))}
                  </div>
               </div>
            ))}
         </div>
         
         <style>{`
            @keyframes equalizer {
                0%, 100% { height: 20%; opacity: 0.3; }
                50% { height: 80%; opacity: 1; }
            }
         `}</style>
      </section>

      {/* RECRUITMENT STUDIO */}
      <section className="py-24 px-6 relative overflow-hidden bg-slate-50">
         <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-100 rounded-full blur-[100px] pointer-events-none" />
         
         <div className="it-section-reveal text-center mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 text-purple-600 mb-4 bg-purple-50">
               <Zap size={12} className="animate-pulse" />
               <span className="text-[9px] font-black uppercase tracking-widest">Recruitment Active</span>
            </div>
            <h2 className="text-4xl font-heading font-black uppercase italic text-slate-900">Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600">Studio.</span></h2>
         </div>

         <div className="space-y-4 relative z-10">
            {ROLES.map((role, i) => (
               <div key={i} className={`it-section-reveal p-6 rounded-2xl border transition-all duration-300 ${role.available ? 'bg-purple-50/50 border-purple-200 hover:border-purple-300' : 'bg-slate-100 border-slate-200 opacity-70'}`}>
                  <div className="flex justify-between items-start mb-4">
                     <h3 className="text-lg font-bold text-slate-900">{role.title}</h3>
                     {role.available ? <ScanLine size={16} className="text-cyan-600 animate-pulse" /> : <Lock size={16} className="text-slate-400" />}
                  </div>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">{role.desc}</p>
                  <button 
                     onClick={() => role.available && window.open('https://forms.google.com', '_blank')}
                     disabled={!role.available}
                     className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${role.available ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 hover:bg-purple-700 active:scale-95 transition-all' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                  >
                     {role.available ? 'Apply Now' : 'Standby'}
                     {role.available && <ArrowUpRight size={12} />}
                  </button>
               </div>
            ))}
         </div>
      </section>

      <footer className="py-12 text-center border-t border-slate-200 opacity-40">
         <span className="text-[9px] font-mono uppercase tracking-[0.5em] text-slate-500">IT Directorate • Forte-FY</span>
      </footer>
      
      <style>{`
        @keyframes breathing-glow {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.3); opacity: 0.6; }
        }
        .animate-breathing-glow { animation: breathing-glow 5s ease-in-out infinite; }

        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes float-medium { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 3s ease-in-out infinite; }
        @keyframes bar-bounce { 0%, 100% { transform: scaleY(0.5); } 50% { transform: scaleY(1); } }
        .animate-scan-fast { animation: scan-fast 1.5s linear infinite; }
      `}</style>
    </div>
  );
};
