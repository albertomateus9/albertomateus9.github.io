// Shared domain types for the Portfolio OS foundation.
// Content is data-driven; components render whatever these describe.

export type ProjectStatus =
  | "live" // publicly deployed and reachable
  | "active" // maintained / in progress
  | "prototype" // working proof of concept
  | "concept" // designed, not a public artifact
  | "research" // exploratory / academic
  | "archived";

export type ProjectCategory =
  | "platform"
  | "infrastructure"
  | "research"
  | "education"
  | "security"
  | "tooling";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  stack: string[];
  highlights: string[];
  year?: number;
  featured?: boolean;
  /** Shown as a clear label when the project is a demo/simulation/concept. */
  disclaimer?: string;
  links?: ProjectLink[];
}

export interface CaseStudy {
  slug: string;
  projectSlug: string;
  title: string;
  summary: string;
  problem: string;
  architecture: string;
  stack: string[];
  result: string;
  next: string;
}

export type PublicationType = "article" | "chapter" | "proceeding" | "preprint";

export interface Article {
  slug: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: PublicationType;
}

export type ModuleStatus = "active" | "prototype" | "concept" | "research";

export interface IgarixModule {
  id: string;
  name: string;
  group: "gateway" | "memory" | "execution" | "knowledge" | "platform" | "governance";
  role: string;
  description: string;
  status: ModuleStatus;
  dependsOn: string[];
}

export type EvidenceKind =
  | "repository"
  | "deployment"
  | "publication"
  | "documentation"
  | "screenshot"
  | "artifact";

export interface Evidence {
  id: string;
  title: string;
  kind: EvidenceKind;
  source: string;
  description: string;
  href?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  detail?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface Profile {
  name: string;
  shortName: string;
  headline: string;
  roles: string[];
  location: string;
  summary: string;
  concept: string;
  focusAreas: string[];
  contact: { email: string; note: string };
  links: ProjectLink[];
  education: EducationItem[];
  experience: ExperienceItem[];
}
