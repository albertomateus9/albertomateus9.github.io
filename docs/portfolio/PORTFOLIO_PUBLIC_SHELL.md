# Portfolio Public Shell — P3

## Contrato

O shell público fornece uma moldura única para todas as rotas: SkipLink, TopNav, `main#main-content` e Footer. O container global limita a largura a 1400 px; a home usa internamente o container semântico de 1280 px da P2.

## Navegação

| Destino | Papel |
|---|---|
| `/projects` | Sistemas e artefatos |
| `/research` | Método e publicações |
| `/teaching` | Laboratórios e prática |
| `/lab` | Conceitos públicos auxiliares |
| `/about` | Trajetória |
| `/contact` | CTA prioritário |

A marca conduz à home e não aumenta a contagem de destinos de navegação. O estado ativo considera igualdade e descendência, portanto `/projects/openlake-rag` mantém `Projetos` com `aria-current="page"`.

## Desktop e mobile

- Desktop exibe cinco links e um CTA de contato.
- Abaixo de 1024 px, um disclosure nativo expõe os mesmos seis destinos.
- Botão e itens móveis têm no mínimo 44 px de altura.
- Escape fecha o menu e devolve foco ao botão.
- O menu fecha após seleção; não cria modal nem bloqueia o scroll da página.
- Foco visível, SkipLink e reduced motion vêm da fundação P2.

## Footer

O rodapé repete somente a navegação essencial, identifica localização e posicionamento profissional e oferece GitHub, LinkedIn e Currículo Lattes como links externos anunciados para tecnologias assistivas. Nenhum endereço provisório é exibido.

## Metadata e indexação

- O layout raiz define identidade, descrição, autoria, keywords, OG, Twitter e robots indexável.
- A home adiciona canonical `/` e JSON-LD.
- `/lab`, `/lab/design-system`, `/lab/sol-portfolio-concept` e `/lab/legacy-home` usam `noindex, nofollow`.
- `robots.txt` também desautoriza `/lab/`; o sitemap omite labs.

## Progressive enhancement

Todo conteúdo da home e do footer é Server Component e chega no HTML. O único Client Component do shell é `TopNav`, necessário para o disclosure móvel e estado de rota. Sem JavaScript, a home continua legível e os links desktop permanecem no documento.
