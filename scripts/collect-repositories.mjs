import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const owner = process.env.GITHUB_OWNER || 'albertomateus9';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(root, 'src', 'data', 'github-repositories.json');

function readGhToken() {
  if (process.env.GH_TOKEN) return process.env.GH_TOKEN;
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execFileSync('gh', ['auth', 'token'], { encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

const token = readGhToken();
const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'albertomateus9-portfolio-catalog',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function getJson(url) {
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status} for ${url}`);
  }

  return response.json();
}

function normalizeRepository(repo) {
  return {
    name: repo.name,
    description: repo.description || '',
    htmlUrl: repo.html_url,
    homepage: repo.homepage || '',
    topics: repo.topics || [],
    language: repo.language || '',
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    archived: Boolean(repo.archived),
    fork: Boolean(repo.fork),
    updatedAt: repo.updated_at || '',
  };
}

async function collectRepositories() {
  const repositories = [];

  for (let page = 1; ; page += 1) {
    const chunk = await getJson(
      `https://api.github.com/users/${owner}/repos?per_page=100&page=${page}&type=public&sort=updated`,
    );
    repositories.push(...chunk.map(normalizeRepository));
    if (chunk.length < 100) break;
  }

  repositories.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(repositories, null, 2)}\n`, 'utf8');

  console.log(`Collected ${repositories.length} public repositories for ${owner}.`);
}

await collectRepositories();
