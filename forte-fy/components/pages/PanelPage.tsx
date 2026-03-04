
import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles, Zap, Anchor, Target, Activity, Globe, ChevronDown } from 'lucide-react';
import { PanelPageLight } from '../MainMenuPages/MainMenuPagesLight/PanelPageLight';

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  { 
    name: "Nabil Ahmad", 
    role: "Founder and President", 
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&h=1000", 
    bio: "Visionary leader driving the core mission of Forte-FY.",
    initials: "NA",
    icon: <Sparkles size={48} />
  },
  { 
    name: "Muminoor Nahin", 
    role: "Co-founder and Vice President", 
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800&h=1000", 
    bio: "Strategic mind shaping the future and expanding our reach.",
    initials: "MN",
    icon: <Globe size={48} />
  },
  { 
    name: "Kashfia Anjum Rahman", 
    role: "Head of Human Resources", 
    image: "https://i.postimg.cc/W1HSq4Tn/Whats-App-Image-2026-01-31-at-9-57-06-PM.jpg?auto=format&fit=crop&q=80", 
    bio: "Cultivating talent, fostering growth, and building community.",
    initials: "KR",
    icon: <Activity size={48} />
  },
  { 
    name: "Arpita Das Richi", 
    role: "Head of Public Relations", 
    image: "https://i.postimg.cc/3xyqGVyh/cca44d09-d92f-4c0d-987a-b8520bb2f212.jpg?auto=format&fit=crop&q=80", 
    bio: "Building bridges and amplifying our voice across networks.",
    initials: "AR",
    icon: <Zap size={48} />
  },
  { 
    name: "Mahima Anjum Rahman", 
    role: "Head of IT", 
    image: "https://i.postimg.cc/Dwc7w14B/IMG-20260302-224634-jpg.jpg", 
    bio: "Architecting our digital infrastructure and technological edge.",
    initials: "MR",
    icon: <Target size={48} />
  },
  { 
    name: "ASM Abdullah", 
    role: "Head of Operations", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800&h=1000", 
    bio: "Executing with precision, efficiency, and operational excellence.",
    initials: "AA",
    icon: <Anchor size={48} />
  },
];

const AnimatedNumber = ({ value, isDark }: { value: number, isDark: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
      },
      onUpdate: () => {
        el.innerText = Math.round(obj.val).toString().padStart(2, '0');
      }
    });
  }, [value]);

  return <span ref={ref} className={isDark ? "text-[#00f7ff]" : "text-[#0066cc]"}>00</span>;
};

