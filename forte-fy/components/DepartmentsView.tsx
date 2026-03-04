
import React from 'react';
import ScrollReveal from './ScrollReveal';
import DepartmentCard from './DepartmentCard';
import { DEPARTMENT_LIST } from '../constants';

interface DepartmentsViewProps {
  navigate: (path: string) => void;
}

const DepartmentsView: React.FC<DepartmentsViewProps> = ({ navigate }) => {
  return (
    <div className="pt-28 md:pt-32 pb-20 animate-fade-in min-h-screen">
      <div className="max-w-7xl mx-auto px-5 text-center">
        <ScrollReveal className="mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-[9px] font-black uppercase tracking-[0.4em] mb-6 text-cyan-500 border border-cyan-500/20 shadow-cyan">
            Institutional Structure
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-heading font-black uppercase italic tracking-tighter leading-none mb-6 md:mb-8">
            The Structural <br/> <span className="text-cyan-500">Pillars.</span>
          </h1>
          <p className="text-zinc-500 text-base md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            The core domains of Forte-FY where systemic transformation is orchestrated by our dedicated leadership cadres.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {DEPARTMENT_LIST.map((dept, i) => (
            <ScrollReveal key={dept.id} delay={i * 100} className="h-full">
              <DepartmentCard dept={dept} navigate={navigate} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentsView;
