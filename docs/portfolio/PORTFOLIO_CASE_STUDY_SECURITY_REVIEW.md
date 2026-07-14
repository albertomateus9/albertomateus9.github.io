# Revisão de Segurança de Estudos de Caso — P4

Este documento registra as diretrizes de conformidade e o relatório de auditoria de segurança de dados para o portfólio público de Alberto Mateus Gama.

## 1. Diretriz de Exclusão de Segredos

O portfólio é hospedado publicamente e não pode expor dados sensíveis da infraestrutura real de Alberto Gama. As seguintes classes de dados são classificadas como estritamente privadas e são protegidas por testes de segurança automatizados:

1.  **Chaves e Tokens de Acesso**: Nenhuma chave SSH, tokens da VPS Hostinger, tokens do Dokploy, chaves de API Ollama/Ollama stubs ou tokens de banco de dados podem aparecer no código-fonte ou no texto.
2.  **Identificadores Escolares e Nomes de Alunos**: Nomes reais de estudantes, notas ou registros de presença de escolas de ensino técnico estão fora de escopo.
3.  **Endereços IP Privados Completos**: Padrões de rede interna (como IPs `10.x.x.x`, `192.168.x.x`, `172.16.x.x`) são convertidos em placeholders lógicos (`Private Network`).
4.  **Caminhos Absolutos de Arquivos (Windows/Linux)**: Caminhos contendo diretórios locais (como `D:\Users\alber\...` ou `/home/alber/...`) são ocultados em favor de caminhos relativos ao repositório.
5.  **Comunidades SNMP**: Strings de conexões e senhas de leitura SNMP (como `public` ou `private`) são totalmente sanitizadas.

## 2. Implementação do Security Scanner

Um teste automatizado (`src/__tests__/case-studies.test.ts`) atua como gate pré-commit para validar continuamente essas restrições, analisando todos os arquivos em `src/data` e `src/app/projects`:

*   *IPs Privados*: Regex `/\\b(?:10|192\\.168|172\\.(?:1[6-9]|2\\d|3[01]))\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b/`
*   *Caminhos Absolutos Windows/Linux*: Regex `/winPathRegex/` e `/linPathRegex/`
*   *Comunidades SNMP*: Varre atribuições do tipo `community = "string"` sem bloquear o uso ordinário de palavras isoladas como "public" ou "private".

## 3. Status da Auditoria

O scanner foi executado e todas as asserções passaram sem violações de segurança.
