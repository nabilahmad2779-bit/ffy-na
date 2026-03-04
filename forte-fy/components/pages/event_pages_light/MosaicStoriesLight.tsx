import React, { useLayoutEffect, useRef } from 'react';
import { FORTE_EVENTS, PARTNER_LOGOS } from '../../../constants';
import SmartImage from '../../SmartImage';
import { 
  ArrowLeft, Feather, Scroll, Palette, Camera, 
  BookOpen, Award, Quote, Star, Image as ImageIcon,
  Smartphone, Gavel, Layers, PenTool, Globe, Landmark, Sun, Moon
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---

const SEGMENTS = [
  { name: "Short-Story Writing", icon: Feather, desc: "Crafting narratives that transcend time and space." },
  { name: "Literature Quiz (EN)", icon: Globe, desc: "Testing global literary proficiency and depth." },
  { name: "Literature Quiz (BN)", icon: Landmark, desc: "Celebrating the rich heritage of Bengali letters." },
  { name: "Book Review", icon: Scroll, desc: "Critical synthesis of the written and printed word." },
  { name: "Alternative Sequel", icon: PenTool, desc: "Expanding the horizons of established fan-fiction." },
  { name: "Mobile Photography", icon: Smartphone, desc: "Capturing life through a portable modern lens." },
  { name: "DSLR Photography", icon: Camera, desc: "High-fidelity visual storytelling and perspective." },
  { name: "Traditional Art", icon: Palette, desc: "The timeless dance of pigment and tactile canvas." },
  { name: "Digital Art", icon: Layers, desc: "Pixels morphed into modern visionary masterworks." },
  { name: "MemeCon", icon: Gavel, desc: "The art of satirical digital resonance and wit." }
];

const GALLERY_ARTWORKS = [
  { title: "The Great Wave", category: "Classical Resonance", src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800" },
  { title: "Vermeer’s Gaze", category: "Portraiture Synthesis", src: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=800" },
  { title: "Nocturnal Strategy", category: "Cinematic Realism", src: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=800" },
  { title: "Impressionist Dawn", category: "Color Theory", src: "https://images.unsplash.com/photo-1571115177098-24ec42ed2bb4?auto=format&fit=crop&q=80&w=800" },
  { title: "Surrealist Persistence", category: "Conceptual Art", src: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=800" },
  { title: "The Wanderer", category: "Visual Narrative", src: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800" },
  { title: "Pointillist Sunday", category: "Digital Pixelation", src: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800" },
  { title: "Liberty’s Path", category: "Political Satire", src: "https://images.unsplash.com/photo-1576016770956-debb63d9df05?auto=format&fit=crop&q=80&w=800" },
  { title: "Classical Academia", category: "Structural Study", src: "https://images.unsplash.com/photo-1573148164257-801f057297e2?auto=format&fit=crop&q=80&w=800" }
];

// --- HELPER COMPONENTS ---

const KineticShardBackgroundLight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shardCount = 50;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const shards = gsap.utils.toArray('.art-shard-light');
      shards.forEach((shard: any) => {
        gsap.to(shard, {
          x: "random(-150, 150)",
          y: "random(-150, 150)",
          z: "random(-300, 300)",
          rotation: "random(-180, 180)",
          rotationX: "random(-90, 90)",
          rotationY: "random(-90, 90)",
          duration: 12 + Math.random() * 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      gsap.to(".light-beam-overlay", {
        x: "500%",
        duration: 4,
        repeat: -1,
        ease: "power2.inOut",
        repeatDelay: 1.5
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#fdfcfb]">
      {/* Moving Highlight Beam - Increased visibility for light mode */}
      <div className="light-beam-overlay absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#ad944b]/25 to-transparent skew-x-[-30deg] z-10" />
      
      {/* High-Visibility Animated Objects & Patterns */}
      <div className="absolute inset-0 opacity-[0.8] z-[1]" style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}>
        {Array.from({ length: shardCount }).map((_, i) => (
          <div 
            key={i}
            className="art-shard-light absolute border border-[#ad944b]/30 shadow-[0_0_25px_rgba(173,148,75,0.15)]"
            style={{
              width: `${Math.random() * 20 + 5}vw`,
              height: `${Math.random() * 20 + 5}vw`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              clipPath: i % 4 === 0 
                ? 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' 
                : i % 4 === 1 ? 'polygon(0% 15%, 100% 0%, 85% 100%, 15% 85%)' 
                : i % 4 === 2 ? 'polygon(50% 0%, 100% 100%, 0% 100%)'
                : 'polygon(10% 25%, 90% 10%, 100% 90%, 20% 100%)',
              background: `linear-gradient(${Math.random() * 360}deg, rgba(173, 148, 75, 0.4) 0%, transparent 95%)`,
              filter: 'blur(0.5px)',
              opacity: 0.4
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const MosaicStoriesLight: React.FC<{ onBack: () => void; isDark: boolean; setIsDark: (val: boolean) => void }> = ({ onBack, isDark, setIsDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const event = FORTE_EVENTS.find(e => e.id === 'mosaic-stories');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo(".hero-meta-light", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.2 });
        tl.fromTo(".hero-title-main-light", { y: 100, opacity: 0, letterSpacing: "1.4em" }, { y: 0, opacity: 1, letterSpacing: "0.4em", duration: 2.2 }, "-=1.4");
        tl.fromTo(".hero-title-sub-light", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, "-=1.5");
        
        gsap.utils.toArray('.reveal-block-light').forEach((block: any) => {
          gsap.fromTo(block, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, scrollTrigger: { trigger: block, start: "top 90%" } });
        });

        gsap.fromTo(".segment-card-light", 
            { y: 50, opacity: 0 },
            { 
              y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power3.out",
              scrollTrigger: { trigger: ".segments-grid-light", start: "top 80%" }
            }
          );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!event) return null;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fdfcfb] text-[#333] font-literary selection:bg-[#ad944b] selection:text-white overflow-x-hidden transition-colors duration-700">
      
      {/* --- TOP NAV --- */}
      <div className="fixed top-0 left-0 w-full z-[110] px-8 py-10 md:px-12 md:py-12 flex justify-between items-center pointer-events-none">
        <button onClick={onBack} className="group flex items-center gap-6 text-slate-400 hover:text-[#ad944b] transition-all pointer-events-auto">
          <div className="p-3 border-2 border-slate-200 group-hover:border-[#ad944b] rounded-full transition-all bg-white/80 backdrop-blur-xl shadow-lg">
            <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-[12px] font-mosaic font-bold uppercase tracking-[0.6em] hidden sm:block">Archive</span>
        </button>
      </div>

      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent">
         <KineticShardBackgroundLight />

         <div className="relative z-10 text-center flex flex-col items-center pt-48 md:pt-56">
            {/* meta text moved down (pt-48) and mb reduced to mb-2 for proximity */}
            <div className="hero-meta-light mb-2 flex items-center gap-8 opacity-60">
               <div className="h-px w-20 bg-[#ad944b]" />
               <span className="text-[11px] font-mosaic font-bold uppercase tracking-[0.8em] text-[#ad944b]">The Grand Anthology</span>
               <div className="h-px w-20 bg-[#ad944b]" />
            </div>
            
            <div className="relative py-8 px-8 overflow-visible flex flex-col items-center">
               <span className="hero-meta-light text-[3vw] md:text-[2vw] font-mosaic font-bold tracking-[1.4em] text-[#ad944b] mb-1 translate-x-1">THE</span>
               <h1 className="hero-title-main-light text-[14vw] md:text-[11vw] font-mosaic font-bold leading-[1.0] tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-b from-[#8e793e] via-[#ad944b] to-[#8e793e] py-4">
                  MOSAIC
               </h1>
               <h2 className="hero-title-sub-light text-4xl md:text-8xl font-mosaic font-bold text-slate-800 uppercase tracking-[0.5em] leading-none mt-1">
                  STORIES
               </h2>
            </div>

            <div className="hero-meta-light mt-12 max-w-2xl px-6">
               <p className="text-2xl md:text-3xl font-literary italic text-[#ad944b] font-medium leading-relaxed">
                  "{event.tagline}"
               </p>
               <div className="mt-16 flex justify-center opacity-40 animate-bounce">
                  <Scroll size={24} className="text-slate-900" />
               </div>
            </div>
         </div>
      </section>

      <section className="reveal-block-light py-48 px-6 md:px-12 max-w-7xl mx-auto border-t border-slate-100 relative bg-transparent">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start relative z-10">
            <div className="lg:col-span-5">
               <div className="sticky top-32 group">
                  <div className="aspect-[4/5] p-3 bg-white border border-slate-200 shadow-2xl overflow-hidden rounded-sm relative">
                     <SmartImage src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=1200" alt="Starry Night" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                  </div>
                  <div className="absolute -z-10 -bottom-10 -left-10 w-full h-full border border-slate-100 rounded-sm translate-x-4 translate-y-4" />
               </div>
            </div>
            <div className="lg:col-span-7">
               <h2 className="text-5xl md:text-8xl font-mosaic font-bold text-slate-800 uppercase tracking-tight leading-[0.9] mb-16">
                  The Curatorial <br/> <span className="text-[#ad944b] italic font-normal">Synthesis.</span>
               </h2>
               <div className="text-2xl md:text-3xl font-literary text-slate-600 leading-relaxed text-justify space-y-12">
                  <div className="relative">
                     <Quote className="absolute -left-14 -top-8 opacity-5 text-[#ad944b]" size={80} />
                     <p className="italic font-medium leading-relaxed">
                       “Great things are not done by impulse but by a series of small things brought together.” — Vincent Van Gogh.
                     </p>
                  </div>
                  <p>
                    Capturing the rich tapestry of creativity and storytelling, Forte-FY unveiled "The Mosaic Stories", a symphony of artistic expressions poised to transcend conventional boundaries.
                  </p>
                  <div className="flex items-center gap-8 pt-16 border-t border-slate-100">
                     <Award size={24} className="text-[#ad944b]" />
                     <span className="text-xs font-mosaic font-bold uppercase tracking-[0.5em] text-[#ad944b]">The Curatorial Collective</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- THE DECAGON OF EXPRESSION --- */}
      <section className="reveal-block-light py-48 px-6 bg-slate-50/50 border-y border-slate-100">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-32">
               <h2 className="text-[11px] font-mosaic font-bold uppercase tracking-[0.8em] text-[#ad944b] mb-10">Department of Expression</h2>
               <h3 className="text-5xl md:text-9xl font-mosaic font-bold text-slate-900 uppercase tracking-tighter">Event Segments</h3>
            </div>
            <div className="segments-grid-light grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
               {SEGMENTS.map((segment, i) => (
                  <div key={i} className="segment-card-light p-10 bg-white border border-slate-200 hover:border-[#ad944b]/50 transition-all duration-700 shadow-sm hover:shadow-xl rounded-sm text-center flex flex-col items-center group h-[380px]">
                     <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#ad944b]/5 text-[#ad944b] mb-8 border border-[#ad944b]/10 group-hover:bg-[#ad944b] group-hover:text-white transition-all">
                        <segment.icon size={28} />
                     </div>
                     <h4 className="text-xl font-mosaic font-bold text-slate-900 uppercase tracking-wider mb-4 leading-tight group-hover:text-[#ad944b] transition-colors">{segment.name}</h4>
                     <p className="text-xs font-literary italic text-slate-500 leading-relaxed">{segment.desc}</p>
                     <div className="mt-auto h-[1px] w-8 bg-[#ad944b]/20 group-hover:w-16 transition-all" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- GALLERY OF RESONANCE --- */}
      <section className="reveal-block-light py-48 px-6 md:px-12 max-w-7xl mx-auto bg-transparent">
         <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
               <h2 className="text-5xl md:text-8xl font-mosaic font-bold text-slate-800 uppercase tracking-tight leading-none mb-8">
                  Gallery of <br/> <span className="text-[#ad944b]">Resonance.</span>
               </h2>
               <p className="text-xl font-literary text-slate-500 italic">"Every brushstroke is a story, every pixel a memory."</p>
            </div>
            <div className="flex items-center gap-4 text-slate-300 mb-4">
               <ImageIcon size={40} />
               <div className="h-px w-32 bg-slate-200" />
               <span className="text-[10px] font-mosaic font-bold uppercase tracking-[0.4em] text-slate-400">Visual Archives</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {GALLERY_ARTWORKS.map((art, i) => (
              <div key={i} className="group overflow-hidden rounded-sm border border-slate-200 bg-white flex flex-col shadow-sm hover:shadow-xl transition-all duration-500">
                 <div className="aspect-[4/3] overflow-hidden">
                    <SmartImage src={art.src} alt={art.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms]" />
                 </div>
                 <div className="p-8 border-t border-slate-100">
                    <h4 className="text-xl font-mosaic font-bold text-slate-900 uppercase">{art.title}</h4>
                    <p className="text-xs font-mosaic font-bold text-[#ad944b] uppercase tracking-widest mt-2">{art.category}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>

      <footer className="py-48 bg-white border-t border-slate-100 flex flex-col items-center justify-center gap-12 relative z-10">
         <div className="text-center space-y-4">
            <h4 className="text-6xl md:text-8xl font-mosaic font-bold text-slate-100 uppercase tracking-[0.1em] select-none">MCMXXII</h4>
            <p className="text-[11px] font-mosaic font-bold text-[#ad944b] uppercase tracking-[0.8em]">Archival Registry • 2024</p>
         </div>
         <button onClick={onBack} className="group relative px-16 py-6 border border-[#ad944b] text-[#ad944b] hover:bg-[#ad944b] hover:text-white transition-all duration-500 font-mosaic font-bold text-xs uppercase tracking-[0.5em] rounded-sm">
            Return to Nexus
         </button>
      </footer>
    </div>
  );
};