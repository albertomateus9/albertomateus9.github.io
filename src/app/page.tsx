import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { contactEmails, profile } from "@/data/profile";
import { siteConfig } from "@/lib/site";
import styles from "@/components/home/personal.module.css";
import portrait from "../../public/assets/alberto-mateus-portrait-real-cutout.webp";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const explorations = [
  { number: "01", title: "Automatizar o repetitivo.", text: "Python, APIs e scripts para gastar menos tempo com tarefas mecânicas e mais tempo entendendo o problema.", tag: "Python / automação" },
  { number: "02", title: "Olhar para o que a máquina vê.", text: "No doutorado em Computação Aplicada, exploro visão computacional e análise de vídeos. Ainda há muita pergunta aberta. É justamente isso que me interessa.", tag: "IA / visão computacional" },
  { number: "03", title: "Abrir a caixa-preta.", text: "Linux, redes, dados e ferramentas de código aberto. Gosto de poder experimentar, adaptar e rodar as coisas na minha própria máquina.", tag: "Linux / redes / dados" },
];

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Person", "@id": siteConfig.url + "/#person", name: profile.name, url: siteConfig.url, sameAs: profile.links.map(({ href }) => href) },
      { "@type": "WebSite", url: siteConfig.url, name: siteConfig.name, inLanguage: "pt-BR", author: { "@id": siteConfig.url + "/#person" } },
    ],
  };
  return (
    <div className={styles.home}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.statusDot} aria-hidden="true" /> Belém, Pará · Brasil</p>
          <p className={styles.greeting}>Oi, eu sou o Alberto <span className={styles.wave} aria-hidden="true">👋</span></p>
          <h1 id="home-title" className={styles.title}>Código, aulas<br />e <span>curiosidade.</span></h1>
          <p className={styles.intro}>Dev, professor de cursos técnicos e um eterno aprendiz. Ainda no doutorado em Computação Aplicada, sempre com mais uma coisa para entender.</p>
          <div className={styles.actions}>
            <a className={styles.primaryButton} href="#curiosidade">O que estou explorando <span aria-hidden="true">↓</span></a>
            <Link className={styles.secondaryButton} href="/contact">Bora conversar? <span aria-hidden="true">↗</span></Link>
          </div>
          <p className={styles.sideNote}>{"// aprender também faz parte do trabalho."}</p>
        </div>
        <figure className={styles.portraitWindow}>
          <div className={styles.windowBar}><span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span><span>alberto.py</span><span aria-hidden="true">⌘</span></div>
          <div className={styles.portraitStage}>
            <span className={styles.orbit} aria-hidden="true" />
            <Image src={portrait} alt="Retrato de Alberto Mateus" priority sizes="(max-width: 720px) 85vw, 420px" className={styles.portrait} />
            <span className={styles.sticker}>eterno<br /><strong>aprendiz ✳</strong></span>
            <Image src="/assets/learning-bot.svg" alt="" width={88} height={113} unoptimized className={styles.robot} />
          </div>
          <figcaption className={styles.windowCaption}><code><span>while</span> curioso:<br />&nbsp;&nbsp;aprender()<span className={styles.cursor} aria-hidden="true">▍</span></code><span className={styles.captionTag}>desde Belém 🌴</span></figcaption>
        </figure>
      </section>

      <section id="curiosidade" className={styles.section} aria-labelledby="curiosity-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>01 / abas abertas</p><h2 id="curiosity-title">Sempre tem algo<br />para <em>descobrir.</em></h2><p>Alguns assuntos que vivem entre o meu terminal, as aulas e os experimentos.</p></div>
        <div className={styles.explorations}>
          {explorations.map((item) => <article className={styles.exploration} key={item.number}><span className={styles.number}>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p><span className={styles.topicTag}>{item.tag}</span></div></article>)}
        </div>
        <div className={styles.toolbox}><span>Na mochila:</span>{["Python", "JavaScript", "TypeScript", "React", "SQL", "Linux", "Docker", "Git"].map((tool) => <span className={styles.tool} key={tool}>{tool}</span>)}</div>
      </section>

      <section id="ensino" className={styles.teachingSection} aria-labelledby="teaching-title">
        <div><p className={styles.darkEyebrow}>02 / do terminal para a sala de aula</p><h2 id="teaching-title">Ensinar é outro jeito<br />de continuar aprendendo.</h2><p>Sou professor de cursos técnicos na EETEPA Vilhena Alves. Trabalho com Informática, Redes de Computadores e Ciência de Dados, conectando fundamentos, prática e perguntas que fazem pensar.</p><Link href="/teaching" className={styles.darkLink}>Mais sobre as aulas <span aria-hidden="true">↗</span></Link></div>
        <div className={styles.classroomNote}><span aria-hidden="true">✳</span><p>A ideia é entender,<br />testar, errar,<br /><strong>e tentar de novo.</strong></p><span className={styles.noteCaption}>vale para quem ensina também.</span></div>
      </section>

      <section id="fora-do-terminal" className={styles.interestsSection} aria-labelledby="interests-title">
        <div><p className={styles.eyebrow}>03 / fora do terminal</p><h2 id="interests-title">Nem toda curiosidade<br />precisa virar código.</h2><p>Rock, os primeiros passos no violão, astronomia e leituras que passeiam entre física, filosofia e tecnologia. Minha lista de interesses cresce mais rápido que o tempo disponível.</p></div>
        <ul className={styles.interestList} aria-label="Interesses pessoais"><li>🎸 <span>Rock &amp; violão</span></li><li>🪐 <span>Astronomia</span></li><li>📚 <span>Física &amp; filosofia</span></li></ul>
      </section>

      <aside className={styles.alphaNote} aria-label="Estado dos experimentos"><span className={styles.alphaTag}>alpha</span><p>Este espaço também é um laboratório. Os projetos estão em alpha: tem rascunho, experimento e coisa que ainda vai mudar bastante.</p><a href="https://github.com/albertomateus9" target="_blank" rel="noreferrer">Abrir o GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (abre em nova aba)</span></a></aside>

      <section id="contact" className={styles.contactSection} aria-labelledby="contact-title"><p className={styles.eyebrow}>04 / troca de ideias</p><h2 id="contact-title">Tem alguma coisa<br />na sua cabeça<span>?</span></h2><p>Vamos conversar sobre código aberto, automação, IA, redes ou alguma ideia que também esteja em alpha.</p><div className={styles.emailList}>{contactEmails.map(({ label, email }) => <a href={"mailto:" + email} key={email}><span>{label}</span><strong>{email}</strong><span aria-hidden="true">↗</span></a>)}</div></section>
    </div>
  );
}
