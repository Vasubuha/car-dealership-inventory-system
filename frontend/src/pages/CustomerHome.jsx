import CustomerHero from '../components/customer/CustomerHero';
import QuickStats from '../components/customer/QuickStats';
import ContinueBrowsing from '../components/customer/ContinueBrowsing';
import FeaturedInventory from '../components/landing/Inventory/FeaturedInventory';
import VehicleCategories from '../components/landing/Categories/VehicleCategories';
import PurchasePreview from '../components/customer/PurchasePreview';
import RecentlyAdded from '../components/customer/RecentlyAdded';
import CustomerOffers from '../components/customer/CustomerOffers';
import ComparisonSection from '../components/customer/ComparisonSection';
import CustomerExperience from '../components/landing/Testimonials/CustomerExperience';
import CustomerCTA from '../components/customer/CustomerCTA';

export default function CustomerHome() {
  return (
    <main className="bg-white font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* 1. Customer Personalized Hero (Welcome Back + Reused HeroCarousel) */}
      <CustomerHero />

      {/* 2. Personal Member Quick Stats */}
      <QuickStats />

      {/* 3. Continue Browsing (Recently Viewed Stock) */}
      <ContinueBrowsing />

      {/* 4. Recommended For You (Reused FeaturedVehicles) */}
      <FeaturedInventory
        badge="Personalized Recommendations"
        title="Recommended For You"
        subtitle="Handpicked vehicle listings tailored to your browsing preferences and saved searches."
        mode="customer"
      />

      {/* 5. Vehicle Categories (Reused Categories) */}
      <VehicleCategories
        badge="Marketplace Segments"
        title="Continue Browsing Categories"
        subtitle="Explore luxury sedans, electric SUVs, sports coupes, and commercial fleets."
      />

      {/* 6. My Purchases Preview */}
      <PurchasePreview />

      {/* 7. Recently Added Vehicles (Auto-scrolling) */}
      <RecentlyAdded />

      {/* 8. Exclusive Member Offers & Financing */}
      <CustomerOffers />

      {/* 9. Interactive Vehicle Comparison Tool */}
      <ComparisonSection />

      {/* 10. Customer Experience & Testimonials (Reused) */}
      <CustomerExperience />

      {/* 11. Personalized Customer CTA Banner */}
      <CustomerCTA />
    </main>
  );
}
