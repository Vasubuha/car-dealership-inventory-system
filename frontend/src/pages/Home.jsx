import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Hero from '../components/landing/Hero/Hero';
import LiveStockPulse from '../components/landing/Operations/LiveStockPulse';
import WorkflowJourney from '../components/landing/Workflow/WorkflowJourney';
import IndiaNetworkMap from '../components/landing/Network/IndiaNetworkMap';
import VehicleCategories from '../components/landing/Categories/VehicleCategories';
import SearchSection from '../components/landing/Search/SearchSection';
import FeaturedInventory from '../components/landing/Inventory/FeaturedInventory';
import OperationsPreview from '../components/landing/Operations/OperationsPreview';
import CustomerDeliveryGallery from '../components/landing/Deliveries/CustomerDeliveryGallery';
import WhyChooseUs from '../components/landing/Features/WhyChooseUs';
import BusinessTrustScale from '../components/landing/Trust/BusinessTrustScale';
import PricingSection from '../components/landing/Pricing/PricingSection';
import FAQSection from '../components/landing/FAQ/FAQSection';
import CallToAction from '../components/landing/CTA/CallToAction';
import Footer from '../components/shared/Footer';

export default function Home() {
  return (
    <main className="bg-white min-h-screen font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* 1. Glass Header */}
      <Navbar mode="guest" />

      {/* 2. Dynamic Parallax Hero */}
      <Hero />

      {/* 3. Real-Time Operational Pulse */}
      <LiveStockPulse />

      {/* 4. 7-Step Dealership Lifecycle Journey */}
      <WorkflowJourney />

      {/* 5. Interactive India Dealership Map */}
      <IndiaNetworkMap />

      {/* 6. Vehicle Categories */}
      <VehicleCategories />

      {/* 7. Portal Search & Budget Slider */}
      <SearchSection />

      {/* 8. Featured Vehicles Inventory */}
      <FeaturedInventory />

      {/* 9. Live App Operations Fragment Preview */}
      <OperationsPreview />

      {/* 10. Customer Delivery Gallery */}
      <CustomerDeliveryGallery />

      {/* 11. Dealership OS Capabilities */}
      <WhyChooseUs />

      {/* 12. Enterprise Scale Credentials */}
      <BusinessTrustScale />

      {/* 13. Transparent SaaS Pricing */}
      <PricingSection />

      {/* 14. FAQ Accordion */}
      <FAQSection />

      {/* 15. CTA Banner */}
      <CallToAction />

      {/* 16. Comprehensive Footer */}
      <Footer />
    </main>
  );
}
