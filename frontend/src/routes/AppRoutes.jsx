import { Route, Routes } from 'react-router-dom'

import AddVehicle from '../pages/admin/AddVehicle'
import AdminDashboard from '../pages/admin/AdminDashboard'
import EditVehicle from '../pages/admin/EditVehicle'
import ManageVehicles from '../pages/admin/ManageVehicles'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Authentication from '../pages/Authentication'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import VehicleDetails from '../pages/VehicleDetails'
import AdminRoute from './AdminRoute'
import ProtectedRoute from './ProtectedRoute'
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Authentication />} />
      <Route path="/register" element={<Authentication />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/vehicle/:id" element={<VehicleDetails />} />
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/vehicles" element={<AdminRoute><ManageVehicles /></AdminRoute>} />
      <Route path="/admin/vehicles/add" element={<AdminRoute><AddVehicle /></AdminRoute>} />
      <Route path="/admin/vehicles/edit/:id" element={<AdminRoute><EditVehicle /></AdminRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}