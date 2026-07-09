import { projects } from "@/data/projects";
import type { Project } from "@/types";

export { projects };

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function projectsByCategory(category: Project["category"]): Project[] {
  return projects.filter((p) => p.category === category);
}

export const featuredProjects = projects.filter((p) => p.featured);
