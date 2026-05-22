# Portfólio Alberto Mateus

Site público de portfólio para `albertomateus9.github.io`, com uma Home curada e um catálogo filtrável dos repositórios públicos do GitHub.

## Destaques

- Narrativa bilíngue com Português-BR como idioma padrão.
- Direção visual Laboratório Vivo para Telecomunicações, Redes, Visão Computacional, IA aplicada e Educação Tecnológica.
- Casos em foco para WebCraft Studio, CampusWatch SNMP e Edge CV Benchmark.
- Radar técnico separado entre stack em uso, sinais observados e próximos experimentos.
- Catálogo gerado a partir de snapshot da GitHub API e manifesto manual em `src/data/curation.ts`.
- Retrato profissional discreto no hero com tratamento vetorial complementar.
- Dados públicos seguros: sem documentos pessoais, contatos privados ou dados de estudantes.

## Comandos

```bash
npm install
npm run collect:repos
npm test
npm run build
npm run dev
```

O snapshot de repositórios fica versionado em `src/data/github-repositories.json`. Para atualizar o catálogo, execute `npm run collect:repos`, revise o diff e publique a nova versão.

## Publicação

O workflow `pages.yml` compila o site Vite e publica o diretório `dist` no GitHub Pages.
