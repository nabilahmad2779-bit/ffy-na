
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { 
  ChevronLeft, Moon, Users, Globe, Award, Star, CheckCircle2, Quote, Sparkles, Mail
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmartImage from '../../SmartImage';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const CALENDAR_DAYS = [
  // ASHRA OF MERCY (1-10)
  { day: 1, title: "Intention (Niyyah)", tasks: ["Renew your intention for the month.", "Write down 3 spiritual goals.", "Recite Surah Al-Fatiha with focus."] },
  { day: 2, title: "The First Prayer", tasks: ["Pray all 5 Salah on time today.", "Spend 5 mins in Dhikr after Fajr.", "Make dua for your parents."] },
  { day: 3, title: "The Tongue's Fast", tasks: ["Abstain from complaining for 24h.", "Speak only good or remain silent.", "Recite SubhanAllah 100 times."] },
  { day: 4, title: "Connecting Ties", tasks: ["Call a relative you haven't spoken to.", "Forgive a petty grudge.", "Share your Iftar with someone."] },
  { day: 5, title: "Gratitude (Shukr)", tasks: ["List 10 blessings you have today.", "Give charity, even if small.", "Feed a stray animal or bird."] },
  { day: 6, title: "Quranic Bond", tasks: ["Read 5 pages of the Quran.", "Listen to a Tafseer of a short Surah.", "Reflect on the meaning of one Ayah."] },
  { day: 7, title: "The Neighbor", tasks: ["Check on a neighbor.", "Share food with those next door.", "Make dua for your community."] },
  { day: 8, title: "Digital Detox", tasks: ["Limit social media to 15 mins.", "Replace scrolling with Dhikr.", "Read an Islamic book for 30 mins."] },
  { day: 9, title: "Cleanliness", tasks: ["Clean your prayer area.", "Perform Wudu with mindfulness.", "Help with household chores."] },
  { day: 10, title: "Self-Reflection", tasks: ["Sit in silence for 10 minutes.", "Audit your first 10 days.", "Make a plan for the next 10 days."] },
  
  // ASHRA OF FORGIVENESS (11-20)
  { day: 11, title: "Seeking Forgiveness", tasks: ["Recite Istighfar 100 times.", "Reflect on a past mistake.", "Ask Allah to erase bad habits."] },
  { day: 12, title: "The Prophet's Path", tasks: ["Read about the Prophet's character.", "Send Salawat 100 times.", "Smile, it's Sunnah."] },
  { day: 13, title: "Mid-Month Check", tasks: ["Revisit your goals from Day 1.", "Increase your charity amount.", "Pray 2 Rakat Nafl."] },
  { day: 14, title: "Patience (Sabr)", tasks: ["Control your anger today.", "Make dua for those suffering.", "Read Surah Al-Asr."] },
  { day: 15, title: "The Heart's Cure", tasks: ["Read Surah Al-Kahf (if Friday).", "Memorize a new Dua.", "Feed a fasting person."] },
  { day: 16, title: "Modesty (Haya)", tasks: ["Guard your eyes from haram.", "Dress with intention.", "Lower your gaze."] },
  { day: 17, title: "Remembrance", tasks: ["Keep your tongue moist with Dhikr.", "Pray Tahajjud (Night Prayer).", "Reflect on the Names of Allah."] },
  { day: 18, title: "Generosity", tasks: ["Give away an item you love.", "Donate online to a cause.", "Tip generously."] },
  { day: 19, title: "Truthfulness", tasks: ["Be brutally honest with yourself.", "Avoid exaggeration in speech.", "Fulfill a promise."] },
  { day: 20, title: "Preparing for the End", tasks: ["Reflect on the temporary nature of life.", "Visit a grave (if possible) or think of death.", "Make fervent dua for Jannah."] },

  // ASHRA OF SALVATION (21-30)
  { day: 21, title: "Seeking Laylatul Qadr", tasks: ["Stay up for worship tonight.", "Recite 'Allahumma innaka afuwwun...'", "Disconnect from the world."] },
  { day: 22, title: "The Night Prayer", tasks: ["Prolong your Sujood.", "Cry out to Allah in solitude.", "Read the Quran with translation."] },
  { day: 23, title: "Divine Mercy", tasks: ["Ask for freedom from the Fire.", "Forgive everyone who hurt you.", "Do a secret good deed."] },
  { day: 24, title: "Intimacy with Allah", tasks: ["Talk to Allah like a friend.", "Make a specific dua list.", "Wake up early for Sahur."] },
  { day: 25, title: "The Odd Night", tasks: ["Maximize worship in the last third of the night.", "Give charity automatically.", "Recite Surah Al-Mulk."] },
  { day: 26, title: "Renewal of Faith", tasks: ["Say the Shahada with conviction.", "Teach someone a good deed.", "Reflect on Allah's creation."] },
  { day: 27, title: "The Grand Night?", tasks: ["Treat this as the possible Night of Power.", "Pray extra Taraweeh/Qiyam.", "Make dua for the Ummah."] },
  { day: 28, title: "Zakat al-Fitr", tasks: ["Ensure your Zakat is paid.", "Help the poor prepare for Eid.", "Thank Allah for the strength to fast."] },
  { day: 29, title: "Closing strong", tasks: ["Make a post-Ramadan plan.", "Commit to keeping one habit.", "Pray for acceptance of your fasts."] },
  { day: 30, title: "Eid Preparation", tasks: ["Bathe and wear clean clothes.", "Recite the Takbirat.", "Celebrate with gratitude, not excess."] }
];

const METRICS = [
  { label: "Participants", value: 1200, suffix: "+", icon: Users },
  { label: "Ambassadors", value: 25, suffix: "+", icon: Star },
  { label: "Total Reach", value: 15000, suffix: "+", icon: Globe },
  { label: "Certificates", value: 50, suffix: "+", icon: Award },
];

const WINNERS = [
  { rank: 2, name: "Mariam Siddiqua", score: "96/100", category: "Ethical Philosophy", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300" },
  { rank: 1, name: "Ahmed Zubair", score: "98/100", category: "Theology & Merit", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" },
  { rank: 3, name: "Ibrahim Khalil", score: "94/100", category: "Historical Analysis", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300" },
];

const AMBASSADORS = [
  { name: "Tasnim Mahi", campus: "Dhaka University", quote: "A transformative experience that united our campus." },
  { name: "Fahim Shahriar", campus: "North South University", quote: "Seeing the engagement grow daily was inspiring." },
  { name: "Kazi Nabil", campus: "BRAC University", quote: "More than a quiz, it was a community builder." },
];

// --- COMPONENTS ---

const CountUp: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const animate = (currentTime: number) => {
             if (!startTime) startTime = currentTime;
             const progress = currentTime - startTime;
             const ease = (x: number): number => 1 - Math.pow(1 - x, 3);
             if (progress < duration) {
                setCount(Math.floor(end * ease(progress / duration)));
                requestAnimationFrame(animate);
             } else {
                setCount(end);
             }
          };
          requestAnimationFrame(animate);
        }
      }, { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={nodeRef}>{count.toLocaleString()}{suffix}</span>;
};

const SacredGeometryBackgroundLight = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#fffbf0]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffbf0] via-[#fff5e0] to-[#ffecb3] opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] opacity-[0.05] animate-spin-very-slow">
           <svg viewBox="0 0 100 100" className="w-full h-full text-[#d97706] fill-none stroke-current stroke-[0.2]">
              <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" />
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="20" />
           </svg>
        </div>
        <div className="absolute inset-0">
           {[...Array(30)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-[#d97706] rounded-full animate-rise-fade"
                style={{
                   width: Math.random() * 3 + 'px',
                   height: Math.random() * 3 + 'px',
                   bottom: '-10px',
                   left: Math.random() * 100 + '%',
                   animationDuration: Math.random() * 10 + 10 + 's',
                   animationDelay: Math.random() * 10 + 's',
                   opacity: Math.random() * 0.3
                }}
              />
           ))}
        </div>
    </div>
  );
};

