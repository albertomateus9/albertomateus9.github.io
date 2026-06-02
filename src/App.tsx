import {
  Archive,
  ArrowRight,
  BookOpen,
  Boxes,
  BrainCircuit,
  Briefcase,
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
  Play,
  ScanSearch,
  Search,
  Settings,
  Sparkles,
  Terminal,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import snapshots from './data/github-repositories.json';
import { curatedRepositories, familyOrder } from './data/curation';
import { caseStudies, technologyRadar, educationHistory, experienceHistory, publicationList, hardSkillsList, softSkillsList } from './data/portfolio';
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
const linkedinUrl = 'https://www.linkedin.com/in/alberto-mateus-10b858146';
const emailUrl = 'mailto:albertomateus9@yahoo.com';

const copy = {
  pt: {
    nav: [
      ['Início', '#sobre'],
      ['Projetos', '#projetos'],
      ['Automação', '#skills'],
      ['Educação', '#aulas'],
      ['Trajetória', '#trajetoria'],
      ['Contato', '#contato'],
    ],
    catalog: 'Catálogo',
    language: 'English',
    heroTitle: (
      <>
        Alberto Mateus
        <br />
        <span className="hero-midtext">AI Product Developer & Engenheiro</span>
        <br />
        <span className="hero-highlight">Mestre & Doutorando em IA<span className="red-dot">.</span></span>
      </>
    ),
    heroBody:
      'Engenheiro, professor universitário, pesquisador em Inteligência Artificial (doutorando) e especialista em Redes e Gestão de TI. Desenvolvo produtos de IA e soluções de alta performance integrando React, bancos Supabase, fluxos de automação n8n/Make e engenharia de software assistida por IA (Claude Code, ChatGPT) para acelerar a entrega de valor de negócio.',
    heroCta: 'Ver projetos',
    trajectoryCta: 'Trajetória',
    signal: 'Belém, Pará, Brasil',
    rail: 'Projetos em destaque',
    heroSignals: [
      ['React + IA', 'Código ágil e interfaces inteligentes.'],
      ['Automações', 'APIs, webhooks e orquestrações n8n.'],
      ['Prototipagem', 'Criação de MVPs e soluções simples.'],
    ],
    pillarsTitle: 'Três frentes de entrega rápida',
    pillars: [
      {
        title: 'Desenvolvimento React',
        body: 'Criação de interfaces web modernas em React e TypeScript com foco em usabilidade, performance e deploy ágil.',
      },
      {
        title: 'Automações & APIs',
        body: 'Integração de formulários, CRMs, bancos de dados (Supabase) e fluxos automatizados com n8n, Make e webhooks.',
      },
      {
        title: 'Engenharia de Prompts & IA',
        body: 'Uso estratégico de IAs como Claude Code e ChatGPT para acelerar entregas, testar MVPs e criar soluções funcionais.',
      },
    ],
    featuredTitle: 'Projetos que unem código e automação',
    featuredBody:
      'A vitrine exibe MVPs, demos e laboratórios operacionais. O catálogo abre o restante do GitHub com contexto técnico.',
    openCatalog: 'Explorar catálogo completo',
    openRepo: 'Repositório',
    openDemo: 'Demo',
    flagship: 'Projeto destaque',
    casesTitle: 'Casos em foco',
    casesBody:
      'Cada caso documenta o problema de negócio, arquitetura proposta, stack selecionado e o resultado prático entregue.',
    caseLabels: {
      problem: 'Problema',
      architecture: 'Arquitetura',
      stack: 'Stack',
      result: 'Resultado',
      next: 'Próximo passo',
    },
    radarTitle: 'Radar técnico',
    radarBody:
      'Sinais práticos de mercado que orientam minhas implementações; projetos reais comprovam o conhecimento das stacks.',
    tracksTitle: 'Trilhas & Automações',
    tracks: [
      ['React + APIs', 'Interfaces responsivas de alto nível integradas a backends serverless.'],
      ['Automação n8n', 'Fluxos de webhooks, enriquecimento de leads e processamento por IA.'],
      ['Prototipagem Rápida', 'Criação de MVPs funcionais para validação de hipóteses de negócio.'],
      ['Educação STEAM', 'Laboratórios interativos e jogos educacionais para o ensino de programação.'],
    ],
    timelineTitle: 'Trajetória',
    timeline: [
      ['Front-End & IA', 'Desenvolvimento acelerado de MVPs e interfaces web com suporte de IA.'],
      ['Automações', 'Orquestração de dados, conexões de APIs e webhooks em infraestrutura pública.'],
      ['Didática & P&D', 'Ensino de programação, robótica maker e modelagem computacional na UFPA.'],
    ],
    cvTabs: {
      timeline: 'Pilares',
      experience: 'Experiência',
      education: 'Formação',
      publications: 'Publicações',
    },
    pubTypes: {
      article: 'Artigo',
      chapter: 'Capítulo de Livro',
      proceeding: 'Trabalho em Congresso',
    },
    researchTitle: 'Engenharia de Prompt',
    researchBody:
      'Pesquisa prática e aplicação de prompts estruturados, orquestração de agentes autônomos e automação de desenvolvimento para entregas de software de alta performance.',
    educationTitle: 'Autoria Maker',
    educationBody:
      'Criação de laboratórios interativos na web e ambientes didáticos gamificados para o ensino rápido de programação, redes e no-code.',
    resumeTitle: 'Resumo executivo',
    resumeBody:
      'Mestre em Engenharia Elétrica, doutorando em IA aplicada, Engenheiro de Telecomunicações e Tecnólogo em Análise e Desenvolvimento de Sistemas. Especialista em juntar ferramentas de IA, no-code, low-code e React para construir produtos viáveis rapidamente.',
    dataPolicy:
      'Os projetos usam dados sintéticos ou bases públicas anonimizadas. Arquivos e informações corporativas sensíveis permanecem sob rígido sigilo de desenvolvimento.',
    lattes: 'Ver Lattes',
    catalogTitle: 'Catálogo de soluções',
    catalogBody:
      'Inventário completo de repositórios públicos, detalhando tecnologias, status e propostas de cada código.',
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
    contactTitle: 'Contato',
    contactBody: 'Acompanhe minhas entregas, automações e histórico profissional.',
    skillsTitle: 'Habilidades & Evidências',
    skillsSubtitle: 'Métricas reais de proficiência com comprovações diretas nos repositórios e produtos do portfólio.',
    hardSkillsTitle: 'Hard Skills // Tecnologias & Desenvolvimento',
    softSkillsTitle: 'Soft Skills // Metodologia & Negócio',
    skillsEvidence: 'Evidência',
  },
  en: {
    nav: [
      ['Home', '#sobre'],
      ['Projects', '#projetos'],
      ['Automation', '#skills'],
      ['Education', '#aulas'],
      ['Trajectory', '#trajetoria'],
      ['Contact', '#contato'],
    ],
    catalog: 'Catalog',
    language: 'Português',
    heroTitle: (
      <>
        Alberto Mateus
        <br />
        <span className="hero-midtext">AI Product Developer & Engineer</span>
        <br />
        <span className="hero-highlight">M.Sc. & PhD Candidate in AI<span className="red-dot">.</span></span>
      </>
    ),
    heroBody:
      'Engineer, university professor, researcher in Artificial Intelligence (PhD candidate), and specialist in Structured Networks and IT Management. I build high-performance AI products and digital solutions by integrating React, Supabase, n8n/Make automation, and AI-assisted software engineering (Claude Code, ChatGPT) to drive business value.',
    heroCta: 'View projects',
    trajectoryCta: 'Trajectory',
    signal: 'Belem, Para, Brazil',
    rail: 'Featured projects',
    heroSignals: [
      ['React + AI', 'Agile code and smart interfaces.'],
      ['Automations', 'APIs, webhooks, and n8n orchestration.'],
      ['Prototyping', 'Lean MVPs and simple solutions.'],
    ],
    pillarsTitle: 'Three pillars of fast delivery',
    pillars: [
      {
        title: 'React Development',
        body: 'Building modern web interfaces in React and TypeScript with a strong focus on usability, performance, and fast deployments.',
      },
      {
        title: 'Automations & APIs',
        body: 'Integrating forms, CRMs, databases (Supabase), and automated workflows using n8n, Make, and webhooks.',
      },
      {
        title: 'Prompt Engineering & AI',
        body: 'Strategic use of AI platforms like Claude Code and ChatGPT to speed up development cycles, test MVPs, and deliver working solutions.',
      },
    ],
    featuredTitle: 'Projects joining code and automation',
    featuredBody:
      'The showcase exhibits MVPs, demos, and operational labs. The catalog opens the rest of GitHub with technical context.',
    openCatalog: 'Explore full catalog',
    openRepo: 'Repository',
    openDemo: 'Demo',
    flagship: 'Featured project',
    casesTitle: 'Cases in focus',
    casesBody:
      'Each case documents the business problem, proposed architecture, selected stack, and the practical result delivered.',
    caseLabels: {
      problem: 'Problem',
      architecture: 'Architecture',
      stack: 'Stack',
      result: 'Result',
      next: 'Next step',
    },
    radarTitle: 'Technical radar',
    radarBody:
      'Practical market signals that guide my builds; real projects prove hands-on knowledge of these stacks.',
    tracksTitle: 'Tracks & Automations',
    tracks: [
      ['React + APIs', 'High-level responsive interfaces integrated with serverless backends.'],
      ['n8n Automation', 'Webhooks flows, lead enrichment, and AI processing pipelines.'],
      ['Rapid Prototyping', 'Building functional MVPs to validate business hypotheses.'],
      ['STEAM Education', 'Interactive labs and educational games for teaching coding.'],
    ],
    timelineTitle: 'Trajectory',
    timeline: [
      ['Front-End & AI', 'Accelerated development of MVPs and web interfaces with AI support.'],
      ['Automations', 'Data orchestration, API connections, and webhooks in public infrastructure.'],
      ['Didactics & R&D', 'Teaching programming, maker robotics, and computational modeling at UFPA.'],
    ],
    cvTabs: {
      timeline: 'Pillars',
      experience: 'Experience',
      education: 'Education',
      publications: 'Publications',
    },
    pubTypes: {
      article: 'Article',
      chapter: 'Book Chapter',
      proceeding: 'Conference Paper',
    },
    researchTitle: 'Prompt Engineering',
    researchBody:
      'Practical research and application of structured prompts, autonomous agent orchestration, and development automation for high-performance software delivery.',
    educationTitle: 'Maker Authorship',
    educationBody:
      'Building interactive web labs and gamified environments for accelerated teaching of coding, networking, and no-code.',
    resumeTitle: 'Executive summary',
    resumeBody:
      'M.Sc. in Electrical Engineering, PhD candidate in applied AI, Telecommunications Engineer, and Systems Analysis technologist. Expert in linking AI tools, no-code, low-code, and React to build viable products quickly.',
    dataPolicy:
      'Projects use synthetic data or anonymized public sets. Sensitive corporate files and data remain strictly confidential under NDA.',
    lattes: 'Open Lattes',
    catalogTitle: 'Solutions catalog',
    catalogBody:
      'Complete inventory of public repositories, detailing technologies, status, and the goal of each codebase.',
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
    contactTitle: 'Contact',
    contactBody: 'Follow my deliveries, automations, and professional background.',
    skillsTitle: 'Skills & Evidences',
    skillsSubtitle: 'Real proficiency metrics with direct evidence verified in repositories and portfolio products.',
    hardSkillsTitle: 'Hard Skills // Technologies & Development',
    softSkillsTitle: 'Soft Skills // Methodology & Business',
    skillsEvidence: 'Evidence',
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

function LanguageSelector({ locale, onChange }: { locale: Locale; onChange: (l: Locale) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="language-dropdown" onMouseLeave={() => setIsOpen(false)}>
      <button 
        className="language-toggle" 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <Globe2 aria-hidden="true" />
        <span>{locale === 'pt' ? 'PT-BR' : 'EN'}</span>
        <span className="dropdown-arrow">▼</span>
      </button>
      {isOpen && (
        <div className="language-menu">
          <button 
            type="button" 
            className={locale === 'pt' ? 'active' : ''} 
            onClick={() => { onChange('pt'); setIsOpen(false); }}
          >
            PT-BR
          </button>
          <button 
            type="button" 
            className={locale === 'en' ? 'active' : ''} 
            onClick={() => { onChange('en'); setIsOpen(false); }}
          >
            EN
          </button>
        </div>
      )}
    </div>
  );
}

function SiteHeader({ locale, setLocale }: { locale: Locale; setLocale: (l: Locale) => void }) {
  const content = copy[locale];

  return (
    <header className="site-header">
      <a className="brand" href="#" aria-label="Alberto Mateus">
        <svg className="brand-hexagon" viewBox="0 0 100 100" aria-hidden="true">
          <polygon points="50,5 93,30 93,80 50,105 7,80 7,30" />
          <text x="50" y="65" textAnchor="middle">AM</text>
        </svg>
        <div className="brand-text">
          <span className="brand-name">Alberto Mateus</span>
          <span className="brand-subtitle">{locale === 'pt' ? 'Engenharia que conecta • Visão que transforma • Ensino que inspira' : 'Engineering that connects • Vision that transforms • Teaching that inspires'}</span>
        </div>
      </a>
      <nav aria-label="Principal">
        {content.nav.map(([item, href]) => (
          <a href={href} key={item}>
            {item}
          </a>
        ))}
      </nav>
      <a className="catalog-link" href="#catalogo">
        <LayoutGrid className="grid-icon" aria-hidden="true" />
        {content.catalog}
      </a>
      <LanguageSelector locale={locale} onChange={setLocale} />
    </header>
  );
}

function PortraitStage({ locale }: { locale: Locale }) {
  return (
    <figure className="portrait-stage">
      <span className="portrait-grid" aria-hidden="true" />
      <img
        src="/assets/alberto-mateus-portrait-real-cutout.webp"
        alt="Retrato profissional de Alberto Mateus."
        width="847"
        height="974"
      />
      {/* HUD Camera Frame & Focus Brackets */}
      <div className="hud-camera-frame" aria-hidden="true">
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />
        
        {/* Blinking REC indicator and Camera info */}
        <div className="hud-camera-top">
          <div className="hud-rec">
            <span className="rec-dot" />
            <span>REC</span>
          </div>
          <div className="hud-cam-settings">
            <span>F2.8</span>
            <span>ISO 400</span>
            <span>1/60s</span>
          </div>
        </div>

        {/* Calibration Ticks on the left side */}
        <div className="hud-calibration-ticks">
          {[...Array(9)].map((_, i) => (
            <span key={i} className={`tick ${i === 4 ? 'major' : ''}`} />
          ))}
        </div>

        {/* HUD Data overlays */}
        <div className="hud-camera-bottom">
          <span className="hud-tag green">SYS: ACTIVE</span>
          <span className="hud-tag cyan">CALIB_2026_OK</span>
        </div>

        {/* Vertical text labels */}
        <div className="hud-vertical-label left">
          <span>ROTEAMENTO // GPON // METRO_ANEL</span>
        </div>
        <div className="hud-vertical-label right">
          <span>FIBRA ÓPTICA // ENLACES_REAIS</span>
        </div>
      </div>
      <figcaption>{locale === 'pt' ? 'Visão, redes e sala de aula em uma mesma engenharia.' : 'Vision, networks, and classroom in a single engineering.'}</figcaption>
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
  const content = copy[locale];
  
  return (
    <aside className="hero-hud-panels" aria-label="HUD Panels">
      {/* PANEL 1: REDE */}
      <section className="hud-panel rede-panel">
        <header className="hud-panel-header">
          <span className="panel-dot status-active" />
          <h3 className="panel-title">
            {locale === 'pt' ? 'REDE // TOPOLOGIA METROPOLITANA' : 'NETWORK // METROPOLITAN TOPOLOGY'}
          </h3>
          <span className="panel-id">[ID: 102.GPON]</span>
        </header>
        <div className="hud-panel-body">
          <svg viewBox="0 0 300 100" className="hud-svg" aria-hidden="true">
            {/* Grid background */}
            <defs>
              <pattern id="grid-net" width="12" height="12" patternUnits="userSpaceOnUse">
                <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(191, 163, 111, 0.04)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-net)" />
            
            {/* Fiber Ring Backbone */}
            <path d="M 30,50 Q 80,15 150,15 T 270,50 Q 220,85 150,85 Z" fill="none" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M 30,50 Q 80,15 150,15" fill="none" stroke="var(--green)" strokeWidth="1.5" />
            <path d="M 150,15 Q 220,15 270,50" fill="none" stroke="var(--cyan)" strokeWidth="1" />
            
            {/* OLT Central Hub */}
            <g transform="translate(30, 50)">
              <circle r="7" fill="var(--bg)" stroke="var(--coral)" strokeWidth="1.5" />
              <circle r="2.5" fill="var(--coral)" />
              <circle r="11" fill="none" stroke="var(--coral)" strokeWidth="0.5" strokeDasharray="2 2" className="hud-rotate" />
            </g>
            <text x="30" y="36" fontSize="7" fill="var(--coral)" textAnchor="middle" fontFamily="monospace" fontWeight="bold">OLT_METRO</text>
            
            {/* Splitter Node */}
            <g transform="translate(150, 15)">
              <rect x="-10" y="-6" width="20" height="12" fill="var(--bg)" stroke="var(--green)" strokeWidth="1.5" rx="2" />
              <text x="0" y="3" fontSize="6.5" fill="var(--green)" textAnchor="middle" fontFamily="monospace" fontWeight="bold">1:8</text>
            </g>
            <text x="150" y="27" fontSize="7" fill="var(--green)" textAnchor="middle" fontFamily="monospace">SPLITTER_GPON</text>
            
            {/* Splitter connections to ONTs */}
            <path d="M 160,15 L 210,35" stroke="var(--green)" strokeWidth="0.75" />
            <path d="M 160,15 L 220,20" stroke="var(--green)" strokeWidth="0.75" strokeDasharray="2 1" />
            <path d="M 160,15 L 205,5" stroke="var(--green)" strokeWidth="0.5" strokeDasharray="1 2" />
            
            <g transform="translate(210, 35)">
              <circle r="4" fill="var(--bg)" stroke="var(--green)" strokeWidth="1" />
              <text x="8" y="2" fontSize="6.5" fill="var(--paper-muted)" fontFamily="monospace">ONT_01</text>
            </g>
            
            {/* Switch Core Node */}
            <g transform="translate(270, 50)">
              <circle r="7" fill="var(--bg)" stroke="var(--cyan)" strokeWidth="1.5" />
              <line x1="-4" y1="0" x2="4" y2="0" stroke="var(--cyan)" strokeWidth="1" />
              <line x1="0" y1="-4" x2="0" y2="4" stroke="var(--cyan)" strokeWidth="1" />
            </g>
            <text x="270" y="36" fontSize="7" fill="var(--cyan)" textAnchor="middle" fontFamily="monospace" fontWeight="bold">SW_CORE</text>
            
            {/* Metro Loop node */}
            <g transform="translate(150, 85)">
              <circle r="5" fill="var(--bg)" stroke="var(--paper-muted)" strokeWidth="1.2" />
              <circle cx="150" cy="85" r="10" fill="none" stroke="var(--paper-muted)" strokeWidth="0.5" className="hud-pulse" />
            </g>
            <text x="150" y="78" fontSize="7" fill="var(--paper-muted)" textAnchor="middle" fontFamily="monospace">
              {locale === 'pt' ? 'ANEL_METRO' : 'METRO_LOOP'}
            </text>
            
            {/* Specs */}
            <text x="85" y="46" fontSize="6.5" fill="var(--paper-muted)" fontFamily="monospace" opacity="0.8">λ: 1490nm</text>
            <text x="85" y="55" fontSize="6.5" fill="var(--green)" fontFamily="monospace" fontWeight="bold">P_TX: +2.5 dBm</text>
            <text x="195" y="75" fontSize="6.5" fill="var(--cyan)" fontFamily="monospace" fontWeight="bold">P_RX: -18.5 dBm</text>
            
            {/* Decorative corners */}
            <path d="M 5 5 L 12 5 M 5 5 L 5 12" stroke="var(--green)" strokeWidth="0.75" opacity="0.4" />
            <path d="M 295 5 L 288 5 M 295 5 L 295 12" stroke="var(--green)" strokeWidth="0.75" opacity="0.4" />
            <path d="M 5 95 L 12 95 M 5 95 L 5 88" stroke="var(--green)" strokeWidth="0.75" opacity="0.4" />
            <path d="M 295 95 L 288 95 M 295 95 L 295 88" stroke="var(--green)" strokeWidth="0.75" opacity="0.4" />
          </svg>
        </div>
        <footer className="hud-panel-footer">
          <span>TX: 940 Mbps // RX: 880 Mbps</span>
          <span>SYS_STATUS: NOMINAL</span>
        </footer>
      </section>

      {/* PANEL 2: VISÃO */}
      <section className="hud-panel visao-panel">
        <header className="hud-panel-header">
          <span className="panel-dot status-active" />
          <h3 className="panel-title">
            {locale === 'pt' ? 'VISÃO // RECONHECIMENTO DE ESTRUTURA' : 'VISION // STRUCTURE RECOGNITION'}
          </h3>
          <span className="panel-id">[IA: FACE_MESH]</span>
        </header>
        <div className="hud-panel-body">
          <svg viewBox="0 0 300 100" className="hud-svg" aria-hidden="true">
            {/* Grid background */}
            <defs>
              <pattern id="grid-vision" width="12" height="12" patternUnits="userSpaceOnUse">
                <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(92, 225, 230, 0.04)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-vision)" />
            
            {/* Bounding box axes */}
            <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(92, 225, 230, 0.12)" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="150" y1="0" x2="150" y2="100" stroke="rgba(92, 225, 230, 0.12)" strokeWidth="0.5" strokeDasharray="4 4" />
            
            {/* Target Corners */}
            <path d="M 115,22 L 125,22 M 115,22 L 115,32" stroke="var(--cyan)" strokeWidth="1.5" />
            <path d="M 185,22 L 175,22 M 185,22 L 185,32" stroke="var(--cyan)" strokeWidth="1.5" />
            <path d="M 115,78 L 125,78 M 115,78 L 115,68" stroke="var(--cyan)" strokeWidth="1.5" />
            <path d="M 185,78 L 175,78 M 185,78 L 185,68" stroke="var(--cyan)" strokeWidth="1.5" />
            
            <text x="115" y="17" fontSize="5.5" fill="var(--cyan)" fontFamily="monospace">ROI [115, 22, 70, 56]</text>
            
            {/* Triangulated mesh */}
            <g transform="translate(150, 50)">
              {/* Outer mesh outline */}
              <polygon points="0,-33 16,-23 25,-7 23,17 0,29 -23,17 -25,-7 -16,-23" fill="none" stroke="rgba(92, 225, 230, 0.25)" strokeWidth="0.75" />
              <polygon points="0,-18 10,-13 16,-4 14,9 0,18 -14,9 -16,-4 -10,-13" fill="none" stroke="rgba(92, 225, 230, 0.15)" strokeWidth="0.5" />
              
              {/* Nose and eyes lines */}
              <line x1="0" y1="-18" x2="0" y2="4" stroke="var(--cyan)" strokeWidth="1" />
              <line x1="-7" y1="4" x2="7" y2="4" stroke="var(--cyan)" strokeWidth="1" />
              
              <polygon points="-10,-8 -3,-8 -7,-13" fill="none" stroke="var(--cyan)" strokeWidth="0.75" />
              <polygon points="3,-8 10,-8 7,-13" fill="none" stroke="var(--cyan)" strokeWidth="0.75" />
              
              {/* Mouth */}
              <polygon points="-8,12 0,9 8,12 0,15" fill="none" stroke="var(--coral)" strokeWidth="1" />
              
              {/* Connectors */}
              <line x1="-10" y1="-8" x2="-16" y2="-23" stroke="rgba(92, 225, 230, 0.15)" strokeWidth="0.5" />
              <line x1="10" y1="-8" x2="18" y2="-23" stroke="rgba(92, 225, 230, 0.15)" strokeWidth="0.5" />
              <line x1="-25" y1="-7" x2="-10" y2="-8" stroke="rgba(92, 225, 230, 0.15)" strokeWidth="0.5" />
              <line x1="25" y1="-7" x2="10" y2="-8" stroke="rgba(92, 225, 230, 0.15)" strokeWidth="0.5" />
              <line x1="-23" y1="17" x2="-8" y2="12" stroke="rgba(92, 225, 230, 0.15)" strokeWidth="0.5" />
              <line x1="23" y1="17" x2="8" y2="12" stroke="rgba(92, 225, 230, 0.15)" strokeWidth="0.5" />
              
              {/* Vertex points */}
              <circle cx="0" cy="-33" r="1.2" fill="var(--cyan)" />
              <circle cx="16" cy="-23" r="1.2" fill="var(--cyan)" />
              <circle cx="25" cy="-7" r="1.2" fill="var(--cyan)" />
              <circle cx="23" cy="17" r="1.2" fill="var(--cyan)" />
              <circle cx="0" cy="29" r="1.2" fill="var(--cyan)" />
              <circle cx="-23" cy="17" r="1.2" fill="var(--cyan)" />
              <circle cx="-25" cy="-7" r="1.2" fill="var(--cyan)" />
              <circle cx="-16" cy="-23" r="1.2" fill="var(--cyan)" />
            </g>
            
            {/* Animated scanning line */}
            <line x1="100" y1="22" x2="200" y2="22" stroke="rgba(255, 113, 91, 0.6)" strokeWidth="1" className="hud-pulse" style={{ animationDuration: '3.5s' }} />
            
            {/* Left statistics */}
            <text x="10" y="24" fontSize="7" fill="var(--cyan)" fontFamily="monospace" fontWeight="bold">MATCH: 99.2%</text>
            <text x="10" y="38" fontSize="6.5" fill="var(--paper-muted)" fontFamily="monospace">MODEL: FaceMesh_V2</text>
            <text x="10" y="52" fontSize="6.5" fill="var(--paper-muted)" fontFamily="monospace">FPS: 90 / LAT: 2.1ms</text>
            <text x="10" y="66" fontSize="6.5" fill="var(--paper-muted)" fontFamily="monospace">THRES: 0.85</text>
            <text x="10" y="80" fontSize="6.5" fill="var(--green)" fontFamily="monospace" fontWeight="bold">STATUS: ACTIVE</text>
            
            {/* Right statistics */}
            <text x="290" y="24" fontSize="7" fill="var(--coral)" textAnchor="end" fontFamily="monospace" fontWeight="bold">TRACK_ID: 104</text>
            <text x="290" y="38" fontSize="6.5" fill="var(--paper-muted)" textAnchor="end" fontFamily="monospace">PITCH: +12.4°</text>
            <text x="290" y="52" fontSize="6.5" fill="var(--paper-muted)" textAnchor="end" fontFamily="monospace">ROLL: -2.1°</text>
            <text x="290" y="66" fontSize="6.5" fill="var(--paper-muted)" textAnchor="end" fontFamily="monospace">YAW: +0.5°</text>
            <text x="290" y="80" fontSize="6.5" fill="var(--cyan)" textAnchor="end" fontFamily="monospace">MESH_PTS: 468</text>
          </svg>
        </div>
        <footer className="hud-panel-footer">
          <span>PIPELINE: ACTIVE</span>
          <span>COMPUTE: EDGE_DEVICE</span>
        </footer>
      </section>

      {/* PANEL 3: ENSINO */}
      <section className="hud-panel ensino-panel">
        <header className="hud-panel-header">
          <span className="panel-dot status-active" />
          <h3 className="panel-title">
            {locale === 'pt' ? 'ENSINO // METODOLOGIA STEAM & MAKER' : 'EDUCATION // STEAM & MAKER METHODOLOGY'}
          </h3>
          <span className="panel-id">[LAB: EETEPA]</span>
        </header>
        <div className="hud-panel-body">
          <svg viewBox="0 0 300 100" className="hud-svg" aria-hidden="true">
            {/* Grid background */}
            <defs>
              <pattern id="grid-steam" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(137, 226, 124, 0.04)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-steam)" />
            
            {/* Central IoT Gateway */}
            <g transform="translate(150, 50)">
              <rect x="-24" y="-15" width="48" height="30" fill="var(--bg)" stroke="var(--green)" strokeWidth="1.5" rx="3" />
              <text x="0" y="-3" fontSize="7" fill="var(--green)" textAnchor="middle" fontFamily="monospace" fontWeight="bold">IoT CORE</text>
              <text x="0" y="6" fontSize="5.5" fill="var(--paper-muted)" textAnchor="middle" fontFamily="monospace">GATEWAY</text>
              <text x="0" y="11" fontSize="4.5" fill="var(--cyan)" textAnchor="middle" fontFamily="monospace">115200 BPS</text>
              <circle cx="-16" cy="-9" r="1.5" fill="var(--coral)" />
              <circle cx="16" cy="-9" r="1.5" fill="var(--green)" />
            </g>
            
            {/* Stations */}
            <g transform="translate(45, 25)">
              <rect x="-18" y="-8" width="36" height="16" fill="var(--bg)" stroke="var(--cyan)" strokeWidth="1" rx="2" />
              <text x="0" y="2" fontSize="6.5" fill="var(--cyan)" textAnchor="middle" fontFamily="monospace">STATION_A</text>
              <circle cx="-12" cy="0" r="1.2" fill="var(--green)" />
            </g>
            <path d="M 63,25 L 126,40" stroke="var(--green)" strokeWidth="0.75" />
            
            <g transform="translate(45, 75)">
              <rect x="-18" y="-8" width="36" height="16" fill="var(--bg)" stroke="var(--cyan)" strokeWidth="1" rx="2" />
              <text x="0" y="2" fontSize="6.5" fill="var(--cyan)" textAnchor="middle" fontFamily="monospace">STATION_B</text>
              <circle cx="-12" cy="0" r="1.2" fill="var(--green)" />
            </g>
            <path d="M 63,75 L 126,60" stroke="var(--green)" strokeWidth="0.75" />
            
            {/* Hardware Items */}
            <g transform="translate(250, 25)">
              <circle r="9" fill="var(--bg)" stroke="var(--green)" strokeWidth="1.2" />
              <path d="M -4,-4 L 4,4 M -4,4 L 4,-4" stroke="var(--green)" strokeWidth="0.75" />
              <text x="14" y="2" fontSize="6.5" fill="var(--paper-muted)" fontFamily="monospace">3D_PRINT</text>
            </g>
            <path d="M 174,40 L 241,25" stroke="var(--green)" strokeWidth="0.75" strokeDasharray="2 2" />
            
            <g transform="translate(250, 50)">
              <circle r="8" fill="var(--bg)" stroke="var(--green)" strokeWidth="1.2" />
              <path d="M-3,-3 H3 V3 H-3 Z" fill="none" stroke="var(--green)" strokeWidth="0.75" />
              <text x="14" y="2" fontSize="6.5" fill="var(--paper-muted)" fontFamily="monospace">CNC_MILL</text>
            </g>
            <path d="M 174,50 L 242,50" stroke="var(--green)" strokeWidth="0.75" />
            
            <g transform="translate(250, 75)">
              <circle r="8" fill="var(--bg)" stroke="var(--coral)" strokeWidth="1.2" />
              <circle r="3" fill="var(--coral)" />
              <text x="14" y="2" fontSize="6.5" fill="var(--coral)" fontFamily="monospace">SENSORS</text>
            </g>
            <path d="M 174,60 L 242,75" stroke="var(--coral)" strokeWidth="0.75" strokeDasharray="3 1" />
            
            {/* Signals */}
            <circle cx="94" cy="32.5" r="3" fill="var(--green)" opacity="0.6" className="hud-pulse" />
            <circle cx="208" cy="67.5" r="3" fill="var(--coral)" opacity="0.6" className="hud-pulse-delay" />
            
            {/* Metrics */}
            <text x="10" y="48" fontSize="6.5" fill="var(--paper-muted)" fontFamily="monospace">STUDENTS: 24</text>
            <text x="10" y="57" fontSize="6.5" fill="var(--paper-muted)" fontFamily="monospace">DEV_RATE: 82%</text>
            <text x="290" y="93" fontSize="6.5" fill="var(--green)" textAnchor="end" fontFamily="monospace" fontWeight="bold">STEAM_LAB_CORE</text>
          </svg>
        </div>
        <footer className="hud-panel-footer">
          <span>{locale === 'pt' ? 'PROJETOS CURRICULARES: 24+' : 'CURRICULAR PROJECTS: 24+'}</span>
          <span>{locale === 'pt' ? 'AÇÃO: AUTORIA_ESTUDANTE' : 'ACTION: STUDENT_AUTHORSHIP'}</span>
        </footer>
      </section>
    </aside>
  );
}

function CaseVisual({ visual }: { visual: PortfolioCaseStudy['visual'] }) {
  const src = {
    webcraft: '/assets/webcraft-preview.png',
    network: '/assets/campuswatch-preview.png',
    vision: '/assets/edge-cv-preview.png',
  }[visual];

  return (
    <div className={`case-visual case-visual-${visual}`} aria-hidden="true">
      {src && <img src={src} alt="" className="case-screenshot" />}
      <div className="hud-overlay">
        <span className="corner-tl" />
        <span className="corner-tr" />
        <span className="corner-bl" />
        <span className="corner-br" />
      </div>
      {visual === 'webcraft' ? (
        <>
          <code className="hud-label-code">&lt;main&gt;</code>
          <b className="hud-label-title">missao_web()</b>
          <em className="hud-label-status">preview</em>
        </>
      ) : null}
      {visual === 'network' ? (
        <>
          <b className="hud-label-title">SNMP</b>
          <em className="hud-label-status">alerta</em>
        </>
      ) : null}
      {visual === 'vision' ? (
        <>
          <b className="hud-label-title">frame</b>
          <em className="hud-label-status">latência</em>
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
        
        {primary ? (
          <div className="case-grid">
            <div className="grid-item">
              <span className="grid-label">{labels.problem}</span>
              <p className="grid-content">{study.problem[locale]}</p>
            </div>
            <div className="grid-item">
              <span className="grid-label">{labels.architecture}</span>
              <p className="grid-content">{study.architecture[locale]}</p>
            </div>
            <div className="grid-item">
              <span className="grid-label">{labels.stack}</span>
              <div className="case-badges">
                {study.stack.map((item) => (
                  <span className="tech-badge" key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="grid-item">
              <span className="grid-label">{labels.result}</span>
              <p className="grid-content">{study.result[locale]}</p>
            </div>
          </div>
        ) : (
          <dl>
            <div>
              <dt>{labels.problem}</dt>
              <dd>{study.problem[locale]}</dd>
            </div>
            <div>
              <dt>{locale === 'pt' ? 'Solução' : 'Solution'}</dt>
              <dd>{study.architecture[locale]}</dd>
            </div>
            <div>
              <dt>{locale === 'pt' ? 'Tecnologias' : 'Technologies'}</dt>
              <dd className="case-badges">
                {study.stack.map((item) => (
                  <span className="tech-badge" key={item}>{item}</span>
                ))}
              </dd>
            </div>
          </dl>
        )}
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
      <header className="cases-header">
        <div className="cases-header-left">
          <span className="live-lab-tag">{locale === 'pt' ? 'LABORATÓRIO VIVO' : 'LIVE LAB'}</span>
          <h2 id="cases-title">{content.casesTitle}</h2>
          <p>{content.casesBody}</p>
        </div>
        <div className="cases-hud-meta" aria-hidden="true">
          <span className="bracket-top" />
          <div className="meta-terminal-line">SYSTEM: CASOS_EM_FOCO</div>
          <div className="meta-terminal-line">TOTAL_ITEMS: {studies.length}</div>
          <div className="meta-terminal-line">ENV: PRODUCTION</div>
          <div className="meta-terminal-line">OBSERVABILITY: OK</div>
          <span className="bracket-bottom" />
        </div>
      </header>
      <div className="case-board">
        {studies[0] ? <CaseStudyCard study={studies[0].study} repo={studies[0].repo} locale={locale} primary /> : null}
        <div className="case-rail">
          {studies.slice(1).map(({ study, repo }) => (
            <CaseStudyCard study={study} repo={repo} locale={locale} key={study.repository} />
          ))}
        </div>
      </div>
      <RadarPanel locale={locale} />
      
      {/* SECTION FOOTER PILLARS */}
      <footer className="cases-footer">
        <div className="cases-footer-pillars">
          <article className="cases-footer-pillar">
            <GraduationCap aria-hidden="true" />
            <div className="pillar-copy">
              <h3>{locale === 'pt' ? 'Educação tecnológica' : 'Technical education'}</h3>
              <p>{locale === 'pt' ? 'Capacitação prática orientada a projetos e resolução de problemas.' : 'Project-oriented practical training and problem solving.'}</p>
            </div>
          </article>
          <article className="cases-footer-pillar">
            <BrainCircuit aria-hidden="true" />
            <div className="pillar-copy">
              <h3>{locale === 'pt' ? 'Pesquisa aplicada' : 'Applied research'}</h3>
              <p>{locale === 'pt' ? 'Investigação científica de modelos eficientes de IA e visão.' : 'Scientific investigation of efficient AI and vision models.'}</p>
            </div>
          </article>
          <article className="cases-footer-pillar">
            <Network aria-hidden="true" />
            <div className="pillar-copy">
              <h3>{locale === 'pt' ? 'Engenharia de redes' : 'Network engineering'}</h3>
              <p>{locale === 'pt' ? 'Desenvolvimento de infraestruturas físicas resilientes e monitoradas.' : 'Development of resilient and monitored physical infrastructures.'}</p>
            </div>
          </article>
        </div>
        <div className="cases-footer-terminal" aria-hidden="true">
          <span>&gt; SYSTEM_ONLINE = TRUE</span>
          <span>&gt; APRENDER_CONTINUO = TRUE</span>
          <span>&gt; REGION = BR_PA_BEL</span>
        </div>
      </footer>
    </section>
  );
}

function SkillsSection({ locale }: { locale: Locale }) {
  const content = copy[locale];

  return (
    <section className="skills-section" id="skills" aria-labelledby="skills-title">
      <header className="skills-header">
        <div className="skills-header-left">
          <span className="live-lab-tag">{locale === 'pt' ? 'MÉTRICAS & EFICIÊNCIA' : 'METRICS & EFFICIENCY'}</span>
          <h2 id="skills-title">{content.skillsTitle}</h2>
          <p>{content.skillsSubtitle}</p>
        </div>
        <div className="skills-hud-meta" aria-hidden="true">
          <span className="bracket-top" />
          <div className="meta-terminal-line">SYS: SKILLS_TELEMETRY</div>
          <div className="meta-terminal-line">HARD_SKILLS: {hardSkillsList.reduce((acc, cat) => acc + cat.items.length, 0)}</div>
          <div className="meta-terminal-line">SOFT_SKILLS: {softSkillsList.reduce((acc, cat) => acc + cat.items.length, 0)}</div>
          <div className="meta-terminal-line">EVIDENCE_TRACKS: ACTIVE</div>
          <span className="bracket-bottom" />
        </div>
      </header>

      <div className="skills-grid">
        {/* Hard Skills Column */}
        <div className="skills-column hard-skills-col">
          <h3 className="column-title">
            <span className="title-dot green" />
            {content.hardSkillsTitle}
          </h3>
          <div className="skills-categories-list">
            {hardSkillsList.map((category, catIdx) => (
              <div className="skill-category-card" key={catIdx}>
                <h4>{category.title[locale]}</h4>
                <p className="category-desc">{category.description[locale]}</p>
                <div className="category-items">
                  {category.items.map((item, itemIdx) => (
                    <div className="skill-item-row" key={itemIdx}>
                      <div className="skill-item-info">
                        <span className="skill-name">{item.name[locale]}</span>
                        <span className="skill-evidence">
                          {content.skillsEvidence}: <em>{item.evidence[locale]}</em>
                        </span>
                      </div>
                      <div className="telemetry-bar-wrapper">
                        <div className="telemetry-bar">
                          <div className="telemetry-fill green" style={{ width: `${item.level}%` }} />
                        </div>
                        <span className="telemetry-percent">{item.level}%</span>
                      </div>
                      <div className="skill-tags">
                        {item.tags.map((tag) => (
                          <span className="skill-tag" key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills Column */}
        <div className="skills-column soft-skills-col">
          <h3 className="column-title">
            <span className="title-dot cyan" />
            {content.softSkillsTitle}
          </h3>
          <div className="skills-categories-list">
            {softSkillsList.map((category, catIdx) => (
              <div className="skill-category-card" key={catIdx}>
                <h4>{category.title[locale]}</h4>
                <p className="category-desc">{category.description[locale]}</p>
                <div className="category-items">
                  {category.items.map((item, itemIdx) => (
                    <div className="skill-item-row" key={itemIdx}>
                      <div className="skill-item-info">
                        <span className="skill-name">{item.name[locale]}</span>
                        <span className="skill-evidence">
                          {content.skillsEvidence}: <em>{item.evidence[locale]}</em>
                        </span>
                      </div>
                      <div className="telemetry-bar-wrapper">
                        <div className="telemetry-bar">
                          <div className="telemetry-fill cyan" style={{ width: `${item.level}%` }} />
                        </div>
                        <span className="telemetry-percent">{item.level}%</span>
                      </div>
                      <div className="skill-tags">
                        {item.tags.map((tag) => (
                          <span className="skill-tag" key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Component: Interactive IDE / Code Editor replica inspired by modern developer tooling
function InteractiveIde({ locale }: { locale: Locale }) {
  const [activeTab, setActiveTab] = useState<'react' | 'n8n' | 'supabase' | 'preview'>('react');
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [simulatedLeads, setSimulatedLeads] = useState<Array<{ name: string; email: string; date: string }>>([
    { name: 'Ana Souza', email: 'ana.souza@empresa.com', date: '01/06/2026 14:32' },
    { name: 'Carlos Lima', email: 'carlos@tech.br', date: '01/06/2026 15:45' }
  ]);
  const [simStatus, setSimStatus] = useState<'idle' | 'webhook' | 'n8n' | 'supabase' | 'done'>('idle');

  const triggerSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;

    setSimStatus('webhook');
    setTimeout(() => {
      setSimStatus('n8n');
      setTimeout(() => {
        setSimStatus('supabase');
        setTimeout(() => {
          setSimStatus('done');
          setSimulatedLeads((prev) => [
            {
              name: leadName,
              email: leadEmail,
              date: new Date().toLocaleString('pt-BR', { hour12: false }).substring(0, 16),
            },
            ...prev,
          ]);
          setLeadName('');
          setLeadEmail('');
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const clearSimulation = () => {
    setSimulatedLeads([]);
    setSimStatus('idle');
  };

  return (
    <div className="interactive-ide glass-card">
      <div className="ide-header">
        <div className="ide-window-controls">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="ide-title">
          <Terminal size={12} />
          <span>workspace/ai-product-dev/</span>
        </div>
        <div className="ide-status-pill">
          <span className="live-pulse" />
          <span>LIVE LAB</span>
        </div>
      </div>
      
      <div className="ide-tabs-wrapper">
        <button 
          className={`ide-tab ${activeTab === 'react' ? 'active' : ''}`}
          onClick={() => setActiveTab('react')}
        >
          <Code2 size={14} />
          <span>App.tsx</span>
        </button>
        <button 
          className={`ide-tab ${activeTab === 'n8n' ? 'active' : ''}`}
          onClick={() => setActiveTab('n8n')}
        >
          <Settings size={14} />
          <span>n8n-flow.json</span>
        </button>
        <button 
          className={`ide-tab ${activeTab === 'supabase' ? 'active' : ''}`}
          onClick={() => setActiveTab('supabase')}
        >
          <Database size={14} />
          <span>schema.sql</span>
        </button>
        <button 
          className={`ide-tab ide-tab-preview ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          <Play size={14} />
          <span>Live Preview</span>
        </button>
      </div>

      <div className="ide-editor-body">
        {activeTab === 'react' && (
          <pre className="code-block">
            <code>
              <span className="syntax-keyword">import</span> {'{ useState }'} <span className="syntax-keyword">from</span> <span className="syntax-string">'react'</span>;<br />
              <span className="syntax-keyword">import</span> {'{ Sparkles }'} <span className="syntax-keyword">from</span> <span className="syntax-string">'lucide-react'</span>;<br /><br />
              <span className="syntax-keyword">export default function</span> <span className="syntax-function">AIProductCard</span>({'{ title, desc, onTrigger }'}) {'{'}<br />
              &nbsp;&nbsp;<span className="syntax-keyword">const</span> [loading, setLoading] = <span className="syntax-function">useState</span>(<span className="syntax-keyword">false</span>);<br /><br />
              &nbsp;&nbsp;<span className="syntax-keyword">const</span> <span className="syntax-function">handleAction</span> = <span className="syntax-keyword">async</span> () =&gt; {'{'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">setLoading</span>(<span className="syntax-keyword">true</span>);<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">await</span> <span className="syntax-function">onTrigger</span>();<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">setLoading</span>(<span className="syntax-keyword">false</span>);<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-function">alert</span>(<span className="syntax-string">'Webhook enviado!'</span>);<br />
              &nbsp;&nbsp;{'}'};<br /><br />
              &nbsp;&nbsp;<span className="syntax-keyword">return</span> (<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-tag">&lt;div</span> <span className="syntax-attr">className</span>=<span className="syntax-string">"p-6 glass-card"</span><span className="syntax-tag">&gt;</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-tag">&lt;h3</span> <span className="syntax-attr">className</span>=<span className="syntax-string">"text-xl font-bold"</span><span className="syntax-tag">&gt;</span>{'{title}'}<span className="syntax-tag">&lt;/h3&gt;</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-tag">&lt;p</span> <span className="syntax-attr">className</span>=<span className="syntax-string">"text-muted"</span><span className="syntax-tag">&gt;</span>{'{desc}'}<span className="syntax-tag">&lt;/p&gt;</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-tag">&lt;button</span> <span className="syntax-attr">onClick</span>={'{handleAction}'} <span className="syntax-attr">disabled</span>={'{loading}'}<span className="syntax-tag">&gt;</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{loading ? \'Enviando...\' : \'Deploy com IA\'}'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-tag">&lt;/button&gt;</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-tag">&lt;/div&gt;</span><br />
              &nbsp;&nbsp;);<br />
              {'}'}
            </code>
          </pre>
        )}

        {activeTab === 'n8n' && (
          <pre className="code-block">
            <code>
              {'{'}<br />
              &nbsp;&nbsp;<span className="syntax-string">"name"</span>: <span className="syntax-string">"Supabase Webhook Processor"</span>,<br />
              &nbsp;&nbsp;<span className="syntax-string">"nodes"</span>: [<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'{'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"parameters"</span>: {'{'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"httpMethod"</span>: <span className="syntax-string">"POST"</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"path"</span>: <span className="syntax-string">"supabase-trigger"</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"type"</span>: <span className="syntax-string">"n8n-nodes-base.webhook"</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"name"</span>: <span className="syntax-string">"Webhook Receiver"</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'}'},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'{'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"parameters"</span>: {'{'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"url"</span>: <span className="syntax-string">"https://api.openai.com/v1/chat/completions"</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"sendBody"</span>: <span className="syntax-keyword">true</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"type"</span>: <span className="syntax-string">"n8n-nodes-base.httpRequest"</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"name"</span>: <span className="syntax-string">"AI Completion"</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br />
              &nbsp;&nbsp;]<br />
              {'}'}
            </code>
          </pre>
        )}

        {activeTab === 'supabase' && (
          <pre className="code-block">
            <code>
              <span className="syntax-comment">-- Criar tabela para rastrear leads de inovação</span><br />
              <span className="syntax-keyword">CREATE TABLE</span> public.leads_campanhas (<br />
              &nbsp;&nbsp;id uuid <span className="syntax-keyword">DEFAULT</span> gen_random_uuid() <span className="syntax-keyword">PRIMARY KEY</span>,<br />
              &nbsp;&nbsp;created_at <span className="syntax-keyword">TIMESTAMP WITH TIME ZONE DEFAULT</span> timezone(<span className="syntax-string">'utc'</span>::text, now()) <span className="syntax-keyword">NOT NULL</span>,<br />
              &nbsp;&nbsp;nome <span className="syntax-keyword">TEXT NOT NULL</span>,<br />
              &nbsp;&nbsp;email <span className="syntax-keyword">TEXT NOT NULL UNIQUE</span>,<br />
              &nbsp;&nbsp;status <span className="syntax-keyword">TEXT DEFAULT</span> <span className="syntax-string">'pending'</span>::text<br />
              );<br /><br />
              <span className="syntax-comment">-- Habilitar Políticas de Segurança RLS</span><br />
              <span className="syntax-keyword">ALTER TABLE</span> public.leads_campanhas <span className="syntax-keyword">ENABLE ROW LEVEL SECURITY</span>;<br /><br />
              <span className="syntax-comment">-- Permitir que a chave anônima (ou automações) faça inserts</span><br />
              <span className="syntax-keyword">CREATE POLICY</span> <span className="syntax-string">"Permitir inserts públicos"</span> <span className="syntax-keyword">ON</span> public.leads_campanhas<br />
              &nbsp;&nbsp;<span className="syntax-keyword">FOR INSERT WITH CHECK</span> (<span className="syntax-keyword">true</span>);
            </code>
          </pre>
        )}

        {activeTab === 'preview' && (
          <div className="preview-container">
            <div className="preview-header">
              <span className="preview-dot-active" />
              <span>{locale === 'pt' ? 'Formulário de Lead' : 'Lead Form'}</span>
            </div>
            
            <div className="preview-grid-layout">
              <form onSubmit={triggerSimulation} className="preview-form">
                <div className="preview-input-group">
                  <label>{locale === 'pt' ? 'Nome do Lead' : 'Lead Name'}</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Alberto Mateus" 
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    disabled={simStatus !== 'idle'}
                    required
                  />
                </div>
                <div className="preview-input-group">
                  <label>{locale === 'pt' ? 'E-mail Corporativo' : 'Corporate E-mail'}</label>
                  <input 
                    type="email" 
                    placeholder="Ex: alberto@empresa.com" 
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    disabled={simStatus !== 'idle'}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="preview-submit-btn"
                  disabled={simStatus !== 'idle' || !leadName || !leadEmail}
                >
                  {simStatus === 'idle' && (locale === 'pt' ? 'Disparar Fluxo (n8n + Supabase)' : 'Trigger Flow (n8n + Supabase)')}
                  {simStatus !== 'idle' && simStatus !== 'done' && (locale === 'pt' ? 'Orquestrando...' : 'Orchestrating...')}
                  {simStatus === 'done' && (locale === 'pt' ? 'Concluído!' : 'Completed!')}
                </button>
              </form>

              <div className="preview-telemetry">
                <h4>{locale === 'pt' ? 'Telemetria do Fluxo' : 'Flow Telemetry'}</h4>
                <div className="telemetry-steps">
                  <div className={`step-row ${simStatus === 'webhook' ? 'active' : ''} ${['n8n', 'supabase', 'done'].includes(simStatus) ? 'completed' : ''}`}>
                    <span className="step-num">1</span>
                    <span>Webhook Trigger</span>
                  </div>
                  <div className={`step-row ${simStatus === 'n8n' ? 'active' : ''} ${['supabase', 'done'].includes(simStatus) ? 'completed' : ''}`}>
                    <span className="step-num">2</span>
                    <span>n8n Process (OpenAI Integration)</span>
                  </div>
                  <div className={`step-row ${simStatus === 'supabase' ? 'active' : ''} ${['done'].includes(simStatus) ? 'completed' : ''}`}>
                    <span className="step-num">3</span>
                    <span>Supabase Insert & RLS Policy</span>
                  </div>
                </div>

                {simStatus === 'done' && (
                  <div className="telemetry-success-banner">
                    <CheckCircle2 size={14} />
                    <span>200 OK - Lead salvo no Supabase</span>
                  </div>
                )}
              </div>
            </div>

            <div className="preview-leads-list">
              <div className="leads-list-header">
                <h4>{locale === 'pt' ? 'Leads Gravados no Supabase' : 'Leads Saved in Supabase'}</h4>
                {simulatedLeads.length > 0 && (
                  <button type="button" onClick={clearSimulation} className="clear-btn" title="Limpar dados simulados">
                    <Trash2 size={12} />
                    <span>{locale === 'pt' ? 'Limpar' : 'Clear'}</span>
                  </button>
                )}
              </div>
              
              {simulatedLeads.length === 0 ? (
                <div className="leads-empty-state">
                  {locale === 'pt' ? 'Nenhum lead gravado ainda.' : 'No leads recorded yet.'}
                </div>
              ) : (
                <div className="leads-rows">
                  {simulatedLeads.map((l, index) => (
                    <div className="lead-row" key={index}>
                      <div className="lead-meta-info">
                        <span className="lead-name">{l.name}</span>
                        <span className="lead-email">{l.email}</span>
                      </div>
                      <span className="lead-date">{l.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="ide-footer">
        <span>UTF-8</span>
        <span>TypeScript JSX</span>
        <span>Line 1, Col 1</span>
      </div>
    </div>
  );
}

function HomeView({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const showcase = repositories.filter((repo) => repo.featured && repo.family !== 'premium').slice(0, 6);
  const webcraft = repositories.find((repo) => repo.name === 'webcraft-studio');
  const [activeTab, setActiveTab] = useState<'timeline' | 'experience' | 'education' | 'publications'>('timeline');

  return (
    <>
      <main>
        <section className="hero" id="sobre">
          <div className="hero-copy">
            <h1>{content.heroTitle}</h1>
            <div className="hero-title-connector" aria-hidden="true" />
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
              <a href={linkedinUrl} target="_blank" rel="noreferrer" className="social-action-btn" title="LinkedIn">
                <Linkedin aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <a href={lattesUrl} target="_blank" rel="noreferrer" className="social-action-btn" title="Currículo Lattes">
                <ExternalLink aria-hidden="true" />
                <span>Lattes</span>
              </a>
            </div>
          </div>
          <PortraitStage locale={locale} />
          <HeroConsole locale={locale} />
          
          <div className="hero-hud-rail">
            <div className="rail-status">
              <span className="rail-status-dot" />
              <span className="rail-status-text">{locale === 'pt' ? 'LAB EM OPERAÇÃO' : 'LAB IN OPERATION'}</span>
            </div>
            <div className="rail-items">
              <a href="#projetos" className="rail-item">
                <span className="rail-item-num">01</span>
                <span className="rail-item-name">WebCraft Studio</span>
              </a>
              <a href="#projetos" className="rail-item">
                <span className="rail-item-num">02</span>
                <span className="rail-item-name">NetMaster CLI</span>
              </a>
              <a href="#projetos" className="rail-item">
                <span className="rail-item-num">03</span>
                <span className="rail-item-name">CampusWatch SNMP</span>
              </a>
              <a href="#projetos" className="rail-item">
                <span className="rail-item-num">04</span>
                <span className="rail-item-name">EcoWake</span>
              </a>
            </div>
          </div>
        </section>

        <section className="live-lab-section" aria-labelledby="livelab-title">
          <div className="live-lab-container">
            <div className="live-lab-copy">
              <span className="live-lab-tag-highlight">{locale === 'pt' ? 'AMBIENTE DE INTEGRAÇÃO' : 'INTEGRATION ENVIRONMENT'}</span>
              <h2 id="livelab-title">
                <span className="accent-bar" />
                {locale === 'pt' ? 'Laboratório Vivo' : 'Live Lab'}
              </h2>
              <p>{locale === 'pt' ? 'Um ecossistema prático onde redes IP, visão computacional e educação tecnológica se integram de verdade. O laboratório funciona como espaço de teste contínuo para soluções leves de automação, documentação de infovias metropolitanas e desenvolvimento maker.' : 'A practical ecosystem where IP networks, computer vision, and tech education are truly integrated. The lab serves as a continuous testing space for lightweight automation, municipal network documentation, and maker development.'}</p>
              
              <div className="live-lab-meta" aria-hidden="true">
                <div className="meta-line">STATUS: ACTIVE</div>
                <div className="meta-line">IP: 10.20.30.0/24</div>
                <div className="meta-line">TELEMETRY: OK</div>
              </div>
            </div>
            <InteractiveIde locale={locale} />
          </div>
        </section>

        <CaseStudies locale={locale} />

        <SkillsSection locale={locale} />

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
              <div className="webcraft-stage-screenshot" aria-hidden="true">
                <img src="/assets/webcraft-preview.png" alt="WebCraft Studio" />
                <div className="hud-overlay">
                  <span className="corner-tl" />
                  <span className="corner-tr" />
                  <span className="corner-bl" />
                  <span className="corner-br" />
                </div>
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
          <div className="timeline-container">
            <h2 id="trajectory-title">{content.timelineTitle}</h2>
            <div className="trajectory-tabs" role="tablist">
              {(['timeline', 'experience', 'education', 'publications'] as const).map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn${activeTab === tab ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  aria-selected={activeTab === tab}
                >
                  {content.cvTabs[tab]}
                </button>
              ))}
            </div>

            {activeTab === 'timeline' && (
              <div className="timeline">
                {content.timeline.map(([title, body]) => (
                  <article key={title}>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </article>
                ))}
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="cv-list">
                {experienceHistory.map((exp, idx) => (
                  <article key={idx} className="cv-item">
                    <h3>{exp.role[locale]}</h3>
                    <div className="meta">
                      {exp.company} <span>• {exp.period[locale]}</span>
                    </div>
                    <ul>
                      {exp.description[locale].map((desc, dIdx) => (
                        <li key={dIdx}>{desc}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="cv-list">
                {educationHistory.map((edu, idx) => (
                  <article key={idx} className="cv-item">
                    <h3>{edu.degree[locale]}</h3>
                    <div className="meta">
                      {edu.institution} <span>• {edu.period}</span>
                    </div>
                    {edu.description && (
                      <p className="edu-description">{edu.description[locale]}</p>
                    )}
                  </article>
                ))}
              </div>
            )}

            {activeTab === 'publications' && (
              <div className="cv-list">
                {publicationList.map((pub, idx) => (
                  <article key={idx} className="pub-item">
                    <h4>{pub.title}</h4>
                    <p className="authors">{pub.authors}</p>
                    <p className="meta-pub">
                      <span className="pub-type">{content.pubTypes[pub.type]}</span> • <span className="venue">{pub.venue}</span> • <span>{pub.year}</span>
                    </p>
                  </article>
                ))}
              </div>
            )}
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

  const legendItems = [
    {
      title: locale === 'pt' ? 'Projetos Profissionais' : 'Professional Projects',
      body: locale === 'pt' ? 'Produtos, APIs e ferramentas prontas para operação real.' : 'Products, APIs, and tools ready for real operations.',
      icon: Briefcase,
      colorClass: 'color-profissionais',
    },
    {
      title: locale === 'pt' ? 'Laboratórios Educacionais' : 'Educational Laboratories',
      body: locale === 'pt' ? 'Aplicações didáticas, simuladores e atividades com dados seguros.' : 'Didactic apps, simulators, and tasks with secure data.',
      icon: GraduationCap,
      colorClass: 'color-educacionais',
    },
    {
      title: locale === 'pt' ? 'Pesquisa Aplicada' : 'Applied Research',
      body: locale === 'pt' ? 'Protótipos de IA, visão computacional e notebooks de ciência de dados.' : 'AI prototypes, computer vision, and data science notebooks.',
      icon: BrainCircuit,
      colorClass: 'color-pesquisa',
    },
    {
      title: locale === 'pt' ? 'Colaborações' : 'Collaborations',
      body: locale === 'pt' ? 'Hackathons, turmas, mentorias e trabalho em equipe.' : 'Hackathons, classes, mentoring, and teamwork.',
      icon: Network,
      colorClass: 'color-colaboracoes',
    },
    {
      title: locale === 'pt' ? 'Arquivados' : 'Archived',
      body: locale === 'pt' ? 'Projetos legados ou repositórios congelados para histórico.' : 'Legacy projects or frozen repositories kept for historical purposes.',
      icon: Archive,
      colorClass: 'color-arquivados',
    },
  ];

  return (
    <aside className="catalog-legend" aria-label={content.legendTitle}>
      <h2>{content.legendTitle}</h2>
      <div className="legend-items">
        {legendItems.map((item) => {
          const Icon = item.icon;
          return (
            <article className={`legend-row ${item.colorClass}`} key={item.title}>
              <span className="legend-icon-wrapper">
                <Icon aria-hidden="true" />
              </span>
              <div className="legend-copy">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}

function getRepoSymbol(name: string): string {
  switch (name) {
    case 'webcraft-studio':
      return 'W';
    case 'netmaster-cli-api':
      return 'N';
    case 'campuswatch-snmp':
      return 'C';
    case 'ecowake':
      return 'E';
    case 'certiflow-api':
      return 'F';
    case 'edumetrics-hub':
      return 'H';
    case 'boas-praticas-isp':
      return 'B';
    default:
      return '>';
  }
}

function CatalogView({ locale, setLocale }: { locale: Locale; setLocale: (l: Locale) => void }) {
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

  const categoryGroups = useMemo(() => {
    const categories = [
      {
        id: 'profissionais',
        title: { pt: 'PROJETOS PROFISSIONAIS', en: 'PROFESSIONAL PROJECTS' },
        icon: Briefcase,
        colorClass: 'color-profissionais',
        families: ['premium', 'vitrine', 'colaboracoes'],
      },
      {
        id: 'educacionais',
        title: { pt: 'LABORATÓRIOS EDUCACIONAIS', en: 'EDUCATIONAL LABORATORIES' },
        icon: GraduationCap,
        colorClass: 'color-educacionais',
        families: ['eetepa', 'informatica-redes', 'aulas-ludicas'],
      },
      {
        id: 'pesquisa',
        title: { pt: 'PESQUISA APLICADA', en: 'APPLIED RESEARCH' },
        icon: BrainCircuit,
        colorClass: 'color-pesquisa',
        families: ['visao-computacional', 'ciencia-de-dados'],
      },
    ];

    return categories.map(cat => {
      const catRepos = visible.filter(repo => cat.families.includes(repo.family));
      return {
        ...cat,
        repos: catRepos,
      };
    }).filter(group => group.repos.length > 0);
  }, [visible]);

  return (
    <div className="catalog-shell">
      {/* Coluna Esquerda: Sidebar */}
      <aside className="catalog-sidebar">
        <a className="brand" href="#" aria-label="Alberto Mateus">
          <svg className="brand-hexagon" viewBox="0 0 100 100" aria-hidden="true">
            <polygon points="50,5 93,30 93,80 50,105 7,80 7,30" />
            <text x="50" y="65" textAnchor="middle">AM</text>
          </svg>
          <div className="brand-text">
            <span className="brand-name">Alberto Mateus</span>
            <span className="brand-subtitle">{locale === 'pt' ? 'Engenharia que conecta • Visão que transforma • Ensino que inspira' : 'Engineering that connects • Vision that transforms • Teaching that inspires'}</span>
          </div>
        </a>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item">
            <HomeIcon aria-hidden="true" />
            <span>{locale === 'pt' ? 'Início' : 'Home'}</span>
          </a>
          <a href="#catalogo" className="nav-item active">
            <LayoutGrid aria-hidden="true" />
            <span>{locale === 'pt' ? 'Catálogo' : 'Catalog'}</span>
          </a>
          <a href="#projetos" className="nav-item">
            <Briefcase aria-hidden="true" />
            <span>{locale === 'pt' ? 'Projetos' : 'Projects'}</span>
          </a>
          <a href="#pesquisa" className="nav-item">
            <BrainCircuit aria-hidden="true" />
            <span>{locale === 'pt' ? 'Pesquisa' : 'Research'}</span>
          </a>
          <a href="#aulas" className="nav-item">
            <GraduationCap aria-hidden="true" />
            <span>{locale === 'pt' ? 'Educação' : 'Education'}</span>
          </a>
          <a href="#trajetoria" className="nav-item">
            <BookOpen aria-hidden="true" />
            <span>{locale === 'pt' ? 'Trajetória' : 'Trajectory'}</span>
          </a>
          <a href="#contato" className="nav-item">
            <Mail aria-hidden="true" />
            <span>{locale === 'pt' ? 'Contato' : 'Contact'}</span>
          </a>
        </nav>

        <div className="sidebar-profile">
          <div className="avatar-hexagon-wrapper">
            <svg viewBox="0 0 100 100" className="avatar-hexagon-svg">
              <defs>
                <clipPath id="hex-clip">
                  <polygon points="50,5 93,30 93,80 50,105 7,80 7,30" />
                </clipPath>
              </defs>
              <polygon points="50,5 93,30 93,80 50,105 7,80 7,30" className="avatar-hex-border" />
              <image 
                href="/assets/alberto-mateus-portrait-real-cutout.webp" 
                x="5" y="5" 
                width="90" height="90" 
                clipPath="url(#hex-clip)"
                preserveAspectRatio="xMidYMid slice"
              />
            </svg>
          </div>
          <div className="profile-info">
            <span className="profile-name">Alberto Mateus</span>
            <span className="profile-role">{locale === 'pt' ? 'Doutorando e Engenheiro' : 'PhD Candidate & Engineer'}</span>
          </div>
        </div>

        <div className="sidebar-socials">
          <TextLink href={githubUrl} aria-label="GitHub"><Github /></TextLink>
          <TextLink href={linkedinUrl} aria-label="LinkedIn"><Linkedin /></TextLink>
          <TextLink href={lattesUrl} className="sidebar-lattes" aria-label="Lattes">
            <ExternalLink />
            <span className="lattes-label">Lattes</span>
          </TextLink>
          <TextLink href={emailUrl} aria-label="Email"><Mail /></TextLink>
        </div>

        <div className="sidebar-language-container">
          <LanguageSelector locale={locale} onChange={setLocale} />
        </div>

        <footer className="sidebar-footer">
          <p>© 2026 Alberto Mateus</p>
          <p>Belém, Pará, Brasil</p>
        </footer>
      </aside>

      {/* Coluna Direita: Main Content Area */}
      <main className="catalog-content">
        <section className="catalog-header-hud">
          <div className="catalog-intro-compact">
            <a href="#" className="back-home">
              <ArrowRight aria-hidden="true" />
              {content.backHome}
            </a>
            <h1>{content.catalogTitle}</h1>
            <p>{content.catalogBody}</p>
          </div>
          
          <div className="catalog-topo-diagram" aria-hidden="true">
            <svg viewBox="0 0 400 80" className="topo-svg">
              <path d="M 30 40 L 90 20 L 150 40 L 210 20 L 270 40 L 330 20 M 90 20 L 90 60 L 150 40 M 210 20 L 210 60 L 270 40" stroke="rgba(162, 211, 108, 0.4)" strokeWidth="1" fill="none" />
              
              <circle cx="30" cy="40" r="4" fill="var(--green)" />
              <circle cx="90" cy="20" r="4" fill="var(--cyan)" />
              <circle cx="90" cy="60" r="4" fill="var(--green)" />
              <circle cx="150" cy="45" r="5" fill="var(--bg)" stroke="var(--green)" strokeWidth="1.5" />
              <circle cx="210" cy="20" r="4" fill="var(--cyan)" />
              <circle cx="210" cy="60" r="4" fill="var(--green)" />
              <circle cx="270" cy="40" r="4" fill="var(--green)" />
              <circle cx="330" cy="20" r="4" fill="var(--coral)" />
              
              <text x="30" y="52" fontSize="6" fill="var(--paper-muted)" fontFamily="monospace" textAnchor="middle">192.168.1.1</text>
              <text x="90" y="12" fontSize="6" fill="var(--paper-muted)" fontFamily="monospace" textAnchor="middle">192.168.1.254</text>
              <text x="150" y="56" fontSize="6" fill="var(--green)" fontFamily="monospace" textAnchor="middle">GW_CORE</text>
              <text x="210" y="12" fontSize="6" fill="var(--paper-muted)" fontFamily="monospace" textAnchor="middle">10.0.0.1</text>
              <text x="330" y="12" fontSize="6" fill="var(--coral)" fontFamily="monospace" textAnchor="middle">WAN_EDGE</text>

              <path d="M 370 10 L 390 10 L 390 30" fill="none" stroke="var(--cyan)" strokeWidth="1" />
              <text x="385" y="45" fontSize="7" fill="var(--cyan)" fontFamily="monospace" textAnchor="end">SYS: ACTIVE</text>
            </svg>
            
            <div className="catalog-hud-timeline">
              <span className="timeline-year">2016</span>
              <div className="timeline-track">
                <span className="timeline-bar" />
                <span className="timeline-indicator" style={{ left: '100%' }} />
              </div>
              <span className="timeline-year active">2026</span>
            </div>
          </div>
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
          
          <div className="select-control">
            <Boxes className="select-icon" aria-hidden="true" />
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
          </div>

          <div className="select-control">
            <Code2 className="select-icon" aria-hidden="true" />
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
          </div>

          <div className="select-control">
            <ScanSearch className="select-icon" aria-hidden="true" />
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
          </div>

          <div className="select-control">
            <CircleDot className="select-icon" aria-hidden="true" />
            <select
              aria-label={locale === 'pt' ? 'Status' : 'Status'}
              value={filters.status}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  status: event.target.value as CatalogFilters['status'],
                }))
              }
            >
              {(['todos', 'ativos', 'arquivados', 'forks'] as const).map((status) => (
                <option value={status} key={status}>
                  {content.status[status]}
                </option>
              ))}
            </select>
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
            {categoryGroups.length ? (
              <div className="repo-category-groups">
                <div className="category-vertical-connector" />
                {categoryGroups.map((group) => {
                  const Icon = group.icon;
                  return (
                    <section className={`repo-category-group ${group.colorClass}`} key={group.id}>
                      <div className="category-group-head">
                        <span className="category-icon-wrapper">
                          <Icon aria-hidden="true" />
                        </span>
                        <h2>{group.title[locale]}</h2>
                        <small>{group.repos.length}</small>
                      </div>
                      <div className="category-repos-list">
                        {group.repos.map((repo) => (
                          <article className="catalog-row" key={repo.name}>
                            <div className="repo-index">
                              <span className="repo-square-icon" aria-hidden="true">
                                {getRepoSymbol(repo.name)}
                              </span>
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
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              <p className="empty">{content.empty}</p>
            )}
            <CatalogLegend locale={locale} />
          </div>
        </section>
      </main>
    </div>
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
        <TextLink href={linkedinUrl}>
          <Linkedin aria-hidden="true" />
          LinkedIn
        </TextLink>
        <TextLink href={emailUrl}>
          <Mail aria-hidden="true" />
          Email
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
      <SiteHeader locale={locale} setLocale={setLocale} />
      {view === 'catalogo' ? <CatalogView locale={locale} setLocale={setLocale} /> : <HomeView locale={locale} />}
    </div>
  );
}
