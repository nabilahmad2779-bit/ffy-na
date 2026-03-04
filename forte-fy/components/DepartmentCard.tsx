
import React, { useRef, useState } from 'react';

interface DepartmentCardProps {
  dept: any;
  navigate: (path: string) => void;
  isDark?: boolean; // Make optional for backwards compat, though mostly used with isDark
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ dept, navigate, isDark = true }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Spotlight position (percentage)
    setSpotlight({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });

    // 3D Tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt -10 to 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setSpotlight(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div 
      className="relative group h-full"
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/departments/${dept.id}`)}
    >
      <div 
        ref={cardRef}
        className={`relative h-full w-full rounded-2xl md:rounded-[2.5rem] transition-transform duration-100 ease-out border-[3px] cursor-pointer overflow-hidden ${dept.colorClass}`} 
        style={{ 
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          backgroundColor: isDark ? '#18181b' : '#ffffff',
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
        }}
      >
         {/* Gradient Border Rotation - Background Spin */}
         <div 
            className="absolute -inset-[150%] opacity-0 group-hover:opacity-40 transition-opacity duration-700 -z-20 pointer-events-none"
            style={{
                background: `conic-gradient(from 0deg, transparent, ${dept.accent}, transparent)`,
                animation: 'spin-border 4s linear infinite'
            }}
         />
         <style>{`@keyframes spin-border { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

         {/* Inner Content Background Mask - adjusted inset to 3px to match border thickness */}
         <div className={`absolute inset-[3px] rounded-[2.4rem] -z-10 ${isDark ? 'bg-zinc-950' : 'bg-white'}`} />

         {/* Spotlight Reveal Overlay */}
         <div 
            className="absolute inset-0 pointer-events-none rounded-[2.5rem] transition-opacity duration-500 z-0 mix-blend-screen"
            style={{
                background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, ${dept.accent}25, transparent 65%)`,
                opacity: spotlight.opacity
            }}
         />

         {/* Content Container (Layer Separation) */}
         <div className="relative z-10 p-7 md:p-10 flex flex-col h-full" style={{ transformStyle: 'preserve-3d' }}>
            
            {/* Layer 1: Icon & Primary Header - Highest translation */}
            <div className="transition-transform duration-300 group-hover:translate-z-12" style={{ transform: 'translateZ(40px)' }}>
               <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-5 md:mb-8 border shadow-inner shrink-0 ${isDark ? 'bg-white/5 border-white/5' : 'bg-[#00f7ff]/5 border-[#00f7ff]/10'}`} style={{ color: dept.accent }}>
                 {dept.icon}
               </div>
               <h4 className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1.5 md:mb-3 leading-none ${isDark ? 'text-white opacity-60' : 'text-black/50'}`}>{dept.tagline}</h4>
               <h3 className={`text-xl md:text-2xl font-heading font-black italic tracking-tight mb-3 md:mb-6 ${isDark ? 'text-white' : 'text-black'}`}>{dept.name}</h3>
            </div>

            {/* Layer 2: Description text - Moderate translation */}
            <p className={`text-xs md:text-sm font-light leading-relaxed mb-6 md:mb-8 transition-transform duration-300 ${isDark ? 'text-zinc-500' : 'text-black/70'}`} style={{ transform: 'translateZ(25px)' }}>{dept.description}</p>
            
            {/* Layer 3: Bottom meta - Low translation */}
            <div className={`mt-auto pt-5 flex items-center justify-between transition-opacity ${isDark ? 'opacity-30 group-hover:opacity-100' : 'opacity-100'}`} style={{ transform: 'translateZ(15px)' }}>
               <span className={`text-[7px] md:text-[8px] font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-black/40'}`}>Structural Nexus</span>
               <div className="w-8 md:w-10 h-0.5" style={{ backgroundColor: dept.accent }} />
            </div>
         </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
