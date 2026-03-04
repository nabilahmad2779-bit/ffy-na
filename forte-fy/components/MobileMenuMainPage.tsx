
import React, { useRef, useLayoutEffect } from 'react';
import { 
  X, Sun, Moon,
  Layout, History, Archive, Trophy, Users, Globe, Layers,
  ArrowUpRight
} from 'lucide-react';
import { gsap } from 'gsap';

interface MobileMenuMainPageProps {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  onClose: () => void;
  navigate: (id: string) => void;
}

// All items share identical proportions and brightness logic
const MOBILE_ITEMS = [
  { 
    id: "home", 
    label: "HOME", 
    path: "/",
    icon: Layout,
    gradientDark: "from-cyan-500/30 to-cyan-500/10",
    gradientLight: "from-cyan-200 to-cyan-50",
    accentDark: "text-cyan-400",
    accentLight: "text-cyan-700",
    borderDark: "border-cyan-500/20",
    borderLight: "border-cyan-500/30",
    span: "col-span-2 row-span-1", 
    textSize: "text-5xl"
  },
  { 
    id: "story", 
    label: "ORIGIN", 
    path: "/story",
    icon: History,
    gradientDark: "from-fuchsia-500/30 to-fuchsia-500/10",
    gradientLight: "from-fuchsia-200 to-fuchsia-50",
    accentDark: "text-fuchsia-400",
    accentLight: "text-fuchsia-700",
    borderDark: "border-fuchsia-500/20",
    borderLight: "border-fuchsia-500/30",
    span: "col-span-1 row-span-1", 
    textSize: "text-xl"
  },
  { 
    id: "departments", 
    label: "PILLARS", 
    path: "/departments",
    icon: Layers,
    gradientDark: "from-indigo-500/30 to-indigo-500/10",
    gradientLight: "from-indigo-200 to-indigo-50",
    accentDark: "text-indigo-400",
    accentLight: "text-indigo-700",
    borderDark: "border-indigo-500/20",
    borderLight: "border-indigo-500/30",
    span: "col-span-1 row-span-1", 
    textSize: "text-xl"
  },
  { 
    id: "events", 
    label: "ARCHIVE", 
    path: "/events",
    icon: Archive,
    gradientDark: "from-amber-500/30 to-amber-500/10",
    gradientLight: "from-amber-200 to-amber-50",
    accentDark: "text-amber-400",
    accentLight: "text-amber-700",
    borderDark: "border-amber-500/20",
    borderLight: "border-amber-500/30",
    span: "col-span-1 row-span-1", 
    textSize: "text-xl"
  },
  { 
    id: "hall-of-fame", 
    label: "HONORS", 
    path: "/hall-of-fame",
    icon: Trophy,
    gradientDark: "from-rose-500/30 to-rose-500/10",
    gradientLight: "from-rose-200 to-rose-50",
    accentDark: "text-rose-400",
    accentLight: "text-rose-700",
    borderDark: "border-rose-500/20",
    borderLight: "border-rose-500/30",
    span: "col-span-1 row-span-1", 
    textSize: "text-xl"
  },
  { 
    id: "panel", 
    label: "LEGISLATIVE BODY", 
    path: "/panel",
    icon: Users,
    gradientDark: "from-emerald-500/30 to-emerald-500/10",
    gradientLight: "from-emerald-200 to-emerald-50",
    accentDark: "text-emerald-400", 
    accentLight: "text-emerald-700",
    borderDark: "border-emerald-500/20",
    borderLight: "border-emerald-500/30",
    span: "col-span-1 row-span-1", 
    textSize: "text-lg leading-none" // Slightly smaller to handle length
  },
  { 
    id: "alumni", 
    label: "ALUMNI", 
    path: "/alumni",
    icon: Globe,
    gradientDark: "from-violet-500/30 to-violet-500/10",
    gradientLight: "from-violet-200 to-violet-50",
    accentDark: "text-violet-400",
    accentLight: "text-violet-700",
    borderDark: "border-violet-500/20",
    borderLight: "border-violet-500/30",
    span: "col-span-1 row-span-1", 
    textSize: "text-xl"
  }
];

export const MobileMenuMainPage: React.FC<MobileMenuMainPageProps> = ({ isDark, setIsDark, onClose, navigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".mobile-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.from(".mobile-bento-item", {
        y: 30,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.03
      });
      gsap.from(".mobile-header", { y: -20, opacity: 0, duration: 0.4 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleItemClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const bg = isDark ? 'bg-[#0f0f0f]' : 'bg-slate-50';
  const headerBg = isDark ? 'bg-black' : 'bg-white';
  const borderCol = isDark ? 'border-white/5' : 'border-slate-200';

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col font-sans overflow-hidden h-[100dvh] w-screen select-none">
      
      <div className={`mobile-backdrop absolute inset-0 ${bg}`} />

      {/* --- HEADER --- */}
      <header className={`mobile-header relative z-20 shrink-0 flex items-center justify-between px-6 h-[60px] ${headerBg} border-b ${borderCol}`}>
         <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full ${isDark ? 'bg-cyan-500 shadow-[0_0_8px_#06b6d4]' : 'bg-blue-600'}`} />
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-white' : 'text-slate-900'}`}>FORTE-FY</span>
         </div>

         <div className="flex gap-3">
            <button onClick={() => setIsDark(!isDark)} className={`p-2 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
               {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={onClose} className="p-2 text-red-500">
               <X size={22} />
            </button>
         </div>
      </header>

      {/* --- GRID CONTAINER --- */}
      <div className="relative z-10 flex-1 p-2 md:p-3">
         {/* Fixed 4-row grid with standard alignment */}
         <div className="grid grid-cols-2 grid-rows-4 gap-2 w-full h-full">
            
            {MOBILE_ITEMS.map((item) => (
               <button
                  key={item.id}
                  onClick={() => handleItemClick(item.path)}
                  className={`
                     mobile-bento-item group relative overflow-hidden outline-none flex flex-col justify-between p-4 h-full w-full
                     border rounded-[1.5rem] transition-all duration-300 active:scale-[0.97] ${item.span}
                     ${isDark ? 'bg-[#161616]' : 'bg-white shadow-sm'}
                     ${isDark ? item.borderDark : item.borderLight}
                  `}
               >
                  {/* Standardized Gradient (Consistent Brightness Top to Bottom) */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? item.gradientDark : item.gradientLight}`} />

                  {/* Icon Area (Identical Start Point) */}
                  <div className="relative z-10 flex items-start">
                     <div className={`p-1.5 rounded-lg ${isDark ? 'bg-black/20' : 'bg-white'} ${isDark ? item.accentDark : item.accentLight}`}>
                        <item.icon size={22} strokeWidth={2} />
                     </div>
                  </div>

                  {/* Label Area (Standardized Height to level text horizontally) */}
                  <div className="relative z-10 w-full text-left mt-auto min-h-[50px] flex flex-col justify-end">
                     <h3 className={`${item.textSize} font-heading font-black uppercase italic tracking-tighter leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {item.label}
                     </h3>
                     {/* Standardized Accent Bar */}
                     <div className={`h-1 w-6 mt-2 ${isDark ? 'bg-white/20' : 'bg-slate-200'}`} />
                  </div>

                  {/* Top-Right Arrow (Subtle Detail) */}
                  <div className="absolute top-4 right-4 opacity-20">
                     <ArrowUpRight size={14} className={isDark ? 'text-white' : 'text-slate-900'} />
                  </div>
               </button>
            ))}

         </div>
      </div>
    </div>
  );
};
