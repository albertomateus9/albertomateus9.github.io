import Link from "next/link";
import type { ConceptProject } from "@/data/sol-portfolio-concept";
import styles from "@/app/lab/sol-portfolio-concept/concept.module.css";

export default function ProjectSignal({ project }: { project: ConceptProject }) {
  return (
    <article className={`${styles.projectCard} ${styles[`tone${project.tone[0].toUpperCase()}${project.tone.slice(1)}`]}`}>
      <div className={styles.projectMeta}>
        <span>{project.id}</span>
        <span>{project.signal}</span>
      </div>
      <p className={styles.eyebrow}>{project.eyebrow}</p>
      <h3>{project.name}</h3>
      <p>{project.thesis}</p>
      <ul aria-label={`Evidências de ${project.name}`}>
        {project.evidence.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <Link href={project.href}>Abrir evidências <span aria-hidden="true">↗</span></Link>
    </article>
  );
}
