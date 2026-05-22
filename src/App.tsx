import {
  ArrowRight,
  BookOpen,
  Boxes,
  BrainCircuit,
  ExternalLink,
  Github,
  Globe2,
  GraduationCap,
  MapPin,
  Network,
  ScanSearch,
  Search,
  Sparkles,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import snapshots from './data/github-repositories.json';
import { curatedRepositories, familyOrder } from './data/curation';
import { enrichRepository, filterRepositories, sortRepositories } from './lib/catalog';
import type {
  CatalogFilters,
  Locale,
  PortfolioRepository,
  RepositoryFamily,
  RepositorySnapshot,
} from './types';

const lattesUrl = 'http://lattes.cnpq.br/1831130831245161';
const githubUrl = 'https://github.com/albertomateus9';

const copy = {
  pt: {
    nav: ['Sobre', 'Projetos', 'Pesquisa', 'Educação', 'Trajetória', 'Contato'],
    catalog: 'Catálogo',
    language: 'English',
    heroTitle: (
      <>
        Conecto pessoas.
        <br />
        Percebo o mundo.
        <br />
        <em>Transformo conhecimento em impacto.</em>
      </>
    ),
    heroBody:
      'Engenheiro de Telecomunicações, pesquisador em Visão Computacional e educador STEAM em Belém, Pará.',
    heroCta: 'Ver projetos',
    trajectoryCta: 'Conhecer trajetória',
    signal: 'Belém, Pará, Brasil',
    rail: 'Projetos em destaque',
    overline: 'Engenharia Viva',
    pillarsTitle: 'Três frentes que se reforçam',
    pillars: [
      {
        title: 'Infraestrutura conectada',
        body: 'Redes IP, enlaces ópticos, automação, monitoramento e leitura operacional de ambientes reais.',
      },
      {
        title: 'Visão Computacional',
        body: 'Pesquisa e protótipos de IA aplicada que tornam sinais visuais úteis, responsáveis e leves.',
      },
      {
        title: 'Ensino que constrói',
        body: 'STEAM, laboratórios EETEPA e jogos para transformar conteúdos técnicos em prática viva.',
      },
    ],
    featuredTitle: 'Projetos que conectam engenharia, pesquisa e ensino',
    featuredBody:
      'A vitrine mostra produtos, demos e laboratórios públicos. O catálogo abre o restante do GitHub com contexto.',
    openCatalog: 'Explorar catálogo completo',
    openRepo: 'Repositório',
    openDemo: 'Demo',
    flagship: 'Projeto premium',
    tracksTitle: 'Lotes e trilhas',
    tracks: [
      ['Telecom + Visão', 'MVPs de enlace, OCR leve, telemetria e benchmarking local.'],
      ['EETEPA aplicada', 'Apps de redes, maker, dados, inventário e segurança para sala/lab.'],
      ['Ciência de Dados', '20 repositórios Python/Jupyter com amostras seguras e narrativa didática.'],
      ['Aulas lúdicas', 'Missões web para equipes, professor, placar e evidências exportáveis.'],
    ],
    timelineTitle: 'Trajetória',
    timeline: [
      ['Infraestrutura', 'Redes ópticas, roteamento, monitoramento e documentação técnica em escala pública.'],
      ['Pesquisa', 'Formação de pós-graduação e linha atual em Visão Computacional e IA aplicada.'],
      ['Educação', 'Cursos, cultura maker, robótica e portfólios curriculares na EETEPA Vilhena Alves.'],
    ],
    researchTitle: 'Pesquisa',
    researchBody:
      'Minha frente atual combina visão computacional, IA aplicada e engenharia para investigar leitura visual, automação e protótipos eficientes.',
    educationTitle: 'Educação',
    educationBody:
      'Projeto experiências que dão ao estudante autoria técnica: laboratórios browser-first, notebooks seguros e jogos conduzidos em sala.',
    resumeTitle: 'Resumo público',
    resumeBody:
      'Mestre em Engenharia Elétrica, doutorando com linha de pesquisa em Visão Computacional, Engenheiro de Telecomunicações, Tecnólogo em Análise e Desenvolvimento de Sistemas e Licenciado em Física.',
    dataPolicy:
      'Os projetos públicos usam dados sintéticos, amostras pequenas ou fontes públicas documentadas. Documentos pessoais e dados de estudantes ficam fora deste portfólio.',
    lattes: 'Ver Lattes',
    catalogTitle: 'Catálogo público do GitHub',
    catalogBody:
      'Busca e filtros sobre o snapshot automatizado dos repositórios públicos. Destaques e grupos recebem curadoria manual.',
    search: 'Buscar por projeto, tema ou tecnologia',
    allFamilies: 'Todas as famílias',
    allLanguages: 'Todas as linguagens',
    status: {
      todos: 'Todos',
      ativos: 'Ativos',
      arquivados: 'Arquivados',
      forks: 'Forks',
    },
    demoOnly: 'Somente com demo',
    results: 'resultados',
    backHome: 'Voltar ao início',
    archived: 'Arquivado',
    fork: 'Fork',
    collaboration: 'Colaboração',
    empty: 'Nenhum repositório atende aos filtros atuais.',
    contactTitle: 'Contato público',
    contactBody: 'Para acompanhar meu trabalho público, use GitHub e Currículo Lattes.',
  },
  en: {
    nav: ['About', 'Projects', 'Research', 'Education', 'Trajectory', 'Contact'],
    catalog: 'Catalog',
    language: 'Português',
    heroTitle: (
      <>
        I connect people.
        <br />
        I read the world.
        <br />
        <em>I turn knowledge into impact.</em>
      </>
    ),
    heroBody:
      'Telecommunications engineer, Computer Vision researcher, and STEAM educator in Belem, Para, Brazil.',
    heroCta: 'View projects',
    trajectoryCta: 'See trajectory',
    signal: 'Belem, Para, Brazil',
    rail: 'Featured projects',
    overline: 'Living Engineering',
    pillarsTitle: 'Three fronts that reinforce each other',
    pillars: [
      {
        title: 'Connected infrastructure',
        body: 'IP networks, optical links, automation, monitoring, and operational clarity for real environments.',
      },
      {
        title: 'Computer Vision',
        body: 'Research and applied AI prototypes that make visual signals useful, responsible, and lightweight.',
      },
      {
        title: 'Teaching by building',
        body: 'STEAM, EETEPA labs, and classroom games that turn technical content into practice.',
      },
    ],
    featuredTitle: 'Projects joining engineering, research, and education',
    featuredBody:
      'The showcase highlights products, demos, and public labs. The catalog opens the rest of GitHub with context.',
    openCatalog: 'Explore full catalog',
    openRepo: 'Repository',
    openDemo: 'Demo',
    flagship: 'Premium project',
    tracksTitle: 'Batches and tracks',
    tracks: [
      ['Telecom + Vision', 'Link planning, lightweight OCR, telemetry, and local benchmarking MVPs.'],
      ['Applied EETEPA', 'Networking, maker, data, inventory, and security apps for labs and classrooms.'],
      ['Data Science', '20 Python/Jupyter repositories with safe samples and didactic narratives.'],
      ['Playful classes', 'Web missions for teams, teacher control, scoring, and exportable evidence.'],
    ],
    timelineTitle: 'Trajectory',
    timeline: [
      ['Infrastructure', 'Optical networks, routing, monitoring, and technical documentation at public scale.'],
      ['Research', 'Graduate work and a current line in Computer Vision and applied AI.'],
      ['Education', 'Courses, maker culture, robotics, and curricular portfolios at EETEPA Vilhena Alves.'],
    ],
    researchTitle: 'Research',
    researchBody:
      'My current front combines computer vision, applied AI, and engineering to explore visual reading, automation, and efficient prototypes.',
    educationTitle: 'Education',
    educationBody:
      'I design experiences that give students technical authorship: browser-first labs, safe notebooks, and teacher-led games.',
    resumeTitle: 'Public summary',
    resumeBody:
      'M.Sc. in Electrical Engineering, PhD candidate with a current Computer Vision research line, Telecommunications Engineer, Systems Analysis technologist, and Physics educator.',
    dataPolicy:
      'Public projects use synthetic data, small samples, or documented public sources. Personal documents and student data stay outside this portfolio.',
    lattes: 'Open Lattes',
    catalogTitle: 'Public GitHub catalog',
    catalogBody:
      'Search and filters over an automated public-repository snapshot. Highlights and groups receive manual curation.',
    search: 'Search by project, theme, or technology',
    allFamilies: 'All families',
    allLanguages: 'All languages',
    status: {
      todos: 'All',
      ativos: 'Active',
      arquivados: 'Archived',
      forks: 'Forks',
    },
    demoOnly: 'Demo only',
    results: 'results',
    backHome: 'Back home',
    archived: 'Archived',
    fork: 'Fork',
    collaboration: 'Collaboration',
    empty: 'No repository matches the current filters.',
    contactTitle: 'Public contact',
    contactBody: 'Follow my public work through GitHub and the Lattes curriculum.',
  },
} satisfies Record<Locale, Record<string, unknown>>;

const familyNames: Record<Locale, Record<RepositoryFamily, string>> = {
  pt: {
    premium: 'Premium',
    vitrine: 'Vitrine',
    'visao-computacional': 'Telecom + Visão',
    eetepa: 'EETEPA aplicada',
    'ciencia-de-dados': 'Ciência de Dados',
    'informatica-redes': 'Informática + Redes',
    'aulas-ludicas': 'Aulas Lúdicas',
    colaboracoes: 'Colaborações',
    catalogo: 'Catálogo geral',
  },
  en: {
    premium: 'Premium',
    vitrine: 'Showcase',
    'visao-computacional': 'Telecom + Vision',
    eetepa: 'Applied EETEPA',
    'ciencia-de-dados': 'Data Science',
    'informatica-redes': 'Computing + Networks',
    'aulas-ludicas': 'Playful Classes',
    colaboracoes: 'Collaborations',
    catalogo: 'General Catalog',
  },
};

const snapshotRepos = snapshots as RepositorySnapshot[];
const repositories = sortRepositories(
  snapshotRepos.map((repo) => enrichRepository(repo, curatedRepositories)),
);

function useHashView() {
  const readView = () => (window.location.hash === '#catalogo' ? 'catalogo' : 'home');
  const [view, setView] = useState<'home' | 'catalogo'>(readView);

  useEffect(() => {
    const onHashChange = () => setView(readView());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return view;
}

function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {children}
    </a>
  );
}

function LanguageToggle({ locale, onToggle }: { locale: Locale; onToggle: () => void }) {
  return (
    <button className="language-toggle" type="button" onClick={onToggle}>
      <Globe2 aria-hidden="true" />
      {String(copy[locale].language)}
    </button>
  );
}

function SiteHeader({ locale, onToggle }: { locale: Locale; onToggle: () => void }) {
  const content = copy[locale];

  return (
    <header className="site-header">
      <a className="brand" href="#" aria-label="Alberto Mateus">
        <span>AM</span>
        Alberto Mateus
      </a>
      <nav aria-label="Principal">
        {(content.nav as string[]).map((item, index) => (
          <a href={`#${['sobre', 'projetos', 'pesquisa', 'educacao', 'trajetoria', 'contato'][index]}`} key={item}>
            {item}
          </a>
        ))}
      </nav>
      <a className="catalog-link" href="#catalogo">
        {String(content.catalog)}
      </a>
      <LanguageToggle locale={locale} onToggle={onToggle} />
    </header>
  );
}

function PortraitStage() {
  return (
    <figure className="portrait-stage">
      <span className="portrait-grid" aria-hidden="true" />
      <picture>
        <source
          srcSet="/assets/alberto-mateus-portrait-mobile.webp"
          media="(max-width: 680px)"
          type="image/webp"
        />
        <img
          src="/assets/alberto-mateus-portrait.webp"
          alt="Retrato profissional de Alberto Mateus."
          width="880"
          height="1173"
        />
      </picture>
      <svg className="portrait-vectors" viewBox="0 0 540 720" aria-hidden="true">
        <path d="M24 102h82l48 51h88l54 71h148" />
        <path d="M18 572h121l41-52h104l47-62h185" />
        <path d="M421 51v93l55 55v179l-70 70v187" />
        <circle cx="24" cy="102" r="6" />
        <circle cx="154" cy="153" r="6" />
        <circle cx="296" cy="224" r="6" />
        <circle cx="476" cy="199" r="6" />
        <rect x="36" y="211" width="132" height="183" />
        <rect x="358" y="148" width="119" height="164" />
      </svg>
      <figcaption>Visão, redes e sala de aula em uma mesma engenharia.</figcaption>
    </figure>
  );
}

function RepositoryActions({ repo, locale }: { repo: PortfolioRepository; locale: Locale }) {
  const content = copy[locale];

  return (
    <div className="repo-actions">
      <TextLink href={repo.htmlUrl}>
        <Github aria-hidden="true" />
        {String(content.openRepo)}
      </TextLink>
      {repo.demo ? (
        <TextLink href={repo.demo}>
          <ExternalLink aria-hidden="true" />
          {String(content.openDemo)}
        </TextLink>
      ) : null}
    </div>
  );
}

function HeroRail({ locale }: { locale: Locale }) {
  const railRepos = repositories.filter((repo) => repo.featured).slice(0, 4);

  return (
    <aside className="hero-rail" aria-label={String(copy[locale].rail)}>
      <h2>{String(copy[locale].rail)}</h2>
      {railRepos.map((repo) => (
        <TextLink href={repo.htmlUrl} className="rail-row" key={repo.name}>
          <span>{repo.name}</span>
          <small>{familyNames[locale][repo.family]}</small>
        </TextLink>
      ))}
      <a className="rail-catalog" href="#catalogo">
        {String(copy[locale].openCatalog)}
        <ArrowRight aria-hidden="true" />
      </a>
    </aside>
  );
}

function HomeView({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const showcase = repositories.filter((repo) => repo.featured && repo.family !== 'premium').slice(0, 6);
  const webcraft = repositories.find((repo) => repo.name === 'webcraft-studio');

  return (
    <>
      <main>
        <section className="hero" id="sobre">
          <div className="hero-copy">
            <p className="overline">{String(content.overline)}</p>
            <h1>{content.heroTitle as React.ReactNode}</h1>
            <p className="hero-body">{String(content.heroBody)}</p>
            <p className="location">
              <MapPin aria-hidden="true" />
              {String(content.signal)}
            </p>
            <div className="hero-actions">
              <a href="#projetos" className="primary-action">
                {String(content.heroCta)}
                <ArrowRight aria-hidden="true" />
              </a>
              <a href="#trajetoria" className="secondary-action">
                {String(content.trajectoryCta)}
              </a>
            </div>
          </div>
          <PortraitStage />
          <HeroRail locale={locale} />
        </section>

        <section className="pillars" aria-labelledby="pillars-title">
          <h2 id="pillars-title">{String(content.pillarsTitle)}</h2>
          <div className="pillar-band">
            {(content.pillars as { title: string; body: string }[]).map((pillar, index) => {
              const Icon = [Network, ScanSearch, GraduationCap][index];
              return (
                <article key={pillar.title}>
                  <Icon aria-hidden="true" />
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="projects-section" id="projetos" aria-labelledby="projects-title">
          <div className="section-lead">
            <h2 id="projects-title">{String(content.featuredTitle)}</h2>
            <p>{String(content.featuredBody)}</p>
          </div>
          {webcraft ? (
            <article className="flagship">
              <div>
                <p>{String(content.flagship)}</p>
                <h3>WebCraft Studio</h3>
                <span>{webcraft.summary[locale]}</span>
              </div>
              <div className="webcraft-stage" aria-hidden="true">
                <code>&lt;main&gt;</code>
                <b>Missão Web</b>
                <code>color: impact;</code>
              </div>
              <RepositoryActions repo={webcraft} locale={locale} />
            </article>
          ) : null}
          <div className="showcase-rail">
            {showcase.map((repo) => (
              <article className="showcase-row" key={repo.name}>
                <div>
                  <small>{familyNames[locale][repo.family]}</small>
                  <h3>{repo.name}</h3>
                  <p>{repo.summary[locale]}</p>
                </div>
                <RepositoryActions repo={repo} locale={locale} />
              </article>
            ))}
          </div>
          <a className="catalog-call" href="#catalogo">
            <Boxes aria-hidden="true" />
            {String(content.openCatalog)}
            <ArrowRight aria-hidden="true" />
          </a>
        </section>

        <section className="tracks" aria-labelledby="tracks-title">
          <h2 id="tracks-title">{String(content.tracksTitle)}</h2>
          {(content.tracks as string[][]).map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </section>

        <section className="trajectory" id="trajetoria" aria-labelledby="trajectory-title">
          <div className="timeline">
            <h2 id="trajectory-title">{String(content.timelineTitle)}</h2>
            {(content.timeline as string[][]).map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="research-education">
            <article id="pesquisa" className="research">
              <BrainCircuit aria-hidden="true" />
              <h2>{String(content.researchTitle)}</h2>
              <p>{String(content.researchBody)}</p>
              <div className="vision-frame" aria-hidden="true">
                <span>frame_vision()</span>
                <i />
                <b />
              </div>
            </article>
            <article id="educacao" className="education">
              <BookOpen aria-hidden="true" />
              <h2>{String(content.educationTitle)}</h2>
              <p>{String(content.educationBody)}</p>
              <div className="lesson-strip" aria-hidden="true">
                <em>redes</em>
                <em>dados</em>
                <em>web</em>
              </div>
            </article>
          </div>
        </section>

        <section className="resume" aria-labelledby="resume-title">
          <div>
            <Sparkles aria-hidden="true" />
            <h2 id="resume-title">{String(content.resumeTitle)}</h2>
            <p>{String(content.resumeBody)}</p>
          </div>
          <div>
            <p>{String(content.dataPolicy)}</p>
            <TextLink href={lattesUrl} className="lattes-link">
              {String(content.lattes)}
              <ExternalLink aria-hidden="true" />
            </TextLink>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

function badges(repo: PortfolioRepository, locale: Locale) {
  const content = copy[locale];
  return [
    repo.code,
    repo.archived ? String(content.archived) : '',
    repo.fork ? String(content.fork) : '',
    repo.family === 'colaboracoes' ? String(content.collaboration) : '',
    repo.demo ? 'Demo' : '',
    repo.language,
  ].filter(Boolean);
}

function CatalogView({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const [filters, setFilters] = useState<CatalogFilters>({
    query: '',
    family: 'todas',
    demoOnly: false,
    language: '',
    status: 'todos',
  });
  const languages = useMemo(
    () => [...new Set(repositories.map((repo) => repo.language).filter(Boolean))].sort(),
    [],
  );
  const visible = useMemo(() => filterRepositories(repositories, filters), [filters]);

  return (
    <>
      <main className="catalog-page">
        <section className="catalog-intro">
          <a href="#" className="back-home">
            <ArrowRight aria-hidden="true" />
            {String(content.backHome)}
          </a>
          <h1>{String(content.catalogTitle)}</h1>
          <p>{String(content.catalogBody)}</p>
        </section>
        <section className="catalog-controls" aria-label={String(content.catalogTitle)}>
          <label className="search-control">
            <Search aria-hidden="true" />
            <span className="sr-only">{String(content.search)}</span>
            <input
              value={filters.query}
              onChange={(event) => setFilters((current) => ({ ...current, query: event.target.value }))}
              placeholder={String(content.search)}
            />
          </label>
          <select
            aria-label={String(content.allFamilies)}
            value={filters.family}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                family: event.target.value as CatalogFilters['family'],
              }))
            }
          >
            <option value="todas">{String(content.allFamilies)}</option>
            {familyOrder.map((family) => (
              <option value={family} key={family}>
                {familyNames[locale][family]}
              </option>
            ))}
          </select>
          <select
            aria-label={String(content.allLanguages)}
            value={filters.language}
            onChange={(event) => setFilters((current) => ({ ...current, language: event.target.value }))}
          >
            <option value="">{String(content.allLanguages)}</option>
            {languages.map((language) => (
              <option value={language} key={language}>
                {language}
              </option>
            ))}
          </select>
          <div className="status-control">
            {(['todos', 'ativos', 'arquivados', 'forks'] as const).map((status) => (
              <button
                className={filters.status === status ? 'active' : ''}
                type="button"
                key={status}
                onClick={() => setFilters((current) => ({ ...current, status }))}
              >
                {(content.status as Record<string, string>)[status]}
              </button>
            ))}
          </div>
          <label className="demo-control">
            <input
              type="checkbox"
              checked={filters.demoOnly}
              onChange={(event) => setFilters((current) => ({ ...current, demoOnly: event.target.checked }))}
            />
            {String(content.demoOnly)}
          </label>
        </section>
        <section className="catalog-results" aria-live="polite">
          <p className="result-count">
            {visible.length} {String(content.results)}
          </p>
          {visible.length ? (
            <div className="repo-list">
              {visible.map((repo) => (
                <article className="catalog-row" key={repo.name}>
                  <div className="repo-index">
                    <span>{familyNames[locale][repo.family]}</span>
                    <time dateTime={repo.updatedAt}>{repo.updatedAt.slice(0, 10)}</time>
                  </div>
                  <div className="repo-copy">
                    <h2>{repo.name}</h2>
                    <p>{repo.summary[locale]}</p>
                    <div className="repo-badges">
                      {badges(repo, locale).map((badge) => (
                        <span key={badge}>{badge}</span>
                      ))}
                    </div>
                  </div>
                  <RepositoryActions repo={repo} locale={locale} />
                </article>
              ))}
            </div>
          ) : (
            <p className="empty">{String(content.empty)}</p>
          )}
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

function SiteFooter({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <footer id="contato">
      <div>
        <h2>{String(content.contactTitle)}</h2>
        <p>{String(content.contactBody)}</p>
      </div>
      <div className="footer-links">
        <TextLink href={githubUrl}>
          <Github aria-hidden="true" />
          GitHub
        </TextLink>
        <TextLink href={lattesUrl}>
          <ExternalLink aria-hidden="true" />
          Lattes
        </TextLink>
      </div>
    </footer>
  );
}

export function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    const stored = window.localStorage.getItem('portfolio-locale');
    return stored === 'en' ? 'en' : 'pt';
  });
  const view = useHashView();

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
    window.localStorage.setItem('portfolio-locale', locale);
  }, [locale]);

  return (
    <div className="site-shell">
      <SiteHeader locale={locale} onToggle={() => setLocale((current) => (current === 'pt' ? 'en' : 'pt'))} />
      {view === 'catalogo' ? <CatalogView locale={locale} /> : <HomeView locale={locale} />}
    </div>
  );
}
