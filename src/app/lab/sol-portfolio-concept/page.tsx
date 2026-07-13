import type { Metadata } from "next";
import Link from "next/link";
import { TimelineItem } from "@/components/portfolio";
import { Heading, LinkButton, Text } from "@/components/ui";
import FullCycleMap from "@/components/sol-concept/FullCycleMap";
import KnowledgeGraph from "@/components/sol-concept/KnowledgeGraph";
import ProjectSignal from "@/components/sol-concept/ProjectSignal";
import { conceptProjects } from "@/data/sol-portfolio-concept";
import styles from "./concept.module.css";

export const metadata: Metadata = {
  title: "Sol Portfolio Concept Lab",
  description: "Conceito isolado para o futuro portfólio full-cycle de Alberto Mateus.",
  robots: { index: false, follow: false },
};

const researchSignals = [
  ["Video-LLMs", "Análise multimodal com privacidade e revisão humana."],
  ["77 GHz", "Dispositivos de micro-ondas para aplicações automotivas."],
  ["Educação", "Laboratórios técnicos orientados por problemas reais."],
];

const trajectory = [
  ["Base física", "Telecomunicações · redes · eletromagnetismo"],
  ["Camada digital", "Sistemas · software · dados"],
  ["Inteligência aplicada", "Visão computacional · agentes · RAG"],
  ["Multiplicação", "Pesquisa · ensino · direção técnica"],
];

