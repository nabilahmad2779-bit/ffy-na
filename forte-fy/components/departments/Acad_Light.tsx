
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { 
  PenTool, BookOpen, Edit3, FileText, 
  Layers, Quote, Mic2, Sparkles, Send, Type,
  ArrowUpRight, ChevronDown, CheckCircle2, ScanLine, 
  Search, GitCommit
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AcadHeader, AcadFooter } from '../../code/AcadHeaderFooter';

gsap.registerPlugin(ScrollTrigger);

// --- UTILITY: COUNT UP ---
const CountUp: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ end, suffix = "", duration = 2000 }) => {
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

  return <span ref={nodeRef}>{count.toLocaleString()}{suffix}</span>;
};

// --- COMPONENT: ACADEMIC ATMOSPHERE LIGHT ---
const AcademicAtmosphereLight: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#fdfcfb]">
      {/* Ink Fog Layers Light */}
      <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-blue-100/80 rounded-full blur-[150px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-100/80 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Floating Glyphs */}
      <div className="absolute inset-0">
         {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute text-[#0066cc] font-serif italic opacity-[0.08] animate-float-up select-none"
              style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100 + 10}%`,
                 fontSize: `${Math.random() * 2 + 1}rem`,
                 animationDuration: `${Math.random() * 10 + 15}s`,
                 animationDelay: `${Math.random() * 5}s`
              }}
            >
               {['Aa', '¶', '§', '©', '∑', 'Ω', 'ƒ', '∞'][i % 8]}
            </div>
         ))}
      </div>

      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.08; }
          90% { opacity: 0.08; }
          100% { transform: translateY(-100vh) rotate(20deg); opacity: 0; }
        }
        .animate-float-up { animation: float-up linear infinite; }
        .animate-pulse-slow { animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  );
};

// --- COMPONENT: ARCHIVAL SLATE LIGHT (INDEX) ---
const ArchivalSlateLight: React.FC<{ label: string; value: number; suffix: string; icon: any; index: number }> = ({ label, value, suffix, icon: Icon, index }) => {
  return (
    <div className="archive-slate-light group relative h-[280px] p-8 rounded-[2rem] bg-white border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-[#0066cc]/30 transition-all duration-500 hover:-translate-y-2">
      <div className="absolute top-0 right-0 p-4 text-[#0066cc]/5 group-hover:text-[#0066cc]/10 transition-colors duration-500 transform group-hover:scale-110 group-hover:-rotate-12">
         <Icon size={140} />
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between">
         <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0066cc] group-hover:bg-[#0066cc] group-hover:text-white transition-all duration-500 shadow-sm">
            <Icon size={24} />
         </div>
         
         <div>
            {/* UPDATED FONT SIZE: Scaled down from 5xl/6xl to 4xl/5xl to fit 50000+ */}
            {/* ENSURED TEXT COLOR IS VISIBLE (slate-900) */}
            <h4 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mb-2 tracking-tighter group-hover:text-[#0066cc] transition-colors duration-300">
               <CountUp end={value} suffix={suffix} />
            </h4>
            <div className="h-1 w-12 bg-slate-100 mb-3 group-hover:w-full group-hover:bg-[#0066cc] transition-all duration-700" />
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-600 transition-colors">{label}</p>
         </div>
      </div>
    </div>
  );
};

// --- COMPONENT: EDITORIAL PIPELINE LIGHT (NARRATIVE ARC REDESIGN) ---
const EditorialPipelineLight = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { 
        id: '01', 
        title: "Ideation", 
        role: "THE ARCHITECT",
        icon: Sparkles, 
        desc: "Genesis. We map the intellectual territory. Brainstorming isn't random; it's a rigorous search for resonance.",
        protocols: ["Topic Research", "Resonance Check", "Theme Synthesis"]
    },
    { 
        id: '02', 
        title: "Drafting", 
        role: "THE BUILDER",
        icon: Edit3, 
        desc: "Structure. Writers construct the skeleton of the narrative, ensuring logical flow.",
        protocols: ["Structural Outline", "First Pass", "Argument Flow"]
    },
    { 
        id: '03', 
        title: "Refining", 
        role: "THE CRITIC",
        icon: Search, 
        desc: "Polishing. We prune verbosity and align the voice with institutional standards.",
        protocols: ["Grammar Audit", "Tone Alignment", "Brevity Check"]
    },
    { 
        id: '04', 
        title: "Publishing", 
        role: "THE BROADCASTER",
        icon: Send, 
        desc: "Release. Formatting for medium, final proofing, and distribution.",
        protocols: ["Final Proof", "Format Design", "Network Uplink"]
    }
  ];

  return (
    <div className="w-full">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
          {steps.map((step, i) => (
             <div 
               key={i}
               onMouseEnter={() => setActiveStep(i)}
               className={`relative rounded-xl border transition-all duration-500 overflow-hidden group cursor-pointer flex flex-col justify-between ${
                  activeStep === i 
                  ? 'bg-[#0066cc] border-[#0066cc] shadow-xl md:col-span-1 shadow-blue-200' 
                  : 'bg-white border-slate-200 hover:border-[#0066cc]/30 hover:bg-slate-50'
               }`}
             >
                {/* Background Decor */}
                <div className={`absolute top-0 right-0 p-4 transition-all duration-500 ${activeStep === i ? 'text-white/10 scale-150 rotate-12' : 'text-[#0066cc]/5 group-hover:text-[#0066cc]/10'}`}>
                   <step.icon size={120} />
                </div>

                {/* Top Section */}
                <div className="p-6 relative z-10">
                   <div className="flex justify-between items-start mb-4">
                      <span className={`text-[10px] font-mono font-bold tracking-widest uppercase py-1 px-2 rounded border ${
                         activeStep === i ? 'bg-black/10 border-white/20 text-white' : 'bg-slate-50 border-slate-100 text-[#0066cc]'
                      }`}>
                         Phase {step.id}
                      </span>
                      {activeStep === i && <GitCommit size={16} className="text-white animate-pulse" />}
                   </div>
                   
                   <h3 className={`text-2xl font-heading font-black uppercase tracking-tight mb-1 transition-colors ${activeStep === i ? 'text-white' : 'text-slate-900'}`}>
                      {step.title}
                   </h3>
                   <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${activeStep === i ? 'text-blue-100' : 'text-slate-400'}`}>
                      {step.role}
                   </p>
                </div>

                {/* Bottom Section (Interactive Reveal) */}
                <div className="p-6 relative z-10 mt-auto">
                   <div className={`space-y-4 transition-all duration-500 ${activeStep === i ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-4'}`}>
                      <p className={`text-sm font-serif leading-relaxed ${activeStep === i ? 'text-white' : 'text-slate-500'}`}>
                         {step.desc}
                      </p>
                      
                      {/* Protocols List - Only visible when active */}
                      <div className={`space-y-2 pt-4 border-t ${activeStep === i ? 'border-white/20 block' : 'border-slate-100 hidden'}`}>
                         {step.protocols.map((p, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                               <div className={`w-1.5 h-1.5 rounded-full ${activeStep === i ? 'bg-white' : 'bg-[#0066cc]'}`} />
                               <span className={`text-[10px] font-mono uppercase tracking-wider ${activeStep === i ? 'text-white/80' : 'text-slate-500'}`}>{p}</span>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

// --- COMPONENT: GUILD LEDGER LIGHT ---
const GuildLedgerLight: React.FC = () => {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const roles = [
    {
      id: "narrative",
      title: "Narrative Designer",
      status: "OPEN",
      desc: "We are seeking architects of voice. You will define the tonal consistency of the organization, crafting press releases, articles, and public statements.",
      reqs: ["Exceptional command of English & Bengali", "Ability to adapt tone for diverse audiences", "Portfolio of published or creative writing"],
      perks: ["Byline on official publications", "Direct access to strategic planning", "Mentorship from senior editors"]
    },
    {
      id: "script",
      title: "Script Strategist",
      status: "OPEN",
      desc: "Events are stories waiting to be told. You will design the run-of-show scripts, host monologues, and video narratives.",
      reqs: ["Experience in screenwriting or playwriting", "Understanding of event flow dynamics", "Collaborative mindset for real-time edits"],
      perks: ["Backstage access to all major events", "Creative control over event narratives", "Workshops on public speaking"]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
       <div className="grid grid-cols-12 px-6 py-4 border-b border-slate-200 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hidden md:grid">
          <div className="col-span-5">Guild Designation</div>
          <div className="col-span-3 text-center">Status</div>
          <div className="col-span-4 text-right">Protocol</div>
       </div>

       {roles.map((role) => (
          <div key={role.id} className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#0066cc]/30 hover:shadow-lg transition-all duration-300">
             <div 
               onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
               className="grid grid-cols-1 md:grid-cols-12 px-6 py-6 items-center gap-4 cursor-pointer"
             >
                <div className="col-span-5 flex items-center gap-4">
                   <div className="p-2 rounded-lg bg-[#0066cc]/10 text-[#0066cc]">
                      <PenTool size={18} />
                   </div>
                   <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0066cc] transition-colors">{role.title}</h3>
                </div>
                
                <div className="col-span-3 flex md:justify-center">
                   <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-600 text-[10px] font-bold uppercase tracking-wider">
                      <ScanLine size={12} className="animate-pulse" /> Recruiting
                   </div>
                </div>

                <div className="col-span-4 flex md:justify-end">
                   <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${expandedRole === role.id ? 'rotate-180' : ''}`} />
                </div>
             </div>

             <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedRole === role.id ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-8 pt-2 border-t border-slate-100 bg-slate-50">
                   <p className="text-sm font-serif text-slate-600 leading-relaxed mb-8 max-w-2xl">
                      {role.desc}
                   </p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0066cc] mb-4">Prerequisites</h4>
                         <ul className="space-y-2">
                            {role.reqs.map((r, i) => (
                               <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                                  <div className="mt-1 w-1 h-1 rounded-full bg-[#0066cc]" />
                                  {r}
                               </li>
                            ))}
                         </ul>
                      </div>
                      <div>
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0066cc] mb-4">Privileges</h4>
                         <ul className="space-y-2">
                            {role.perks.map((p, i) => (
                               <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                                  <CheckCircle2 size={12} className="mt-0.5 text-green-600" />
                                  {p}
                               </li>
                            ))}
                         </ul>
                      </div>
                   </div>

                   <button 
                      onClick={() => window.open('https://forms.google.com', '_blank')}
                      className="w-full md:w-auto px-8 py-3 rounded-lg bg-[#0066cc] text-white font-bold uppercase text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
                   >
                      Submit Portfolio <ArrowUpRight size={14} />
                   </button>
                </div>
             </div>
          </div>
       ))}
    </div>
  );
};

// --- MAIN COMPONENT ---
const Acad_Light: React.FC<{ dept: any; navigate: (path: string) => void; isDark: boolean; setIsDark: React.Dispatch<React.SetStateAction<boolean>> }> = ({ dept, navigate, isDark, setIsDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from(".acad-hero-title", { y: 100, opacity: 0, duration: 1.5, ease: "power3.out", stagger: 0.1 });
      
      // Stats - ENSURE TARGETS EXIST
      gsap.from(".archive-slate-light", { 
        y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { 
            trigger: ".stats-grid-light", 
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
      });

    }, containerRef);

    setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fdfcfb] text-slate-900 font-sans selection:bg-[#0066cc] selection:text-white overflow-x-hidden">
      
      {/* HEADER */}
      <AcadHeader navigate={navigate} isDark={isDark} setIsDark={setIsDark} />

      {/* HERO SECTION - NEW ATMOSPHERE */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
         <AcademicAtmosphereLight />
         
         <div className="relative z-10 text-center">
            <span className="acad-hero-title text-sm md:text-base font-mono font-bold tracking-[0.4em] uppercase text-slate-400 mb-6 block">Department of</span>
            
            <h1 className="acad-hero-title text-7xl md:text-9xl font-heading font-black uppercase italic tracking-tighter leading-[0.8] mb-6 text-slate-900">
               Academics
            </h1>
            
            <div className="w-24 h-1 bg-[#0066cc] mx-auto mb-8 rounded-full" />
            
            <p className="acad-hero-title text-2xl md:text-4xl font-literary italic tracking-wide text-[#0066cc] max-w-3xl mx-auto leading-relaxed mt-8">
               "We write, we curate, we educate."
            </p>
         </div>
      </section>

      {/* DEPARTMENT HEAD - REDESIGNED LAYOUT */}
      <section className="py-32 px-6 border-b border-slate-200 bg-white relative">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Left: Image with Interaction */}
            <div className="flex justify-center md:justify-end relative">
               <div className="relative p-3 border border-slate-200 rounded-[2.5rem] group hover:border-[#0066cc]/50 transition-all duration-500">
                  <div className="relative w-72 h-96 rounded-[2rem] overflow-hidden shadow-2xl">
                     <img src="https://i.postimg.cc/W1HSq4Tn/Whats-App-Image-2026-01-31-at-9-57-06-PM.jpg" alt="Head of Academics" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                     <div className="absolute bottom-6 left-6">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-md mb-1">Editor In Chief</p>
                        <p className="text-white font-heading font-bold text-xl uppercase drop-shadow-md">The Lead</p>
                     </div>
                  </div>
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#0066cc] -translate-x-1 -translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#0066cc] translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               </div>
            </div>
            
            {/* Right: Text & Quote */}
            <div className="text-left">
               <h2 className="text-5xl md:text-7xl font-heading font-black uppercase text-slate-900 mb-8 leading-none">
                  Intellectual <br/> <span className="text-[#0066cc]">Architect.</span>
               </h2>
               <div className="pl-8 border-l-2 border-[#0066cc]/50 relative">
                  <Quote className="absolute -top-4 -left-3 text-[#0066cc] bg-[#fdfcfb] p-1" size={24} />
                  <p className="text-xl md:text-2xl font-serif italic text-slate-600 leading-relaxed mb-6">
                     "In Academics, precision is our currency. We transform vague ideas into concrete educational frameworks and compelling narratives."
                  </p>
                  <p className="text-[10px] font-mono font-bold text-[#0066cc] uppercase tracking-widest">— Head of Academics</p>
               </div>
            </div>

         </div>
      </section>

      {/* METRICS - "PUBLICATION INDEX" (LIGHT) */}
      <section className="py-32 px-6 bg-[#fdfcfb]">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
               <h3 className="text-5xl md:text-7xl font-heading font-black uppercase italic text-slate-900 mb-4">Publication <span className="text-[#0066cc]">Index.</span></h3>
               <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Systemic Output Logs</p>
            </div>
            <div className="stats-grid-light grid grid-cols-1 md:grid-cols-4 gap-6">
               {[
                 { l: "Words Written", v: 50000, s: "+", i: Type },
                 { l: "Scripts Drafted", v: 120, s: "+", i: FileText },
                 { l: "Curriculums", v: 15, s: "+", i: BookOpen },
                 { l: "Workshops", v: 30, s: "+", i: Mic2 },
               ].map((stat, i) => (
                  <ArchivalSlateLight key={i} label={stat.l} value={stat.v} suffix={stat.s} icon={stat.i} index={i} />
               ))}
            </div>
         </div>
      </section>

      {/* WORKFLOW - NARRATIVE ARC (REDESIGNED) */}
      <section className="py-32 px-6 bg-[#fdfcfb] relative">
         <div className="max-w-7xl mx-auto">
            <div className="mb-24 text-center">
               <h2 className="text-5xl md:text-7xl font-heading font-black uppercase italic text-slate-900 mb-4">
                  The <span className="text-[#0066cc]">Editorial Pipeline.</span>
               </h2>
               <p className="text-sm font-light text-slate-500">Our editorial pipeline from thought to impact.</p>
            </div>
            <EditorialPipelineLight />
         </div>
      </section>

      {/* RECRUITMENT - GUILD LEDGER */}
      <section className="py-32 px-6 bg-[#fdfcfb] relative">
         <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
               <div className="inline-block p-4 rounded-full bg-slate-50 text-[#0066cc] shadow-lg mb-8 border border-slate-100">
                  <PenTool size={32} />
               </div>
               <h2 className="text-5xl md:text-7xl font-heading font-black uppercase italic text-slate-900 mb-8 tracking-tighter">
                  The Guild <span className="text-[#0066cc]">Ledger.</span>
               </h2>
               <p className="text-lg md:text-xl font-serif italic text-slate-500 max-w-2xl mx-auto leading-relaxed">
                  "We do not seek mere scribes; we seek architects of thought. If you can distill complex ideas into compelling prose and structure chaos into clarity, your desk is waiting."
               </p>
            </div>
            <GuildLedgerLight />
         </div>
      </section>

      <AcadFooter />
    </div>
  );
};

export default Acad_Light;
