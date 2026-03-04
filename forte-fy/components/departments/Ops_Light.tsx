
import React, { useRef, useLayoutEffect, useState, useEffect, useCallback } from 'react';
import { 
  Truck, ClipboardList,
  BarChart3, Shield, 
  Radio, Box, Activity, 
  User, Quote, Target, Layers, Settings, FileText, ArrowRight, Zap, Crosshair, CheckCircle2,
  Briefcase, ChevronDown, ScanLine, Lock, ArrowUpRight
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OpsHeader, OpsFooter } from '../../code/OpsHeaderFooter';

gsap.registerPlugin(ScrollTrigger);

interface DepartmentProps {
  dept: any;
  navigate: (path: string) => void;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

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

// --- COMPONENT: HERO OPERATIONS BACKGROUND (LIGHT) ---
// Updated to match Dark Mode structure (3 gears, higher opacity)
const HeroOperationsBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid Lines - Increased Opacity to 0.15 */}
      <div 
        className={`absolute inset-0 opacity-[0.15] animate-grid-scroll`}
        style={{
          backgroundImage: `
            linear-gradient(#ea580c 1px, transparent 1px), 
            linear-gradient(90deg, #ea580c 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Large Ambient Gears - Decreased Opacity from 0.2 to 0.12 */}
      <div className="absolute -top-32 -right-32 opacity-[0.12] text-orange-600">
         <Settings size={500} className="animate-spin-slow-gear" />
      </div>
      <div className="absolute top-1/2 -left-32 -translate-y-1/2 opacity-[0.12] text-orange-600">
         <Settings size={400} className="animate-spin-reverse-gear" />
      </div>
      <div className="absolute -bottom-64 left-1/3 opacity-[0.12] text-orange-600">
         <Settings size={600} className="animate-spin-slow-gear" style={{ animationDuration: '80s' }} />
      </div>

      <style>{`
        .animate-grid-scroll { animation: grid-scroll 20s linear infinite; }
        @keyframes grid-scroll { 
          0% { background-position: 0 0; } 
          100% { background-position: 50px 50px; } 
        }
        
        .animate-spin-slow-gear { animation: spin 60s linear infinite; }
        .animate-spin-reverse-gear { animation: spin 50s linear infinite reverse; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

// --- COMPONENT: CAPABILITY STRIP (Light) ---
const CapabilityStripLight: React.FC<{ 
  item: any; 
  isActive: boolean; 
  onHover: () => void; 
}> = ({ item, isActive, onHover }) => {
  return (
    <div 
      className={`relative h-[400px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden border-r border-slate-200 bg-white ${isActive ? 'flex-[3]' : 'flex-1 group hover:bg-orange-50'}`}
      onMouseEnter={onHover}
    >
       <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="rotate-90 whitespace-nowrap flex items-center gap-4">
             <item.icon size={20} className="text-orange-600" />
             <span className="text-sm font-black uppercase tracking-widest text-slate-400">{item.title}</span>
          </div>
       </div>
       <div className={`absolute inset-0 p-8 flex flex-col justify-end transition-all duration-500 delay-100 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <item.icon size={200} className="text-orange-600" />
          </div>
          <div className="relative z-10">
             <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6 text-white">
                <item.icon size={24} />
             </div>
             <h3 className="text-3xl font-heading font-black uppercase italic mb-4 text-slate-900">{item.title}</h3>
             <p className="text-sm md:text-base font-light leading-relaxed max-w-md text-slate-600">
                {item.desc}
             </p>
          </div>
       </div>
       <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-orange-600 transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-full'}`} />
    </div>
  );
};

// --- COMPONENT: STATIC DIRECTOR PROFILE LIGHT ---
const DirectorProfileLight: React.FC = () => {
  return (
    <section className="py-32 px-6 border-b border-orange-200 bg-[#fffcf5]">
       <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-stretch">
          {/* Left: Image Card */}
          <div className="w-full md:w-5/12">
             <div className="relative h-full min-h-[500px] p-2 border border-orange-200 bg-white shadow-xl">
                <div className="w-full h-full relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                   <img 
                     src="https://i.postimg.cc/3xyqGVyh/cca44d09-d92f-4c0d-987a-b8520bb2f212.jpg?auto=format&fit=crop&q=80" 
                     alt="Director" 
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 text-orange-600 text-[10px] font-mono font-bold uppercase border border-orange-200">
                      IMG_REF_2024
                   </div>
                </div>
             </div>
          </div>

          {/* Right: Data Block */}
          <div className="w-full md:w-7/12 flex flex-col justify-center">
             <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                   <User size={16} className="text-orange-600" />
                   <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Directorate Profile</span>
                </div>
                <h2 className="text-6xl md:text-7xl font-heading font-black uppercase leading-none mb-2 text-slate-900">
                   Arpita Das Richi
                </h2>
                <div className="w-24 h-2 bg-orange-600" />
             </div>

             <div className="p-8 border-l-4 mb-10 border-orange-500 bg-white shadow-sm">
                <Quote className="text-orange-500 mb-4" size={24} />
                <p className="text-xl font-light italic leading-relaxed text-slate-700">
                   "Operations is the heartbeat of Forte-FY. We turn abstract strategy into kinetic reality through relentless precision."
                </p>
             </div>

             <div className="grid grid-cols-2 gap-6">
                <div className="p-4 border border-orange-200 bg-white">
                   <span className="block text-[10px] font-bold uppercase tracking-widest text-orange-600 mb-1">Clearance</span>
                   <span className="text-lg font-heading font-bold text-slate-900">Level 5 Omega</span>
                </div>
                <div className="p-4 border border-orange-200 bg-white">
                   <span className="block text-[10px] font-bold uppercase tracking-widest text-orange-600 mb-1">Status</span>
                   <span className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Active
                   </span>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

// --- NEW COMPONENT: OPS DETAILS LIGHT (Reduced to Structural Backbone) ---
const OpsDetailsLight: React.FC = () => {
  return (
    <section className="py-32 px-6 relative bg-[#fff8f0]">
       <div className="max-w-7xl mx-auto">
          
          {/* 1. MANDATE SECTION (SPLIT) - EXPANDED TEXT */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
             <div>
                <div className="flex items-center gap-3 mb-6">
                   <Target className="text-orange-600" size={20} />
                   <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-slate-500">Department Mandate</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter leading-[0.9] text-slate-900">
                   The Structural <br/> <span className="text-orange-600">Backbone.</span>
                </h2>
             </div>
             <div className="space-y-8">
                <div className="p-8 border-l-2 border-orange-400 bg-white shadow-sm">
                   <h3 className="text-xl font-bold uppercase mb-4 text-slate-900">Foundation Philosophy</h3>
                   <p className="text-lg font-light leading-relaxed mb-6 text-slate-600">
                      The Operations Department serves as the physiological nervous system of Forte-FY, translating abstract strategic vision into concrete, kinetic reality. Founded on the axiom that <strong className="text-slate-900">"Vision requires Structure,"</strong> this department bridges the gap between ideation and execution.
                   </p>
                   <p className="text-lg font-light leading-relaxed text-slate-600">
                      We are the architects of logistical precision, ensuring that every event, campaign, and initiative functions with clockwork efficiency. By managing the intricate web of supply chains, venue logistics, safety protocols, and resource allocation, Operations transforms potential chaos into a symphony of disciplined action. We do not merely support the organization; we sustain its very heartbeat, providing the stability required for innovation to thrive.
                   </p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-3 h-3 rounded-full bg-orange-600 animate-pulse" />
                   <span className="text-sm font-mono uppercase tracking-widest text-slate-500">System Status: Optimal</span>
                </div>
             </div>
          </div>

       </div>
    </section>
  );
};

// --- NEW COMPONENT: OPS LEDGER LIGHT (Recruitment) ---
const OpsLedgerLight: React.FC = () => {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

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

  return (
    <section className="py-32 px-6 relative border-t border-orange-200 bg-orange-50">
       <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
             <div className="inline-block p-4 rounded-full mb-8 bg-white border border-orange-200 text-orange-600 shadow-md">
                <Briefcase size={32} />
             </div>
             
             <h2 className="text-5xl md:text-7xl font-heading font-black uppercase italic mb-8 tracking-tighter text-slate-900">
                The Ops <span className="text-orange-600">Ledger.</span>
             </h2>
             
             <p className="text-lg md:text-xl font-serif italic max-w-2xl mx-auto leading-relaxed text-slate-600">
                "We do not seek mere participants; we seek architects of action. If you can bring order to chaos and execute vision with precision, your station is waiting."
             </p>
          </div>

          <div className="space-y-4">
             {/* Header Row */}
             <div className="grid grid-cols-12 px-6 py-4 border-b border-orange-200 text-[10px] font-black uppercase tracking-[0.2em] hidden md:grid text-slate-400">
                <div className="col-span-5">Designation</div>
                <div className="col-span-3 text-center">Status</div>
                <div className="col-span-4 text-right">Protocol</div>
             </div>

             {ROLES.map((role) => (
                <div key={role.id} className="group border border-orange-100 rounded-xl overflow-hidden transition-all duration-300 bg-white hover:shadow-lg hover:border-orange-300">
                   <div 
                     onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
                     className="grid grid-cols-1 md:grid-cols-12 px-6 py-6 items-center gap-4 cursor-pointer"
                   >
                      <div className="col-span-5 flex items-center gap-4">
                         <div className="p-2 rounded-lg bg-orange-50 text-orange-600 border border-orange-100">
                            <Activity size={18} />
                         </div>
                         <h3 className="text-lg font-bold transition-colors text-slate-900 group-hover:text-orange-600">{role.title}</h3>
                         {role.available && <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-orange-200 text-orange-600 bg-orange-50">{role.duration}</span>}
                      </div>
                      
                      <div className="col-span-3 flex md:justify-center">
                         <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${role.available ? 'bg-green-50 border-green-200 text-green-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                            {role.available ? <ScanLine size={12} className="animate-pulse" /> : <Lock size={12} />}
                            {role.status}
                         </div>
                      </div>

                      <div className="col-span-4 flex md:justify-end">
                         <ChevronDown size={18} className={`transition-transform duration-300 text-slate-400 ${expandedRole === role.id ? 'rotate-180' : ''}`} />
                      </div>
                   </div>

                   <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedRole === role.id ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 pb-8 pt-2 border-t border-orange-50 bg-orange-50/50">
                         <p className="text-sm font-serif leading-relaxed mb-8 max-w-3xl text-slate-600">
                            {role.desc}
                         </p>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                               <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 text-orange-600">Requirements</h4>
                               <ul className="space-y-3">
                                  {role.reqs.map((r, i) => (
                                     <li key={i} className="flex items-start gap-3 text-xs text-slate-600">
                                        <div className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-orange-500" />
                                        <span className="leading-snug">{r}</span>
                                     </li>
                                  ))}
                               </ul>
                            </div>
                            <div>
                               <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 text-orange-600">Benefits</h4>
                               <ul className="space-y-3">
                                  {role.perks.map((p, i) => (
                                     <li key={i} className="flex items-start gap-3 text-xs text-slate-600">
                                        <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-green-600" />
                                        <span className="leading-snug">{p}</span>
                                     </li>
                                  ))}
                               </ul>
                            </div>
                         </div>

                         {role.available ? (
                             <button 
                                onClick={() => window.open('https://forms.google.com', '_blank')}
                                className="w-full md:w-auto px-10 py-4 rounded-lg font-bold uppercase text-xs flex items-center justify-center gap-2 transition-all hover:scale-105 bg-orange-600 text-white hover:bg-slate-900 shadow-xl"
                             >
                                Initiate Application <ArrowUpRight size={14} />
                             </button>
                         ) : (
                             <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-400 bg-white">
                                <Lock size={14} /> Currently Unavailable
                             </div>
                         )}
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

// --- MAIN COMPONENT ---
const Ops_Light: React.FC<DepartmentProps> = ({ dept, navigate, isDark, setIsDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCapIndex, setActiveCapIndex] = useState(0);

  // Parallax for Hero Background
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;
    gsap.to(".parallax-bg", { x: xPos * -0.5, y: yPos * -0.5, duration: 1, ease: "power2.out" });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(".ops-title-reveal", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" });
      gsap.fromTo(".ops-line-reveal", { width: 0, opacity: 0 }, { width: "70%", opacity: 1, duration: 1.5, delay: 0.5, ease: "expo.out" });

      // Sections
      gsap.utils.toArray('.reveal-section').forEach((section: any) => {
        gsap.fromTo(section, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 85%" } });
      });

    }, containerRef);
    setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => ctx.revert();
  }, []);

  const CAPABILITIES = [
    { title: "Supply Chain", icon: Truck, desc: "End-to-end management of material flow and vendor relations." },
    { title: "Asset Control", icon: Box, desc: "Rigorous inventory tracking, safeguarding, and auditing of organizational materials." },
    { title: "Risk Mitigation", icon: Shield, desc: "Advanced contingency planning and real-time problem resolution." },
    { title: "Resource Allocation", icon: BarChart3, desc: "Data-driven distribution of financial and physical capital." },
    { title: "Field Command", icon: Radio, desc: "On-site coordination centers and synchronous communication networks." },
    { title: "Quality Audit", icon: ClipboardList, desc: "Systematic review of operational deliverables." }
  ];

  return (
    <div ref={containerRef} className="min-h-screen font-sans overflow-x-hidden bg-[#fff8f0] text-slate-900 transition-colors duration-700 selection:bg-[#FF8C00] selection:text-black">
      <OpsHeader navigate={navigate} isDark={isDark} setIsDark={setIsDark} />

      {/* HERO (Redesigned) */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-orange-200" onMouseMove={handleMouseMove}>
        <div className="parallax-bg absolute inset-0">
           <HeroOperationsBackground isDark={false} />
        </div>
        <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center justify-center text-center pointer-events-none">
           <div className="ops-title-reveal mb-6 flex items-center gap-2 opacity-50">
              <Activity size={14} className="text-orange-600" />
           </div>

           <h1 className="flex flex-col items-center justify-center font-heading font-black uppercase tracking-tighter leading-[0.85] mb-8 drop-shadow-sm">
              <span className="ops-title-reveal text-xl md:text-3xl tracking-[0.5em] mb-4 font-mono font-bold text-slate-400">DEPARTMENT OF</span>
              <span className="ops-title-reveal text-6xl md:text-8xl lg:text-9xl text-[#FF8C00] relative">
                OPERATIONS
              </span>
           </h1>

           {/* New Minimal Tagline */}
           <div className="ops-title-reveal flex items-center gap-3">
              <div className="h-px w-8 md:w-16 bg-orange-400/50" />
              <p className="text-sm md:text-lg font-mono uppercase tracking-[0.2em] text-slate-700">
                 The Operational Backbone <span className="animate-pulse">_</span>
              </p>
              <div className="h-px w-8 md:w-16 bg-orange-400/50" />
           </div>
        </div>
      </section>

      {/* DIRECTORATE: STATIC PROFILE */}
      <DirectorProfileLight />

      {/* NEW SECTION: OPS DETAILS LIGHT (REDUCED) */}
      <OpsDetailsLight />

      {/* CAPABILITIES (Sliding Deck Light) */}
      <section className="py-32 relative bg-white">
         <div className="max-w-7xl mx-auto px-6 mb-16 reveal-section text-center">
            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase italic text-slate-900">
               Operational <span className="text-[#FF8C00]">Capabilities</span>
            </h2>
            <p className="text-sm font-mono uppercase tracking-widest mt-2 text-slate-500">Tactical Inventory</p>
         </div>
         <div className="reveal-section flex flex-col md:flex-row h-[800px] md:h-[500px] w-full border-y border-orange-100">
            {CAPABILITIES.map((cap, i) => (
               <CapabilityStripLight 
                  key={i} 
                  item={cap} 
                  isActive={activeCapIndex === i} 
                  onHover={() => setActiveCapIndex(i)} 
               />
            ))}
         </div>
      </section>

      {/* --- NEW: OPS LEDGER LIGHT (RECRUITMENT) --- */}
      <OpsLedgerLight />

      <OpsFooter />
    </div>
  );
};

export default Ops_Light;