export default function SolPortfolioConceptPage() {
  return (
    <div className={styles.concept}>
      <nav className={styles.conceptNav} aria-label="Navegação do conceito">
        <span><i aria-hidden="true" /> SOL / CONCEPT 01</span>
        <a href="#flagships">Projetos</a>
        <a href="#research">Pesquisa</a>
        <a href="#contact">Contato</a>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroSignal} aria-hidden="true">
          <span>FULL-CYCLE SYSTEMS</span>
          <span>01 — 06</span>
        </div>
        <div className={styles.heroCopy}>
          <Text variant="caption" className={styles.eyebrow}>Engenharia · software · inteligência</Text>
          <Heading level={1} size="display">Entre o mundo físico e a inteligência, eu construo o sistema inteiro.</Heading>
          <Text variant="secondary" className={styles.heroLead}>
            Alberto Mateus projeta, integra e opera soluções que atravessam telecomunicações, infraestrutura,
            software, dados e IA — com método científico e responsabilidade de produção.
          </Text>
          <div className={styles.heroActions}>
            <LinkButton href="#flagships">Ver sistemas em campo</LinkButton>
            <LinkButton href="/proof" variant="secondary">Examinar evidências</LinkButton>
          </div>
        </div>
        <aside className={styles.heroPanel} aria-label="Resumo operacional">
          <div><span>Base</span><strong>Belém · Brasil</strong></div>
          <div><span>Escala</span><strong>hardware → IA</strong></div>
          <div><span>Modo</span><strong>pesquisa + entrega</strong></div>
          <div><span>Operação</span><strong>local · edge · VPS</strong></div>
          <div className={styles.heroPulse}><i aria-hidden="true" /> disponível para sistemas ambiciosos</div>
        </aside>
      </header>

      <section className={styles.statement} aria-labelledby="statement-title">
        <p className={styles.sectionNumber}>01 / tese</p>
        <div>
          <h2 id="statement-title">Especialização vertical. Visão horizontal.</h2>
          <p>
            A vantagem não está em acumular stacks. Está em compreender as interfaces entre sinal, rede,
            aplicação, dado, modelo e operação — e transformar essas fronteiras em decisões coerentes.
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="cycle-title">
        <div className={styles.sectionHeader}>
          <div><p className={styles.sectionNumber}>02 / mapa de atuação</p><h2 id="cycle-title">Do sinal à decisão</h2></div>
          <p>Seis camadas, uma responsabilidade contínua.</p>
        </div>
        <FullCycleMap />
      </section>

      <section className={styles.section} id="flagships" aria-labelledby="flagships-title">
        <div className={styles.sectionHeader}>
          <div><p className={styles.sectionNumber}>03 / flagship systems</p><h2 id="flagships-title">Projetos que provam amplitude</h2></div>
          <p>Não são ilhas: cada projeto testa uma parte do mesmo sistema de competências.</p>
        </div>
        <div className={styles.projectGrid}>
          {conceptProjects.map((project) => <ProjectSignal key={project.id} project={project} />)}
        </div>
      </section>

      <section className={styles.igarixBlock} aria-labelledby="igarix-title">
        <div className={styles.igarixCopy}>
          <p className={styles.eyebrow}>IGARIX / sistema operacional de agentes e modelos</p>
          <h2 id="igarix-title">Inteligência com memória, limites e contexto.</h2>
          <p>
            Um núcleo para rotear modelos, coordenar agentes, preservar decisões de projeto e executar ações sob
            políticas explícitas. Local-first quando a privacidade pede; VPS quando a disponibilidade importa.
          </p>
          <Link href="/igarix" className={styles.textLink}>Explorar arquitetura do IGARIX <span aria-hidden="true">→</span></Link>
        </div>
        <div className={styles.igarixDiagram} role="img" aria-label="Camadas do IGARIX: gateways, memória, execução e governança">
          <div className={styles.kernel}>IGARIX<small>core</small></div>
          <div className={styles.orbit}><span>Model<br />Gateway</span><span>Agent<br />Gateway</span><span>Project<br />Memory</span><span>Execution<br />Layer</span></div>
          <p>governance boundary</p>
        </div>
      </section>

      <section className={styles.research} id="research" aria-labelledby="research-title">
        <div className={styles.sectionHeader}>
          <div><p className={styles.sectionNumber}>04 / pesquisa aplicada</p><h2 id="research-title">Perguntas difíceis, sistemas verificáveis</h2></div>
          <p>Pesquisa como instrumento de rigor — não como ornamento curricular.</p>
        </div>
        <div className={styles.researchGrid}>
          {researchSignals.map(([title, body], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>
          ))}
        </div>
      </section>

      <section className={styles.graphSection} id="knowledge-graph" aria-labelledby="graph-section-title">
        <div className={styles.graphCopy}>
          <p className={styles.sectionNumber}>05 / knowledge graph</p>
          <h2 id="graph-section-title">O valor está nas relações.</h2>
          <p>
            Uma futura interface de conhecimento revelará como decisões, publicações, competências e projetos se
            reforçam. Nesta demonstração, o grafo comunica estrutura sem acessar notas privadas.
          </p>
          <Link href="/igarix" className={styles.textLink}>Ver ecossistema IGARIX <span aria-hidden="true">→</span></Link>
        </div>
        <KnowledgeGraph />
      </section>

      <section className={styles.trajectory} aria-labelledby="trajectory-title">
        <div className={styles.sectionHeader}>
          <div><p className={styles.sectionNumber}>06 / trajetória</p><h2 id="trajectory-title">Uma carreira construída por camadas</h2></div>
          <p>Da infraestrutura física à direção de sistemas inteligentes.</p>
        </div>
        <ol>
          {trajectory.map(([title, body], index) => (
            <TimelineItem key={title} marker={String(index + 1).padStart(2, "0")} title={title} description={body} />
          ))}
        </ol>
      </section>

      <section className={styles.finalCta} id="contact" aria-labelledby="contact-title">
        <p className={styles.eyebrow}>Parcerias · produtos · pesquisa aplicada</p>
        <h2 id="contact-title">Qual sistema precisa existir agora?</h2>
        <p>Converse sobre uma arquitetura, um laboratório ou um produto que exija visão além de uma única camada.</p>
        <div className={styles.heroActions}>
          <LinkButton href="/contact">Iniciar uma conversa</LinkButton>
          <LinkButton href="/projects" variant="secondary">Explorar todos os projetos</LinkButton>
        </div>
      </section>
    </div>
  );
}
