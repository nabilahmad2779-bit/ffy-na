import React, { useLayoutEffect, useRef } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EventPageProps {
  isDark: boolean;
}

export const BrushFlash: React.FC<EventPageProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'brush-flash');

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

      heroTl.to(".brush-text", { x: "-40vw", y: "-20vh", rotation: -15, scale: 1.5, opacity: 0, filter: "blur(10px)", ease: "power1.inOut" }, 0)
            .to(".flash-text", { x: "40vw", y: "20vh", rotation: 15, scale: 1.5, opacity: 0, filter: "blur(10px)", ease: "power1.inOut" }, 0)
            .to(".hero-center-img", { scale: 2, opacity: 0, filter: "blur(20px)", ease: "power1.inOut" }, 0)
            .to(".hero-float-1", { y: "-60vh", x: "-20vw", rotation: 45, opacity: 0, ease: "none" }, 0)
            .to(".hero-float-2", { y: "60vh", x: "20vw", rotation: -45, opacity: 0, ease: "none" }, 0)
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
      gsap.to(".disciplines-wrapper", {
        xPercent: -66.666, // Move 2 out of 3 panels to the left
        ease: "none",
        scrollTrigger: {
          trigger: ".disciplines-section",
          start: "top top",
          end: "+=300%", // Pin for 3 screen heights
          pin: true,
          scrub: 1,
        }
      });

      // Parallax images inside horizontal scroll
        gsap.utils.toArray('.disc-img').forEach((img: any) => {
           gsap.to(img, {
              rotation: 15,
              scale: 1.2,
              ease: "none",
              scrollTrigger: {
                 trigger: ".disciplines-section",
                 start: "top top",
                 end: "+=300%",
                 scrub: 1
              }
           });
        });

      // 4. Gallery Extreme Parallax
      gsap.utils.toArray('.gallery-item').forEach((item: any, i) => {
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

      // 6. Marquee Scroll Velocity
      gsap.to(".marquee-inner", {
         xPercent: -50,
         ease: "none",
         scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5
         }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!event) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-[#e5e5e5] overflow-x-hidden selection:bg-[#ff007f] selection:text-white font-sans">
      
      {/* 1. FLASHY HERO SECTION (Split & Pin) */}
      <section className="hero-section h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#050505]">
         {/* Glowing Background Orb */}
         <div className="hero-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-gradient-to-tr from-[#ff007f]/30 via-[#00ffff]/20 to-[#f4d03f]/30 rounded-full blur-[100px] pointer-events-none" />

         {/* Floating Flashy Elements */}
         <div className="hero-float-1 absolute top-[20%] left-[15%] w-32 md:w-48 aspect-square rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,255,255,0.4)] border border-[#00ffff]/50 z-20 rotate-[-10deg]">
            <img src="https://picsum.photos/seed/flash1/400/400" alt="Float 1" className="w-full h-full object-cover mix-blend-screen" referrerPolicy="no-referrer" />
         </div>
         <div className="hero-float-2 absolute bottom-[20%] right-[15%] w-40 md:w-56 aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,0,127,0.4)] border border-[#ff007f]/50 z-20 rotate-[15deg]">
            <img src="https://picsum.photos/seed/flash2/500/400" alt="Float 2" className="w-full h-full object-cover mix-blend-screen" referrerPolicy="no-referrer" />
         </div>

         {/* Center Image */}
         <div className="hero-center-img absolute z-10 w-[50vw] md:w-[25vw] aspect-[3/4] overflow-hidden rounded-3xl shadow-[0_0_60px_rgba(244,208,63,0.3)] border border-[#f4d03f]/30">
            <img src="https://picsum.photos/seed/brushflashhero/800/1200" alt="Exhibition" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
         </div>

         {/* Split Typography - Colorful & Flashy */}
         <h1 className="brush-text absolute z-30 text-[22vw] md:text-[14vw] font-black tracking-tighter text-[#f4d03f] mix-blend-screen pointer-events-none leading-none drop-shadow-[0_0_20px_rgba(244,208,63,0.8)]">
            BRUSH
         </h1>
         <h1 className="flash-text absolute z-30 text-[22vw] md:text-[14vw] font-black tracking-tighter text-transparent [-webkit-text-stroke:2px_#ff007f] md:[-webkit-text-stroke:4px_#ff007f] mix-blend-screen pointer-events-none leading-none drop-shadow-[0_0_20px_rgba(255,0,127,0.8)]">
            & FLASH
         </h1>

         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.5em] text-[#00ffff] font-bold animate-pulse">
            Scroll to ignite
         </div>
      </section>

      {/* Dynamic Marquee */}
      <div className="w-full bg-[#ff007f] py-4 overflow-hidden relative z-20 border-y-4 border-black">
         <div className="marquee-inner flex gap-8 items-center w-[200%] font-black uppercase tracking-widest text-black text-2xl">
            {[...Array(10)].map((_, i) => (
               <React.Fragment key={i}>
                  <span>Photography</span><span className="text-white">•</span>
                  <span>Digital Art</span><span className="text-white">•</span>
                  <span>Sketching</span><span className="text-white">•</span>
               </React.Fragment>
            ))}
         </div>
      </div>

      {/* 2. INTRO SECTION (Scroll Scrubbed Text Fill) */}
      <section className="intro-section py-40 px-6 md:px-24 bg-[#111111] relative z-10">
         <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-7xl font-black leading-[1.2] tracking-tighter text-zinc-800 uppercase">
               <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#ffffff_50%,#3f3f46_50%)] bg-[length:200%_100%] bg-[position:100%_0]">A celebration of </span>
               <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#ff007f_50%,#3f3f46_50%)] bg-[length:200%_100%] bg-[position:100%_0]">static beauty, </span>
               <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#ffffff_50%,#3f3f46_50%)] bg-[length:200%_100%] bg-[position:100%_0]">captured through the </span>
               <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#00ffff_50%,#3f3f46_50%)] bg-[length:200%_100%] bg-[position:100%_0]">lens </span>
               <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#ffffff_50%,#3f3f46_50%)] bg-[length:200%_100%] bg-[position:100%_0]">and crafted by the </span>
               <span className="text-fill bg-clip-text text-transparent bg-[linear-gradient(to_right,#f4d03f_50%,#3f3f46_50%)] bg-[length:200%_100%] bg-[position:100%_0]">hand.</span>
            </h2>
            <p className="mt-16 text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-zinc-400">
               {event.description}
            </p>
         </div>
      </section>

      {/* 3. HORIZONTAL SCROLL SECTION (The Disciplines) */}
      <section className="disciplines-section h-screen w-full overflow-hidden bg-[#050505] relative z-10 border-t border-white/10">
         <div className="absolute top-12 left-12 z-50 text-white mix-blend-difference">
            <h2 className="text-sm font-black uppercase tracking-[0.4em]">The Mediums</h2>
         </div>
         
         <div className="disciplines-wrapper flex w-[300vw] h-full">
            
            {/* Panel 1: Photography */}
            <div className="w-screen h-full flex items-center justify-center relative px-6 md:px-24">
               <div className="flex flex-col md:flex-row w-full max-w-7xl items-center justify-between gap-16 z-10">
                  <div className="w-full md:w-1/2 order-2 md:order-1">
                     <h3 className="text-6xl md:text-8xl font-black tracking-tighter text-[#ff007f] mb-8 drop-shadow-[0_0_20px_rgba(255,0,127,0.5)] uppercase">Photography</h3>
                     <p className="text-xl text-zinc-300 font-light leading-relaxed max-w-lg">Capture the world through your lens. Show us your perspective, composition, and mastery of light in its purest form.</p>
                  </div>
                  <div className="w-full md:w-5/12 aspect-[4/5] overflow-hidden order-1 md:order-2 rounded-[2rem] border-2 border-[#ff007f]/50 shadow-[0_0_50px_rgba(255,0,127,0.2)]">
                     <img src="https://picsum.photos/seed/photo3/800/1000" alt="Photography" className="disc-img w-full h-full object-cover scale-125" referrerPolicy="no-referrer" />
                  </div>
               </div>
            </div>

            {/* Panel 2: Digital Art */}
            <div className="w-screen h-full flex items-center justify-center relative px-6 md:px-24">
               <div className="flex flex-col md:flex-row w-full max-w-7xl items-center justify-between gap-16 z-10">
                  <div className="w-full md:w-5/12 aspect-square overflow-hidden rounded-[2rem] border-2 border-[#00ffff]/50 shadow-[0_0_50px_rgba(0,255,255,0.2)]">
                     <img src="https://picsum.photos/seed/digital3/800/800" alt="Digital Art" className="disc-img w-full h-full object-cover scale-125" referrerPolicy="no-referrer" />
                  </div>
                  <div className="w-full md:w-1/2">
                     <h3 className="text-6xl md:text-8xl font-black tracking-tighter text-[#00ffff] mb-8 drop-shadow-[0_0_20px_rgba(0,255,255,0.5)] uppercase">Digital Art</h3>
                     <p className="text-xl text-zinc-300 font-light leading-relaxed max-w-lg">Unleash your imagination on a digital canvas. Create stunning visuals using modern tools and limitless creativity.</p>
                  </div>
               </div>
            </div>

            {/* Panel 3: Sketching */}
            <div className="w-screen h-full flex items-center justify-center relative px-6 md:px-24">
               <div className="flex flex-col md:flex-row w-full max-w-7xl items-center justify-between gap-16 z-10">
                  <div className="w-full md:w-1/2 order-2 md:order-1">
                     <h3 className="text-6xl md:text-8xl font-black tracking-tighter text-[#f4d03f] mb-8 drop-shadow-[0_0_20px_rgba(244,208,63,0.5)] uppercase">Sketching</h3>
                     <p className="text-xl text-zinc-300 font-light leading-relaxed max-w-lg">Return to the roots of art. Express your creativity through traditional sketching, shading, and drawing techniques.</p>
                  </div>
                  <div className="w-full md:w-5/12 aspect-[3/4] overflow-hidden order-1 md:order-2 rounded-[2rem] border-2 border-[#f4d03f]/50 shadow-[0_0_50px_rgba(244,208,63,0.2)]">
                     <img src="https://picsum.photos/seed/sketch3/800/1000" alt="Sketching" className="disc-img w-full h-full object-cover scale-125" referrerPolicy="no-referrer" />
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* 4. SCRUBBED GALLERY */}
      <section className="py-32 px-6 bg-[#111111] relative z-10 border-t border-white/10">
         <div className="max-w-7xl mx-auto">
            <div className="mb-24 flex flex-col items-center text-center">
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase">Curated <span className="text-[#ff007f]">Archive</span></h2>
               <p className="text-[#00ffff] text-sm font-bold uppercase tracking-widest mt-6">Scroll to reveal</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
               {[1, 2, 3, 4, 5, 6].map((item, i) => (
                  <div key={item} className={`gallery-item group cursor-pointer ${i % 2 !== 0 ? 'md:mt-32' : ''}`}>
                     <div className="w-full aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 shadow-2xl relative">
                        <img src={`https://picsum.photos/seed/minacc${item}/800/1000`} alt={`Gallery ${item}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                           <h4 className="text-2xl font-black text-white uppercase">Artwork {item}</h4>
                           <span className="text-sm font-bold text-[#f4d03f] uppercase tracking-widest">View Details</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. METRICS SECTION (3D Flip) */}
      <section className="metrics-section py-40 px-6 bg-[#050505] relative z-10 border-t border-white/10 overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative z-10">
            {[
               { val: event.metrics.reachLabel, label: "Visual Impressions", color: "text-[#f4d03f]" },
               { val: event.metrics.participants, label: "Artists Exhibited", color: "text-[#ff007f]" },
               { val: event.metrics.ambassadors, label: "Curators", color: "text-[#00ffff]" },
            ].map((stat, i) => (
               <div key={i} className="metric-item flex flex-col items-center bg-[#111] p-12 rounded-[3rem] border border-white/5 shadow-2xl">
                  <h3 className={`text-6xl md:text-8xl font-black tracking-tighter mb-6 ${stat.color} drop-shadow-[0_0_20px_currentColor]`}>{stat.val}</h3>
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-white/70">{stat.label}</p>
               </div>
            ))}
         </div>
      </section>

      {/* 6. PARTNERS */}
      <footer className="py-32 px-6 md:px-24 bg-[#111111] relative z-10 border-t border-white/10">
         <div className="max-w-7xl mx-auto">
            <h3 className="text-center text-sm font-black uppercase tracking-[0.4em] text-white/40 mb-20">Institutional Partners</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 items-center justify-items-center opacity-50">
               {[...PARTNER_LOGOS].slice(0, 12).map((p, i) => (
                  <div key={i} className="w-24 h-24 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 flex items-center justify-center p-4 hover:scale-110">
                     <img src={p.imageUrl} alt={p.name} className="max-w-full max-h-full object-contain" />
                  </div>
               ))}
            </div>
         </div>
      </footer>

    </div>
  );
};