export const PanelPage: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isDark || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. HYPER-ANIMATED HERO
      // 3D Mouse Move Effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5) * 40;
        const yPos = (clientY / innerHeight - 0.5) * 40;
        
        gsap.to(".hero-visual-container", {
          rotationY: xPos,
          rotationX: -yPos,
          duration: 1.2,
          ease: "power2.out"
        });
        
        gsap.to(".hero-glow", {
          x: xPos * 2,
          y: yPos * 2,
          duration: 1.5,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Hero Entrance Timeline
      const heroTl = gsap.timeline();
      
      gsap.set(".hero-char", { opacity: 0, y: 100, rotationX: -90, z: -500 });
      
      heroTl.to(".hero-char", {
        opacity: 1,
        y: 0,
        rotationX: 0,
        z: 0,
        duration: 1.5,
        stagger: {
          amount: 1,
          from: "random"
        },
        ease: "expo.out"
      })
      .from(".hero-line", {
        scaleX: 0,
        duration: 1,
        ease: "power4.inOut"
      }, "-=1")
      .from(".hero-meta", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.5");

      // Hero Scrubbed Exit (3D Depth Zoom)
      gsap.to(".hero-visual-container", {
        scale: 0.5,
        z: -2000,
        opacity: 0,
        filter: "blur(20px)",
        scrollTrigger: {
          trigger: ".hero-section-dark",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      // 2. UNIQUE SCROLLING: 3D DEPTH STACK
      const panels = gsap.utils.toArray<HTMLElement>('.panel-card-dark');
      
      panels.forEach((panel, i) => {
        const content = panel.querySelector('.panel-content-text');
        const visual = panel.querySelector('.panel-content-visual');
        const number = panel.querySelector('.panel-number');
        
        // Initial state for 3D effect
        gsap.set(panel, { perspective: 2000 });
        
        // Entrance & Exit for each panel
        const panelTl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
            pinSpacing: true
          }
        });

        // The "Most Unique" Animation: 3D Kinetic Shutter
        panelTl
          .from(visual, {
            xPercent: i % 2 === 0 ? 100 : -100,
            rotationY: i % 2 === 0 ? -45 : 45,
            scale: 0.5,
            opacity: 0,
            ease: "none"
          }, 0)
          .from(content, {
            xPercent: i % 2 === 0 ? -100 : 100,
            rotationY: i % 2 === 0 ? 45 : -45,
            scale: 0.8,
            opacity: 0,
            ease: "none"
          }, 0)
          .from(number, {
            y: 100,
            opacity: 0,
            scale: 2,
            ease: "none"
          }, 0.2)
          // Exit animation (shrinking into depth)
          .to(panel, {
            scale: 0.8,
            z: -1000,
            opacity: 0,
            filter: "blur(10px)",
            ease: "none"
          }, 0.8);

        // Internal Image Parallax
        const img = panel.querySelector('img');
        if (img) {
          gsap.to(img, {
            scale: 1.3,
            yPercent: 10,
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isDark]);

  if (!isDark) {
    return <PanelPageLight />;
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-[#00f7ff] selection:text-black">
      
      {/* Hyper-Animated Hero Section */}
      <section className="hero-section-dark h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden bg-[#050505]">
        {/* Dynamic Background */}
        <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[#00f7ff]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 pointer-events-none mix-blend-overlay" />
        
        <div className="hero-visual-container w-full max-w-7xl relative z-10 flex flex-col items-center justify-center h-full" style={{ transformStyle: 'preserve-3d' }}>
          <div className="hero-meta flex items-center gap-4 mb-8">
            <div className="hero-line w-12 h-px bg-[#00f7ff]" />
            <span className="text-sm md:text-base font-black uppercase tracking-[0.6em] text-[#00f7ff]">
              The Leadership
            </span>
            <div className="hero-line w-12 h-px bg-[#00f7ff]" />
          </div>
          
          <h1 className="text-7xl md:text-[12rem] font-heading font-black uppercase italic tracking-tighter leading-[0.8] text-center mb-12 flex flex-wrap justify-center gap-x-4">
            {"VISIONARIES".split('').map((char, i) => (
              <span key={i} className="hero-char inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-[#00f7ff]/50">
                {char}
              </span>
            ))}
          </h1>
          
          <p className="hero-meta text-lg md:text-2xl font-light text-zinc-400 max-w-3xl mx-auto leading-relaxed text-center italic">
            Architecting the future of <span className="text-white font-bold">Forte-FY</span> through precision, innovation, and unwavering dedication.
          </p>
          
          <div className="hero-meta absolute bottom-12 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-[#00f7ff] animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">System Active</span>
            </div>
            <ChevronDown className="text-[#00f7ff] animate-bounce" size={24} />
          </div>
        </div>
      </section>

      {/* Unique 3D Depth Stack Panels */}
      <div className="panels-container-dark relative w-full">
        {PANELS.map((panel, index) => (
          <div 
            key={index} 
            className="panel-card-dark h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden"
          >
            {/* Background Ambience - Strictly Cyan/Blue */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,rgba(0,247,255,0.2)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />

            <div className={`relative w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center h-full`}>
              
              {/* Text Content */}
              <div className={`panel-content-text flex flex-col justify-center ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="panel-number mb-8 flex items-center gap-4">
                  <span className="text-4xl md:text-6xl font-heading font-black italic text-zinc-800">
                    <AnimatedNumber value={index + 1} isDark={true} />
                  </span>
                  <div className="w-12 h-px bg-zinc-800" />
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-500">{panel.initials}</span>
                </div>

                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black uppercase tracking-tighter leading-[0.9] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#00f7ff]">
                  {panel.name}
                </h2>

                <p className="text-xl md:text-2xl font-light italic text-[#00f7ff] mb-8 drop-shadow-[0_0_15px_rgba(0,247,255,0.4)]">
                  {panel.role}
                </p>

                <p className="text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed border-l-2 border-[#00f7ff]/20 pl-6">
                  {panel.bio}
                </p>
              </div>

              {/* Visual Content - Resized & Balanced */}
              <div className={`panel-content-visual h-[45vh] md:h-[65vh] w-full max-w-[450px] mx-auto relative group ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="w-full h-full relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,247,255,0.1)] bg-zinc-900">
                  <img 
                    src={panel.image!} 
                    alt={panel.name} 
                    className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                  
                  {/* Kinetic Overlay on Hover */}
                  <div className="absolute inset-0 bg-[#00f7ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-[#00f7ff] flex items-center justify-center animate-ping">
                       <ArrowUpRight className="text-[#00f7ff]" size={32} />
                    </div>
                  </div>
                </div>
                
                {/* Floating Tech Accents */}
                <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-[#00f7ff]/30 rounded-tr-[3rem] pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-[#00f7ff]/30 rounded-bl-[3rem] pointer-events-none" />
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
