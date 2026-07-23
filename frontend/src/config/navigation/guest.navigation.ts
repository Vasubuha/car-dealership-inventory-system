import { MARKETPLACE_SECTIONS } from '../../constants/marketplaceSections';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  isSection: boolean;
  sectionId?: string;
}

export const GUEST_NAV_ITEMS: NavItem[] = [
  { id: 'categories', label: 'Categories', href: '#categories', isSection: true, sectionId: 'categories' },
  { id: 'inventory', label: 'Inventory', href: '#inventory', isSection: true, sectionId: 'inventory' },
  { id: 'search', label: 'Search', href: '#search', isSection: true, sectionId: 'search' },
  { id: 'why-us', label: 'Why Us', href: '#why-us', isSection: true, sectionId: 'why-us' },
  { id: 'testimonials', label: 'Testimonials', href: '#testimonials', isSection: true, sectionId: MARKETPLACE_SECTIONS.TESTIMONIALS },
  { id: 'pricing', label: 'Pricing', href: '#pricing', isSection: true, sectionId: 'pricing' },
  { id: 'faq', label: 'FAQ', href: '#faq', isSection: true, sectionId: 'faq' },
];
