
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Quote, ExternalLink, Linkedin, Twitter } from 'lucide-react';
import { AlumniPageLight } from '../MainMenuPages/MainMenuPagesLight/AlumniPageLight';

gsap.registerPlugin(ScrollTrigger);

const ALUMNI_DATA = [
  {
    name: "Sarah Chen",
    batch: "Class of 2021",
    role: "Senior Product Designer at Meta",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    quote: "Forte-FY was the catalyst for my career in design. The community is unmatched.",
    color: "#ff007f"
  },
  {
    name: "James Wilson",
    batch: "Class of 2020",
    role: "Full Stack Engineer at Google",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    quote: "The technical mentorship I received here shaped how I solve complex problems today.",
    color: "#00ffff"
  },
  {
    name: "Elena Rodriguez",
    batch: "Class of 2022",
    role: "Creative Director at VaynerMedia",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800",
    quote: "Innovation isn't just a word here; it's a way of life that stays with you.",
    color: "#f4d03f"
  },
  {
    name: "Marcus Thorne",
    batch: "Class of 2019",
    role: "Founder of TechFlow",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
    quote: "Building my first startup within the Forte-FY incubator was an incredible experience.",
    color: "#a855f7"
  },
  {
    name: "Aisha Khan",
    batch: "Class of 2021",
    role: "Data Scientist at Amazon",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    quote: "The analytical rigor and collaborative spirit are what make this community special.",
    color: "#10b981"
  },
  {
    name: "David Park",
    batch: "Class of 2020",
    role: "UX Researcher at Airbnb",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
    quote: "Understanding human behavior was at the core of everything we did at Forte-FY.",
    color: "#f97316"
  }
];

export const AlumniPage: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isDark || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Entrance
      gsap.from(".alumni-hero-text", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
      });

      // 2. UNIQUE FEATURE: 3D Perspective Grid Parallax
      // We tilt the entire grid and move individual items at different Z-depths
      const cards = gsap.utils.toArray('.alumni-card');
      
      gsap.set(gridRef.current, { perspective: 2000 });

      // The Grid Tilt Effect
      gsap.fromTo(gridRef.current, 
        { rotationX: 15, rotationY: -10, scale: 0.9 },
        {
          rotationX: -15,
          rotationY: 10,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".alumni-grid-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      );

      // Individual Card Depth Parallax
      cards.forEach((card: any, i) => {
        const depth = (i % 3 + 1) * 100; // Varying depths
        gsap.fromTo(card,
          { z: -depth, opacity: 0, y: 100 },
          {
            z: depth * 0.5,
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              end: "top center",
              scrub: 1
            }
          }
        );
      });

      // 3. Floating Background Elements
      gsap.to(".floating-orb", {
        y: "random(-100, 100)",
        x: "random(-100, 100)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isDark]);

  if (!isDark) {
    return <AlumniPageLight />;
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-[#ff007f] selection:text-white">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,127,0.1)_0%,transparent_70%)]" />
        
        {/* Floating Orbs */}
        <div className="floating-orb absolute top-1/4 left-1/4 w-64 h-64 bg-[#ff007f]/10 rounded-full blur-[100px]" />
        <div className="floating-orb absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ffff]/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 text-center max-w-5xl">
          <div className="alumni-hero-text inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <GraduationCap size={16} className="text-[#ff007f]" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Our Legacy</span>
          </div>
          <h1 className="alumni-hero-text text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.8] mb-8 uppercase italic">
            THE <span className="text-transparent [-webkit-text-stroke:1px_white]">ALUMNI</span> <br />
            <span className="text-[#ff007f]">NETWORK</span>
          </h1>
          <p className="alumni-hero-text text-xl md:text-2xl font-light text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A global community of innovators, leaders, and creators who continue to redefine the boundaries of possibility.
          </p>
        </div>
      </section>

      {/* 3D Grid Section */}
      <section className="alumni-grid-section py-32 px-6 md:px-12 relative">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-24 max-w-[1600px] mx-auto">
          {ALUMNI_DATA.map((alumni, index) => (
            <div 
              key={index} 
              className="alumni-card group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl transition-all duration-500 hover:border-white/20"
            >
              {/* Image Layer */}
              <div className="absolute inset-0">
                <img 
                  src={alumni.image} 
                  alt={alumni.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#ff007f] mb-2 block">
                    {alumni.batch}
                  </span>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">
                    {alumni.name}
                  </h3>
                  <p className="text-sm text-zinc-400 font-medium">
                    {alumni.role}
                  </p>
                </div>

                <div className="h-px w-full bg-white/10 mb-6 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <div className="flex items-start gap-3 mb-6">
                    <Quote size={20} className="text-[#ff007f] shrink-0" />
                    <p className="text-sm italic text-zinc-300 leading-relaxed">
                      "{alumni.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-[#ff007f] hover:border-[#ff007f] transition-all duration-300">
                      <Linkedin size={16} />
                    </button>
                    <button className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-[#00ffff] hover:border-[#00ffff] transition-all duration-300">
                      <Twitter size={16} />
                    </button>
                    <button className="ml-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                      Profile <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                <div className="absolute top-[-10px] right-[-40px] w-32 h-8 bg-[#ff007f] rotate-45 flex items-center justify-center shadow-lg">
                  <span className="text-[10px] font-black text-white uppercase tracking-tighter">Alumni</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-40 px-6 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 text-center">
          {[
            { label: "Global Alumni", value: "500+", color: "text-[#ff007f]" },
            { label: "Countries", value: "25+", color: "text-[#00ffff]" },
            { label: "Startups Founded", value: "40+", color: "text-[#f4d03f]" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <h4 className={`text-7xl md:text-9xl font-black tracking-tighter mb-4 ${stat.color}`}>
                {stat.value}
              </h4>
              <p className="text-sm font-bold uppercase tracking-[0.4em] text-zinc-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#ff007f]/5 blur-[150px] pointer-events-none" />
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic">
          JOIN THE <span className="text-[#ff007f]">LEGACY</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-12 text-lg font-light">
          Are you a former member of Forte-FY? Reconnect with the community and help shape the next generation of visionaries.
        </p>
        <button className="px-12 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-[#ff007f] hover:text-white transition-all duration-500 transform hover:scale-110">
          Reconnect Now
        </button>
      </section>

    </div>
  );
};
