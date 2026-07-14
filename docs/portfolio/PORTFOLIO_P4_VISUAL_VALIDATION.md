# Validação Visual — P4

Este relatório documenta os testes de responsividade, layout, ausência de overflow horizontal e acessibilidade visual realizados nos três novos estudos de caso técnicos de Alberto Mateus Gama.

## 1. Grid de Resoluções Testadas

Todas as três rotas de estudos de caso (`/projects/igarix`, `/projects/openlake-rag`, `/projects/lab02-observability`) foram validadas localmente nas seguintes viewports simuladas, garantindo legibilidade e ausência de barra de rolagem horizontal:

*   **Desktop Standard (1440 × 900)**: Layout completo em duas colunas ou grades bem balanceadas.
*   **Notebook Compacto (1280 × 800)**: Elementos fluídos, sem sobreposições de fontes.
*   **Netbook / Tablet Landscape (1024 × 768)**: Encaixe perfeito do menu lateral e conteúdo central.
*   **Tablet Portrait (768 × 1024)**: Layout se reorganiza para fluxo vertical.
*   **Mobile Grandes (430 × 932, 390 × 844)**: Todos os cards e tabelas convertidos para exibição em 100% de largura.
*   **Mobile Pequenos (360 × 800, 320 × 720)**: Fontes escaladas adequadamente, zero overflow no rodapé ou na barra de busca (Command Palette).

## 2. Acessibilidade Visual dos Diagramas SVG

Os três diagramas SVG criados (`IgarixDiagram`, `OpenLakeDiagram`, `ObservabilityDiagram`) atendem às restrições de acessibilidade declaradas:

1.  **Sem Dependência de Cores**: Os nós possuem rótulos claros em texto de alto contraste e as conexões possuem diferentes estilos visuais de seta.
2.  **Rótulos Semânticos**: Cada SVG possui `title` e `desc` associados por `aria-labelledby`, sendo lidos corretamente por leitores de tela.
3.  **Movimento Reduzido**: Nenhum diagrama contém animações recorrentes de loop ou caminhos piscantes, em conformidade com as diretrizes `prefers-reduced-motion`.

## 3. Navegação e Contraste

*   Os atalhos de Command Palette são legíveis.
*   Os breadcrumbs oferecem uma trilha clara de retorno.
*   Todas as cores de fundo (`--color-surface-primary`) e bordas obedecem ao design padrão de "sistemas em camadas".
