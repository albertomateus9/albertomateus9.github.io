# Portfolio Component API — P2

Todas as APIs são exports nomeados, exceto wrappers legados mantidos por compatibilidade. Props estendem atributos HTML quando isso preserva semântica e composição.

## Primitives

| Componente | API principal | Semântica e regras |
|---|---|---|
| `Button` | `variant`, `size`, `loading`, `fullWidth`, `iconStart`, `iconEnd` | Renderiza `button`; `type="button"` por padrão; loading/disabled removem handler e expõem `aria-busy` |
| `LinkButton` | `href`, variantes de `Button` | Renderiza `next/link`; usar para navegação, nunca para mutação |
| `Container` | `width: default/content/reading/full` | Limita largura e aplica gutter semântico |
| `Section` | `spacing: default/compact` | Renderiza `section`; IDs suportam navegação por âncora |
| `Stack` | `direction`, `gap`, `align` | Flex vertical, horizontal com wrap ou responsivo |
| `Grid` | `columns: 1/2/3/auto` | Grid fluido sem overflow em 320 px |
| `Card` | `variant`, `href`, `padded` | Renderiza `article`; quando `href` existe, o card inteiro é link |
| `Badge` | `tone` | Renderiza `span`; nunca simula botão; rótulo sempre visível |
| `Heading` | `level`, `size` | Nível semântico independente da escala visual |
| `Text` | `as`, `variant` | Corpo, secundário, small, caption e mono |
| `Divider` | atributos de `hr` | Separador sem conteúdo decorativo extra |
| `IconButton` | `ariaLabel`, `loading` | Exige nome não vazio e alvo de 44 × 44 px |
| `SkipLink` | `href` | Aponta para `#main-content` por padrão |
| `VisuallyHidden` | atributos de `span` | Conteúdo disponível a tecnologias assistivas |
| `ExternalLink` | atributos de `a` | Nova aba por padrão, `rel=noreferrer` e anúncio oculto |

## Composições do portfólio

| Componente | Uso |
|---|---|
| `PageHeader` | Eyebrow, H1, descrição e ações de abertura |
| `SectionHeader` | Título de seção existente, agora sobre `Heading` e `Text` |
| `ProjectCard` | Projeto real, status, stack, disclaimer e links internos/externos |
| `ProjectMetric` | Métrica compacta com status textual opcional |
| `EvidenceItem` | Evidência tipada, fonte, descrição e link verificável |
| `CapabilityLayer` | Camada numerada de um sistema full-cycle |
| `TimelineItem` | Marco, título e descrição em lista ordenada |
| `Callout` | Nota editorial, operacional ou de pesquisa |
| `TechnicalMetadata` | Pares `dt/dd` para metadados técnicos |
| `StatusIndicator` | Dot decorativo mais rótulo de estado sempre visível |
| `DiagramLegend` | Legenda HTML para diagramas e cores de domínio |
| `GraphNodeLabel` | Nó SVG reutilizável com variantes core/project/area |

## Exemplos

```tsx
<Button loading={isSaving}>Salvar</Button>

<IconButton ariaLabel="Adicionar evidência">
  <PlusIcon aria-hidden="true" />
</IconButton>

<Card href="/projects/igarix-os" variant="featured">
  <Heading level={3} size="heading3">IGARIX OS</Heading>
</Card>

<StatusIndicator status="prototype" />
```

## Regras de composição

- Não aninhar controles interativos em `Card href`.
- Não usar `Button` para trocar rota nem `LinkButton` para executar mutação.
- Escolher `Heading.level` pela hierarquia do documento, não pelo tamanho desejado.
- Toda ação icon-only precisa de `ariaLabel` contextual.
- Badges e status devem permanecer legíveis sem cor.
- Preferir exports dos índices `@/components/ui` e `@/components/portfolio`.
