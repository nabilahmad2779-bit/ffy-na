
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { 
  Briefcase, Settings, Map, Truck, ChevronLeft, Package, Shield, Zap,
  User, Quote, Target, ChevronDown, CheckCircle2, ArrowUpRight, ScanLine, Lock, Activity,
  BarChart3, Radio, ClipboardList, Box, ArrowRight
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENT: HERO OPERATIONS BACKGROUND (MOBILE) ---
const MobHeroOperationsBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid Lines */}
      <div 
        className={`absolute inset-0 opacity-[0.15] animate-grid-scroll`}
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? '#FF8C00' : '#ea580c'} 1px, transparent 1px), 
            linear-gradient(90deg, ${isDark ? '#FF8C00' : '#ea580c'} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Large Ambient Gears */}
      <div className={`absolute -top-20 -right-20 opacity-[0.12] ${isDark ? 'text-[#FF8C00]' : 'text-orange-600'}`}>
         <Settings size={300} className="animate-spin-slow-gear" />
      </div>
      <div className={`absolute top-1/2 -left-20 -translate-y-1/2 opacity-[0.12] ${isDark ? 'text-[#FF8C00]' : 'text-orange-600'}`}>
         <Settings size={250} className="animate-spin-reverse-gear" />
      </div>
      <div className={`absolute -bottom-32 right-0 opacity-[0.12] ${isDark ? 'text-[#FF8C00]' : 'text-orange-600'}`}>
         <Settings size={350} className="animate-spin-slow-gear" style={{ animationDuration: '80s' }} />
      </div>
      
      <style>{`
        .animate-grid-scroll { animation: grid-scroll 20s linear infinite; }
        @keyframes grid-scroll { 
          0% { background-position: 0 0; } 
          100% { background-position: 40px 40px; } 
        }
        
        .animate-spin-slow-gear { animation: spin 60s linear infinite; }
        .animate-spin-reverse-gear { animation: spin 50s linear infinite reverse; }
        
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export const MobOpsDepartment: React.FC<{ onBack: () => void; isDark: boolean }> = ({ onBack, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  
  // Carousel State
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const theme = {
    bg: isDark ? "bg-[#0a0600]" : "bg-[#fff8f0]",
    text: isDark ? "text-orange-50" : "text-slate-900",
    accent: "#FF8C00",
    card: isDark ? "bg-[#140a00] border-orange-500/20" : "bg-white border-orange-200"
  };

  const CAPABILITIES = [
    { 
      title: "Supply Chain", 
      icon: Truck, 
      desc: "Orchestrating the complete lifecycle of material acquisition, vendor negotiation, and logistical transport to ensure zero-latency availability for all organizational events." 
    },
    { 
      title: "Asset Control", 
      icon: Box, 
      desc: "Maintaining an absolute ledger of organizational assets through digital tagging, physical audits, and rigorous safeguarding protocols to prevent resource leakage." 
    },
    { 
      title: "Risk Mitigation", 
      icon: Shield, 
      desc: "Proactive identification of operational bottlenecks and safety hazards, coupled with pre-computed contingency protocols to ensure continuity under pressure." 
    },
    { 
      title: "Resource Alloc", 
      icon: BarChart3, 
      desc: "Algorithmic distribution of financial and human capital to maximize impact efficiency across simultaneous initiative vectors." 
    },
    { 
      title: "Field Command", 
      icon: Radio, 
      desc: "Establishing rapid-response command centers for synchronous communication and real-time decision making during high-stakes execution phases." 
    },
    { 
      title: "Quality Audit", 
      icon: ClipboardList, 
      desc: "Systematic post-operational analysis and real-time quality control to maintain the institutional standard of excellence across all deliverables." 
    }
  ];

  const ROLES = [
    {
      id: "intern",
      title: "Operations Intern",
      status: "RECRUITING",
      available: true,
      duration: "1 Month",
      desc: "An immersive entry-level role designed to introduce candidates to the high-pressure, high-reward world of event management and organizational logistics. You will be the hands and feet of our ground execution.",
      reqs: [
        "Strong organizational and time-management skills.",
        "Ability to remain calm and focused under pressure.",
        "Physical resilience for on-ground event execution.",
        "Basic proficiency in Google Sheets and inventory tracking.",
        "Excellent verbal communication and coordination abilities.",
        "Willingness to work flexible hours during event peaks.",
        "A proactive mindset towards problem-solving.",
        "Team-oriented attitude with a respect for hierarchy."
      ],
      perks: [
        "Real-world experience in large-scale event management.",
        "Direct mentorship from senior operational leaders.",
        "Certificate of Internship upon successful completion.",
        "Networking opportunities with partner organizations.",
        "Skill development in crisis management and logistics.",
        "Priority consideration for future permanent roles.",
        "Access to exclusive organizational workshops.",
        "A structured environment to build professional discipline."
      ]
    },
    {
      id: "senior",
      title: "Senior Associate",
      status: "STANDBY",
      available: false,
      desc: "A leadership role responsible for overseeing specific logistical sectors and mentoring junior associates. This position requires prior experience and proven leadership capability.",
      reqs: [
        "Minimum 1 year of experience in operations or logistics.",
        "Proven track record of managing teams or small groups.",
        "Advanced proficiency in project management software.",
        "Strong negotiation skills for vendor management.",
        "Ability to draft comprehensive risk assessment reports.",
        "Strategic thinking for long-term resource optimization.",
        "Conflict resolution skills for internal and external issues.",
        "Unwavering commitment to organizational protocols."
      ],
      perks: [
        "Leadership authority over specific event sectors.",
        "Direct influence on departmental strategy and SOPs.",
        "Letter of Recommendation from the Directorate.",
        "Advanced training in supply chain management.",
        "Higher visibility within the executive board.",
        "Opportunities to lead independent projects.",
        "Enhanced networking with high-level stakeholders.",
        "Pathway to Directorate positions."
      ]
    }
  ];

  // Auto-Play Logic
  useEffect(() => {
    const interval = setInterval(() => {
        handleNext();
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CAPABILITIES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + CAPABILITIES.length) % CAPABILITIES.length);
  };

  // Swipe Handlers
  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ops-reveal", { y: 30, opacity: 0, stagger: 0.1, duration: 0.8 });
      gsap.to(".ops-gear", { rotation: 360, duration: 10, repeat: -1, ease: "linear" });
      
      gsap.utils.toArray('.scroll-reveal-section').forEach((el: any) => {
        gsap.from(el, {
          y: 40, 
          opacity: 0, 
          duration: 0.8,
          scrollTrigger: { trigger: el, start: "top 85%" }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`min-h-screen pb-24 ${theme.bg} ${theme.text} transition-colors duration-500 font-sans overflow-x-hidden`}>
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center gap-4 bg-[#0a0600]/80 backdrop-blur-md border-b border-orange-500/10">
        <button onClick={onBack} className="p-2 rounded-full bg-orange-500/10 text-orange-500">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2 text-orange-500">
           <Settings className="ops-gear" size={18} />
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">Ops Division</span>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden flex flex-col items-center justify-center text-center">
        <MobHeroOperationsBackground isDark={true} />
        <div className="relative z-10 w-full">
           <div className="ops-reveal flex items-center justify-center gap-2 mb-4">
              <Activity size={14} className="text-orange-500" />
              <span className="text-xs font-mono font-bold tracking-[0.4em] uppercase text-zinc-500">Department of</span>
           </div>
           
           <h1 className="ops-reveal text-6xl font-heading font-black uppercase italic tracking-tighter leading-[0.85] mb-8 text-white drop-shadow-xl">
              Operations
           </h1>
           
           <div className="ops-reveal w-16 h-1 bg-orange-500 mb-8 rounded-full mx-auto" />
           
           <p className="ops-reveal text-lg font-light italic opacity-80 leading-relaxed max-w-xs mx-auto text-orange-100">
              "The Engine of Execution. We build the stage for success."
           </p>
        </div>
      </section>

      {/* DIRECTORATE PROFILE */}
      <section className="px-6 py-12 border-t border-orange-500/10 bg-[#0c0800] scroll-reveal-section">
         <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center gap-3 mb-6">
               <User size={16} className="text-orange-500" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Directorate Profile</span>
            </div>
            
            <div className="relative w-48 h-48 mb-8 rounded-full border-2 border-orange-500/20 p-2">
               <img 
                  src="https://i.postimg.cc/3xyqGVyh/cca44d09-d92f-4c0d-987a-b8520bb2f212.jpg?auto=format&fit=crop&q=80" 
                  alt="Director" 
                  className="w-full h-full object-cover rounded-full shadow-[0_0_30px_rgba(255,140,0,0.2)]"
               />
               <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black px-4 py-1 border border-orange-500/30 rounded-full">
                  <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest">Head of Ops</span>
               </div>
            </div>

            <h2 className="text-4xl font-heading font-black uppercase leading-none mb-4 text-white">Arpita Das Richi</h2>
            
            <div className="relative max-w-sm mx-auto mt-4">
               <Quote className="absolute -top-4 -left-2 text-orange-500/20" size={30} />
               <p className="text-sm font-light italic leading-relaxed text-zinc-300 px-4">
                  "Operations is the heartbeat of Forte-FY. We turn abstract strategy into kinetic reality through relentless precision."
               </p>
            </div>
         </div>
      </section>

      {/* DEPARTMENT MANDATE */}
      <section className="px-6 py-12 border-t border-orange-500/10 scroll-reveal-section text-center">
         <div className="flex items-center justify-center gap-3 mb-6">
            <Target className="text-orange-500" size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Mandate</span>
         </div>
         <h2 className="text-4xl font-heading font-black uppercase tracking-tighter leading-[0.9] text-white mb-8">
            The Structural <br/> <span className="text-orange-500">Backbone.</span>
         </h2>
         <div className="p-6 border border-orange-500/10 bg-white/5 rounded-2xl text-left">
            <h3 className="text-sm font-bold uppercase mb-3 text-white text-center">Foundation Philosophy</h3>
            <p className="text-sm font-light leading-relaxed text-zinc-400 mb-4 text-justify">
               The Operations Department serves as the physiological nervous system of Forte-FY, translating abstract strategic vision into concrete, kinetic reality. Founded on the axiom that <strong className="text-white">'Vision requires Structure,'</strong> this department bridges the gap between ideation and execution.
            </p>
            <p className="text-sm font-light leading-relaxed text-zinc-400 text-justify">
               We are the architects of logistical precision, ensuring that every event, campaign, and initiative functions with clockwork efficiency. By managing the intricate web of supply chains, venue logistics, safety protocols, and resource allocation, Operations transforms potential chaos into a symphony of disciplined action.
            </p>
         </div>
      </section>

      {/* CAPABILITIES CAROUSEL - 3D CAROUSEL */}
      <section className="py-20 scroll-reveal-section border-t border-orange-500/10 bg-[#0c0800] overflow-hidden">
        <div className="px-6 text-center mb-12">
           <h2 className="text-3xl font-heading font-black uppercase italic text-white">Operational <span className="text-orange-500">Capabilities</span></h2>
           <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-2 flex items-center justify-center gap-2">
              <Zap size={10} className="text-orange-500" /> Tactical Inventory
           </p>
        </div>

        {/* 3D Carousel Container */}
        <div 
            className="relative w-full h-[450px] flex items-center justify-center perspective-[1000px]"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
           {CAPABILITIES.map((cap, i) => {
             // Calculate distance from active index (handling wrap-around for stack effect)
             // Simple version: Render active, prev, next with specific styles
             let position = 0; // 0 = active, 1 = next, -1 = prev, 2 = hidden
             if (i === activeIndex) position = 0;
             else if (i === (activeIndex + 1) % CAPABILITIES.length) position = 1;
             else if (i === (activeIndex - 1 + CAPABILITIES.length) % CAPABILITIES.length) position = -1;
             else position = 2; // Hidden

             // Base Style
             let styleClass = "opacity-0 scale-90 translate-x-0 z-0 pointer-events-none";
             
             if (position === 0) {
                styleClass = "opacity-100 scale-100 z-20 translate-x-0";
             } else if (position === 1) {
                styleClass = "opacity-40 scale-90 z-10 translate-x-[20px] translate-y-2 rotate-y-12 blur-[1px]";
             } else if (position === -1) {
                styleClass = "opacity-0 scale-90 z-10 -translate-x-[20px]"; // Hide prev completely or keep subtle
             }

             return (
               <div 
                  key={i}
                  className={`absolute w-[85%] max-w-[320px] transition-all duration-700 ease-out origin-center ${styleClass}`}
               >
                  <div className={`flex flex-col p-8 rounded-2xl border ${theme.card} bg-[#120a00] shadow-2xl relative overflow-hidden h-full min-h-[400px]`}>
                      {/* Decorative BG */}
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                         <cap.icon size={120} className="text-orange-500" />
                      </div>

                      <div className="relative z-10 flex flex-col h-full">
                         <div className="flex items-center justify-between mb-6">
                            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
                               <cap.icon size={28} />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Protocol 0{i+1}</span>
                         </div>
                         
                         <h4 className="font-heading font-black text-2xl uppercase text-white mb-4 leading-none">{cap.title}</h4>
                         <div className="h-0.5 w-12 bg-orange-500 mb-6 opacity-80" />
                         
                         <p className="text-sm font-light text-zinc-400 leading-relaxed text-justify flex-1">
                            {cap.desc}
                         </p>

                         <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[8px] font-mono text-orange-500 uppercase">Status: Active</span>
                            <ArrowRight size={14} className="text-orange-500" />
                         </div>
                      </div>
                  </div>
               </div>
             );
           })}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-4">
           {CAPABILITIES.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-orange-500' : 'w-2 bg-zinc-800'}`}
              />
           ))}
        </div>
      </section>

      {/* OPS LEDGER (RECRUITMENT) */}
      <section className="px-6 py-12 border-t border-orange-500/10 bg-[#0c0800] scroll-reveal-section">
         <div className="text-center mb-10">
            <div className="inline-block p-4 rounded-full mb-6 border border-orange-500/20 bg-orange-500/10 text-orange-500">
               <Briefcase size={28} />
            </div>
            <h2 className="text-4xl font-heading font-black uppercase italic tracking-tighter text-white">
               The Ops <span className="text-orange-500">Ledger.</span>
            </h2>
            <p className="text-xs font-serif italic text-zinc-500 mt-2">"Architects of action required."</p>
         </div>

         <div className="space-y-4">
            {ROLES.map((role) => (
               <div key={role.id} className="group border border-white/5 rounded-2xl overflow-hidden bg-[#0a0a0a]">
                  <div 
                    onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
                    className="flex items-center justify-between px-6 py-6 cursor-pointer"
                  >
                     <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500"><Activity size={18} /></div>
                        <div>
                           <h3 className="text-lg font-bold text-white">{role.title}</h3>
                           <div className={`flex items-center gap-2 mt-1 text-[9px] font-black uppercase tracking-wider ${role.available ? 'text-green-500' : 'text-zinc-600'}`}>
                              {role.available ? <ScanLine size={10} className="animate-pulse" /> : <Lock size={10} />}
                              {role.status}
                           </div>
                        </div>
                     </div>
                     <ChevronDown size={18} className={`text-zinc-500 transition-transform ${expandedRole === role.id ? 'rotate-180' : ''}`} />
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 ${expandedRole === role.id ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                     <div className="px-6 pb-8 pt-2 border-t border-white/5 bg-[#0f0f0f]">
                        <p className="text-sm text-zinc-300 font-serif leading-relaxed mb-8">{role.desc}</p>
                        
                        <div className="grid grid-cols-1 gap-8 mb-8">
                           <div>
                              <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 mb-4 flex items-center gap-2">
                                 <ScanLine size={12} /> Requirements
                              </h4>
                              <ul className="space-y-3">
                                 {role.reqs.map((r, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                       <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                                       {r}
                                    </li>
                                 ))}
                              </ul>
                           </div>
                           <div>
                              <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 mb-4 flex items-center gap-2">
                                 <CheckCircle2 size={12} /> Perks
                              </h4>
                              <ul className="space-y-3">
                                 {role.perks.map((p, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                       <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                       {p}
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>

                        {role.available ? (
                           <button 
                              onClick={() => window.open('https://forms.google.com', '_blank')}
                              className="w-full py-4 rounded-xl bg-orange-500 text-black font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all active:scale-95 shadow-lg shadow-orange-500/20"
                           >
                              Apply Now <ArrowUpRight size={14} />
                           </button>
                        ) : (
                           <div className="w-full py-4 rounded-xl border border-white/10 text-zinc-600 font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2">
                              <Lock size={14} /> Position Locked
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>
    </div>
  );
};
