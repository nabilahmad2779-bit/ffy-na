
import React, { useRef, useLayoutEffect } from 'react';
import { 
  X, Sun, Moon,
  Layout, History, Archive, Trophy, Users, Globe, Layers,
  Grid, ArrowUpRight
} from 'lucide-react';
import { gsap } from 'gsap';

interface PCMenuMainPageProps {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  setIsMenuOpen: (val: boolean) => void;
  navigate: (path: string) => void;
}

const MENU_ITEMS = [
  { 
    id: "home", 
    label: "HOME", 
    path: "/",
    icon: Layout,
    // Dark Mode: Deep Cyan/Blue gradient
    gradientDark: "from-cyan-950/80 via-blue-950/50 to-black",
    // Light Mode: Very subtle Cyan/Blue tint
    gradientLight: "from-cyan-50 via-blue-50 to-white",
    // Accents
    accentDark: "text-cyan-400",
    accentLight: "text-cyan-600",
    borderDark: "group-hover:border-cyan-500/50",
    borderLight: "group-hover:border-cyan-400/50",
    spotlight: "rgba(6,182,212,0.15)", // Cyan glow
    span: "col-span-2 row-span-2", // 2x2
  },
  { 
    id: "story", 
    label: "ORIGIN", 
    path: "/story",
    icon: History,
    gradientDark: "from-fuchsia-950/80 via-purple-950/50 to-black",
    gradientLight: "from-fuchsia-50 via-purple-50 to-white",
    accentDark: "text-fuchsia-400",
    accentLight: "text-fuchsia-600",
    borderDark: "group-hover:border-fuchsia-500/50",
    borderLight: "group-hover:border-fuchsia-400/50",
    spotlight: "rgba(192,38,211,0.15)", // Fuchsia glow
    span: "col-span-2 row-span-1", // 2x1
  },
  { 
    id: "departments", 
    label: "STRUCTURAL PILLARS", 
    path: "/departments",
    icon: Layers,
    gradientDark: "from-indigo-950/80 via-violet-950/50 to-black",
    gradientLight: "from-indigo-50 via-violet-50 to-white",
    accentDark: "text-indigo-400",
    accentLight: "text-indigo-600",
    borderDark: "group-hover:border-indigo-500/50",
    borderLight: "group-hover:border-indigo-400/50",
    spotlight: "rgba(99,102,241,0.15)", // Indigo glow
    span: "col-span-1 row-span-2", // 1x2 (Tall)
    textSize: "text-xl md:text-3xl lg:text-4xl" // Slightly smaller for longer text
  },
  { 
    id: "events", 
    label: "ARCHIVE", 
    path: "/events",
    icon: Archive,
    gradientDark: "from-amber-950/80 via-orange-950/50 to-black",
    gradientLight: "from-amber-50 via-orange-50 to-white",
    accentDark: "text-amber-400",
    accentLight: "text-amber-600",
    borderDark: "group-hover:border-amber-500/50",
    borderLight: "group-hover:border-amber-400/50",
    spotlight: "rgba(245,158,11,0.15)", // Amber glow
    span: "col-span-1 row-span-1", // 1x1
  },
  { 
    id: "hall-of-fame", 
    label: "HALL OF FAME", 
    path: "/hall-of-fame",
    icon: Trophy,
    gradientDark: "from-rose-950/80 via-red-950/50 to-black",
    gradientLight: "from-rose-50 via-red-50 to-white",
    accentDark: "text-rose-400",
    accentLight: "text-rose-600",
    borderDark: "group-hover:border-rose-500/50",
    borderLight: "group-hover:border-rose-400/50",
    spotlight: "rgba(244,63,94,0.15)", // Rose glow
    span: "col-span-1 row-span-1", // 1x1
  },
  { 
    id: "panel", 
    label: "LEGISLATIVE BODY", 
    path: "/panel",
    icon: Users,
    gradientDark: "from-emerald-950/80 via-teal-950/50 to-black",
    gradientLight: "from-emerald-50 via-teal-50 to-white",
    accentDark: "text-emerald-400",
    accentLight: "text-emerald-600",
    borderDark: "group-hover:border-emerald-500/50",
    borderLight: "group-hover:border-emerald-400/50",
    spotlight: "rgba(16,185,129,0.15)", // Emerald glow
    span: "col-span-1 row-span-1", // 1x1
    textSize: "text-lg md:text-2xl lg:text-3xl" // Slightly smaller for longer text
  },
  { 
    id: "alumni", 
    label: "ALUMNI", 
    path: "/alumni",
    icon: Globe,
    gradientDark: "from-pink-950/80 via-rose-950/50 to-black",
    gradientLight: "from-pink-50 via-rose-50 to-white",
    accentDark: "text-pink-400",
    accentLight: "text-pink-600",
    borderDark: "group-hover:border-pink-500/50",
    borderLight: "group-hover:border-pink-400/50",
    spotlight: "rgba(236,72,153,0.15)", // Pink glow
    span: "col-span-1 row-span-1", // 1x1
  }
];

