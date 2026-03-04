
import React, { useState } from 'react';
import { generateImpactVision } from '../services/geminiService';
import { ImpactStory } from '../types';
import { Sparkles, Loader2, CheckCircle2, Search, ArrowRight } from 'lucide-react';

const SkeletonLoader = () => (
  <div className="space-y-6 w-full flex flex-col items-center text-center">
    <div className="h-10 skeleton rounded-xl w-3/4 mb-4"></div>
    <div className="space-y-3 w-full">
      <div className="h-3 skeleton rounded w-full"></div>
      <div className="h-3 skeleton rounded w-5/6 mx-auto"></div>
      <div className="h-3 skeleton rounded w-4/6 mx-auto"></div>
    </div>
    <div className="pt-8 space-y-4 w-full">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4 items-center justify-center">
          <div className="w-8 h-8 skeleton rounded-full shrink-0"></div>
          <div className="h-3 skeleton rounded w-1/2"></div>
        </div>
      ))}
    </div>
  </div>
);

const ImpactGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [visionData, setVisionData] = useState<ImpactStory | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const data = await generateImpactVision(topic);
      setVisionData(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-0.5 rounded-[2.5rem] lg:rounded-[4rem] bg-gradient-to-br from-cyan-500/10 to-transparent w-full">
      <div className="glass rounded-[2.4rem] lg:rounded-[3.9rem] p-8 lg:p-20 overflow-hidden relative flex flex-col items-center text-center">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-cyan-500/5 text-cyan-400 rounded-full text-[9px] font-black mb-10 border border-cyan-500/10 tracking-[0.5em] uppercase shadow-lg">
            <Sparkles size={14} />
            Neural Impact Forge
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black mb-8 leading-[0.85] uppercase italic tracking-tighter">
            Manifest the <br/><span className="text-cyan-500 not-italic">Vision.</span>
          </h2>
          <p className="text-zinc-500 text-base md:text-lg lg:text-xl mb-12 max-w-2xl leading-relaxed font-light mx-auto">
            Our neural processors analyze youth resonance patterns to project systemic growth. Input an impact theme to synthesize your future roadmap.
          </p>

          <form onSubmit={handleGenerate} className="relative w-full max-w-2xl mb-16">
            <input 
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Digital Literacy Nexus"
              className="w-full bg-white/5 border border-white/10 text-white pl-8 pr-20 py-5 lg:py-6 rounded-2xl lg:rounded-[2rem] focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder:text-zinc-800 font-medium text-lg lg:text-2xl"
            />
            <button 
              disabled={loading}
              className="absolute right-3 top-3 bottom-3 bg-cyan-500 hover:bg-white disabled:bg-zinc-900 text-black w-14 lg:w-16 rounded-xl lg:rounded-2xl transition-all flex items-center justify-center shadow-lg"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <Search size={24} />}
            </button>
          </form>

          <div className="w-full min-h-[350px] flex items-center justify-center">
            {loading ? (
              <div className="w-full bg-white/[0.01] border border-white/5 rounded-3xl lg:rounded-[3rem] p-10 lg:p-16 shadow-xl">
                 <SkeletonLoader />
              </div>
            ) : visionData ? (
              <div className="w-full bg-white/[0.03] border border-cyan-500/10 rounded-3xl lg:rounded-[3.5rem] p-10 lg:p-16 animate-fade-in shadow-[0_0_60px_rgba(0,247,255,0.05)] relative group text-center flex flex-col items-center">
                <div className="absolute -top-4 -right-4 bg-cyan-500 text-black p-3.5 rounded-xl rotate-12 group-hover:rotate-0 transition-transform shadow-lg">
                  <ArrowRight size={24} />
                </div>
                <h3 className="text-[9px] font-black text-cyan-500 uppercase tracking-[0.5em] mb-8">Neural Synthesis Successful</h3>
                <h4 className="text-3xl lg:text-6xl font-heading font-black mb-10 uppercase tracking-tighter italic text-white">{visionData.topic}</h4>
                <p className="text-zinc-300 text-xl lg:text-3xl leading-relaxed mb-12 italic font-light max-w-3xl">
                  "{visionData.vision}"
                </p>
                <div className="space-y-6 w-full max-w-xl">
                  <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] mb-8">Strategic Resonance Core</p>
                  {visionData.keyGoals.map((goal, i) => (
                    <div key={i} className="flex items-center gap-6 p-5 lg:p-6 rounded-2xl lg:rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all w-full justify-center group/pill">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover/pill:bg-cyan-500 transition-colors">
                        <CheckCircle2 size={16} className="text-cyan-500 group-hover/pill:text-black transition-colors" />
                      </div>
                      <span className="text-zinc-200 text-sm lg:text-lg font-bold group-hover/pill:text-white transition-colors">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full h-full border border-white/5 border-dashed rounded-3xl lg:rounded-[4rem] flex flex-col items-center justify-center p-16 text-center group cursor-default">
                 <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:scale-105 group-hover:bg-cyan-500/5 transition-all duration-700">
                    <Sparkles size={32} className="text-zinc-800 group-hover:text-cyan-500 transition-colors" />
                 </div>
                 <p className="text-zinc-700 text-xl font-light italic max-w-sm">Neural processors idle. <br />Input target resonance to commence synthesis.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactGenerator;
