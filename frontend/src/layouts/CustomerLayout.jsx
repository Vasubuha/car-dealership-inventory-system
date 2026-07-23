import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

export default function CustomerLayout() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Shared Glass Navbar in Customer Mode */}
      <Navbar mode="customer" />

      {/* Main Marketplace Route Content */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
