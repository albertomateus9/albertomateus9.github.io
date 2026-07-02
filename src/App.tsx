import {
  ArrowRight,
  BookOpen,
  Boxes,
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  CircleDot,
  Code2,
  Database,
  ExternalLink,
  Github,
  Globe2,
  GraduationCap,
  Home as HomeIcon,
  LayoutGrid,
  Linkedin,
  Mail,
  MapPin,
  Network,
  ScanSearch,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import snapshots from './data/github-repositories.json';
import { curatedRepositories, familyOrder } from './data/curation';
import {
  caseStudies,
  educationHistory,
  experienceHistory,
  hardSkillsList,
  publicationList,
  softSkillsList,
  technologyRadar,
} from './data/portfolio';
import { enrichRepository, filterRepositories, sortRepositories } from './lib/catalog';
import type { CatalogFilters, Locale, PortfolioRepository, RepositoryFamily, RepositorySnapshot } from './types';

const lattesUrl = 'http://lattes.cnpq.br/1831130831245161';
const githubUrl = 'https://github.com/albertomateus9';
const linkedinUrl = 'https://www.linkedin.com/in/alberto-mateus-10b858146';
const emailUrl = 'mailto:albertomateus9@yahoo.com';

const copy = {
  pt: {
    nav: [
      ['Narrativa', '#narrativa'],
      ['Provas', '#provas'],
      ['Stack', '#stack'],
      ['Trajetória', '#trajetoria'],
      ['Contato', '#contato'],
    ],
    catalog: 'Catálogo',
    language: 'EN',
    eyebrow: 'Engenharia • IA aplicada • Educação tecnológica',
    heroTitle: 'Construo pontes entre infraestrutura crítica, inteligência artificial e aprendizagem prática.',
    heroLead:
      'Portfólio executivo de Alberto Mateus: engenheiro de telecomunicações, mestre em engenharia elétrica, doutorando em IA aplicada, professor de tecnologia e construtor full cycle de produtos digitais.',
    primaryCta: 'Ver evidências',
    secondaryCta: 'Explorar catálogo',
    location: 'Belém, Pará, Brasil',
    command: 'perfil.executar("telecom + dados + educação + produto")',
    decisionTitle: 'Por que esse perfil é vendável?',
    decisionLead:
      'A página foi reorganizada como uma central de posicionamento: cada bloco responde rapidamente o que você faz, para quem faz, com quais provas e qual valor entrega.',
    audiences: [
      ['Gestores públicos e educação', 'Laboratórios, metodologias ativas, dados seguros e soluções aplicáveis à escola pública.'],
      ['Empresas e tecnologia', 'Automação, dashboards, APIs, observabilidade e prototipagem de MVPs com entrega objetiva.'],
      ['Pesquisa e pós-graduação', 'IA aplicada, visão computacional, telecomunicações, modelagem e rigor metodológico.'],
      ['Comunidade técnica', 'Repositórios públicos, arquitetura documentada, React, Python, Supabase e cultura maker.'],
    ],
    stats: [
      ['trilhas', 'telecom, IA, redes, dados e educação'],
      ['base técnica', 'engenharia, ADS, física e pesquisa aplicada'],
      ['modo de entrega', 'MVPs, automações, dashboards e laboratórios'],
    ],
    evidenceTitle: 'Evidências selecionadas',
    evidenceLead:
      'Projetos apresentados como casos de uso, não apenas como links. A leitura é pensada para recrutadores, parceiros, gestores, alunos e banca acadêmica.',
    problem: 'Problema',
    architecture: 'Arquitetura',
    next: 'Próximo passo',
    stackTitle: 'Stack operacional',
    stackLead:
      'O radar separa tecnologias em uso, sinais observados e experimentos futuros para deixar claro maturidade, direção e velocidade de evolução.',
    skillsTitle: 'Matriz de competência',
    skillsLead:
      'Habilidades organizadas como telemetria profissional: cada item aponta evidência concreta, não apenas autodeclaração.',
    trajectoryTitle: 'Trajetória e autoridade',
    trajectoryLead:
      'Formação acadêmica, experiência profissional e produção intelectual aparecem como lastro de credibilidade para públicos diferentes.',
    tabs: {
      experience: 'Experiência',
      education: 'Formação',
      publications: 'Publicações',
    },
    catalogTitle: 'Catálogo técnico',
    catalogLead:
      'Inventário pesquisável dos repositórios públicos, agrupado por frente de atuação para facilitar leitura estratégica.',
    search: 'Buscar projeto, tema ou tecnologia',
    allFamilies: 'Todas as trilhas',
    allLanguages: 'Todas as linguagens',
    allSignals: 'Todos os sinais',
    status: {
      todos: 'Todos',
      ativos: 'Ativos',
      arquivados: 'Arquivados',
      forks: 'Forks',
    },
    demoOnly: 'Somente com demo',
    results: 'resultados',
    backHome: 'Voltar ao painel',
    archived: 'Arquivado',
    fork: 'Fork',
    collaboration: 'Colaboração',
    empty: 'Nenhum repositório atende aos filtros atuais.',
    repo: 'Repositório',
    demo: 'Demo',
    contactTitle: 'Contato e presença digital',
    contactLead:
      'Para parcerias, orientação técnica, pesquisa aplicada, aulas, consultoria, automação e desenvolvimento de produtos digitais.',
  },
  en: {
    nav: [
      ['Narrative', '#narrativa'],
      ['Proof', '#provas'],
      ['Stack', '#stack'],
      ['Trajectory', '#trajetoria'],
      ['Contact', '#contato'],
    ],
    catalog: 'Catalog',
    language: 'PT',
    eyebrow: 'Engineering • Applied AI • Technology education',
    heroTitle: 'I build bridges between critical infrastructure, artificial intelligence, and practical learning.',
    heroLead:
      'Executive portfolio of Alberto Mateus: telecommunications engineer, M.Sc. in electrical engineering, PhD candidate in applied AI, technology educator, and full-cycle digital product builder.',
    primaryCta: 'View evidence',
    secondaryCta: 'Explore catalog',
    location: 'Belem, Para, Brazil',
    command: 'profile.run("telecom + data + education + product")',
    decisionTitle: 'Why is this profile marketable?',
    decisionLead:
      'The page is organized as a positioning command center: each block quickly answers what you do, who you serve, what proves it, and which value you deliver.',
    audiences: [
      ['Public managers and education', 'Labs, active methodologies, safe data, and solutions applicable to public schools.'],
      ['Companies and technology', 'Automation, dashboards, APIs, observability, and MVP prototyping with objective delivery.'],
      ['Research and graduate programs', 'Applied AI, computer vision, telecommunications, modeling, and methodological rigor.'],
      ['Technical community', 'Public repositories, documented architecture, React, Python, Supabase, and maker culture.'],
    ],
    stats: [
      ['tracks', 'telecom, AI, networks, data, and education'],
      ['technical base', 'engineering, systems, physics, and applied research'],
      ['delivery mode', 'MVPs, automation, dashboards, and labs'],
    ],
    evidenceTitle: 'Selected evidence',
    evidenceLead:
      'Projects are presented as use cases, not just links. The reading flow is designed for recruiters, partners, managers, students, and academic committees.',
    problem: 'Problem',
    architecture: 'Architecture',
    next: 'Next step',
    stackTitle: 'Operational stack',
    stackLead:
      'The radar separates technologies in use, observed signals, and future experiments to clarify maturity, direction, and learning velocity.',
    skillsTitle: 'Competency matrix',
    skillsLead:
      'Skills are organized as professional telemetry: each item points to concrete evidence, not just self-description.',
    trajectoryTitle: 'Trajectory and authority',
    trajectoryLead:
      'Academic background, professional experience, and intellectual production provide credibility for different audiences.',
    tabs: {
      experience: 'Experience',
      education: 'Education',
      publications: 'Publications',
    },
    catalogTitle: 'Technical catalog',
    catalogLead:
      'Searchable inventory of public repositories, grouped by operating front to support strategic reading.',
    search: 'Search project, topic, or technology',
    allFamilies: 'All tracks',
    allLanguages: 'All languages',
    allSignals: 'All signals',
    status: {
      todos: 'All',
      ativos: 'Active',
      arquivados: 'Archived',
      forks: 'Forks',
    },
    demoOnly: 'Demo only',
    results: 'results',
    backHome: 'Back to panel',
    archived: 'Archived',
    fork: 'Fork',
    collaboration: 'Collaboration',
    empty: 'No repository matches the current filters.',
    repo: 'Repository',
    demo: 'Demo',
    contactTitle: 'Contact and digital presence',
    contactLead:
      'For partnerships, technical advisory, applied research, classes, consulting, automation, and digital product development.',
  },
} as const;

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

const repositories = sortRepositories(
  (snapshots as RepositorySnapshot[]).map((repo) => enrichRepository(repo, curatedRepositories)),
);

const featuredRepositories = repositories.filter((repo) => repo.featured && !repo.archived).slice(0, 6);
const activeRepositories = repositories.filter((repo) => !repo.archived && !repo.fork);
const demoRepositories = repositories.filter((repo) => repo.demo);

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

function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a className={className} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {children}
    </a>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span>AM</span>
    </span>
  );
}

