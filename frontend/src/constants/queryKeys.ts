export const QUERY_KEYS = {
  purchases: (userId?: string | number) => ['purchases', userId ? String(userId) : 'guest'],
  wishlist: (userId?: string | number) => ['wishlist', userId ? String(userId) : 'guest'],
  profile: (userId?: string | number) => ['profile', userId ? String(userId) : 'guest'],
  vehicles: ['vehicles'],
  featuredVehicles: ['featuredVehicles'],
} as const;
