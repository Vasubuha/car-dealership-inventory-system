import SearchSection from '../../components/landing/Search/SearchSection';
import FeaturedInventory from '../../components/landing/Inventory/FeaturedInventory';

export default function MarketplaceVehicles() {
  return (
    <main className="pt-24 sm:pt-28 pb-16">
      <SearchSection />
      <FeaturedInventory
        badge="Marketplace Stock"
        title="All Available Vehicles"
        subtitle="Filter through verified vehicle listings across Indian dealership hubs."
        mode="customer"
      />
    </main>
  );
}
