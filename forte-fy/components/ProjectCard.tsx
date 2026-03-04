
import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-3 font-serif">{project.title}</h3>
        <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed">{project.description}</p>
        
        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
          <div>
            <span className="block text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Impact Made</span>
            <span className="text-emerald-600 font-bold">{project.impact}</span>
          </div>
          <button className="p-3 rounded-full bg-slate-50 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
