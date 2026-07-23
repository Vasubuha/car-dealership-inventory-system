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
import ScrollManager from '../components/shared/ScrollManager';
import { MARKETPLACE_SECTIONS } from '../constants/marketplaceSections';

export default function CustomerHome() {
  return (
    <main className="bg-white font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      <ScrollManager />

      {/* 1. Customer Personalized Hero */}
      <section id={MARKETPLACE_SECTIONS.HERO}>
        <CustomerHero />
        <QuickStats />
        <ContinueBrowsing />
      </section>

      {/* 2. Vehicles Discovery & Categories */}
      <section id={MARKETPLACE_SECTIONS.VEHICLES}>
        <FeaturedInventory
          badge="Personalized Recommendations"
          title="Recommended For You"
          subtitle="Handpicked vehicle listings tailored to your browsing preferences and saved searches."
          mode="customer"
        />
        <VehicleCategories
          badge="Marketplace Segments"
          title="Continue Browsing Categories"
          subtitle="Explore luxury sedans, electric SUVs, sports coupes, and commercial fleets."
        />
        <PurchasePreview />
        <RecentlyAdded />
      </section>

      {/* 3. Member Offers & Financing */}
      <section id={MARKETPLACE_SECTIONS.OFFERS}>
        <CustomerOffers />
      </section>

      {/* 4. Interactive Vehicle Comparison Tool */}
      <section id={MARKETPLACE_SECTIONS.COMPARE}>
        <ComparisonSection />
      </section>

      {/* 5. Customer Experience & Testimonials */}
      <section id={MARKETPLACE_SECTIONS.TESTIMONIALS}>
        <CustomerExperience />
      </section>

      {/* 6. Personalized Customer CTA Banner */}
      <section id={MARKETPLACE_SECTIONS.CTA}>
        <CustomerCTA />
      </section>
    </main>
  );
}
