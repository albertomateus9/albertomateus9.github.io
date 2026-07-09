export type PortfolioView = 'home' | 'catalogo';

export const scrollResetOptions: ScrollToOptions = {
  top: 0,
  left: 0,
  behavior: 'auto',
};

export function getPortfolioView(hash: string): PortfolioView {
  return hash === '#catalogo' ? 'catalogo' : 'home';
}
