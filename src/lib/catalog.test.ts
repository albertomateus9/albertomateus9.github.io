import { describe, expect, it } from 'vitest';

import { enrichRepository, filterRepositories } from './catalog';
import type { CuratedRepository, RepositorySnapshot } from '../types';

const repos: RepositorySnapshot[] = [
  {
    name: 'webcraft-studio',
    description: 'Estudio ludico para aprender web.',
    htmlUrl: 'https://github.com/albertomateus9/webcraft-studio',
    homepage: 'https://albertomateus9.github.io/webcraft-studio/',
    topics: ['education-technology', 'javascript'],
    language: 'TypeScript',
    stars: 5,
    forks: 0,
    archived: false,
    fork: false,
    updatedAt: '2026-05-11T12:00:00Z',
  },
  {
    name: 'hacka-floresta',
    description: 'Repositorio publico de equipe.',
    htmlUrl: 'https://github.com/albertomateus9/hacka-floresta',
    homepage: '',
    topics: ['hackathon'],
    language: 'HTML',
    stars: 0,
    forks: 0,
    archived: false,
    fork: false,
    updatedAt: '2026-04-01T12:00:00Z',
  },
];

const curation: CuratedRepository[] = [
  {
    name: 'webcraft-studio',
    family: 'premium',
    labels: ['educacao', 'demo'],
    featured: true,
    demo: 'https://albertomateus9.github.io/webcraft-studio/',
    pt: 'Ambiente ludico para aprender HTML, CSS e JavaScript.',
    en: 'Playful environment for HTML, CSS, and JavaScript learning.',
  },
];

describe('catalog helpers', () => {
  it('merges curated context with GitHub repository snapshots', () => {
    const enriched = enrichRepository(repos[0], curation);

    expect(enriched.family).toBe('premium');
    expect(enriched.summary.pt).toContain('HTML');
    expect(enriched.demo).toContain('github.io');
    expect(enriched.labels).toContain('demo');
  });

  it('recognizes hackathon repositories when no manual curation exists', () => {
    const enriched = enrichRepository(repos[1], curation);

    expect(enriched.family).toBe('colaboracoes');
    expect(enriched.labels).toContain('hackathon');
  });

  it('filters by search text, family, demo, and language', () => {
    const enriched = repos.map((repo) => enrichRepository(repo, curation));

    expect(
      filterRepositories(enriched, {
        query: 'webcraft',
        family: 'premium',
        demoOnly: true,
        language: 'TypeScript',
        signal: 'educacao',
        status: 'ativos',
      }),
    ).toHaveLength(1);
  });

  it('filters by curated or repository signal', () => {
    const enriched = repos.map((repo) => enrichRepository(repo, curation));

    expect(
      filterRepositories(enriched, {
        query: '',
        family: 'todas',
        demoOnly: false,
        language: '',
        signal: 'javascript',
        status: 'todos',
      }),
    ).toHaveLength(1);
  });
});
