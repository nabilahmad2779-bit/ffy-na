
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { 
  ArrowLeft, PenTool, BookOpen, Edit3, FileText, 
  Layers, Quote, Mic2, Sparkles, Send, Type,
  ChevronDown, ScanLine, Feather, Search, GitCommit, CheckCircle2, ArrowUpRight
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- UTILITY: COUNT UP ---
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
      }, { threshold: 0.2 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={nodeRef}>{count.toLocaleString()}{suffix}</span>;
};

// --- COMPONENT: MOBILE ATMOSPHERE LIGHT (Enhanced Visibility) ---
const MobileAtmosphereLight: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#fdfcfb]">
      {/* Light Fog - Increased Opacity and Size */}
      <div className="absolute top-[-20%] left-[-20%] w-[120vw] h-[120vw] bg-blue-100/90 rounded-full blur-[80px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[100vw] h-[100vw] bg-cyan-100/90 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Light Glyphs - Increased Opacity */}
      <div className="absolute inset-0">
         {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="absolute text-[#0066cc] font-serif italic opacity-[0.2] animate-float-up select-none"
              style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100 + 20}%`,
                 fontSize: `${Math.random() * 2 + 1.5}rem`,
                 animationDuration: `${Math.random() * 10 + 20}s`,
                 animationDelay: `${Math.random() * 5}s`
              }}
            >
               {['¶', '§', '©', '∑', 'Ω', 'ƒ', '∞'][i % 7]}
            </div>
         ))}
      </div>
      <style>{`
        @keyframes float-up { 0% { transform: translateY(0) rotate(0deg); opacity: 0; } 50% { opacity: 0.3; } 100% { transform: translateY(-100vh) rotate(20deg); opacity: 0; } }
        .animate-float-up { animation: float-up linear infinite; }
        .animate-pulse-slow { animation: pulse 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

// --- COMPONENT: MOBILE EDITORIAL PIPELINE LIGHT (Detailed) ---
const MobileEditorialPipelineLight: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(0);

  const steps = [
    { 
        id: '01', 
        title: "Ideation", 
        role: "The Architect",
        icon: Sparkles, 
        desc: "Genesis. We map the intellectual territory. Brainstorming isn't random; it's a rigorous search for resonance. We ask: What does the audience need to know, and how do we make them feel it?",
        protocols: ["Topic Research", "Resonance Check", "Theme Synthesis"]
    },
    { 
        id: '02', 
        title: "Drafting", 
        role: "The Builder",
        icon: Edit3, 
        desc: "Structure. We pour the foundation. Writers construct the skeleton of the narrative, ensuring logical flow and structural integrity. This is where abstract thoughts solidify into concrete prose.",
        protocols: ["Structural Outline", "First Pass", "Argument Flow"]
    },
    { 
        id: '03', 
        title: "Refining", 
        role: "The Critic",
        icon: Search, 
        desc: "Polishing. The edit is more important than the draft. We prune verbosity, sharpen vocabulary, and align the voice with institutional standards. We cut until only the essential remains.",
        protocols: ["Grammar Audit", "Tone Alignment", "Brevity Check"]
    },
    { 
        id: '04', 
        title: "Publishing", 
        role: "The Broadcaster",
        icon: Send, 
        desc: "Release. The final output. Formatting for medium, final proofing, and distribution. It is no longer just text; it is a signal sent out to shape the organization's public reality.",
        protocols: ["Final Proof", "Format Design", "Network Uplink"]
    }
  ];

  return (
    <div className="space-y-4">
       {steps.map((step, i) => {
          const isActive = activeStep === i;
          return (
             <div 
               key={i}
               onClick={() => setActiveStep(isActive ? null : i)}
               className={`relative rounded-xl border transition-all duration-500 overflow-hidden ${
                  isActive 
                  ? 'bg-white border-[#0066cc] shadow-xl' 
                  : 'bg-white/50 border-slate-200'
               }`}
             >
                {/* Header */}
                <div className="p-5 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-[#0066cc] text-white' : 'bg-slate-100 text-[#0066cc]'}`}>
                         <step.icon size={20} />
                      </div>
                      <div>
                         <span className={`text-[9px] font-black uppercase tracking-widest block mb-1 ${isActive ? 'text-[#0066cc]' : 'text-slate-400'}`}>{step.role}</span>
                         <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">{step.title}</h3>
                      </div>
                   </div>
                   <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${isActive ? 'rotate-180 text-[#0066cc]' : ''}`} />
                </div>

                {/* Body */}
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isActive ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                   <div className="px-5 pb-6 pt-0">
                      <div className="w-full h-px bg-slate-100 mb-4" />
                      <p className="text-sm font-serif text-slate-600 leading-relaxed mb-6">
                         {step.desc}
                      </p>
                      
                      <div className="grid grid-cols-1 gap-2">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-[#0066cc] mb-1">Protocols</span>
                         {step.protocols.map((p, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                               <GitCommit size={14} className="text-[#0066cc]" />
                               <span className="text-xs font-mono uppercase text-slate-500">{p}</span>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          );
       })}
    </div>
  );
};

// --- COMPONENT: MOBILE GUILD LEDGER LIGHT (Detailed) ---
const MobileGuildLedgerLight: React.FC = () => {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const roles = [
    {
      id: "narrative",
      title: "Narrative Designer",
      desc: "We are seeking architects of voice. You will define the tonal consistency of the organization, crafting press releases, articles, and public statements.",
      reqs: [
        "Exceptional command of English & Bengali language nuances",
        "Ability to adapt tone for diverse target audiences",
        "Portfolio of published or creative writing samples",
        "Strong research and fact-checking capabilities",
        "Ability to meet strict editorial deadlines consistently",
        "Experience with collaborative writing tools (Google Docs)"
      ],
      perks: [
        "Byline on official organizational publications",
        "Direct access to strategic planning sessions",
        "Mentorship from senior editors and writers"
      ]
    },
    {
      id: "script",
      title: "Script Strategist",
      desc: "Events are stories waiting to be told. You will design the run-of-show scripts, host monologues, and video narratives.",
      reqs: [
        "Experience in screenwriting or theatrical playwriting",
        "Deep understanding of event flow and audience engagement",
        "Collaborative mindset for real-time script edits",
        "Public speaking or elocution experience is preferred",
        "Ability to visualize stage blocking and transitions",
        "Knowledge of audio-visual cue scripting"
      ],
      perks: [
        "Backstage access to all major events",
        "Creative control over event narratives",
        "Exclusive workshops on public speaking"
      ]
    }
  ];

  return (
    <div className="space-y-4">
       {roles.map((role) => (
          <div key={role.id} className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
             <div 
               onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
               className="flex items-center justify-between px-6 py-5 cursor-pointer"
             >
                <div className="flex items-center gap-4">
                   <div className="p-2 rounded-lg bg-[#0066cc]/10 text-[#0066cc]"><PenTool size={16} /></div>
                   <h3 className="text-base font-bold text-slate-900">{role.title}</h3>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedRole === role.id ? 'rotate-180' : ''}`} />
             </div>

             <div className={`overflow-hidden transition-all duration-300 ${expandedRole === role.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50">
                   <p className="text-xs text-slate-500 font-serif leading-relaxed mb-6">{role.desc}</p>
                   
                   <div className="mb-6">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0066cc] mb-3">Prerequisites</h4>
                      <div className="space-y-2">
                          {role.reqs.map((r, i) => (
                             <div key={i} className="flex items-start gap-2 text-[10px] text-slate-500">
                                <div className="mt-1 w-1 h-1 rounded-full bg-[#0066cc] shrink-0" />
                                <span className="leading-snug">{r}</span>
                             </div>
                          ))}
                      </div>
                   </div>

                   <div className="mb-6">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0066cc] mb-3">Privileges</h4>
                      <div className="space-y-2">
                          {role.perks.map((p, i) => (
                             <div key={i} className="flex items-start gap-2 text-[10px] text-slate-500">
                                <CheckCircle2 size={12} className="mt-0.5 text-green-600 shrink-0" />
                                <span className="leading-snug">{p}</span>
                             </div>
                          ))}
                      </div>
                   </div>

                   <button 
                      onClick={() => window.open('https://forms.google.com', '_blank')}
                      className="w-full py-3 rounded-lg bg-[#0066cc] text-white font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 shadow-lg"
                   >
                      Submit Portfolio <ArrowUpRight size={12} />
                   </button>
                </div>
             </div>
          </div>
       ))}
    </div>
  );
};

export const MobAcadDepartment_light: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(".page-content-light", { autoAlpha: 0 });

      // Page Load Reveal
      gsap.to(".page-content-light", { autoAlpha: 1, duration: 1, delay: 0.2, ease: "power2.out" });

      // Hero Elements
      gsap.from(".acad-m-reveal", { y: 30, opacity: 0, stagger: 0.1, duration: 0.8, delay: 0.5, ease: "power2.out" });
      
      // Standard Reveal Up
      gsap.utils.toArray('.reveal-up').forEach((el: any) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.8,
          scrollTrigger: { trigger: el, start: "top 90%" }
        });
      });

      // Stats Stagger
      gsap.from(".stat-card", {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: ".stats-grid-mobile", start: "top 85%" }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fdfcfb] text-slate-900 font-sans selection:bg-[#0066cc] selection:text-white overflow-x-hidden pb-24">
      
      <div className="page-content-light opacity-0">
        
        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex items-center gap-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <button onClick={onBack} className="p-2 rounded-full bg-slate-100 text-[#0066cc] active:scale-90 transition-transform">
            <ArrowLeft size={20} />
          </button>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0066cc]">Academics</span>
        </header>

        {/* HERO SECTION */}
        <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden text-center">
           <MobileAtmosphereLight />
           
           <div className="relative z-10">
              {/* Forge Badge Removed */}
              
              <span className="acad-m-reveal text-sm font-mono font-bold tracking-[0.4em] uppercase text-slate-400 mb-4 block">Department of</span>
              
              <h1 className="acad-m-reveal text-6xl font-heading font-black uppercase italic tracking-tighter leading-[0.8] mb-6 text-slate-900">
                 Academics
              </h1>
              
              <div className="acad-m-reveal w-16 h-1 bg-[#0066cc] mx-auto mb-8 rounded-full" />

              {/* Tagline updated with font-literary styling */}
              <p className="acad-m-reveal text-2xl font-literary italic text-[#0066cc] max-w-xs mx-auto leading-relaxed">
                 "We write, we curate, we educate."
              </p>
           </div>
        </section>

        {/* HEAD SECTION */}
        <section className="py-16 px-6 border-b border-slate-200 bg-white relative">
           <div className="reveal-up flex flex-col items-center text-center">
              <div className="relative mb-8">
                 <div className="absolute -inset-2 border border-dashed border-[#0066cc]/30 rounded-full animate-spin-slow" />
                 <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-[#0066cc]/10 shadow-lg">
                    <img src="https://i.postimg.cc/W1HSq4Tn/Whats-App-Image-2026-01-31-at-9-57-06-PM.jpg" alt="Head" className="w-full h-full object-cover" />
                 </div>
                 <div className="absolute -bottom-2 -right-2 bg-[#0066cc] text-white p-2 rounded-full shadow-md">
                    <Quote size={16} fill="currentColor" />
                 </div>
              </div>
              <h2 className="text-3xl font-heading font-black uppercase text-slate-900 mb-2">The Lead</h2>
              <p className="text-[10px] font-mono font-bold text-[#0066cc] uppercase tracking-widest mb-6">Editor In Chief</p>
              <p className="text-lg font-serif italic text-slate-600 leading-relaxed">
                 "Words are the vessels of vision. In Academics, we don't just fill pages; we structure thoughts that drive the organization's voice."
              </p>
           </div>
        </section>

        {/* METRICS - GRID OF 2 - REDESIGNED */}
        <section className="py-16 px-6 bg-[#fdfcfb]">
           <div className="reveal-up text-center mb-10">
              {/* Standardized Heading Size: text-4xl */}
              <h3 className="text-4xl font-heading font-black uppercase italic text-slate-900 mb-2">Publication <span className="text-[#0066cc]">Index.</span></h3>
           </div>
           <div className="stats-grid-mobile grid grid-cols-2 gap-4">
              {[
                { l: "Words Written", v: 50000, s: "+", i: Type },
                { l: "Scripts Drafted", v: 120, s: "+", i: FileText },
                { l: "Curriculums", v: 15, s: "+", i: BookOpen },
                { l: "Workshops", v: 30, s: "+", i: Mic2 },
              ].map((stat, i) => (
                 <div key={i} className="stat-card p-5 rounded-2xl bg-white border border-slate-200 flex flex-col items-center text-center shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#0066cc]/5 flex items-center justify-center text-[#0066cc] mb-3">
                       <stat.i size={20} />
                    </div>
                    {/* Smaller text to fit numbers */}
                    <h4 className="text-3xl font-heading font-black text-slate-900 mb-1 tracking-tight">
                       <CountUp end={stat.v} suffix={stat.s} />
                    </h4>
                    <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400">{stat.l}</p>
                 </div>
              ))}
           </div>
        </section>

        {/* NARRATIVE ARC (VERTICAL ACCORDION) */}
        <section className="py-16 px-6 border-t border-slate-200 bg-slate-50">
           <div className="reveal-up mb-10 text-center">
              {/* Standardized Heading Size: text-4xl */}
              <h2 className="text-4xl font-heading font-black uppercase italic text-slate-900">Editorial <span className="text-[#0066cc]">Pipeline.</span></h2>
              <p className="text-xs text-slate-500 mt-2 font-mono uppercase tracking-widest">Operational Protocol</p>
           </div>
           
           <div className="reveal-up">
              <MobileEditorialPipelineLight />
           </div>
        </section>

        {/* GUILD LEDGER */}
        <section className="py-16 px-6 bg-white border-t border-slate-200">
           <div className="reveal-up text-center mb-10">
              <div className="inline-block p-3 rounded-full bg-[#0066cc]/10 text-[#0066cc] mb-4">
                 <PenTool size={20} />
              </div>
              {/* Standardized Heading Size: text-4xl */}
              <h2 className="text-4xl font-heading font-black uppercase italic text-slate-900">The Guild <span className="text-[#0066cc]">Ledger.</span></h2>
           </div>
           <div className="reveal-up">
              <MobileGuildLedgerLight />
           </div>
        </section>

        <div className="py-12 text-center text-[9px] font-mono uppercase tracking-[0.4em] text-slate-400 opacity-50">
           Academics Directorate • Forte-FY
        </div>
      </div>
    </div>
  );
};
