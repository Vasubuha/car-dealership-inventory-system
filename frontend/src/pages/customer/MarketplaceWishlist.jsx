import FeaturedInventory from '../../components/landing/Inventory/FeaturedInventory';

export default function MarketplaceWishlist() {
  return (
    <main className="pt-24 sm:pt-28 pb-16">
      <FeaturedInventory
        badge="Saved Portfolio"
        title="My Vehicle Wishlist"
        subtitle="Your saved luxury, electric, and performance vehicles bookmarked for priority reservation."
        mode="customer"
      />
    </main>
  );
}
