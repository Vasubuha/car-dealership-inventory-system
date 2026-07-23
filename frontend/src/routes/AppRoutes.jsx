import { Navigate, Route, Routes } from 'react-router-dom';
import Authentication from '../pages/Authentication';
import Dashboard from '../pages/Dashboard';
import Vehicles from '../pages/Vehicles';
import VehicleDetails from '../pages/VehicleDetails';
import Profile from '../pages/Profile';
import Unauthorized from '../pages/Unauthorized';
import Inventory from '../pages/Inventory';
import PurchaseHistoryPage from '../pages/Purchases';
import AddVehicle from '../pages/admin/AddVehicle';
import EditVehicle from '../pages/admin/EditVehicle';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import CustomerHome from '../pages/CustomerHome';
import CustomerLayout from '../layouts/CustomerLayout';
import MarketplacePurchases from '../pages/customer/MarketplacePurchases';
import MarketplaceProfile from '../pages/customer/MarketplaceProfile';
import MarketplaceCompare from '../pages/customer/MarketplaceCompare';
import MarketplaceVehicles from '../pages/customer/MarketplaceVehicles';
import MarketplaceWishlist from '../pages/customer/MarketplaceWishlist';
import MarketplaceOffers from '../pages/customer/MarketplaceOffers';

const protectedPage = (page) => <ProtectedRoute>{page}</ProtectedRoute>;
const adminPage = (page) => <AdminRoute>{page}</AdminRoute>;

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={protectedPage(<CustomerLayout />)}>
        <Route index element={<CustomerHome />} />
        <Route path="purchases" element={<MarketplacePurchases />} />
        <Route path="profile" element={<MarketplaceProfile />} />
        <Route path="settings" element={<MarketplaceProfile />} />
        <Route path="compare" element={<MarketplaceCompare />} />
        <Route path="vehicles" element={<MarketplaceVehicles />} />
        <Route path="vehicles/:id" element={<MarketplaceVehicles />} />
        <Route path="wishlist" element={<MarketplaceWishlist />} />
        <Route path="offers" element={<MarketplaceOffers />} />
      </Route>
      <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
      <Route path="/admin/dashboard" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Navigate to="/?auth=login" replace />} />
      <Route path="/register" element={<Navigate to="/?auth=register" replace />} />
      <Route element={protectedPage(<MainLayout />)}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/purchases" element={<PurchaseHistoryPage />} />
        <Route path="/vehicles/add" element={adminPage(<AddVehicle />)} />
        <Route path="/vehicles/:id/edit" element={adminPage(<EditVehicle />)} />
        <Route path="/inventory" element={adminPage(<Inventory />)} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
