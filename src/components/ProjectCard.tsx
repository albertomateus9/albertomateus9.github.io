import Link from "next/link";
import type { Project } from "@/types";
import { StatusIndicator } from "@/components/portfolio";
import { Badge, Card, ExternalLink, Heading, Stack, Text } from "@/components/ui";
import styles from "@/components/portfolio/portfolio.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  return <Card className={styles.projectCard} variant={project.featured ? "featured" : "neutral"}><Stack gap={4}><Stack direction="horizontal" gap={3}><div><Heading level={3} size="heading3"><Link href={`/projects/${project.slug}`}>{project.name}</Link></Heading><Text variant="small">{project.tagline}</Text></div><StatusIndicator status={project.status} /></Stack><Text variant="small">{project.description}</Text>{project.disclaimer ? <Text variant="caption" className={styles.disclaimer}>{project.disclaimer}</Text> : null}<Stack direction="horizontal" gap={2}>{project.stack.slice(0, 5).map((tech) => <Badge key={tech}>{tech}</Badge>)}{project.stack.length > 5 ? <Text as="span" variant="caption">+{project.stack.length - 5}</Text> : null}</Stack><div className={styles.projectLinks}><Link href={`/projects/${project.slug}`}>Detalhes →</Link>{project.links?.map((link) => link.href.startsWith("/") ? <Link key={link.href} href={link.href}>{link.label}</Link> : <ExternalLink key={link.href} href={link.href}>{link.label}</ExternalLink>)}</div></Stack></Card>;
}
