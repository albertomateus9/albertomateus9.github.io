import type { Locale } from '../types';

interface SimulationContent {
  title: string;
  body: string;
  workspaceStatus: string;
  status: string;
  network: string;
  telemetry: string;
  trigger: string;
  processing: string;
  complete: string;
  success: string;
  recordsTitle: string;
  empty: string;
}

export const simulationCopy: Record<Locale, SimulationContent> = {
  pt: {
    title: 'Simulação local',
    body: 'Fluxo demonstrativo executado apenas neste navegador. Nenhum dado é enviado ou persistido.',
    workspaceStatus: 'DEMO LOCAL',
    status: 'STATUS: SIMULAÇÃO',
    network: 'REDE: 192.0.2.0/24 (EXEMPLO)',
    telemetry: 'DADOS: MEMÓRIA LOCAL',
    trigger: 'Executar simulação local',
    processing: 'Simulando...',
    complete: 'Simulação concluída',
    success: 'SIMULAÇÃO OK — nenhum dado enviado',
    recordsTitle: 'Registros simulados nesta sessão',
    empty: 'Nenhum registro simulado nesta sessão.',
  },
  en: {
    title: 'Local simulation',
    body: 'Demonstration flow running only in this browser. No data is sent or stored.',
    workspaceStatus: 'LOCAL DEMO',
    status: 'STATUS: SIMULATION',
    network: 'NETWORK: 192.0.2.0/24 (EXAMPLE)',
    telemetry: 'DATA: LOCAL MEMORY',
    trigger: 'Run local simulation',
    processing: 'Simulating...',
    complete: 'Simulation complete',
    success: 'SIMULATION OK — no data sent',
    recordsTitle: 'Simulated records in this session',
    empty: 'No simulated records in this session.',
  },
};
