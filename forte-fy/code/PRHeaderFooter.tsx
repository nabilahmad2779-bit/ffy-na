
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sun, Moon, Menu, X } from 'lucide-react';
import { DEPARTMENT_LIST } from '../constants';

interface PRHeaderProps {
  navigate: (path: string) => void;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PRHeader: React.FC<PRHeaderProps> = ({ navigate, isDark, setIsDark }) => {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Filter out the current department (PR) to show links to others
  const otherDepartments = DEPARTMENT_LIST.filter(d => d.id !== 'pr');

  // PR Department Specific Styling (Crimson/Rose Theme)
  const theme = {
    bg: isDark ? 'bg-black/80 border-b border-rose-900/20' : 'bg-[#fff0f2]/90 border-b border-rose-200',
    text: isDark ? 'text-zinc-400 hover:text-[#DC143C]' : 'text-rose-900/60 hover:text-[#DC143C]',
    separator: isDark ? 'bg-white/10' : 'bg-black/10',
    logoBorder: isDark ? 'border-[#DC143C]/50' : 'border-[#DC143C]/30',
    logoBg: '#DC143C', // Crimson
    logoText: isDark ? 'text-white group-hover:text-[#DC143C]' : 'text-[#2d0a0a] group-hover:text-[#DC143C]',
    navLink: isDark ? 'text-zinc-300 hover:text-white' : 'text-rose-900/70 hover:text-[#DC143C]',
    toggleBtn: isDark ? 'bg-white/10 hover:bg-[#DC143C] text-white' : 'bg-white hover:bg-[#DC143C] text-rose-900 hover:text-white border border-rose-100',
    mobileMenuBg: isDark ? 'bg-[#050002]/98 text-white' : 'bg-[#fff0f2]/98 text-rose-900'
  };

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-[10000] px-6 py-4 flex justify-between items-center transition-all duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'} ${theme.bg} backdrop-blur-md`}>
         
         <div className="flex items-center gap-4 md:gap-8 z-20">
           {/* Back Button */}
           <button 
              onClick={() => navigate('/departments')}
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-colors group ${theme.text} pointer-events-auto`}
           >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
           </button>

           {/* Separator */}
           <div className={`h-4 w-px hidden md:block ${theme.separator}`} />

           {/* Forte-FY Logo */}
           <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
              <div className={`w-8 h-8 border rounded-full flex items-center justify-center transition-all group-hover:rotate-180 duration-700 ${theme.logoBorder}`}>
                <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]`} style={{ backgroundColor: theme.logoBg, color: theme.logoBg }} />
              </div>
              <span className={`font-heading font-black text-lg tracking-tighter uppercase italic transition-colors ${theme.logoText}`}>Forte-FY</span>
           </div>
         </div>

         {/* Other Departments Links (Visible on Medium+ screens) */}
         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-6 xl:gap-8">
            {otherDepartments.map(dept => (
              <button
                key={dept.id}
                onClick={() => navigate(`/departments/${dept.id}`)}
                className={`text-[10px] xl:text-xs font-black uppercase tracking-widest transition-colors ${theme.navLink} hover:scale-105 transform duration-200 whitespace-nowrap`}
              >
                {dept.name}
              </button>
            ))}
         </div>
         
         <div className="z-20 flex items-center gap-4">
           {/* Theme Toggle */}
           <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDark(prev => !prev);
              }} 
              className={`p-2.5 rounded-full transition-all flex items-center justify-center cursor-pointer pointer-events-auto active:scale-90 shadow-lg relative ${theme.toggleBtn}`}
           >
              {isDark ? <Sun size={18} className="pointer-events-none" /> : <Moon size={18} className="pointer-events-none" />}
           </button>

           {/* Mobile Menu Toggle (Visible on Small screens) */}
           <button 
              onClick={() => setIsMenuOpen(true)}
              className={`md:hidden p-2 rounded-full ${theme.text}`}
           >
              <Menu size={24} />
           </button>
         </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMenuOpen && (
        <div className={`fixed inset-0 z-[10001] ${theme.mobileMenuBg} backdrop-blur-3xl flex flex-col p-8 animate-fade-in`}>
           <div className="flex justify-between items-center mb-12">
              <span className="font-heading font-black text-xl uppercase italic tracking-tighter text-[#DC143C]">Forte-FY</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-[#DC143C]"><X size={28} /></button>
           </div>
           <div className="flex flex-col gap-6 items-center justify-center flex-1">
              <span className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4">Switch Department</span>
              {otherDepartments.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => { setIsMenuOpen(false); navigate(`/departments/${dept.id}`); }}
                  className="text-2xl font-heading font-black uppercase italic tracking-tighter hover:text-[#DC143C] transition-colors"
                >
                  {dept.name}
                </button>
              ))}
           </div>
        </div>
      )}
    </>
  );
};

export const PRFooter: React.FC = () => {
  return null;
};
