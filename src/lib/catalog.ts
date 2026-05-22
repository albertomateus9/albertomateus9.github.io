import type {
  CatalogFilters,
  CuratedRepository,
  PortfolioRepository,
  RepositoryFamily,
  RepositorySnapshot,
} from '../types';

const collaborativePrefixes = ['hacka-', 'minihacka-', 'equipe-'];

function inferFamily(repo: RepositorySnapshot): RepositoryFamily {
  const searchable = `${repo.name} ${repo.description} ${repo.topics.join(' ')}`.toLowerCase();

  if (collaborativePrefixes.some((prefix) => repo.name.startsWith(prefix))) return 'colaboracoes';
  if (searchable.includes('hackathon') || searchable.includes('equipe')) return 'colaboracoes';
  return 'catalogo';
}

function inferLabels(repo: RepositorySnapshot): string[] {
  const labels = new Set<string>();

  if (repo.homepage) labels.add('demo');
  if (repo.fork) labels.add('fork');
  if (repo.archived) labels.add('arquivado');
  if (repo.name.startsWith('hacka-') || repo.name.startsWith('minihacka-')) labels.add('hackathon');
  if (repo.topics.includes('eetepa')) labels.add('eetepa');

  return [...labels];
}

export function enrichRepository(
  repo: RepositorySnapshot,
  curatedRepositories: CuratedRepository[],
): PortfolioRepository {
  const curated = curatedRepositories.find((item) => item.name === repo.name);
  const summaryPt = curated?.pt || repo.description || `Repositorio publico ${repo.name}.`;
  const summaryEn = curated?.en || repo.description || `Public repository ${repo.name}.`;

  return {
    ...repo,
    family: curated?.family || inferFamily(repo),
    labels: [...new Set([...inferLabels(repo), ...(curated?.labels || [])])],
    featured: Boolean(curated?.featured),
    code: curated?.code,
    demo: curated?.demo || repo.homepage,
    summary: {
      pt: summaryPt,
      en: summaryEn,
    },
  };
}

export function filterRepositories(
  repositories: PortfolioRepository[],
  filters: CatalogFilters,
): PortfolioRepository[] {
  const query = filters.query.trim().toLocaleLowerCase();

  return repositories.filter((repo) => {
    const matchesQuery =
      !query ||
      [
        repo.name,
        repo.description,
        repo.summary.pt,
        repo.summary.en,
        repo.language,
        repo.topics.join(' '),
        repo.labels.join(' '),
      ]
        .join(' ')
        .toLocaleLowerCase()
        .includes(query);
    const matchesFamily = filters.family === 'todas' || repo.family === filters.family;
    const matchesDemo = !filters.demoOnly || Boolean(repo.demo);
    const matchesLanguage = !filters.language || repo.language === filters.language;
    const matchesStatus =
      filters.status === 'todos' ||
      (filters.status === 'ativos' && !repo.archived && !repo.fork) ||
      (filters.status === 'arquivados' && repo.archived) ||
      (filters.status === 'forks' && repo.fork);

    return matchesQuery && matchesFamily && matchesDemo && matchesLanguage && matchesStatus;
  });
}

export function sortRepositories(repositories: PortfolioRepository[]): PortfolioRepository[] {
  return [...repositories].sort((left, right) => {
    if (left.featured !== right.featured) return left.featured ? -1 : 1;
    if (left.archived !== right.archived) return left.archived ? 1 : -1;
    return right.updatedAt.localeCompare(left.updatedAt) || left.name.localeCompare(right.name);
  });
}
