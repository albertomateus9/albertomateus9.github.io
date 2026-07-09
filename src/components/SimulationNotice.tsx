import { simulationCopy } from '../data/simulation-copy';
import type { Locale } from '../types';

export function SimulationNotice({ locale }: { locale: Locale }) {
  const content = simulationCopy[locale];

  return (
    <aside className="simulation-notice" role="note" aria-label={content.title}>
      <strong>{content.title}</strong>
      <span>{content.body}</span>
    </aside>
  );
}
