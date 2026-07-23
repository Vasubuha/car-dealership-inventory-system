export const MARKETPLACE_SECTIONS = {
  HERO: 'hero',
  VEHICLES: 'vehicles',
  OFFERS: 'offers',
  COMPARE: 'compare',
  TESTIMONIALS: 'testimonials',
  CTA: 'cta',
  FOOTER: 'footer',
} as const;

export type MarketplaceSectionKey = keyof typeof MARKETPLACE_SECTIONS;
export type MarketplaceSectionValue = typeof MARKETPLACE_SECTIONS[MarketplaceSectionKey];
