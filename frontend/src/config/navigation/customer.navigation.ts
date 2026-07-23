import { MARKETPLACE_SECTIONS } from '../../constants/marketplaceSections';
import type { NavItem } from './guest.navigation';

export const CUSTOMER_NAV_ITEMS: NavItem[] = [
  { id: MARKETPLACE_SECTIONS.HERO, label: 'Home', href: `/home#${MARKETPLACE_SECTIONS.HERO}`, isSection: true, sectionId: MARKETPLACE_SECTIONS.HERO },
  { id: MARKETPLACE_SECTIONS.VEHICLES, label: 'Vehicles', href: `/home#${MARKETPLACE_SECTIONS.VEHICLES}`, isSection: true, sectionId: MARKETPLACE_SECTIONS.VEHICLES },
  { id: MARKETPLACE_SECTIONS.OFFERS, label: 'Offers', href: `/home#${MARKETPLACE_SECTIONS.OFFERS}`, isSection: true, sectionId: MARKETPLACE_SECTIONS.OFFERS },
  { id: MARKETPLACE_SECTIONS.COMPARE, label: 'Compare', href: `/home#${MARKETPLACE_SECTIONS.COMPARE}`, isSection: true, sectionId: MARKETPLACE_SECTIONS.COMPARE },
  { id: 'purchases', label: 'My Purchases', href: '/home/purchases', isSection: false },
  { id: 'wishlist', label: 'Wishlist', href: '/home/wishlist', isSection: false },
  { id: 'profile', label: 'Profile', href: '/home/profile', isSection: false },
];
