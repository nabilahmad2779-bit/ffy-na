
import React, { useState } from 'react';
import { NavSection } from '../types';
import { Leaf, Menu, X, Heart } from 'lucide-react';

interface HeaderProps {
  onNav: (section: NavSection) => void;
  activeSection: NavSection;
}

const Header: React.FC<HeaderProps> = ({ onNav, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', value: NavSection.Home },
    // Fix: Changed NavSection.Projects to NavSection.Initiatives as Projects is not defined in the enum
    { label: 'Our Work', value: NavSection.Initiatives },
    { label: 'AI Vision', value: NavSection.Impact },
    // Fix: Changed to NavSection.History as Mission/About is not defined in the NavSection enum
    { label: 'About', value: NavSection.History }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNav(NavSection.Home)}>
            <div className="bg-emerald-600 p-2 rounded-xl">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">EcoHarmony</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNav(item.value)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.value ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-500'
                }`}
              >
                {item.label}
              </button>
            ))}
            {/* Fix: Changed NavSection.Donate to NavSection.Contact as Donate is not defined in the enum */}
            <button 
              onClick={() => onNav(NavSection.Contact)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-emerald-200"
            >
              <Heart className="w-4 h-4" />
              Donate Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onNav(item.value);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-4 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
            {/* Fix: Changed NavSection.Donate to NavSection.Contact as Donate is not defined in the enum */}
            <button 
              onClick={() => {
                onNav(NavSection.Contact);
                setIsOpen(false);
              }}
              className="w-full mt-4 bg-emerald-600 text-white px-4 py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Donate Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
