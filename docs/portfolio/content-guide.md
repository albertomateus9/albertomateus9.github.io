# Guia de Atualização de Conteúdo

O **Portfolio OS** é totalmente data-driven. Toda informação exibida nas telas é lida de arquivos de dados estáticos localizados em `src/data/`. Esse modelo facilita atualizações sem necessidade de alterar a estrutura de componentes ou lidar com bancos de dados.

Este guia orienta como atualizar, incluir ou remover conteúdo de forma segura e em conformidade com as tipagens e regras do projeto.

---

## 1. Regras de Integridade e Tipagem
Toda alteração de dados deve respeitar estritamente as tipagens definidas em [src/types/index.ts](file:///d:/Users/alber/Organizado/Projetos/albertomateus9.github.io/src/types/index.ts).

Para garantir que o código compilará sem erros, você pode rodar a verificação de tipos localmente:
```bash
npm run typecheck
```

---

## 2. Como Adicionar um Novo Projeto
Os projetos ficam em [src/data/projects.ts](file:///d:/Users/alber/Organizado/Projetos/albertomateus9.github.io/src/data/projects.ts). Cada projeto segue a interface `Project`:

```typescript
export interface Project {
  slug: string;        // Identificador único na URL (letras minúsculas e hífens)
  name: string;        // Nome público do projeto
  tagline: string;     // Linha de descrição curta
  description: string;  // Parágrafo detalhado explicativo
  category: ProjectCategory; // "platform" | "infrastructure" | "research" | "education" | "security" | "tooling"
  status: ProjectStatus;     // "live" | "active" | "prototype" | "concept" | "research" | "archived"
  stack: string[];     // Array de tecnologias utilizadas
  highlights: string[]; // Três pontos principais em destaque
  year?: number;       // Ano de criação/execução
  featured?: boolean;  // Se true, aparece em destaque na Home
  disclaimer?: string; // Obrigatório para "concept" ou simulações/demos
  links?: ProjectLink[]; // Links para repositórios ou demonstrações
}
```

### Exemplo de entrada:
```typescript
{
  slug: "novo-projeto-redes",
  name: "Automação OSPF/BGP",
  tagline: "Script de provisionamento automático de roteamento.",
  description: "Script desenvolvido para automatizar a subida de sessões BGP e adjacências OSPF em equipamentos de borda.",
  category: "infrastructure",
  status: "active",
  stack: ["Python", "Netmiko", "YAML"],
  highlights: [
    "Suporte a múltiplos vendors",
    "Validação prévia de sintaxe",
    "Geração de logs detalhados"
  ],
  year: 2026,
  links: [
    { label: "Repositório", href: "https://github.com/albertomateus9/automacao-ospf" }
  ]
}
```

> [!IMPORTANT]
> Se o projeto for um **Conceito** (`status: "concept"`), você **deve** incluir um `disclaimer` explicando que se trata de uma simulação local ou modelo conceitual para ensino, sem expor endpoints, redes internas ou produzir dados de testes simulados.

---

## 3. Como Adicionar uma Publicação / Artigo
As publicações ficam em [src/data/articles.ts](file:///d:/Users/alber/Organizado/Projetos/albertomateus9.github.io/src/data/articles.ts). O arquivo exporta um array de `Article`:

```typescript
export interface Article {
  slug: string;       // Identificador único
  title: string;      // Título do artigo ou capítulo
  authors: string;    // Nomes dos autores na formatação padrão ABNT
  venue: string;      // Periódico, livro ou congresso de publicação
  year: number;       // Ano da publicação
  type: PublicationType; // "article" | "chapter" | "proceeding" | "preprint"
}
```

### Exemplo de entrada:
```typescript
{
  slug: "ia-e-redes-telecom",
  title: "Aplicação de IA no Planejamento de Enlaces de Telecomunicações",
  authors: "GAMA, A.M.; SOUZA, J. R.",
  venue: "Congresso de Telecomunicações da Amazônia",
  year: 2026,
  type: "proceeding",
}
```

---

## 4. Como Adicionar Evidências Públicas
As evidências servem para provar publicamente claims de deploys ou repositórios, e ficam em [src/data/evidence.ts](file:///d:/Users/alber/Organizado/Projetos/albertomateus9.github.io/src/data/evidence.ts). Cada registro segue a interface `Evidence`:

```typescript
export interface Evidence {
  id: string;          // Identificador único
  title: string;       // Título explicativo da prova
  kind: EvidenceKind;  // "repository" | "deployment" | "publication" | "documentation" | "screenshot" | "artifact"
  source: string;      // Onde a prova está hospedada (ex: GitHub, CNPq)
  description: string; // Descrição textual da verificação
  href?: string;       // Link URL para consulta direta pública
}
```

---

## 5. Cuidados de Hardening de Conteúdo
Ao publicar novas informações, certifique-se de que:
* **Não existam dados pessoais**: Sem nomes de alunos, turmas específicas, notas ou identidades de terceiros.
* **Sem credenciais**: Jamais coloque chaves de API, senhas, tokens ou arquivos `.env` no repositório.
* **Sem endereços de redes internas**: Não utilize faixas de IPs internos como `10.x.x.x` ou `192.168.x.x` reais, nomes de servidores privados ou URLs de intranets corporativas.
* **Não crie falsas métricas**: Evite números estatísticos vagos ou não comprovados (ex: "melhoria de 80% na rede" ou "milhares de acessos diários"). Use sempre enquadramento cauteloso e neutro.
