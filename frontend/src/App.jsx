import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Authentication from './pages/Authentication'

function DashboardPlaceholder() {
  return <main className="grid min-h-screen place-items-center bg-slate-950 p-6 text-slate-300">Dashboard modules are not part of this authentication release.</main>
}

export default function App() {
  return <BrowserRouter><AuthProvider><Routes><Route path="/auth" element={<Authentication />} /><Route path="/admin/dashboard" element={<DashboardPlaceholder />} /><Route path="/dashboard" element={<DashboardPlaceholder />} /><Route path="*" element={<Navigate to="/auth" replace />} /></Routes><Toaster position="top-right" /></AuthProvider></BrowserRouter>
}