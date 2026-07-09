import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const app = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');
const stylesheet = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
const portfolio = readFileSync(new URL('./data/portfolio.ts', import.meta.url), 'utf8');
const simulationCopyPath = fileURLToPath(new URL('./data/simulation-copy.ts', import.meta.url));
const simulationNoticePath = fileURLToPath(new URL('./components/SimulationNotice.tsx', import.meta.url));
const viewNavigationPath = fileURLToPath(new URL('./lib/view-navigation.ts', import.meta.url));

describe('P2 public hardening contracts', () => {
  it('resets scroll when the hash-based view changes', () => {
    expect(existsSync(viewNavigationPath)).toBe(true);
    expect(app).toContain('window.scrollTo(scrollResetOptions);');
  });

  it('uses an intermediate responsive grid for catalog filters', () => {
    expect(stylesheet).toContain('@media (max-width: 1600px) and (min-width: 1181px)');
    expect(stylesheet).toContain('grid-template-columns: repeat(3, minmax(0, 1fr));');
    expect(stylesheet).toMatch(
      /@media \(max-width: 820px\)[\s\S]*?\.catalog-sidebar\s*\{[\s\S]*?display:\s*none;/,
    );
  });

  it('identifies the interactive workflow as a local non-persistent simulation', () => {
    expect(existsSync(simulationCopyPath)).toBe(true);
    expect(existsSync(simulationNoticePath)).toBe(true);

    const simulationCopy = readFileSync(simulationCopyPath, 'utf8');
    expect(simulationCopy).toContain('Simulação local');
    expect(simulationCopy).toContain('Nenhum dado é enviado ou persistido');
    expect(simulationCopy).toContain('Local simulation');
    expect(simulationCopy).toContain('No data is sent or stored');
    expect(app).not.toContain('Lead salvo no Supabase');
    expect(app).not.toContain('IP: 10.20.30.0/24');
    expect(app).not.toMatch(/ENV: PRODUCTION|SYS: ACTIVE|STATUS: ACTIVE|PIPELINE: ACTIVE/);
    expect(app).not.toMatch(/\b10\.\d+\.\d+\.\d+|\b192\.168\.\d+\.\d+/);
  });

  it('avoids unsupported quantitative and clinical claims', () => {
    expect(portfolio).not.toMatch(/time-to-market em 60%|thousands of daily events|milhares de eventos diários/i);
    expect(portfolio).not.toMatch(/Diagnóstico de TEA|ASD Diagnostics/i);
    expect(portfolio).not.toMatch(/Acurácia de 94%|94% accuracy/i);
    expect(portfolio).not.toMatch(/\blevel:\s*\d+/);
    expect(app).not.toMatch(/MATCH: 99\.2%|STUDENTS: 24|DEV_RATE: 82%|PROJECTS?: 24\+/);
    expect(app).not.toContain('Métricas reais de proficiência');
  });
});
