# Alberto Mateus · código, aulas e curiosidade

Portfólio pessoal de um dev em Belém, professor de cursos técnicos e eterno aprendiz no doutorado em Computação Aplicada.

A apresentação principal prioriza interesses, ensino, aprendizado e contatos. Os projetos em alpha não aparecem como vitrine na página inicial. As rotas anteriores continuam disponíveis, e os laboratórios permanecem fora da indexação.

## Rodar localmente

Node.js 22 e npm 10 ou superior:

```bash
npm ci
npm run dev
```

## Verificações

```bash
npm test
npm run typecheck
npm run lint
```

## Publicar no GitHub Pages

```bash
npm run build:pages
```

O script gera a pasta `out/` a partir de uma cópia temporária do projeto. Nessa cópia, exclui o proxy, a API de health e os testes, torna o arquivo robots estático e configura a exportação HTML do Next.js. A imagem usa arquivos locais e não depende de um servidor de otimização.

O workflow `.github/workflows/pages.yml` verifica testes e tipos, gera a exportação e publica `out/` a cada push em `main`.

## Build de servidor

```bash
npm run build
npm run start
```

O build padrão continua em modo standalone. O proxy de staging, os headers, redirects, a API de health e os arquivos de contêiner permanecem disponíveis para as implantações existentes.

## Conteúdo e visual

- Página inicial: `src/app/page.tsx`.
- Visual da apresentação: `src/components/home/personal.module.css`.
- Sobre, ensino e contato: `src/app/{about,teaching,contact}/page.tsx`.
- Contatos e perfil: `src/data/profile.ts`.
- Menu e rodapé: `src/components/{TopNav,Footer}.tsx`.
- Os três e-mails são os canais públicos informados pelo autor.
- Animações usam CSS/SVG e respeitam a preferência por movimento reduzido.

## Referências

Referências de direção visual e linguagem, sem copiar código ou assets:

- [Cassidy Williams](https://cassidoo.co/): apresentação pessoal e interesses além do trabalho.
- [Josh W. Comeau](https://www.joshwcomeau.com/): animações e pequenas interações em interfaces.
- [Guia de exportação estática do Next.js](https://nextjs.org/docs/app/guides/static-exports).

Documentação anterior em `docs/portfolio/` registra a evolução histórica do projeto.
