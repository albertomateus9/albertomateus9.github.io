# Política de Manutenção do Portfólio

Este documento estabelece as regras e o ciclo de manutenção do portfólio de Alberto Mateus Gama a partir da release estável v1.0.0, visando a preservação do código e a transição de foco profissional integral para a tese de doutorado.

## 1. Congelamento de Funcionalidades (Feature Freeze)

Fica estabelecido o congelamento permanente de novas funcionalidades da interface.
Não são permitidas:
- Alterações na direção visual ou layout (grid, cores, tipografia).
- Adições de novas páginas, efeitos visuais ou interações.
- Re-arquiteturas ou migrações de frameworks adicionais.

## 2. Escopo de Atualizações Autorizadas

Apenas as seguintes classes de modificações são autorizadas no repositório principal:
1. **Correções de Segurança Críticas**: Atualizações de dependências via Dependabot ou patches manuais quando identificadas vulnerabilidades de alta ou crítica severidade (CVSS >= 7.0).
2. **Atualização de Conteúdo Curricular**: Modificações em dados profissionais como adição de publicações acadêmicas na página `/research`, novas disciplinas ministradas em `/teaching` ou novos dados de contato.
3. **Erros Factuais e Links Quebrados**: Ajustes em hiperlinks de projetos, descrições factuais de arquiteturas de stubs ou correções gramaticais.

## 3. Frequência de Revisão

As revisões e auditorias do portfólio serão executadas trimestralmente pelo próprio desenvolvedor, garantindo a integridade dos certificados TLS, funcionamento de endpoints externos e verificação de integridade no Dokploy.
