
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

interface KineticCardProps {
  dept: any;
  isWide?: boolean;
  isDark: boolean;
  onClick: () => void;
  index: number;
}

export const KineticDepartmentCard: React.FC<KineticCardProps> = ({ 
  dept, 
  isWide = false, 
  isDark, 
  onClick, 
  index 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isTouched, setIsTouched] = useState(false);

  // Entrance & Idle Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Pop
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: index * 0.1,
        ease: "back.out(1.5)"
      });

      // 2. Continuous Floating Icon
      gsap.to(iconRef.current, {
        y: -6,
        duration: 2 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!cardRef.current) return;
    setIsTouched(true);
    
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // 3D Tilt Math
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setRotation({ x: rotateX, y: rotateY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
    setRotation({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  const baseClasses = isDark 
    ? 'bg-[#080808] border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' 
    : 'bg-white border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)]';

  return (
    <div 
      ref={cardRef}
      onTouchStart={() => setIsTouched(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseMove={handleTouchMove}
      onMouseLeave={handleTouchEnd}
      onClick={onClick}
      className={`relative rounded-[2rem] border overflow-hidden group cursor-pointer transition-colors duration-500 ${isWide ? 'col-span-2 aspect-[2.1/1]' : 'col-span-1 min-h-[220px]'} ${baseClasses}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* 3D Wrapper */}
      <div 
        className="w-full h-full relative transition-transform duration-100 ease-out p-5 flex flex-col justify-between"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isTouched ? 0.98 : 1})`,
        }}
      >
         {/* 1. Background Gradient Pulse */}
         <div 
            className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40"
            style={{ background: `linear-gradient(135deg, ${dept.accent}20 0%, transparent 100%)` }}
         />

         {/* 2. Automated Sheen Effect */}
         <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none">
            <div className="absolute top-0 -inset-full w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-sheen" />
         </div>

         {/* 3. Interactive Glare (Colored) */}
         <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
               background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${dept.accent} 0%, transparent 70%)`,
               opacity: glare.opacity * 0.4,
               mixBlendMode: 'screen'
            }}
         />

         {/* 4. Rotating Watermark Icon */}
         <div 
            className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12"
            style={{ color: dept.accent }}
         >
            {React.cloneElement(dept.icon, { size: isWide ? 100 : 120 })}
         </div>

         {/* Top Row: Icon Box */}
         <div className="relative z-10 flex justify-between items-start">
            <div 
               ref={iconRef}
               className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border shadow-inner transition-colors duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'}`}
               style={{ color: dept.accent, borderColor: isTouched ? dept.accent : '' }}
            >
               {React.cloneElement(dept.icon, { size: isWide ? 20 : 24 })}
            </div>
            {/* Active Indicator */}
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isTouched ? 'bg-white' : 'bg-transparent'}`} style={{ backgroundColor: isTouched ? dept.accent : '' }} />
         </div>

         {/* Bottom Row: Text Info */}
         <div className="relative z-10 mt-auto">
            <h3 className={`font-heading font-black uppercase italic tracking-tight leading-[0.9] mb-2 ${isWide ? 'text-2xl' : 'text-lg'} ${isDark ? 'text-white' : 'text-slate-900'}`}>
               {dept.name}
            </h3>
            
            <div className="flex items-center justify-between">
               <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-60 truncate max-w-[80%]" style={{ color: isDark ? dept.accent : '#64748b' }}>
                  {dept.tagline}
               </span>
               <div 
                  className={`p-1.5 rounded-full border transition-all duration-300 ${isTouched ? 'scale-110 border-transparent' : (isDark ? 'border-white/20 text-white/50' : 'border-slate-200 text-slate-400')}`}
                  style={{ 
                     backgroundColor: isTouched ? dept.accent : 'transparent',
                     color: isTouched ? (isDark ? '#000' : '#fff') : undefined
                  }}
               >
                  {isWide ? <ArrowUpRight size={12} /> : <ChevronRight size={12} />}
               </div>
            </div>
            
            {/* Progress Bar Decoration */}
            <div className="w-full h-0.5 bg-gray-500/10 mt-3 rounded-full overflow-hidden">
               <div className={`h-full w-1/3 transition-all duration-500 ${isTouched ? 'w-full' : ''}`} style={{ backgroundColor: dept.accent }} />
            </div>
         </div>
      </div>
      <style>{`
        @keyframes sheen {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
        }
        .animate-sheen {
            animation: sheen 4s infinite linear;
        }
      `}</style>
    </div>
  );
};
