import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/site";

const publicRoutes = ["", "/projects", "/research", "/teaching", "/about", "/contact", "/igarix", "/infrastructure", "/proof", "/articles", "/case-studies"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = publicRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route === "" ? "monthly" as const : "yearly" as const,
    priority: route === "" ? 1 : route === "/projects" ? 0.9 : 0.7,
  }));
  const projectEntries = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    changeFrequency: "yearly" as const,
    priority: project.featured ? 0.8 : 0.6,
  }));

  return [...staticEntries, ...projectEntries];
}
