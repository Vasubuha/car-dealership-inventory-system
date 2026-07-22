import { Navigate, Route, Routes } from "react-router-dom";
import Authentication from "../pages/Authentication";
import Dashboard from "../pages/Dashboard";
import Vehicles from "../pages/Vehicles";
import VehicleDetails from "../pages/VehicleDetails";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Unauthorized from "../pages/Unauthorized";
import Placeholder from "../pages/Placeholder";
import AddVehicle from "../pages/admin/AddVehicle";
import EditVehicle from "../pages/admin/EditVehicle";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import NotFound from "../pages/NotFound";
const protectedPage=(page)=><ProtectedRoute>{page}</ProtectedRoute>;const adminPage=(page)=><AdminRoute>{page}</AdminRoute>;
export default function AppRoutes(){return <Routes><Route path="/" element={<Navigate to="/dashboard" replace/>}/><Route path="/login" element={<Authentication/>}/><Route path="/register" element={<Authentication/>}/><Route element={protectedPage(<MainLayout/>)}><Route path="/dashboard" element={<Dashboard/>}/><Route path="/vehicles" element={<Vehicles/>}/><Route path="/vehicles/:id" element={<VehicleDetails/>}/><Route path="/profile" element={<Profile/>}/><Route path="/settings" element={<Settings/>}/><Route path="/purchases" element={<Placeholder title="Purchases"/>}/><Route path="/vehicles/add" element={adminPage(<AddVehicle/>)}/><Route path="/vehicles/:id/edit" element={adminPage(<EditVehicle/>)}/><Route path="/inventory" element={adminPage(<Placeholder title="Inventory management"/>)}/><Route path="/reports" element={adminPage(<Placeholder title="Reports"/>)}/><Route path="/users" element={adminPage(<Placeholder title="Users management"/>)}/></Route><Route path="/unauthorized" element={<Unauthorized/>}/><Route path="*" element={<NotFound/>}/></Routes>}