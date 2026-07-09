export type Locale = 'pt' | 'en';

export type RepositoryFamily =
  | 'premium'
  | 'vitrine'
  | 'visao-computacional'
  | 'eetepa'
  | 'ciencia-de-dados'
  | 'informatica-redes'
  | 'aulas-ludicas'
  | 'colaboracoes'
  | 'catalogo';

export interface RepositorySnapshot {
  name: string;
  description: string;
  htmlUrl: string;
  homepage: string;
  topics: string[];
  language: string;
  stars: number;
  forks: number;
  archived: boolean;
  fork: boolean;
  updatedAt: string;
}
export interface CuratedRepository {
  name: string;
  family: RepositoryFamily;
  labels: string[];
  featured?: boolean;
  code?: string;
  demo?: string;
  pt?: string;
  en?: string;
}

export interface PortfolioRepository extends RepositorySnapshot {
  family: RepositoryFamily;
  labels: string[];
  featured: boolean;
  code?: string;
  demo: string;
  summary: Record<Locale, string>;
}

export interface CatalogFilters {
  query: string;
  family: RepositoryFamily | 'todas';
  demoOnly: boolean;
  language: string;
  signal: string;
  status: 'todos' | 'ativos' | 'arquivados' | 'forks';
}

export interface PortfolioCaseStudy {
  repository: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  problem: Record<Locale, string>;
  architecture: Record<Locale, string>;
  stack: string[];
  result: Record<Locale, string>;
  next: Record<Locale, string>;
  visual: 'webcraft' | 'network' | 'vision';
}

export interface TechnologyRadarBand {
  title: Record<Locale, string>;
  body: Record<Locale, string>;
  items: string[];
  tone: 'use' | 'signal' | 'next';
}

export interface EducationItem {
  degree: Record<Locale, string>;
  institution: string;
  period: string;
  description?: Record<Locale, string>;
}

export interface ExperienceItem {
  role: Record<Locale, string>;
  company: string;
  period: Record<Locale, string>;
  description: Record<Locale, string[]>;
}

export interface PublicationItem {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: 'article' | 'chapter' | 'proceeding';
}

export interface SkillItem {
  name: Record<Locale, string>;
  evidence: Record<Locale, string>;
  tags: string[];
}

export interface SkillCategory {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  items: SkillItem[];
}
