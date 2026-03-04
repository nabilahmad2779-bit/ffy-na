import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import SmartImage from '../../SmartImage';
import { 
  ArrowLeft, Rocket, Telescope, Atom, Star, Zap, Users, 
  ChevronDown, Award, Radio, ArrowUpRight, Crosshair, Globe
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EventPageProps {
  onBack: () => void;
  isDark: boolean;
}

// --- SUB-COMPONENTS (LIGHT) ---

const StarfieldLight = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: {x: number, y: number, z: number, pz: number}[] = [];
    const numStars = 800;
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 2000,
        pz: 0
      });
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(248, 250, 255, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach(star => {
        star.pz = star.z;
        star.z -= 10;
        
        if (star.z < 1) {
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
          star.z = 2000;
          star.pz = 2000;
        }

        const x = cx + (star.x / star.z) * 800;
        const y = cy + (star.y / star.z) * 800;
        const px = cx + (star.x / star.pz) * 800;
        const py = cy + (star.y / star.pz) * 800;

        const size = Math.max(0.1, (1 - star.z / 2000) * 3);
        const opacity = 1 - star.z / 2000;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
        ctx.lineWidth = size;
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#f8faff]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8faff]/50 to-[#f8faff]" />
    </div>
  );
};

// --- MAIN PAGE ---

export const CosmicQuestLight: React.FC<EventPageProps> = ({ onBack, isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'cosmic-quest');

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Scrubbed Explosion
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
        }
      });

      heroTl.to(".hero-text-1", { x: "-40vw", y: "-20vh", rotation: -15, scale: 1.5, opacity: 0, filter: "blur(10px)", ease: "power1.inOut" }, 0)
            .to(".hero-text-2", { x: "40vw", y: "20vh", rotation: 15, scale: 1.5, opacity: 0, filter: "blur(10px)", ease: "power1.inOut" }, 0)
            .to(".hero-subtitle", { scale: 2, opacity: 0, filter: "blur(20px)", ease: "power1.inOut" }, 0)
            .to(".hero-bg-glow", { scale: 3, opacity: 0, ease: "power1.inOut" }, 0);

      // 2. Intro Clip-Path & Text Fill Reveal
      gsap.from(".intro-section", {
        clipPath: "inset(20% 20% 20% 20% round 100px)",
        scrollTrigger: {
          trigger: ".intro-section",
          start: "top bottom",
          end: "top 20%",
          scrub: 1,
        }
      });

      gsap.to(".text-fill", {
        backgroundPositionX: "0%",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".intro-section",
          start: "top 60%",
          end: "bottom 60%",
          scrub: 1,
        }
      });

      // 3. Horizontal Scroll Section
      gsap.to(".horizontal-wrapper", {
        xPercent: -66.666, // Move 2 out of 3 panels to the left
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-section",
          start: "top top",
          end: "+=300%", // Pin for 3 screen heights
          pin: true,
          scrub: 1,
        }
      });

      // Parallax images inside horizontal scroll
      gsap.utils.toArray('.horizontal-parallax').forEach((img: any) => {
         gsap.to(img, {
            rotation: 15,
            scale: 1.2,
            ease: "none",
            scrollTrigger: {
               trigger: ".horizontal-section",
               start: "top top",
               end: "+=300%",
               scrub: 1
            }
         });
      });

      // 4. Extreme Parallax
      gsap.utils.toArray('.parallax-item').forEach((item: any, i) => {
         gsap.fromTo(item, 
            { y: 200, opacity: 0, scale: 0.8, rotation: i % 2 === 0 ? 10 : -10 },
            { 
               y: 0, opacity: 1, scale: 1, rotation: 0, 
               scrollTrigger: {
                  trigger: item,
                  start: "top 90%",
                  end: "top 40%",
                  scrub: 1
               }
            }
         );
      });

      // 5. Metrics 3D Flip
      gsap.from(".metric-item", {
        y: 150,
        opacity: 0,
        rotationX: -90,
        transformOrigin: "50% 0%",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".metrics-section",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        }
      });

      // Existing Rocket Scroll Progress
      if (rocketRef.current) {
          gsap.to(rocketRef.current, {
              top: "100%", 
              ease: "none",
              scrollTrigger: {
                  trigger: ".mission-timeline-l",
                  start: "top center",
                  end: "bottom center",
                  scrub: 1
              }
          });
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!event) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f8faff] text-slate-900 selection:bg-indigo-600 selection:text-white overflow-x-hidden font-sans">
      
      {/* 1. HERO SECTION - TRAVELING UNIVERSE (Scrubbed Explosion) */}
      <section 
        className="hero-section relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-[#f8faff]"
      >
         {/* Traveling Stars Animation */}
         <StarfieldLight />
         <div className="hero-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/20 to-amber-500/20 rounded-full blur-[100px] pointer-events-none" />

         <div className="absolute top-24 left-6 md:left-10 z-30">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors bg-white/50 px-4 py-2 rounded-full border border-slate-200 backdrop-blur-md">
               <ArrowLeft size={16} />
               <span className="text-[10px] font-black uppercase tracking-widest">Back to Archive</span>
            </button>
         </div>

         <div className="relative z-10 text-center flex flex-col items-center pointer-events-none w-full max-w-6xl">
               <h1 
                 className="text-6xl md:text-[9rem] lg:text-[11rem] font-heading font-black uppercase tracking-tighter leading-[0.9] mb-6 text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-900 to-fuchsia-900 drop-shadow-sm w-full flex flex-col items-center"
               >
                  <span className="hero-text-1 block">COSMIC</span>
                  <span className="hero-text-2 block">QUEST</span>
               </h1>

               <p className="hero-subtitle text-lg md:text-2xl font-light text-slate-600 max-w-xl leading-relaxed px-4">
                  "Commence an extraordinary expedition to the frontiers of knowledge."
               </p>
         </div>
      </section>

      {/* 2. INTRO SECTION (Clip-Path & Text Fill Reveal) */}
      <section className="intro-section py-40 px-6 bg-white relative z-10 border-t border-slate-200">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-32">
               <h2 className="text-4xl md:text-6xl font-heading font-black uppercase text-slate-900 mb-6 leading-[1.1]">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Cosmic Quest</span> <br/>
                  An Epic Online Astronomy Event
               </h2>
               <p className="text-2xl md:text-4xl font-black text-slate-200 max-w-5xl mx-auto leading-relaxed uppercase tracking-tighter">
                  <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#4f46e5_50%,#e2e8f0_50%)] bg-[length:200%_100%] bg-[position:100%_0]">Cosmic Quest represents </span>
                  <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#c026d3_50%,#e2e8f0_50%)] bg-[length:200%_100%] bg-[position:100%_0]">Forte-FY's premier </span>
                  <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#d97706_50%,#e2e8f0_50%)] bg-[length:200%_100%] bg-[position:100%_0]">astronomical initiative, </span>
                  <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#4f46e5_50%,#e2e8f0_50%)] bg-[length:200%_100%] bg-[position:100%_0]">meticulously engineered </span>
                  <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#0f172a_50%,#e2e8f0_50%)] bg-[length:200%_100%] bg-[position:100%_0]">to cultivate scientific inquiry.</span>
               </p>
            </div>

            {/* Strategic Vision */}
            <div className="flex flex-col lg:flex-row gap-16 mb-32 relative">
               <div className="lg:w-1/3">
                  <div className="sticky top-32">
                     <h2 className="text-4xl md:text-5xl font-heading font-black uppercase text-slate-900 mb-6">Strategic <span className="text-indigo-600">Vision</span></h2>
                     <p className="text-slate-600 font-light leading-relaxed mb-8">
                        Cultivating profound curiosity and methodological thinking among students through advanced astronomical concepts.
                     </p>
                     <div className="w-16 h-1 bg-indigo-600 rounded-full" />
                  </div>
               </div>
               <div className="lg:w-2/3 space-y-6">
                  {[
                     { title: "Scientific Inquiry", desc: "Cultivating profound curiosity and methodological thinking among students.", icon: Telescope },
                     { title: "Space Education", desc: "Promoting advanced astronomical concepts and celestial mechanics.", icon: Globe },
                     { title: "Analytical Rigor", desc: "Developing critical thinking and innovative problem-solving capabilities.", icon: Atom },
                     { title: "Academic Nexus", desc: "Building a vibrant, cross-institutional community of young scholars.", icon: Users }
                  ].map((item, i) => (
                     <div key={i} className="parallax-item group p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-500 flex items-start gap-6 cursor-pointer">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-indigo-100 transition-all duration-500">
                           <item.icon size={28} className="text-indigo-600" />
                        </div>
                        <div>
                           <h4 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                           <p className="text-slate-600 font-light leading-relaxed">{item.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Academic Divisions */}
            <div className="flex flex-col lg:flex-row-reverse gap-16 mb-32 relative">
               <div className="lg:w-1/3">
                  <div className="sticky top-32">
                     <h2 className="text-4xl md:text-5xl font-heading font-black uppercase text-slate-900 mb-6">Academic <span className="text-fuchsia-600">Divisions</span></h2>
                     <p className="text-slate-600 font-light leading-relaxed mb-8">
                        Participants are categorized into two distinct academic divisions to ensure equitable and age-appropriate intellectual challenges.
                     </p>
                     <div className="w-16 h-1 bg-fuchsia-600 rounded-full" />
                  </div>
               </div>
               <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="parallax-item group p-10 rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden cursor-pointer">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full blur-[50px] group-hover:bg-indigo-200 transition-colors" />
                     <h4 className="text-3xl font-black text-slate-900 uppercase tracking-wider mb-2">Primary</h4>
                     <div className="inline-block px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-mono text-sm font-bold mb-6">Class 6–8</div>
                     <p className="text-slate-600 font-light">Foundational astronomical concepts and basic scientific inquiry.</p>
                  </div>
                  <div className="parallax-item group p-10 rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:border-fuchsia-300 hover:shadow-xl transition-all duration-500 relative overflow-hidden cursor-pointer">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-100 rounded-full blur-[50px] group-hover:bg-fuchsia-200 transition-colors" />
                     <h4 className="text-3xl font-black text-slate-900 uppercase tracking-wider mb-2">Secondary</h4>
                     <div className="inline-block px-4 py-2 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-600 font-mono text-sm font-bold mb-6">Class 9–12</div>
                     <p className="text-slate-600 font-light mb-4">Advanced celestial mechanics and complex problem-solving.</p>
                     <p className="text-xs text-slate-500 italic">* Includes HSC Batch 22</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. HORIZONTAL SCROLL SECTION (Event Segments) */}
      <section className="horizontal-section h-screen w-full overflow-hidden bg-[#f8faff] relative z-10 border-t border-slate-200">
         <div className="absolute top-12 left-12 z-50 text-slate-900 mix-blend-difference">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-white">Event Segments</h2>
         </div>
         
         <div className="horizontal-wrapper flex w-[300vw] h-full">
            {[
               { num: "01", title: "Astro Quiz", color: "#4f46e5", bg: "bg-indigo-50", border: "border-indigo-100", desc: "A 25-minute competitive quiz featuring 25 carefully curated questions.", points: ["Basic Astronomy Concepts", "Simple Mathematical Applications", "Foundational Ideas of General Relativity"], note: "Tests logic, speed, and conceptual clarity. Tie-breaking by submission time." },
               { num: "02", title: "Astro Movie Quiz", color: "#c026d3", bg: "bg-fuchsia-50", border: "border-fuchsia-100", desc: "A unique and engaging quiz focused on iconic space-themed films.", points: ["Interstellar", "The Martian", "First Man"], note: "Blends cinematic storytelling with scientific understanding and analytical observation." },
               { num: "03", title: "Astro Article Writing", color: "#d97706", bg: "bg-amber-50", border: "border-amber-100", desc: "A creative writing competition where participants craft a 300–450 word article on any space-related topic.", points: ["Originality & Creativity", "Scientific Accuracy", "Depth of Research"], note: "Celebrates originality, depth of research, and the ability to communicate complex ideas." }
            ].map((seg, i) => (
               <div key={i} className="w-screen h-full flex items-center justify-center relative px-6 md:px-24">
                  <div className="flex flex-col md:flex-row w-full max-w-7xl items-center justify-between gap-16 z-10">
                     <div className="w-full md:w-1/2 order-2 md:order-1">
                        <div className="text-8xl font-black mb-4 font-heading horizontal-parallax" style={{ color: seg.color }}>{seg.num}.</div>
                        <h3 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 uppercase" style={{ color: seg.color, textShadow: `0 0 20px ${seg.color}40` }}>{seg.title}</h3>
                        <p className="text-xl text-slate-600 font-light leading-relaxed max-w-lg mb-8">{seg.desc}</p>
                        <ul className="space-y-3">
                           {seg.points.map((pt, j) => (
                              <li key={j} className="flex items-center gap-3 text-slate-700 font-light text-lg">
                                 <span className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
                                 {pt}
                              </li>
                           ))}
                        </ul>
                     </div>
                     <div className="w-full md:w-5/12 aspect-square overflow-hidden order-1 md:order-2 rounded-[2rem] border-2 shadow-[0_0_50px_rgba(0,0,0,0.05)] flex items-center justify-center bg-white" style={{ borderColor: `${seg.color}50` }}>
                        <div className="horizontal-parallax text-9xl" style={{ color: seg.color }}>
                           {i === 0 ? <Zap size={150} /> : i === 1 ? <Globe size={150} /> : <Atom size={150} />}
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 4. HALL OF FAME (Extreme Parallax) */}
      <section className="py-32 px-6 relative bg-white overflow-hidden border-t border-slate-200">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50 rounded-full blur-[150px] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-6xl font-heading font-black uppercase italic text-slate-900 mb-6">Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Fame</span></h2>
               <p className="text-slate-600 font-light max-w-2xl mx-auto text-lg">Celebrating the brightest minds and the most dedicated ambassadors of Cosmic Quest.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {/* Top Winners */}
               <div className="parallax-item p-10 rounded-[2.5rem] bg-slate-50 border border-slate-200 hover:border-amber-300 hover:shadow-xl transition-all duration-500">
                  <div className="flex items-center gap-4 mb-10">
                     <div className="p-4 rounded-2xl bg-amber-100 border border-amber-200">
                        <Award size={32} className="text-amber-600" />
                     </div>
                     <h3 className="text-3xl font-heading font-black uppercase text-slate-900">Event Winners</h3>
                  </div>
                  <div className="space-y-4">
                     {[
                        { name: "Aarav Rahman", title: "Grand Champion", school: "Dhaka College", prize: "1st Prize" },
                        { name: "Sarah Islam", title: "Runner Up", school: "Viqarunnisa Noon School", prize: "2nd Prize" },
                        { name: "Tahmid Hasan", title: "2nd Runner Up", school: "Notre Dame College", prize: "3rd Prize" }
                     ].map((winner, i) => (
                        <div key={i} className="group p-6 rounded-2xl bg-white border border-slate-100 hover:border-amber-300 hover:shadow-md transition-all flex items-center justify-between cursor-pointer">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-slate-300 font-bold text-slate-700 group-hover:border-amber-400 group-hover:text-amber-600 transition-colors">
                                 {winner.name.charAt(0)}
                              </div>
                              <div>
                                 <h4 className="text-slate-900 font-bold text-lg group-hover:text-amber-600 transition-colors">{winner.name}</h4>
                                 <p className="text-slate-500 text-sm">{winner.school}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <span className="block text-amber-600 font-bold text-sm">{winner.prize}</span>
                              <span className="text-xs text-slate-500">{winner.title}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Best Ambassadors */}
               <div className="parallax-item p-10 rounded-[2.5rem] bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-500">
                  <div className="flex items-center gap-4 mb-10">
                     <div className="p-4 rounded-2xl bg-indigo-100 border border-indigo-200">
                        <Star size={32} className="text-indigo-600" />
                     </div>
                     <h3 className="text-3xl font-heading font-black uppercase text-slate-900">Top Ambassadors</h3>
                  </div>
                  <div className="space-y-4">
                     {[
                        { name: "Nafis Ahmed", role: "Lead Ambassador", reach: "15K+ Reach" },
                        { name: "Fariha Rahman", role: "Campus Ambassador", reach: "12K+ Reach" },
                        { name: "Zayed Khan", role: "Campus Ambassador", reach: "10K+ Reach" }
                     ].map((amb, i) => (
                        <div key={i} className="group p-6 rounded-2xl bg-white border border-slate-100 hover:border-indigo-300 hover:shadow-md transition-all flex items-center justify-between cursor-pointer">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-slate-300 font-bold text-slate-700 group-hover:border-indigo-400 group-hover:text-indigo-600 transition-colors">
                                 {amb.name.charAt(0)}
                              </div>
                              <div>
                                 <h4 className="text-slate-900 font-bold text-lg group-hover:text-indigo-600 transition-colors">{amb.name}</h4>
                                 <p className="text-slate-500 text-sm">{amb.role}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">{amb.reach}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. STATS (3D FLIP) */}
      <section className="metrics-section py-32 bg-[#f8faff] relative z-10 border-t border-slate-200">
         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="metric-item p-10 bg-white rounded-3xl shadow-sm border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
               <Telescope size={40} className="mx-auto text-indigo-600 mb-4" />
               <h3 className="text-5xl font-heading font-black text-slate-900 mb-2">{event.metrics.reachLabel}</h3>
               <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Reach</p>
            </div>
            <div className="metric-item p-10 bg-white rounded-3xl shadow-sm border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
               <Users size={40} className="mx-auto text-indigo-600 mb-4" />
               <h3 className="text-5xl font-heading font-black text-slate-900 mb-2">{event.metrics.participants}</h3>
               <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Cadets</p>
            </div>
            <div className="metric-item p-10 bg-white rounded-3xl shadow-sm border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
               <Star size={40} className="mx-auto text-indigo-600 mb-4" />
               <h3 className="text-5xl font-heading font-black text-slate-900 mb-2">{event.metrics.ambassadors}</h3>
               <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Ambassadors</p>
            </div>
         </div>
      </section>

      {/* TIMELINE */}
      <section className="py-32 px-6 mission-timeline-l relative bg-white overflow-hidden border-t border-slate-200">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-300 to-transparent" />
         
         <div className="max-w-6xl mx-auto relative">
            <div className="text-center mb-24">
               <h2 className="text-4xl md:text-6xl font-heading font-black uppercase italic text-slate-900 mb-6">Event <span className="text-fuchsia-600">Timeline</span></h2>
               <p className="text-slate-600 font-light max-w-2xl mx-auto text-lg">The sequence of cosmic events designed to challenge and inspire.</p>
            </div>

            <div className="absolute left-[28px] md:left-1/2 top-48 bottom-0 w-px bg-gradient-to-b from-fuchsia-300 via-indigo-300 to-transparent md:-translate-x-1/2">
               {/* Rocket Follower */}
               <div ref={rocketRef} className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center z-20 text-white bg-indigo-600 rounded-full border-4 border-white shadow-lg transition-transform duration-75" style={{ top: '0%' }}>
                  <Rocket size={24} className="rotate-180" />
               </div>
            </div>

            <div className="space-y-24 relative z-10">
               {[
                  { title: "Cosmic Olympiad", icon: Award, color: "#c026d3", bg: "bg-fuchsia-50", border: "border-fuchsia-200", desc: "A rigorous test of astronomical knowledge challenging young minds to push their limits. Covers astrophysics, celestial mechanics, and history of space exploration." },
                  { title: "Sky Observation", icon: Telescope, color: "#4f46e5", bg: "bg-indigo-50", border: "border-indigo-200", desc: "Direct observation of celestial bodies using advanced telescopes under guided supervision. Learn to identify constellations, planets, and deep-sky objects." },
                  { title: "Space Workshops", icon: Users, color: "#d97706", bg: "bg-amber-50", border: "border-amber-200", desc: "Interactive sessions on rocketry, astrophysics, and the future of space travel led by industry experts and academic professionals." },
                  { title: "Cosmic Quiz", icon: Zap, color: "#e11d48", bg: "bg-rose-50", border: "border-rose-200", desc: "Rapid-fire trivia rounds on space history, phenomena, and scientific breakthroughs. Fast-paced, competitive, and highly engaging." }
               ].map((item, i) => (
                  <div key={i} className={`parallax-item flex flex-col md:flex-row items-center gap-8 md:gap-16 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''} group`}>
                     <div className={`w-16 h-16 rounded-full border-4 bg-white z-10 flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 ${i % 2 !== 0 ? 'md:mr-auto' : 'md:ml-auto'}`} style={{ borderColor: item.color, boxShadow: `0 10px 25px -5px ${item.color}40` }}>
                        <item.icon size={28} style={{ color: item.color }} />
                     </div>
                     <div className="flex-1 w-full">
                        <div className={`p-10 rounded-[2.5rem] bg-white border border-slate-200 hover:shadow-xl transition-all duration-500 relative overflow-hidden cursor-pointer group-hover:-translate-y-2`} style={{ borderBottomColor: item.color, borderBottomWidth: '4px' }}>
                           <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                              <item.icon size={120} style={{ color: item.color }} />
                           </div>
                           <h3 className="text-3xl font-bold uppercase mb-4 transition-colors duration-300" style={{ color: item.color }}>{item.title}</h3>
                           <p className="text-slate-600 font-light text-lg leading-relaxed">{item.desc}</p>
                        </div>
                     </div>
                     <div className="flex-1 hidden md:block" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* RECRUITMENT */}
      <section className="py-32 px-6 relative bg-indigo-900 overflow-hidden border-t border-slate-200">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
         
         <div className="max-w-4xl mx-auto relative z-10 text-center">
            <div className="parallax-item inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white mb-8 animate-pulse">
               <Radio size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest">Incoming Transmission</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase italic text-white mb-6">
               Ambassador <br/> Recruitment.
            </h2>
            
            <p className="text-lg md:text-xl font-light text-indigo-200 mb-10 max-w-2xl mx-auto">
               Are you passionate about spreading cosmic enthusiasm? Join us as an Event Ambassador.
            </p>

            <button 
               onClick={() => window.open('https://forms.google.com', '_blank')}
               className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-900 font-black uppercase tracking-widest rounded-full hover:bg-indigo-50 transition-colors shadow-2xl"
            >
               <span>Accept Mission</span>
               <ArrowUpRight size={18} />
            </button>
         </div>
      </section>

      <section className="py-20 bg-[#f8faff] relative z-10 border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-12">Allied Science Divisions</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-60 hover:opacity-100 transition-opacity duration-500">
               {[...PARTNER_LOGOS].filter(p => p.name.includes('Science') || p.name.includes('Astro') || p.name.includes('Club')).slice(0,10).map((p, i) => (
                  <div key={i} className="w-20 h-20 rounded-full border border-slate-200 p-4 bg-white shadow-sm hover:border-indigo-400 hover:shadow-lg transition-all duration-300 grayscale hover:grayscale-0 cursor-pointer">
                     <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain" />
                  </div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
};
