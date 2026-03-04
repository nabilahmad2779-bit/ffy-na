
import React, { useRef, useLayoutEffect } from 'react';
import { DEPARTMENT_LIST } from '../../constants.tsx';
import { Activity, Grid } from 'lucide-react';
import { gsap } from 'gsap';
import { KineticDepartmentCard } from '../../components/KineticDepartmentCard.tsx';

export const MobileDepartmentsView: React.FC<{ isDark: boolean; navigate: (path: string) => void }> = ({ isDark, navigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Reorder list for grid and apply specific taglines
  const displayItems = [
    { ...DEPARTMENT_LIST[0], wide: false, tagline: "Organizational Core" }, // HR
    { ...DEPARTMENT_LIST[1], wide: false, tagline: "Voice of Forte-FY" }, // PR
    { ...DEPARTMENT_LIST[2], wide: true },  // IT (Retains "Technical Backbone")
    { ...DEPARTMENT_LIST[3], wide: false, tagline: "Operational Backbone" }, // Ops
    { ...DEPARTMENT_LIST[4], wide: false, tagline: "The Writing Desk" }, // Academics
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".dept-header", {
            y: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`min-h-screen pt-24 pb-24 px-5 overflow-hidden ${isDark ? 'bg-[#050505] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Background Ambient Animation */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-20 animate-pulse ${isDark ? 'bg-cyan-900' : 'bg-blue-200'}`} style={{ animationDuration: '8s' }} />
         <div className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-20 animate-pulse ${isDark ? 'bg-purple-900' : 'bg-purple-200'}`} style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 dept-header mb-10 text-center">
         <h1 className="text-5xl font-heading font-black uppercase italic tracking-tighter leading-[0.85] mb-2">
            The structural <span className={isDark ? 'text-cyan-500' : 'text-cyan-600'}>Pillars.</span>
         </h1>
         <p className="text-xs font-mono uppercase tracking-widest opacity-50 flex items-center justify-center gap-2">
            <Grid size={10} /> Select Division
         </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 pb-12 perspective-1000">
        {displayItems.map((dept, i) => (
           <KineticDepartmentCard 
             key={dept.id}
             dept={dept} 
             isWide={dept.wide} 
             isDark={isDark} 
             onClick={() => navigate(`/departments/${dept.id}`)}
             index={i} 
           />
        ))}
      </div>
    </div>
  );
};