function LanguageButton({ locale, setLocale }: { locale: Locale; setLocale: (locale: Locale) => void }) {
  const content = copy[locale];
  return (
    <button className="language-button" type="button" onClick={() => setLocale(locale === 'pt' ? 'en' : 'pt')}>
      <Globe2 aria-hidden="true" />
      {content.language}
    </button>
  );
}

function SiteHeader({ locale, setLocale }: { locale: Locale; setLocale: (locale: Locale) => void }) {
  const content = copy[locale];

  return (
    <header className="site-header">
      <a className="brand" href="#" aria-label="Alberto Mateus">
        <BrandMark />
        <span>
          <strong>Alberto Mateus</strong>
          <small>AI • Telecom • Educação</small>
        </span>
      </a>
      <nav aria-label="Principal">
        {content.nav.map(([label, href]) => (
          <a href={href} key={label}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="catalog-button" href="#catalogo">
          <LayoutGrid aria-hidden="true" />
          {content.catalog}
        </a>
        <LanguageButton locale={locale} setLocale={setLocale} />
      </div>
    </header>
  );
}

function HeroVisual({ locale }: { locale: Locale }) {
  return (
    <aside className="hero-visual" aria-label="Painel visual do portfólio">
      <div className="portrait-card">
        <span className="scanline" aria-hidden="true" />
        <img src="/assets/alberto-mateus-portrait-real-cutout.webp" alt="Retrato profissional de Alberto Mateus" width="847" height="974" />
        <div className="portrait-hud top">
          <span>REC</span>
          <span>SYS_ACTIVE</span>
        </div>
        <div className="portrait-hud bottom">
          <span>TELECOM</span>
          <span>AI_VISION</span>
          <span>EDTECH</span>
        </div>
      </div>
      <div className="orbit-panel" aria-hidden="true">
        <span className="orbit-ring ring-a" />
        <span className="orbit-ring ring-b" />
        <span className="orbit-node node-a">IA</span>
        <span className="orbit-node node-b">RF</span>
        <span className="orbit-node node-c">UX</span>
        <span className="orbit-node node-d">API</span>
        <div className="core-node">
          <Terminal />
          <strong>FULL CYCLE</strong>
          <small>{locale === 'pt' ? 'pesquisa → produto' : 'research → product'}</small>
        </div>
      </div>
    </aside>
  );
}

function Hero({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const stats = [
    [String(activeRepositories.length), locale === 'pt' ? 'repositórios ativos' : 'active repositories'],
    [String(demoRepositories.length), locale === 'pt' ? 'demos públicas' : 'public demos'],
    [String(caseStudies.length), locale === 'pt' ? 'casos em foco' : 'focused cases'],
  ];

  return (
    <section className="hero" id="narrativa">
      <div className="hero-copy">
        <div className="eyebrow">
          <Sparkles aria-hidden="true" />
          {content.eyebrow}
        </div>
        <h1>{content.heroTitle}</h1>
        <p className="hero-lead">{content.heroLead}</p>
        <div className="hero-actions">
          <a className="primary-action" href="#provas">
            {content.primaryCta}
            <ArrowRight aria-hidden="true" />
          </a>
          <a className="secondary-action" href="#catalogo">
            {content.secondaryCta}
          </a>
        </div>
        <div className="command-line" aria-label="Comando de posicionamento">
          <Terminal aria-hidden="true" />
          <code>{content.command}</code>
        </div>
        <div className="hero-location">
          <MapPin aria-hidden="true" />
          {content.location}
        </div>
      </div>
      <HeroVisual locale={locale} />
      <div className="hero-stats" aria-label="Métricas do portfólio">
        {stats.map(([value, label]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function AudienceGrid({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const icons = [GraduationCap, Briefcase, BrainCircuit, Github];

  return (
    <section className="audience-section" aria-labelledby="audience-title">
      <div className="section-heading compact">
        <span className="section-kicker">POSITIONING</span>
        <h2 id="audience-title">{content.decisionTitle}</h2>
        <p>{content.decisionLead}</p>
      </div>
      <div className="audience-grid">
        {content.audiences.map(([title, body], index) => {
          const Icon = icons[index];
          return (
            <article className="audience-card" key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          );
        })}
      </div>
      <div className="value-strip">
        {content.stats.map(([title, body]) => (
          <article key={title}>
            <strong>{title}</strong>
            <span>{body}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function RepositoryActions({ repo, locale }: { repo: PortfolioRepository; locale: Locale }) {
  const content = copy[locale];

  return (
    <div className="repo-actions">
      <TextLink href={repo.htmlUrl}>
        <Github aria-hidden="true" />
        {content.repo}
      </TextLink>
      {repo.demo ? (
        <TextLink href={repo.demo}>
          <ExternalLink aria-hidden="true" />
          {content.demo}
        </TextLink>
      ) : null}
    </div>
  );
}

function CaseStudies({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const studies = caseStudies
    .map((study) => ({ study, repo: repositories.find((repo) => repo.name === study.repository) }))
    .filter((entry): entry is { study: (typeof caseStudies)[number]; repo: PortfolioRepository } => Boolean(entry.repo));

  return (
    <section className="evidence-section" id="provas" aria-labelledby="evidence-title">
      <div className="section-heading split">
        <div>
          <span className="section-kicker">SELECTED PROOF</span>
          <h2 id="evidence-title">{content.evidenceTitle}</h2>
        </div>
        <p>{content.evidenceLead}</p>
      </div>
      <div className="case-grid">
        {studies.map(({ study, repo }, index) => (
          <article className={`case-card ${index === 0 ? 'case-card-featured' : ''}`} key={study.repository}>
            <div className="case-visual" data-visual={study.visual}>
              <span className="visual-grid" />
              <span className="visual-core">{repo.code || `0${index + 1}`}</span>
              <span className="visual-pulse" />
            </div>
            <div className="case-content">
              <span className="case-label">{familyNames[locale][repo.family]}</span>
              <h3>{study.title[locale]}</h3>
              <p className="case-summary">{study.summary[locale]}</p>
              <dl>
                <div>
                  <dt>{content.problem}</dt>
                  <dd>{study.problem[locale]}</dd>
                </div>
                <div>
                  <dt>{content.architecture}</dt>
                  <dd>{study.architecture[locale]}</dd>
                </div>
              </dl>
              <div className="case-stack">
                {study.stack.slice(0, 6).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <RepositoryActions repo={repo} locale={locale} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StackRadar({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <section className="stack-section" id="stack" aria-labelledby="stack-title">
      <div className="section-heading compact">
        <span className="section-kicker">TECH RADAR</span>
        <h2 id="stack-title">{content.stackTitle}</h2>
        <p>{content.stackLead}</p>
      </div>
      <div className="radar-layout">
        <div className="radar-screen" aria-hidden="true">
          <span className="radar-sweep" />
          <span className="radar-dot dot-1" />
          <span className="radar-dot dot-2" />
          <span className="radar-dot dot-3" />
          <strong>LIVE STACK</strong>
        </div>
        <div className="radar-bands">
          {technologyRadar.map((band) => (
            <article className={`radar-band ${band.tone}`} key={band.title.pt}>
              <h3>{band.title[locale]}</h3>
              <p>{band.body[locale]}</p>
              <div>
                {band.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const groups = [...hardSkillsList, ...softSkillsList].slice(0, 6);

  return (
    <section className="skills-section" aria-labelledby="skills-title">
      <div className="section-heading split">
        <div>
          <span className="section-kicker">CAPABILITY MATRIX</span>
          <h2 id="skills-title">{content.skillsTitle}</h2>
        </div>
        <p>{content.skillsLead}</p>
      </div>
      <div className="skills-grid">
        {groups.map((group) => (
          <article className="skill-card" key={group.title.pt}>
            <h3>{group.title[locale]}</h3>
            <p>{group.description[locale]}</p>
            <div className="skill-lines">
              {group.items.slice(0, 3).map((item) => (
                <div className="skill-line" key={item.name.pt}>
                  <span>
                    <strong>{item.name[locale]}</strong>
                    <small>{item.evidence[locale]}</small>
                  </span>
                  <i aria-hidden="true">
                    <b style={{ width: `${item.level}%` }} />
                  </i>
                  <em>{item.level}%</em>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedRepositories({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const repos = featuredRepositories.length ? featuredRepositories : activeRepositories.slice(0, 6);

  return (
    <section className="repo-showcase" aria-labelledby="repo-showcase-title">
      <div className="section-heading split">
        <div>
          <span className="section-kicker">PUBLIC REPOSITORIES</span>
          <h2 id="repo-showcase-title">{content.catalogTitle}</h2>
        </div>
        <p>{content.catalogLead}</p>
      </div>
      <div className="repo-showcase-grid">
        {repos.map((repo) => (
          <article className="repo-card" key={repo.name}>
            <div className="repo-card-head">
              <span>{repo.code || repo.name.slice(0, 2).toUpperCase()}</span>
              <small>{repo.language || familyNames[locale][repo.family]}</small>
            </div>
            <h3>{repo.name}</h3>
            <p>{repo.summary[locale]}</p>
            <div className="repo-card-tags">
              {[repo.family, ...repo.labels, ...repo.topics].filter(Boolean).slice(0, 4).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <RepositoryActions repo={repo} locale={locale} />
          </article>
        ))}
      </div>
      <a className="catalog-wide-link" href="#catalogo">
        <LayoutGrid aria-hidden="true" />
        {content.secondaryCta}
        <ArrowRight aria-hidden="true" />
      </a>
    </section>
  );
}

function Trajectory({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const [tab, setTab] = useState<'experience' | 'education' | 'publications'>('experience');

  return (
    <section className="trajectory-section" id="trajetoria" aria-labelledby="trajectory-title">
      <div className="section-heading split">
        <div>
          <span className="section-kicker">AUTHORITY LAYER</span>
          <h2 id="trajectory-title">{content.trajectoryTitle}</h2>
        </div>
        <p>{content.trajectoryLead}</p>
      </div>
      <div className="trajectory-shell">
        <div className="trajectory-tabs" role="tablist" aria-label={content.trajectoryTitle}>
          {(['experience', 'education', 'publications'] as const).map((item) => (
            <button className={tab === item ? 'active' : ''} type="button" role="tab" aria-selected={tab === item} key={item} onClick={() => setTab(item)}>
              {content.tabs[item]}
            </button>
          ))}
        </div>
        <div className="trajectory-list">
          {tab === 'experience'
            ? experienceHistory.slice(0, 5).map((item) => (
                <article key={`${item.company}-${item.period.pt}`}>
                  <h3>{item.role[locale]}</h3>
                  <p className="meta">{item.company} • {item.period[locale]}</p>
                  <ul>
                    {item.description[locale].slice(0, 2).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </article>
              ))
            : null}
          {tab === 'education'
            ? educationHistory.slice(0, 7).map((item) => (
                <article key={`${item.institution}-${item.period}-${item.degree.pt}`}>
                  <h3>{item.degree[locale]}</h3>
                  <p className="meta">{item.institution} • {item.period}</p>
                  {item.description ? <p>{item.description[locale]}</p> : null}
                </article>
              ))
            : null}
          {tab === 'publications'
            ? publicationList.map((item) => (
                <article key={`${item.title}-${item.year}`}>
                  <h3>{item.title}</h3>
                  <p>{item.authors}</p>
                  <p className="meta">{item.venue} • {item.year}</p>
                </article>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <footer className="site-footer" id="contato">
      <div>
        <span className="section-kicker">CONTACT</span>
        <h2>{content.contactTitle}</h2>
        <p>{content.contactLead}</p>
      </div>
      <div className="footer-links">
        <TextLink href={githubUrl}>
          <Github aria-hidden="true" />
          GitHub
        </TextLink>
        <TextLink href={linkedinUrl}>
          <Linkedin aria-hidden="true" />
          LinkedIn
        </TextLink>
        <TextLink href={lattesUrl}>
          <ExternalLink aria-hidden="true" />
          Lattes
        </TextLink>
        <TextLink href={emailUrl}>
          <Mail aria-hidden="true" />
          Email
        </TextLink>
      </div>
    </footer>
  );
}

function HomeView({ locale }: { locale: Locale }) {
  return (
    <>
      <main>
        <Hero locale={locale} />
        <AudienceGrid locale={locale} />
        <CaseStudies locale={locale} />
        <StackRadar locale={locale} />
        <SkillsSection locale={locale} />
        <FeaturedRepositories locale={locale} />
        <Trajectory locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}

function signalOptions() {
  const counts = new Map<string, number>();

  repositories.forEach((repo) => {
    [...repo.labels, ...repo.topics].forEach((signal) => {
      const normalized = signal.trim();
      if (!normalized || normalized === 'demo') return;
      counts.set(normalized, (counts.get(normalized) || 0) + 1);
    });
  });

  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([signal]) => signal)
    .sort((left, right) => left.localeCompare(right));
}

function badges(repo: PortfolioRepository, locale: Locale) {
  const content = copy[locale];
  return [
    familyNames[locale][repo.family],
    repo.code,
    repo.archived ? content.archived : '',
    repo.fork ? content.fork : '',
    repo.family === 'colaboracoes' ? content.collaboration : '',
    repo.demo ? 'Demo' : '',
    repo.language,
  ].filter(Boolean);
}

function CatalogLegend({ locale }: { locale: Locale }) {
  const items = [
    { icon: Briefcase, title: locale === 'pt' ? 'Profissional' : 'Professional', body: locale === 'pt' ? 'Produtos, APIs e ferramentas com aplicação real.' : 'Products, APIs, and tools with real-world application.' },
    { icon: GraduationCap, title: locale === 'pt' ? 'Educacional' : 'Educational', body: locale === 'pt' ? 'Laboratórios, simuladores e materiais didáticos.' : 'Labs, simulators, and teaching materials.' },
    { icon: BrainCircuit, title: locale === 'pt' ? 'Pesquisa' : 'Research', body: locale === 'pt' ? 'IA, visão computacional, dados e modelagem.' : 'AI, computer vision, data, and modeling.' },
    { icon: Network, title: locale === 'pt' ? 'Infraestrutura' : 'Infrastructure', body: locale === 'pt' ? 'Redes, observabilidade, telecom e automação.' : 'Networks, observability, telecom, and automation.' },
  ];

  return (
    <aside className="catalog-legend">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <article key={item.title}>
            <Icon aria-hidden="true" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        );
      })}
    </aside>
  );
}

function groupRepositories(visible: PortfolioRepository[]) {
  return familyOrder
    .map((family) => ({ family, repos: visible.filter((repo) => repo.family === family) }))
    .filter((group) => group.repos.length);
}

function CatalogView({ locale, setLocale }: { locale: Locale; setLocale: (locale: Locale) => void }) {
  const content = copy[locale];
  const [filters, setFilters] = useState<CatalogFilters>({
    query: '',
    family: 'todas',
    demoOnly: false,
    language: '',
    signal: '',
    status: 'todos',
  });
  const languages = useMemo(() => [...new Set(repositories.map((repo) => repo.language).filter(Boolean))].sort(), []);
  const signals = useMemo(signalOptions, []);
  const visible = useMemo(() => filterRepositories(repositories, filters), [filters]);
  const groups = useMemo(() => groupRepositories(visible), [visible]);

  return (
    <div className="catalog-shell">
      <aside className="catalog-sidebar">
        <a className="brand" href="#" aria-label="Alberto Mateus">
          <BrandMark />
          <span>
            <strong>Alberto Mateus</strong>
            <small>Portfolio OS</small>
          </span>
        </a>
        <nav className="sidebar-nav" aria-label="Catálogo">
          <a href="#">
            <HomeIcon aria-hidden="true" />
            {content.backHome}
          </a>
          <a href="#catalogo" className="active">
            <LayoutGrid aria-hidden="true" />
            {content.catalog}
          </a>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            <Github aria-hidden="true" />
            GitHub
          </a>
        </nav>
        <div className="sidebar-card">
          <ShieldCheck aria-hidden="true" />
          <strong>{visible.length} {content.results}</strong>
          <span>{locale === 'pt' ? 'Filtrados em tempo real no inventário público.' : 'Filtered in real time from the public inventory.'}</span>
        </div>
        <LanguageButton locale={locale} setLocale={setLocale} />
      </aside>

      <main className="catalog-main">
        <section className="catalog-hero" aria-labelledby="catalog-title">
          <div>
            <span className="section-kicker">REPOSITORY INTELLIGENCE</span>
            <h1 id="catalog-title">{content.catalogTitle}</h1>
            <p>{content.catalogLead}</p>
          </div>
          <div className="catalog-metrics">
            <article>
              <strong>{repositories.length}</strong>
              <span>total</span>
            </article>
            <article>
              <strong>{activeRepositories.length}</strong>
              <span>ativos</span>
            </article>
            <article>
              <strong>{demoRepositories.length}</strong>
              <span>demos</span>
            </article>
          </div>
        </section>

        <section className="catalog-controls" aria-label="Filtros do catálogo">
          <label className="search-control">
            <Search aria-hidden="true" />
            <input value={filters.query} onChange={(event) => setFilters((current) => ({ ...current, query: event.target.value }))} placeholder={content.search} />
          </label>
          <label className="select-control">
            <Boxes aria-hidden="true" />
            <select value={filters.family} onChange={(event) => setFilters((current) => ({ ...current, family: event.target.value as CatalogFilters['family'] }))} aria-label={content.allFamilies}>
              <option value="todas">{content.allFamilies}</option>
              {familyOrder.map((family) => (
                <option value={family} key={family}>{familyNames[locale][family]}</option>
              ))}
            </select>
          </label>
          <label className="select-control">
            <Code2 aria-hidden="true" />
            <select value={filters.language} onChange={(event) => setFilters((current) => ({ ...current, language: event.target.value }))} aria-label={content.allLanguages}>
              <option value="">{content.allLanguages}</option>
              {languages.map((language) => (
                <option value={language} key={language}>{language}</option>
              ))}
            </select>
          </label>
          <label className="select-control">
            <ScanSearch aria-hidden="true" />
            <select value={filters.signal} onChange={(event) => setFilters((current) => ({ ...current, signal: event.target.value }))} aria-label={content.allSignals}>
              <option value="">{content.allSignals}</option>
              {signals.map((signal) => (
                <option value={signal} key={signal}>{signal}</option>
              ))}
            </select>
          </label>
          <label className="select-control">
            <CircleDot aria-hidden="true" />
            <select value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value as CatalogFilters['status'] }))} aria-label="Status">
              {(['todos', 'ativos', 'arquivados', 'forks'] as const).map((status) => (
                <option value={status} key={status}>{content.status[status]}</option>
              ))}
            </select>
          </label>
          <label className="toggle-control">
            <input type="checkbox" checked={filters.demoOnly} onChange={(event) => setFilters((current) => ({ ...current, demoOnly: event.target.checked }))} />
            <span>{content.demoOnly}</span>
          </label>
        </section>

        <section className="catalog-results" aria-live="polite">
          <div className="catalog-results-head">
            <strong>{visible.length} {content.results}</strong>
            <span>{locale === 'pt' ? 'agrupados por frente de atuação' : 'grouped by operating front'}</span>
          </div>
          <div className="catalog-grid-shell">
            <div className="catalog-groups">
              {groups.length ? groups.map((group) => (
                <section className="catalog-group" key={group.family}>
                  <header>
                    <h2>{familyNames[locale][group.family]}</h2>
                    <span>{group.repos.length}</span>
                  </header>
                  <div className="catalog-repo-list">
                    {group.repos.map((repo) => (
                      <article className="catalog-row" key={repo.name}>
                        <div className="repo-index-icon" aria-hidden="true">{repo.code || repo.name.slice(0, 2).toUpperCase()}</div>
                        <div className="catalog-row-copy">
                          <h3>{repo.name}</h3>
                          <p>{repo.summary[locale]}</p>
                          <div className="repo-badges">
                            {badges(repo, locale).slice(0, 6).map((badge) => (
                              <span key={badge}>{badge}</span>
                            ))}
                          </div>
                        </div>
                        <RepositoryActions repo={repo} locale={locale} />
                      </article>
                    ))}
                  </div>
                </section>
              )) : <p className="empty">{content.empty}</p>}
            </div>
            <CatalogLegend locale={locale} />
          </div>
        </section>
      </main>
    </div>
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
      {view === 'catalogo' ? <CatalogView locale={locale} setLocale={setLocale} /> : (
        <>
          <SiteHeader locale={locale} setLocale={setLocale} />
          <HomeView locale={locale} />
        </>
      )}
    </div>
  );
}
