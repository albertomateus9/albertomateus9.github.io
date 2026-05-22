import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const stylesheet = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
const app = readFileSync(new URL('./App.tsx', import.meta.url), 'utf8');

describe('hero portrait treatment', () => {
  it('keeps the portrait as a discreet framed signature in the hero', () => {
    expect(stylesheet).toContain('inline-size: min(100%, 18rem);');
    expect(stylesheet).toContain('aspect-ratio: 4 / 5;');
    expect(stylesheet).toContain('justify-self: center;');
  });

  it('renders the vector portrait instead of the former studio background', () => {
    expect(app).toContain('/assets/alberto-mateus-portrait-vector.svg');
    expect(app).not.toContain('/assets/alberto-mateus-portrait-cutout.webp');
    expect(app).not.toContain('/assets/alberto-mateus-portrait-mobile.webp');
  });
});