const InteractiveLanternLight: React.FC<{ delay: number; left: string; scale?: number; stringHeight?: number; defaultOn?: boolean }> = ({ 
  delay, left, scale = 1, stringHeight = 100, defaultOn = false 
}) => {
  const [isOn, setIsOn] = useState(defaultOn);
  const lanternRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!lanternRef.current) return;
    const duration = 4 + Math.random() * 2;
    const rotation = 2 + Math.random() * 2;
    const ctx = gsap.context(() => {
      gsap.to(lanternRef.current, { rotation, duration, repeat: -1, yoyo: true, ease: "sine.inOut", delay });
      gsap.to(lanternRef.current, { rotation: -rotation, duration, repeat: -1, yoyo: true, ease: "sine.inOut", delay: delay + duration });
    }, lanternRef);
    return () => ctx.revert();
  }, [delay]);

  return (
    <div className="absolute top-0 pointer-events-auto z-50 origin-top" style={{ left, transform: `scale(${scale})` }}>
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#b45309]/40" style={{ height: `${stringHeight}px` }} />
       <div ref={lanternRef} className="relative origin-top" style={{ marginTop: `${stringHeight}px` }} onClick={() => setIsOn(!isOn)}>
          <div className={`transition-all duration-700 cursor-pointer ${isOn ? 'drop-shadow-[0_0_40px_rgba(245,158,11,0.6)]' : ''}`}>
            <svg width="60" height="100" viewBox="0 0 60 100" fill="none">
               <path d="M30 0L20 15H40L30 0Z" fill="#78350f" />
               <path d="M20 15 L10 35 V85 L30 95 L50 85 V35 L40 15 Z" fill={isOn ? "#fbbf24" : "#fcd34d"} stroke="#b45309" strokeWidth="1.5" />
               <path d="M30 15 V95" stroke="#b45309" strokeWidth="0.5" strokeOpacity="0.5" />
            </svg>
          </div>
       </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

export const SpiritualQuestLight: React.FC<{ onBack: () => void; isDark: boolean; setIsDark: (val: boolean) => void }> = ({ onBack, isDark, setIsDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-up').forEach((el: any) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fffaf0] text-slate-900 font-literary selection:bg-amber-500 selection:text-white overflow-x-hidden">
      
      {/* Back Button */}
      <div className="fixed top-8 left-8 z-50">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-[#b45309] hover:text-[#d97706] transition-colors px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-[#b45309]/20 hover:border-[#b45309]/50 shadow-sm"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-mosaic font-bold uppercase tracking-[0.2em]">Return</span>
        </button>
      </div>

      {/* HERO */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden border-b border-amber-200/50">
         <SacredGeometryBackgroundLight />
         <div className="lantern-group absolute top-0 left-0 w-full h-full pointer-events-none z-30">
            <div className="w-full h-full relative">
               <InteractiveLanternLight delay={0} left="10%" scale={0.8} stringHeight={60} />
               <InteractiveLanternLight delay={1.5} left="85%" scale={1.0} stringHeight={80} defaultOn={true} />
            </div>
         </div>
         <div className="relative z-20 text-center flex flex-col items-center max-w-7xl px-6 -mt-12 pointer-events-none">
            <div className="mb-6 flex flex-col items-center gap-2 opacity-80">
               <div className="text-[14px] font-mosaic font-bold uppercase tracking-[0.5em] text-[#b45309]">Forte-FY Presents</div>
               <div className="w-16 h-1 bg-[#b45309]" />
            </div>
            <div className="relative mb-8">
               <h1 className="text-[15vw] md:text-[8vw] font-mosaic font-black leading-[0.9] tracking-normal text-transparent bg-clip-text bg-gradient-to-b from-[#d97706] via-[#b45309] to-[#78350f] drop-shadow-sm">
                  The <br/> Spiritual <br/> Quest
               </h1>
            </div>
            <p className="text-xl md:text-2xl font-literary italic text-[#b45309] tracking-wider px-4 max-w-2xl">
               "A Divine Journey into the Architecture of the Soul"
            </p>
         </div>
      </section>

      {/* EVENT DESCRIPTION (INTERACTIVE & CENTERED) */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative z-10 bg-[#fffaf0]">
         <div className="reveal-up text-center space-y-12">
            <h2 className="text-5xl md:text-7xl font-mosaic font-bold text-slate-900 leading-tight">
               <span className="text-[#b45309] block mb-2">A Journey</span> of Knowledge & Reflection.
            </h2>
            
            <div className="relative group/text-container space-y-8 text-xl md:text-2xl font-light text-slate-600 leading-relaxed max-w-3xl mx-auto">
               <div className="absolute -left-12 -top-12 text-[#b45309]/10 animate-pulse">
                  <Sparkles size={60} />
               </div>

               <p className="transition-all duration-500 hover:text-slate-900 hover:scale-105 origin-center cursor-default">
                  Ramadan is not only a month of fasting — it is a <strong className="text-[#b45309] font-bold">month of awakening.</strong> The Forte-FY Spiritual Quiz was designed as a platform where knowledge meets reflection, and faith meets intellect.
               </p>
               
               <p className="transition-all duration-500 hover:text-slate-900 hover:scale-105 origin-center cursor-default">
                  This event was created to encourage young minds to explore the depth of Islamic teachings, history, values, and personal growth through <span className="italic text-[#b45309]">engaging and thought-provoking challenges.</span>
               </p>
               
               <p className="transition-all duration-500 hover:text-slate-900 hover:scale-105 origin-center cursor-default">
                  Over the course of this initiative, participants from different campuses and communities came together to test their understanding, strengthen their faith, and <span className="border-b border-[#b45309] pb-1">inspire one another.</span>
               </p>
            </div>
         </div>
      </section>

      {/* RAMADAN CALENDAR (30 DAYS) */}
      <section className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 reveal-up">
               <span className="text-[10px] font-mosaic font-bold uppercase tracking-[0.4em] text-[#b45309] block mb-4">Daily Guidance</span>
               <h2 className="text-4xl md:text-6xl font-mosaic font-bold text-slate-900 mb-6">Ramadan Reflection Calendar</h2>
               <p className="text-slate-500 font-light max-w-2xl mx-auto">
                  A guide to help participants stay spiritually engaged throughout the month.
               </p>
            </div>

            <div className="flex overflow-x-auto pb-12 gap-6 snap-x snap-mandatory no-scrollbar" style={{ scrollBehavior: 'smooth' }}>
               {CALENDAR_DAYS.map((day, i) => (
                  <div key={i} className="reveal-up snap-center shrink-0 w-[300px] md:w-[320px] p-8 rounded-[2rem] bg-[#fffbf0] border border-amber-200 hover:border-[#b45309] transition-all duration-500 group relative shadow-sm hover:shadow-lg flex flex-col h-[400px]">
                     
                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Moon size={120} className="text-[#b45309]" />
                     </div>
                     
                     <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                           <div className="inline-block px-4 py-1 rounded-full border border-amber-300 bg-amber-50 text-[#b45309] text-xs font-bold uppercase tracking-widest">
                              Day {day.day}
                           </div>
                           <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#b45309] transition-colors">
                              {day.day <= 10 ? 'Mercy' : day.day <= 20 ? 'Forgiveness' : 'Salvation'}
                           </div>
                        </div>

                        <h3 className="text-2xl font-mosaic font-bold text-slate-900 mb-6 leading-tight h-auto group-hover:text-[#d97706] transition-colors">
                           {day.title}
                        </h3>
                        
                        <ul className="space-y-4 mt-auto">
                           {day.tasks.map((task, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                                 <CheckCircle2 size={16} className="text-[#b45309] shrink-0 mt-0.5" />
                                 <span className="leading-snug">{task}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* IMPACT METRICS */}
      <section className="py-24 px-6 md:px-12 bg-[#fffaf0] relative">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal-up">
               <h2 className="text-4xl md:text-5xl font-mosaic font-bold text-slate-900 mb-4">Our Collective <span className="text-[#b45309]">Impact.</span></h2>
               <p className="text-slate-500 font-light">What began as an idea transformed into a movement.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {METRICS.map((stat, i) => (
                  <div key={i} className="reveal-up p-8 rounded-2xl border border-amber-100 bg-white text-center group hover:border-amber-300 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-xl">
                     <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#b45309] group-hover:bg-[#b45309] group-hover:text-white transition-all duration-500">
                        <stat.icon size={24} />
                     </div>
                     <h3 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mb-2">
                        <CountUp end={stat.value} suffix={stat.suffix} />
                     </h3>
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600/70">{stat.label}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* WINNERS SHOWCASE */}
      <section className="py-24 px-6 md:px-12 bg-white border-t border-amber-100">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 reveal-up">
               <span className="text-[10px] font-mosaic font-bold uppercase tracking-[0.4em] text-[#b45309] block mb-4">Prestige</span>
               <h2 className="text-4xl md:text-6xl font-mosaic font-bold text-slate-900">Champions of Knowledge</h2>
            </div>

            <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-4 lg:gap-12 pb-12">
               {/* 2nd Place */}
               <div className="order-2 md:order-1 reveal-up w-full md:w-1/3">
                  <div className="relative p-6 rounded-2xl border border-amber-100 bg-[#fffcf5] text-center transform translate-y-8 hover:-translate-y-2 transition-transform duration-500 shadow-lg">
                     <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-slate-300">
                        <SmartImage src={WINNERS[0].image} alt={WINNERS[0].name} className="w-full h-full object-cover" />
                     </div>
                     <div className="text-4xl font-black text-slate-300 mb-2">02</div>
                     <h3 className="text-xl font-bold text-slate-900 mb-1">{WINNERS[0].name}</h3>
                     <p className="text-xs text-[#b45309] uppercase tracking-widest">{WINNERS[0].category}</p>
                     <div className="mt-4 inline-block px-3 py-1 rounded bg-amber-100 text-amber-800 text-xs font-mono">{WINNERS[0].score}</div>
                  </div>
               </div>

               {/* 1st Place */}
               <div className="order-1 md:order-2 reveal-up w-full md:w-1/3 z-10">
                  <div className="relative p-8 rounded-[2rem] border border-[#b45309] bg-white text-center shadow-2xl transform hover:-translate-y-4 transition-transform duration-500">
                     <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <div className="w-12 h-12 bg-[#b45309] rounded-full flex items-center justify-center shadow-lg text-white">
                           <Award size={24} />
                        </div>
                     </div>
                     <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#b45309] mt-4">
                        <SmartImage src={WINNERS[1].image} alt={WINNERS[1].name} className="w-full h-full object-cover" />
                     </div>
                     <div className="text-6xl font-black text-amber-100 mb-2">01</div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-1">{WINNERS[1].name}</h3>
                     <p className="text-xs text-[#b45309] uppercase tracking-widest font-bold">{WINNERS[1].category}</p>
                     <div className="mt-6 inline-block px-4 py-1.5 rounded bg-[#b45309] text-white text-sm font-bold font-mono">{WINNERS[1].score}</div>
                  </div>
               </div>

               {/* 3rd Place */}
               <div className="order-3 md:order-3 reveal-up w-full md:w-1/3">
                  <div className="relative p-6 rounded-2xl border border-amber-100 bg-[#fffcf5] text-center transform translate-y-12 hover:translate-y-2 transition-transform duration-500 shadow-lg">
                     <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-slate-300">
                        <SmartImage src={WINNERS[2].image} alt={WINNERS[2].name} className="w-full h-full object-cover" />
                     </div>
                     <div className="text-4xl font-black text-slate-300 mb-2">03</div>
                     <h3 className="text-xl font-bold text-slate-900 mb-1">{WINNERS[2].name}</h3>
                     <p className="text-xs text-[#b45309] uppercase tracking-widest">{WINNERS[2].category}</p>
                     <div className="mt-4 inline-block px-3 py-1 rounded bg-amber-100 text-amber-800 text-xs font-mono">{WINNERS[2].score}</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- AMBASSADORS --- */}
      <section className="py-24 px-6 md:px-12 bg-[#fffaf0] border-t border-amber-200">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal-up">
               <h2 className="text-3xl md:text-5xl font-mosaic font-bold text-slate-900 mb-4">Honoring Our <span className="text-[#b45309]">Ambassadors</span></h2>
               <p className="text-slate-500 font-light max-w-2xl mx-auto">
                  Behind every successful initiative are leaders who believe in the mission.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {AMBASSADORS.map((amb, i) => (
                  <div key={i} className="reveal-up p-8 rounded-2xl bg-white border border-amber-100 hover:border-amber-300 transition-all duration-300 group shadow-sm hover:shadow-lg">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-[#b45309] border border-amber-200 group-hover:bg-[#b45309] group-hover:text-white transition-colors">
                           <Users size={20} />
                        </div>
                        <div>
                           <h4 className="text-lg font-bold text-slate-900">{amb.name}</h4>
                           <p className="text-xs text-slate-500 uppercase tracking-wide">{amb.campus}</p>
                        </div>
                     </div>
                     <p className="text-sm font-light italic text-slate-600 leading-relaxed">"{amb.quote}"</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- NEWSLETTER SUBSCRIPTION --- */}
      <section className="py-32 px-6 relative overflow-hidden bg-white">
         <div className="max-w-3xl mx-auto text-center relative z-10 reveal-up">
            <h2 className="text-4xl md:text-6xl font-mosaic font-bold text-slate-900 mb-6">Stay Spiritually <br/><span className="text-[#b45309]">Connected.</span></h2>
            <p className="text-lg font-light text-slate-500 mb-10 max-w-xl mx-auto">
               Join our newsletter to receive updates on future quizzes, Ramadan reflections, and community events.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-[#b45309]" />
                    </div>
                    <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#b45309] focus:ring-1 focus:ring-[#b45309] transition-all"
                    />
                </div>
                <button className="px-8 py-4 bg-[#b45309] text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-slate-900 transition-colors shadow-lg">
                    Subscribe
                </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-6 uppercase tracking-widest">We respect your inbox.</p>
         </div>
      </section>
      
      <style>{`
         @keyframes spin-very-slow { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
         @keyframes rise-fade { 0% { bottom: -10px; opacity: 0; } 50% { opacity: 0.5; } 100% { bottom: 100%; opacity: 0; } }
         .animate-spin-very-slow { animation: spin-very-slow 200s linear infinite; }
         .animate-rise-fade { animation: rise-fade linear infinite; }
         .no-scrollbar::-webkit-scrollbar { display: none; }
         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
