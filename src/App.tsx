import {
  Archive,
  ArrowRight,
  BookOpen,
  Boxes,
  BrainCircuit,
  Briefcase,
  CircleDot,
  Code2,
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
  Sparkles,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import snapshots from './data/github-repositories.json';
import { curatedRepositories, familyOrder } from './data/curation';
import { caseStudies, technologyRadar, educationHistory, experienceHistory, publicationList } from './data/portfolio';
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
      ['Pesquisa', '#pesquisa'],
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
        <span className="hero-midtext">Engenharia, visão e ensino</span>
        <br />
        <span className="hero-highlight">em operação<span className="red-dot">.</span></span>
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
      ['Home', '#sobre'],
      ['Projects', '#projetos'],
      ['Research', '#pesquisa'],
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
        <span className="hero-midtext">Engineering, vision, and teaching</span>
        <br />
        <span className="hero-highlight">in operation<span className="red-dot">.</span></span>
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
          <h3 className="panel-title">REDE // TOPOLOGIA METROPOLITANA</h3>
          <span className="panel-id">[ID: 102.GPON]</span>
        </header>
        <div className="hud-panel-body">
          <svg viewBox="0 0 300 100" className="hud-svg">
            {/* Connections */}
            <line x1="40" y1="50" x2="100" y2="25" stroke="var(--green)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="40" y1="50" x2="100" y2="75" stroke="var(--green)" strokeWidth="1" />
            <line x1="100" y1="25" x2="180" y2="25" stroke="var(--cyan)" strokeWidth="1.5" />
            <line x1="100" y1="75" x2="180" y2="75" stroke="var(--green)" strokeWidth="1" />
            <line x1="180" y1="25" x2="250" y2="50" stroke="var(--green)" strokeWidth="1" />
            <line x1="180" y1="75" x2="250" y2="50" stroke="var(--cyan)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="100" y1="25" x2="100" y2="75" stroke="var(--line)" strokeWidth="1" />
            <line x1="180" y1="25" x2="180" y2="75" stroke="var(--line)" strokeWidth="1" />
            
            {/* Nodes */}
            <circle cx="40" cy="50" r="6" fill="var(--bg)" stroke="var(--coral)" strokeWidth="2" />
            <circle cx="100" cy="25" r="5" fill="var(--green)" />
            <circle cx="100" cy="75" r="5" fill="var(--green)" />
            <circle cx="180" cy="25" r="5" fill="var(--cyan)" />
            <circle cx="180" cy="75" r="5" fill="var(--green)" />
            <circle cx="250" cy="50" r="6" fill="var(--bg)" stroke="var(--green)" strokeWidth="2" />
            
            {/* Pulsing overlay */}
            <circle cx="40" cy="50" r="10" fill="none" stroke="var(--coral)" strokeWidth="1" className="hud-pulse" />
            <circle cx="250" cy="50" r="10" fill="none" stroke="var(--green)" strokeWidth="1" className="hud-pulse-delay" />

            {/* Labels */}
            <text x="40" y="38" fontSize="8" fill="var(--coral)" textAnchor="middle" fontFamily="monospace">GW_01</text>
            <text x="100" y="16" fontSize="7" fill="var(--paper-muted)" textAnchor="middle" fontFamily="monospace">192.168.10.1</text>
            <text x="180" y="16" fontSize="7" fill="var(--paper-muted)" textAnchor="middle" fontFamily="monospace">10.0.0.5</text>
            <text x="250" y="38" fontSize="8" fill="var(--green)" textAnchor="middle" fontFamily="monospace">SW_CORE</text>

            <path d="M 5 5 L 15 5 L 5 15 Z" fill="var(--green)" opacity="0.3" />
            <path d="M 295 5 L 285 5 L 295 15 Z" fill="var(--green)" opacity="0.3" />
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
          <h3 className="panel-title">VISÃO // RECONHECIMENTO DE ESTRUTURA</h3>
          <span className="panel-id">[IA: FACE_MESH]</span>
        </header>
        <div className="hud-panel-body">
          <svg viewBox="0 0 300 100" className="hud-svg">
            {/* Grid background */}
            <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(141, 216, 220, 0.1)" strokeWidth="1" />
            <line x1="150" y1="0" x2="150" y2="100" stroke="rgba(141, 216, 220, 0.1)" strokeWidth="1" />
            
            {/* Wireframe Face mesh representation */}
            <g transform="translate(110, 10)">
              <polygon points="40,5 60,15 70,35 65,65 40,80 15,65 10,35 20,15" fill="none" stroke="rgba(141, 216, 220, 0.3)" strokeWidth="1" />
              <polygon points="25,30 35,30 30,25" fill="none" stroke="var(--cyan)" strokeWidth="1" />
              <polygon points="45,30 55,30 50,25" fill="none" stroke="var(--cyan)" strokeWidth="1" />
              <line x1="30" y1="30" x2="50" y2="30" stroke="var(--line)" strokeWidth="0.5" />
              <line x1="40" y1="20" x2="40" y2="50" stroke="var(--cyan)" strokeWidth="1" />
              <line x1="35" y1="50" x2="45" y2="50" stroke="var(--cyan)" strokeWidth="1" />
              <polygon points="30,60 40,57 50,60 40,65" fill="none" stroke="var(--coral)" strokeWidth="1" />
              <circle cx="40" cy="5" r="2" fill="var(--cyan)" />
              <circle cx="60" cy="15" r="2" fill="var(--cyan)" />
              <circle cx="70" cy="35" r="2" fill="var(--cyan)" />
              <circle cx="65" cy="65" r="2" fill="var(--cyan)" />
              <circle cx="40" cy="80" r="2" fill="var(--cyan)" />
              <circle cx="15" cy="65" r="2" fill="var(--cyan)" />
              <circle cx="10" cy="35" r="2" fill="var(--cyan)" />
              <circle cx="20" cy="15" r="2" fill="var(--cyan)" />
              
              <line x1="30" y1="25" x2="40" y2="5" stroke="rgba(141, 216, 220, 0.2)" strokeWidth="0.5" />
              <line x1="50" y1="25" x2="40" y2="5" stroke="rgba(141, 216, 220, 0.2)" strokeWidth="0.5" />
              <line x1="30" y1="30" x2="10" y2="35" stroke="rgba(141, 216, 220, 0.2)" strokeWidth="0.5" />
              <line x1="55" y1="30" x2="70" y2="35" stroke="rgba(141, 216, 220, 0.2)" strokeWidth="0.5" />
              <line x1="35" y1="50" x2="15" y2="65" stroke="rgba(141, 216, 220, 0.2)" strokeWidth="0.5" />
              <line x1="45" y1="50" x2="65" y2="65" stroke="rgba(141, 216, 220, 0.2)" strokeWidth="0.5" />
              <line x1="40" y1="80" x2="40" y2="65" stroke="rgba(141, 216, 220, 0.2)" strokeWidth="0.5" />
            </g>

            {/* Target overlay */}
            <circle cx="150" cy="45" r="38" fill="none" stroke="var(--cyan)" strokeWidth="1" strokeDasharray="5 5" className="hud-rotate" />
            <path d="M 105 45 L 115 45 M 185 45 L 195 45 M 150 5 L 150 15 M 150 75 L 150 85" stroke="var(--cyan)" strokeWidth="1" />
            
            {/* Telemetry data */}
            <text x="10" y="25" fontSize="7" fill="var(--cyan)" fontFamily="monospace">CONFIDENCE: 98.4%</text>
            <text x="10" y="40" fontSize="7" fill="var(--paper-muted)" fontFamily="monospace">FPS: 60 // LAT: 4.2ms</text>
            <text x="10" y="55" fontSize="7" fill="var(--paper-muted)" fontFamily="monospace">MODEL: YOLOV8-TINY</text>

            <text x="290" y="25" fontSize="7" fill="var(--coral)" textAnchor="end" fontFamily="monospace">TARGET LOCKED</text>
            <text x="290" y="40" fontSize="7" fill="var(--paper-muted)" textAnchor="end" fontFamily="monospace">X: 142.08</text>
            <text x="290" y="55" fontSize="7" fill="var(--paper-muted)" textAnchor="end" fontFamily="monospace">Y: 88.51</text>
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
          <h3 className="panel-title">ENSINO // METODOLOGIA STEAM & MAKER</h3>
          <span className="panel-id">[LAB: EETEPA]</span>
        </header>
        <div className="hud-panel-body">
          <svg viewBox="0 0 300 100" className="hud-svg">
            {/* Teacher Node */}
            <circle cx="50" cy="50" r="14" fill="var(--bg)" stroke="var(--green)" strokeWidth="2" />
            <text x="50" y="54" fontSize="10" fill="var(--green)" textAnchor="middle" fontFamily="monospace" fontWeight="bold">PROF</text>

            {/* Wireless transmission waves */}
            <path d="M 75 40 Q 90 50 75 60" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 85 30 Q 105 50 85 70" fill="none" stroke="var(--green)" strokeWidth="1" />
            
            {/* Central classroom hub */}
            <rect x="120" y="30" width="60" height="40" fill="var(--bg)" stroke="var(--cyan)" strokeWidth="1.5" rx="3" />
            <text x="150" y="48" fontSize="8" fill="var(--cyan)" textAnchor="middle" fontFamily="monospace" fontWeight="bold">STEAM</text>
            <text x="150" y="58" fontSize="7" fill="var(--paper-muted)" textAnchor="middle" fontFamily="monospace">LABORATÓRIO</text>

            {/* Transmission to students */}
            <path d="M 195 40 Q 210 50 195 60" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeDasharray="3 3" />
            
            {/* Students Nodes */}
            <circle cx="240" cy="28" r="8" fill="var(--bg)" stroke="var(--green)" strokeWidth="1" />
            <circle cx="260" cy="50" r="8" fill="var(--bg)" stroke="var(--green)" strokeWidth="1" />
            <circle cx="240" cy="72" r="8" fill="var(--bg)" stroke="var(--green)" strokeWidth="1" />
            
            <text x="240" y="31" fontSize="7" fill="var(--paper)" textAnchor="middle" fontFamily="monospace">S1</text>
            <text x="260" y="53" fontSize="7" fill="var(--paper)" textAnchor="middle" fontFamily="monospace">S2</text>
            <text x="240" y="75" fontSize="7" fill="var(--paper)" textAnchor="middle" fontFamily="monospace">S3</text>

            {/* Connecting lines */}
            <line x1="180" y1="50" x2="220" y2="50" stroke="var(--green)" strokeWidth="1" />
            <line x1="180" y1="50" x2="232" y2="28" stroke="var(--green)" strokeWidth="1" />
            <line x1="180" y1="50" x2="232" y2="72" stroke="var(--green)" strokeWidth="1" />
          </svg>
        </div>
        <footer className="hud-panel-footer">
          <span>PROJETOS CURRICULARES: 24+</span>
          <span>AÇÃO: AUTORIA_ESTUDANTE</span>
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
            <div className="live-lab-visual" aria-hidden="true">
              <img src="/assets/lab-environment.png" alt="Laboratório Vivo" />
              <div className="hud-overlay">
                <span className="corner-tl" />
                <span className="corner-tr" />
                <span className="corner-bl" />
                <span className="corner-br" />
              </div>
              <span className="hud-visual-label">LAB_VIEW_CAM_01</span>
            </div>
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
