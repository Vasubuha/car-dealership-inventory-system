import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import MarketplaceErrorBoundary from '../components/shared/MarketplaceErrorBoundary';
import MarketplaceSkeletonLoader from '../components/shared/MarketplaceSkeletonLoader';

export default function CustomerLayout() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Shared Glass Navbar in Customer Mode */}
      <Navbar mode="customer" />

      {/* Main Marketplace Route Content */}
      <div className="flex-1">
        <MarketplaceErrorBoundary>
          <Suspense fallback={<MarketplaceSkeletonLoader />}>
            <Outlet />
          </Suspense>
        </MarketplaceErrorBoundary>
      </div>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
