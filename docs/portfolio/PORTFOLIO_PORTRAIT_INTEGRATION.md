# P3.1 — Integração do retrato de Alberto Mateus

## Origem

Fotografias reais fornecidas pelo autor, colocadas manualmente em `public/assets/` antes da sprint (não rastreadas): `portfólio.png` (1122×1402), `GitHub.png`, `LinkedIn.png`, `Currículo Lattes.png` (1254×1254 cada) — mesma sessão fotográfica, variantes de fundo. Nenhuma imagem foi buscada em rede social, gerada por IA ou retocada facialmente.

## Arquivos gerados (versionados)

| Arquivo | Fonte | Dimensões | Peso | Uso |
|---|---|---|---|---|
| `public/assets/profile/alberto-mateus.webp` | `portfólio.png` | 880×1100 (4:5) | 41,6 KB | Hero da home |
| `public/assets/profile/alberto-mateus-about.webp` | `LinkedIn.png` | 640×640 | 19,0 KB | Rota `/about` |

Processamento: redimensionamento Lanczos + WebP q84/q82 (Pillow). Os PNGs de origem não continham EXIF; os WebP gerados também não carregam metadata. Os originais permanecem intactos e **fora do versionamento** (têm destino próprio: GitHub, LinkedIn, Lattes) — apenas as versões otimizadas são commitadas.

Um `alberto-mateus-mobile.webp` (560×700) chegou a ser gerado e foi descartado: com import estático + `sizes`, o otimizador do `next/image` já emite srcset responsivo a partir do source único — um segundo arquivo seria redundância sem ganho.

## Integração técnica

- `next/image` com **import estático** (dimensões intrínsecas → CLS ≈ 0) em ambos os usos.
- Hero: `priority` (acima da dobra) e `sizes="(max-width: 40rem) 86vw, (max-width: 64rem) 22rem, 24rem"`.
- About: sem priority (carregamento padrão) e `sizes="(max-width: 48rem) 92vw, 24rem"`.
- Alt em ambos: `Retrato de Alberto Mateus` — sem descrição de características sensíveis.
- Hero usa `<figure>` + `<figcaption>` ("Alberto Mateus — engenharia, pesquisa e IA aplicada") e lista das quatro camadas full-cycle com `aria-label`.

## Tratamento visual

- Moldura técnica coerente com o design system: header mono `ALBERTO_MATEUS / FULL-CYCLE`, borda accent 0.34, `shadow-raised`.
- Gradiente CSS sutil no rodapé da imagem (integração tonal com o fundo escuro) — nenhum filtro altera tom de pele.
- Proibições respeitadas: sem holograma, neon, glitch, saturação, recorte facial agressivo ou animação sobre a fotografia.

## JSON-LD e imagem social

- `Person.image` adicionado ao schema da home apontando para `/assets/profile/alberto-mateus.webp` (caminho estável dentro de qualquer deploy deste código).
- `social-preview.jpg` (OG/Twitter) **não** foi alterada nesta sprint: um crop 1200×630 do retrato vertical ficaria mal composto sem trabalho dedicado de composição.
