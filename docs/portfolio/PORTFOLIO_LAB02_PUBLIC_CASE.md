# Estudo de Caso Lab 02 Observability — P4

Este documento registra a narrativa técnica pública e a fundamentação do case Lab 02 Observability.

## 1. Identificação do Case

*   **slug**: `lab02-observability`
*   **Nome**: Lab 02 Observability
*   **Resumo**: Monitoramento operacional local-first e telemetria de rede.
*   **Status**: `prototype` (Protótipo)
*   **Última Atualização**: 2026-07-08

## 2. Estrutura e Camadas de Monitoramento

A topologia de observabilidade lógica e sanitizada do laboratório compreende:

1.  **Coleta Local (Zabbix Agent 2)**: Instalado nas estações Linux/Windows Hosts, fornecendo telemetria térmica de CPU, consumo de memória RAM e integridade física de discos locais.
2.  **Coleta de Rede (SNMP)**: Telemetria de tráfego de interfaces de rede ativas (ex. túnel VPN WireGuard wg0) nos edge gateways legados.
3.  **Servidor de Observabilidade (Zabbix Server & DB)**: Orquestrador de monitoramento centralizado rodando localmente via Docker Compose, com banco de dados MySQL para persistência de logs históricos (cota de retenção de 30 dias).
4.  **Visualização Unificada (Grafana)**: Datasources importados via API JSON-RPC do Zabbix no bootstrap do container para gerar dashboards operacionais.
5.  **Módulo Pedagógico (Painel de Aula)**: Transposição de conceitos de SRE e redes de forma simples para os alunos na escola.

## 3. Decisões Arquiteturais Chave (ADRs)

*   **ADR-OBS-01 — Templates SNMP Restritos**: Evita sobrecarga de CPU em processadores de borda legados ao limitar a telemetria às portas físicas ativas.
*   **ADR-OBS-02 — Provisionamento Automático de Datasources**: Configuração declarativa via arquivos YAML do Grafana para subir a stack 100% pronta sem etapas manuais.

## 4. Proteção e Sanitização de Dados

*   Nenhum IP privado real (`10.x.x.x`, `192.168.x.x`), chave de comunidade SNMP (`public`, `private`), hostname administrativo real ou nome de estudante é publicado.
*   Nomes lógicos substitutos como `LAB-PC-01` e `Private Network` são adotados uniformemente.
