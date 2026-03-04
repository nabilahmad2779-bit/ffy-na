
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { DEPARTMENT_LIST } from '../constants';

interface ITHeaderProps {
  navigate: (path: string) => void;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ITHeader: React.FC<ITHeaderProps> = ({ navigate, isDark, setIsDark }) => {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Filter out the current department (IT) to show links to others
  const otherDepartments = DEPARTMENT_LIST.filter(d => d.id !== 'it');

  return (
    <div className={`fixed top-0 left-0 w-full z-[10000] px-6 py-4 flex justify-between items-center transition-all duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'} ${isDark ? 'bg-black/80 border-b border-white/10' : 'bg-white/90 border-b border-slate-200'} backdrop-blur-md`}>
       
       <div className="flex items-center gap-4 md:gap-8 z-20">
         {/* Back Button */}
         <button 
            onClick={() => navigate('/departments')}
            className={`flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-colors group ${isDark ? 'text-zinc-400 hover:text-cyan-500' : 'text-slate-500 hover:text-purple-600'} pointer-events-auto`}
         >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
         </button>

         {/* Separator */}
         <div className={`h-4 w-px hidden md:block ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

         {/* Forte-FY Logo */}
         <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className={`w-8 h-8 border rounded-full flex items-center justify-center transition-all group-hover:rotate-180 duration-700 ${isDark ? 'border-cyan-500/50' : 'border-purple-500/50'}`}>
              <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${isDark ? 'bg-cyan-500 shadow-cyan-500' : 'bg-purple-600 shadow-purple-600'}`} />
            </div>
            <span className={`font-heading font-black text-lg tracking-tighter uppercase italic transition-colors ${isDark ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-purple-600'}`}>Forte-FY</span>
         </div>
       </div>

       {/* Other Departments Links (Centered & More Visible) */}
       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center gap-8">
          {otherDepartments.map(dept => (
            <button
              key={dept.id}
              onClick={() => navigate(`/departments/${dept.id}`)}
              className={`text-xs font-black uppercase tracking-widest transition-colors ${isDark ? 'text-zinc-300 hover:text-white hover:scale-105' : 'text-slate-600 hover:text-purple-600 hover:scale-105'} transform duration-200`}
            >
              {dept.name}
            </button>
          ))}
       </div>
       
       {/* Theme Toggle */}
       <div className="z-20">
         <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDark(prev => !prev);
            }} 
            className={`p-2.5 rounded-full transition-all flex items-center justify-center cursor-pointer pointer-events-auto active:scale-90 shadow-lg relative ${isDark ? 'bg-white/10 hover:bg-yellow-400 text-white hover:text-black' : 'bg-slate-100 hover:bg-slate-800 text-slate-800 hover:text-white'}`}
         >
            {isDark ? <Sun size={18} className="pointer-events-none" /> : <Moon size={18} className="pointer-events-none" />}
         </button>
       </div>
    </div>
  );
};

export const ITFooter: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <footer className={`py-8 text-center text-[10px] font-mono border-t uppercase tracking-widest backdrop-blur-md ${isDark ? 'text-zinc-600 border-white/5 bg-black/40' : 'text-slate-400 border-slate-200 bg-white/40'}`}>
       IT Department • Visual & Digital Systems • v4.0.0
    </footer>
  );
};
