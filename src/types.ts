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
  status: 'todos' | 'ativos' | 'arquivados' | 'forks';
}
