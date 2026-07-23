import type { NavItem } from './guest.navigation';

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', isSection: false },
  { id: 'vehicles', label: 'Vehicles', href: '/vehicles', isSection: false },
  { id: 'inventory', label: 'Inventory', href: '/inventory', isSection: false },
  { id: 'purchases', label: 'Purchases', href: '/purchases', isSection: false },
  { id: 'profile', label: 'Profile', href: '/profile', isSection: false },
];
