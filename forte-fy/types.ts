
export interface Demographics {
  ageRange: string;
  // Geographic Divisions
  geoDhaka: number;
  geoChattogram: number;
  geoSylhet: number;
  geoRajshahi: number;
  geoKhulna: number;
  geoBarishal: number;
  geoRangpur: number;
  geoMymensingh: number;
  // Education Levels
  eduSchool: number;
  eduCollege: number;
  eduUndergrad: number;
  eduPostgrad: number;
}

export interface EventData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  metrics: {
    reach: number;
    reachLabel: string;
    ambassadors: number;
    participants: number;
  };
  demographics: Demographics;
  image: string;
  year: string;
  segments?: string[];
}

export interface SkillRoadmap {
  skill: string;
  vision: string;
  milestones: {
    phase: string;
    action: string;
  }[];
}

export interface Collaboration {
  name: string;
  event: string;
  date: string;
}

export interface Member {
  name: string;
  role: string;
  impact: string;
  image: string;
}

export interface Department {
  name: string;
  lead: string;
  description: string;
  icon: string;
}

export interface ImpactStory {
  topic: string;
  vision: string;
  keyGoals: string[];
}

export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  impact: string;
}

export enum NavSection {
  Home = 'home',
  History = 'history',
  Initiatives = 'initiatives',
  Analysis = 'analysis',
  HallOfFame = 'hall-of-fame',
  Gallery = 'gallery',
  Laurels = 'laurels',
  Architecture = 'architecture',
  SkillBuilder = 'skill-builder',
  Impact = 'impact',
  Contact = 'contact',
  Departments = 'departments'
}