export const PCMenuMainPage: React.FC<PCMenuMainPageProps> = ({ isDark, setIsDark, setIsMenuOpen, navigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade in for container
      gsap.fromTo(".menu-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.4 });
      
      // Fast, snappy entrance for grid items
      gsap.from(".bento-item", {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.04
      });

      // Header slide down
      gsap.from(".menu-header", { y: -20, opacity: 0, duration: 0.5, ease: "power2.out" });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleNavigate = (path: string) => {
    const ctx = gsap.context(() => {
      gsap.to(".bento-item", { scale: 0.95, opacity: 0, duration: 0.2, stagger: 0.01 });
      gsap.to(".menu-backdrop", { opacity: 0, duration: 0.3, onComplete: () => {
         setIsMenuOpen(false);
         navigate(path);
      }});
    }, containerRef);
  };

  const handleClose = () => {
    const ctx = gsap.context(() => {
      gsap.to(".bento-item", { scale: 0.95, opacity: 0, duration: 0.2, stagger: 0.01 });
      gsap.to(".menu-backdrop", { opacity: 0, duration: 0.3, onComplete: () => setIsMenuOpen(false) });
    }, containerRef);
  };

  // Mouse Move Handler for Spotlight Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty('--mouse-x', `${x}px`);
    btn.style.setProperty('--mouse-y', `${y}px`);
  };

  // Base Theme Config
  const bg = isDark ? 'bg-[#030303]' : 'bg-slate-50';
  const text = isDark ? 'text-white' : 'text-slate-900';
  const headerBg = isDark ? 'bg-black' : 'bg-white';
  const headerText = isDark ? 'text-zinc-400' : 'text-slate-500';

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col font-sans overflow-hidden h-screen w-screen select-none">
      
      {/* Backdrop */}
      <div className={`menu-backdrop absolute inset-0 ${bg}`} />

      {/* --- HEADER (Minimalist) --- */}
      <div className={`menu-header relative z-20 shrink-0 flex items-center justify-between px-6 py-4 h-[60px] md:h-[70px] ${headerBg} border-b ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
         <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-md ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
               <Grid size={16} className={isDark ? 'text-cyan-500' : 'text-blue-600'} />
            </div>
            <span className={`text-xs font-black uppercase tracking-[0.2em] ${text}`}>Forte-FY System</span>
         </div>

         <div className="flex gap-4">
            <button 
               onClick={() => setIsDark(!isDark)}
               className={`p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${headerText} hover:text-cyan-500`}
            >
               {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
               onClick={handleClose}
               className={`p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${headerText} hover:text-red-500`}
            >
               <X size={20} />
            </button>
         </div>
      </div>

      {/* --- BENTO GRID CONTAINER --- */}
      <div className="relative z-10 flex-1 w-full h-full p-2 md:p-3 overflow-hidden">
         <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-2 w-full h-full">
            
            {MENU_ITEMS.map((item) => (
               <button
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  onMouseMove={handleMouseMove}
                  className={`
                     bento-item group relative overflow-hidden outline-none flex flex-col justify-between p-6 md:p-8
                     border transition-all duration-500 ease-out ${item.span}
                     ${isDark ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-slate-200'}
                     ${isDark ? item.borderDark : item.borderLight}
                     hover:z-10 hover:shadow-2xl hover:scale-[1.01]
                  `}
               >
                  {/* Spotlight Overlay */}
                  <div 
                     className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                     style={{ 
                        background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), ${item.spotlight || 'rgba(255,255,255,0.1)'}, transparent 40%)` 
                     }}
                  />

                  {/* Background Gradient (Subtle by default, vivid on hover) */}
                  <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 opacity-20 group-hover:opacity-90 ${isDark ? item.gradientDark : item.gradientLight}`} />
                  
                  {/* Decorative Scanline Animation */}
                  <div className={`absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-scan pointer-events-none`} style={{ animationDuration: '3s' }} />

                  {/* Icon Area */}
                  <div className="relative z-10 flex justify-between items-start w-full">
                     <div className={`transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-3 ${isDark ? item.accentDark : item.accentLight}`}>
                        <item.icon size={28} strokeWidth={1.5} />
                     </div>
                     <ArrowUpRight size={20} className={`opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out ${isDark ? 'text-white' : 'text-slate-900'}`} />
                  </div>

                  {/* Label Area */}
                  <div className="relative z-10 w-full text-left mt-auto">
                     <h3 className={`${item.textSize || "text-2xl md:text-3xl lg:text-5xl"} font-heading font-black uppercase italic tracking-tighter leading-[0.85] transition-all duration-300 ${isDark ? 'text-white' : 'text-slate-900 group-hover:text-black'}`}>
                        {item.label}
                     </h3>
                     {/* Horizontal Bar on Hover */}
                     <div className={`h-1 w-0 group-hover:w-16 mt-4 transition-all duration-500 ease-out delay-75 ${isDark ? 'bg-white' : 'bg-black'}`} />
                  </div>

               </button>
            ))}

         </div>
      </div>
      
      <style>{`
         @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(500%); }
         }
         .animate-scan {
            animation: scan linear infinite;
         }
      `}</style>

    </div>
  );
};
