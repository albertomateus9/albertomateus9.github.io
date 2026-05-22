import {
  ArrowRight,
  BookOpen,
  Boxes,
  BrainCircuit,
  CircleDot,
  Code2,
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
import { caseStudies, technologyRadar } from './data/portfolio';
import { enrichRepository, filterRepositories, sortRepositories } from './lib/catalog';
import type {
  CatalogFilters,
  Locale,
  PortfolioCaseStudy,
  PortfolioRepository,
  RepositoryFamily,
  RepositorySnapshot,
} from './types';

const lattesUrl = 'http://lattes.cnpq.br/1831130831245161';
const githubUrl = 'https://github.com/albertomateus9';

const copy = {
  pt: {
    nav: [
      ['Sobre', '#sobre'],
      ['Casos', '#casos'],
      ['Projetos', '#projetos'],
      ['Pesquisa', '#pesquisa'],
      ['Aulas', '#aulas'],
      ['Trajetória', '#trajetoria'],
    ],
    catalog: 'Catálogo',
    language: 'English',
    heroTitle: (
      <>
        Engenharia, visão
        <br />
        e ensino <em>em operação.</em>
      </>
    ),
    heroBody:
      'Engenheiro de Telecomunicações, pesquisador em Visão Computacional e educador STEAM em Belém, Pará.',
    heroCta: 'Ver projetos',
    trajectoryCta: 'Trajetória',
    signal: 'Belém, Pará, Brasil',
    rail: 'Projetos em destaque',
    heroSignals: [
      ['Rede', 'Automação, monitoramento e enlaces reais.'],
      ['Visão', 'Pesquisa aplicada e protótipos leves.'],
      ['Aula', 'Laboratórios, jogos e autoria técnica.'],
    ],
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
    casesTitle: 'Casos em foco',
    casesBody:
      'Cada caso conecta problema, arquitetura, stack e resultado para mostrar competência além do volume de repositórios.',
    caseLabels: {
      problem: 'Problema',
      architecture: 'Arquitetura',
      stack: 'Stack',
      result: 'Resultado',
      next: 'Próximo passo',
    },
    radarTitle: 'Radar técnico',
    radarBody:
      'Sinais públicos do mercado orientam a curadoria; projetos reais sustentam o que aparece como experiência.',
    tracksTitle: 'Lotes e trilhas',
    tracks: [
      ['Telecom + Visão', 'MVPs de enlace, OCR leve, telemetria e benchmarking local.'],
      ['EETEPA aplicada', 'Apps de redes, maker, dados, inventário e segurança para sala/lab.'],
      ['Ciência de Dados', '20 repositórios Python/Jupyter com amostras seguras e narrativa didática.'],
      ['Aulas lúdicas', 'Missões Web para equipes, professor, placar e evidências exportáveis.'],
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
    catalogTitle: 'Catálogo técnico',
    catalogBody:
      'Observatório filtrável dos repositórios públicos, com contexto para produtos, laboratórios, pesquisa e colaborações.',
    search: 'Buscar por projeto, tema ou tecnologia',
    allFamilies: 'Todas as trilhas',
    allLanguages: 'Todas as linguagens',
    allSignals: 'Todas as tecnologias',
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
    legendTitle: 'Legenda de trilhas',
    legend: [
      ['Vitrine', 'Produtos e ferramentas com aplicação profissional.'],
      ['Laboratórios', 'Projetos educacionais com dados seguros.'],
      ['Pesquisa', 'Protótipos e estudos de IA aplicada.'],
      ['Colaborações', 'Hackathons, turmas e trabalho em equipe.'],
    ],
    empty: 'Nenhum repositório atende aos filtros atuais.',
    contactTitle: 'Contato público',
    contactBody: 'Para acompanhar meu trabalho público, use GitHub e Currículo Lattes.',
  },
  en: {
    nav: [
      ['About', '#sobre'],
      ['Cases', '#casos'],
      ['Projects', '#projetos'],
      ['Research', '#pesquisa'],
      ['Classes', '#aulas'],
      ['Trajectory', '#trajetoria'],
    ],
    catalog: 'Catalog',
    language: 'Português',
    heroTitle: (
      <>
        Engineering, vision,
        <br />
        and teaching <em>in operation.</em>
      </>
    ),
    heroBody:
      'Telecommunications engineer, Computer Vision researcher, and STEAM educator in Belem, Para, Brazil.',
    heroCta: 'View projects',
    trajectoryCta: 'Trajectory',
    signal: 'Belem, Para, Brazil',
    rail: 'Featured projects',
    heroSignals: [
      ['Network', 'Automation, monitoring, and real links.'],
      ['Vision', 'Applied research and lightweight prototypes.'],
      ['Class', 'Labs, games, and technical authorship.'],
    ],
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
    casesTitle: 'Cases in focus',
    casesBody:
      'Each case links problem, architecture, stack, and result to show competence beyond repository volume.',
    caseLabels: {
      problem: 'Problem',
      architecture: 'Architecture',
      stack: 'Stack',
      result: 'Result',
      next: 'Next step',
    },
    radarTitle: 'Technical radar',
    radarBody:
      'Public market signals guide curation; real projects support what appears as experience.',
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
    catalogTitle: 'Technical catalog',
    catalogBody:
      'A filterable observatory for public repositories with context for products, labs, research, and collaborations.',
    search: 'Search by project, theme, or technology',
    allFamilies: 'All tracks',
    allLanguages: 'All languages',
    allSignals: 'All technologies',
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
    legendTitle: 'Track legend',
    legend: [
      ['Showcase', 'Products and tools with professional application.'],
      ['Labs', 'Educational projects with safe data.'],
      ['Research', 'Applied AI prototypes and studies.'],
      ['Collaborations', 'Hackathons, classes, and teamwork.'],
    ],
    empty: 'No repository matches the current filters.',
    contactTitle: 'Public contact',
    contactBody: 'Follow my public work through GitHub and the Lattes curriculum.',
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
      {copy[locale].language}
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
        {content.nav.map(([item, href]) => (
          <a href={href} key={item}>
            {item}
          </a>
        ))}
      </nav>
      <a className="catalog-link" href="#catalogo">
        {content.catalog}
      </a>
      <LanguageToggle locale={locale} onToggle={onToggle} />
    </header>
  );
}

function PortraitStage() {
  return (
    <figure className="portrait-stage">
      <span className="portrait-grid" aria-hidden="true" />
      <img
        src="/assets/alberto-mateus-portrait-real-cutout.webp"
        alt="Retrato profissional de Alberto Mateus."
        width="847"
        height="974"
      />
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
        {content.openRepo}
      </TextLink>
      {repo.demo ? (
        <TextLink href={repo.demo}>
          <ExternalLink aria-hidden="true" />
          {content.openDemo}
        </TextLink>
      ) : null}
    </div>
  );
}

function HeroConsole({ locale }: { locale: Locale }) {
  const railRepos = repositories.filter((repo) => repo.featured).slice(0, 4);
  const content = copy[locale];

  return (
    <aside className="hero-console" aria-label={content.rail}>
      <div className="signal-stack">
        {content.heroSignals.map(([title, body]) => (
          <article key={title}>
            <CircleDot aria-hidden="true" />
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <div className="hero-rail">
        <h2>{content.rail}</h2>
        {railRepos.map((repo) => (
          <TextLink href={repo.htmlUrl} className="rail-row" key={repo.name}>
            <span>{repo.name}</span>
            <small>{familyNames[locale][repo.family]}</small>
          </TextLink>
        ))}
        <a className="rail-catalog" href="#catalogo">
          {content.openCatalog}
          <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}

function CaseVisual({ visual }: { visual: PortfolioCaseStudy['visual'] }) {
  return (
    <div className={`case-visual case-visual-${visual}`} aria-hidden="true">
      {visual === 'webcraft' ? (
        <>
          <code>&lt;main&gt;</code>
          <b>missao_web()</b>
          <span />
          <em>preview</em>
        </>
      ) : null}
      {visual === 'network' ? (
        <>
          <b>SNMP</b>
          <i />
          <span />
          <em>alerta</em>
        </>
      ) : null}
      {visual === 'vision' ? (
        <>
          <b>frame</b>
          <i />
          <span />
          <em>latência</em>
        </>
      ) : null}
    </div>
  );
}

function CaseStudyCard({
  study,
  repo,
  locale,
  primary,
}: {
  study: PortfolioCaseStudy;
  repo: PortfolioRepository;
  locale: Locale;
  primary?: boolean;
}) {
  const labels = copy[locale].caseLabels;

  return (
    <article className={`case-study${primary ? ' primary' : ''}`}>
      <CaseVisual visual={study.visual} />
      <div className="case-copy">
        <h3>{study.title[locale]}</h3>
        <p className="case-summary">{study.summary[locale]}</p>
        <dl>
          <div>
            <dt>{labels.problem}</dt>
            <dd>{study.problem[locale]}</dd>
          </div>
          <div>
            <dt>{labels.architecture}</dt>
            <dd>{study.architecture[locale]}</dd>
          </div>
          {primary ? (
            <>
              <div>
                <dt>{labels.result}</dt>
                <dd>{study.result[locale]}</dd>
              </div>
              <div>
                <dt>{labels.next}</dt>
                <dd>{study.next[locale]}</dd>
              </div>
            </>
          ) : null}
        </dl>
        <div className="case-stack" aria-label={labels.stack}>
          {study.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <RepositoryActions repo={repo} locale={locale} />
    </article>
  );
}

function RadarPanel({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <aside className="radar-panel" aria-labelledby="radar-title">
      <div className="radar-head">
        <Code2 aria-hidden="true" />
        <h3 id="radar-title">{content.radarTitle}</h3>
        <p>{content.radarBody}</p>
      </div>
      <div className="radar-screen" aria-hidden="true">
        <span />
        <i />
      </div>
      {technologyRadar.map((band) => (
        <section className={`radar-band ${band.tone}`} key={band.title.pt}>
          <h4>{band.title[locale]}</h4>
          <p>{band.body[locale]}</p>
          <div>
            {band.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
      ))}
    </aside>
  );
}

function CaseStudies({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const studies = caseStudies
    .map((study) => ({ study, repo: repositories.find((repo) => repo.name === study.repository) }))
    .filter((entry): entry is { study: PortfolioCaseStudy; repo: PortfolioRepository } => Boolean(entry.repo));

  return (
    <section className="cases" id="casos" aria-labelledby="cases-title">
      <div className="section-lead case-lead">
        <h2 id="cases-title">{content.casesTitle}</h2>
        <p>{content.casesBody}</p>
      </div>
      <div className="case-board">
        {studies[0] ? <CaseStudyCard study={studies[0].study} repo={studies[0].repo} locale={locale} primary /> : null}
        <div className="case-rail">
          {studies.slice(1).map(({ study, repo }) => (
            <CaseStudyCard study={study} repo={repo} locale={locale} key={study.repository} />
          ))}
        </div>
      </div>
      <RadarPanel locale={locale} />
    </section>
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
            <h1>{content.heroTitle}</h1>
            <p className="hero-body">{content.heroBody}</p>
            <p className="location">
              <MapPin aria-hidden="true" />
              {content.signal}
            </p>
            <div className="hero-actions">
              <a href="#projetos" className="primary-action">
                {content.heroCta}
                <ArrowRight aria-hidden="true" />
              </a>
              <a href="#trajetoria" className="secondary-action">
                {content.trajectoryCta}
              </a>
            </div>
          </div>
          <PortraitStage />
          <HeroConsole locale={locale} />
        </section>

        <section className="pillars" aria-labelledby="pillars-title">
          <h2 id="pillars-title">{content.pillarsTitle}</h2>
          <div className="pillar-band">
            {content.pillars.map((pillar, index) => {
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

        <CaseStudies locale={locale} />

        <section className="projects-section" id="projetos" aria-labelledby="projects-title">
          <div className="section-lead">
            <h2 id="projects-title">{content.featuredTitle}</h2>
            <p>{content.featuredBody}</p>
          </div>
          {webcraft ? (
            <article className="flagship">
              <div>
                <p>{content.flagship}</p>
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
            {content.openCatalog}
            <ArrowRight aria-hidden="true" />
          </a>
        </section>

        <section className="tracks" id="aulas" aria-labelledby="tracks-title">
          <h2 id="tracks-title">{content.tracksTitle}</h2>
          {content.tracks.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </section>

        <section className="trajectory" id="trajetoria" aria-labelledby="trajectory-title">
          <div className="timeline">
            <h2 id="trajectory-title">{content.timelineTitle}</h2>
            {content.timeline.map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="research-education">
            <article id="pesquisa" className="research">
              <BrainCircuit aria-hidden="true" />
              <h2>{content.researchTitle}</h2>
              <p>{content.researchBody}</p>
              <div className="vision-frame" aria-hidden="true">
                <span>frame_vision()</span>
                <i />
                <b />
              </div>
            </article>
            <article className="education">
              <BookOpen aria-hidden="true" />
              <h2>{content.educationTitle}</h2>
              <p>{content.educationBody}</p>
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
            <h2 id="resume-title">{content.resumeTitle}</h2>
            <p>{content.resumeBody}</p>
          </div>
          <div>
            <p>{content.dataPolicy}</p>
            <TextLink href={lattesUrl} className="lattes-link">
              {content.lattes}
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
    repo.archived ? content.archived : '',
    repo.fork ? content.fork : '',
    repo.family === 'colaboracoes' ? content.collaboration : '',
    repo.demo ? 'Demo' : '',
    repo.language,
  ].filter(Boolean);
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

function groupRepositories(visible: PortfolioRepository[]) {
  return familyOrder
    .map((family) => ({ family, repos: visible.filter((repo) => repo.family === family) }))
    .filter((group) => group.repos.length);
}

function CatalogLegend({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <aside className="catalog-legend" aria-label={content.legendTitle}>
      <h2>{content.legendTitle}</h2>
      {content.legend.map(([title, body], index) => (
        <article key={title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </aside>
  );
}

function CatalogView({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const [filters, setFilters] = useState<CatalogFilters>({
    query: '',
    family: 'todas',
    demoOnly: false,
    language: '',
    signal: '',
    status: 'todos',
  });
  const languages = useMemo(
    () => [...new Set(repositories.map((repo) => repo.language).filter(Boolean))].sort(),
    [],
  );
  const signals = useMemo(signalOptions, []);
  const visible = useMemo(() => filterRepositories(repositories, filters), [filters]);
  const groups = useMemo(() => groupRepositories(visible), [visible]);

  return (
    <>
      <main className="catalog-page">
        <section className="catalog-intro">
          <a href="#" className="back-home">
            <ArrowRight aria-hidden="true" />
            {content.backHome}
          </a>
          <h1>{content.catalogTitle}</h1>
          <p>{content.catalogBody}</p>
        </section>
        <section className="catalog-controls" aria-label={content.catalogTitle}>
          <label className="search-control">
            <Search aria-hidden="true" />
            <span className="sr-only">{content.search}</span>
            <input
              value={filters.query}
              onChange={(event) => setFilters((current) => ({ ...current, query: event.target.value }))}
              placeholder={content.search}
            />
          </label>
          <select
            aria-label={content.allFamilies}
            value={filters.family}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                family: event.target.value as CatalogFilters['family'],
              }))
            }
          >
            <option value="todas">{content.allFamilies}</option>
            {familyOrder.map((family) => (
              <option value={family} key={family}>
                {familyNames[locale][family]}
              </option>
            ))}
          </select>
          <select
            aria-label={content.allLanguages}
            value={filters.language}
            onChange={(event) => setFilters((current) => ({ ...current, language: event.target.value }))}
          >
            <option value="">{content.allLanguages}</option>
            {languages.map((language) => (
              <option value={language} key={language}>
                {language}
              </option>
            ))}
          </select>
          <select
            aria-label={content.allSignals}
            value={filters.signal}
            onChange={(event) => setFilters((current) => ({ ...current, signal: event.target.value }))}
          >
            <option value="">{content.allSignals}</option>
            {signals.map((signal) => (
              <option value={signal} key={signal}>
                {signal}
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
                {content.status[status]}
              </button>
            ))}
          </div>
          <label className="demo-control">
            <input
              type="checkbox"
              checked={filters.demoOnly}
              onChange={(event) => setFilters((current) => ({ ...current, demoOnly: event.target.checked }))}
            />
            {content.demoOnly}
          </label>
        </section>
        <section className="catalog-results" aria-live="polite">
          <p className="result-count">
            {visible.length} {content.results}
          </p>
          <div className="catalog-observatory">
            {groups.length ? (
              <div className="repo-groups">
                {groups.map((group) => (
                  <section className="repo-group" key={group.family}>
                    <div className="group-head">
                      <span />
                      <h2>{familyNames[locale][group.family]}</h2>
                      <small>{group.repos.length}</small>
                    </div>
                    {group.repos.map((repo) => (
                      <article className="catalog-row" key={repo.name}>
                        <div className="repo-index">
                          <time dateTime={repo.updatedAt}>{repo.updatedAt.slice(0, 10)}</time>
                          {repo.demo ? <em>demo</em> : null}
                        </div>
                        <div className="repo-copy">
                          <h3>{repo.name}</h3>
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
                  </section>
                ))}
              </div>
            ) : (
              <p className="empty">{content.empty}</p>
            )}
            <CatalogLegend locale={locale} />
          </div>
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
        <h2>{content.contactTitle}</h2>
        <p>{content.contactBody}</p>
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
