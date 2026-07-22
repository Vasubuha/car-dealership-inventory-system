import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
export default function MainLayout() { const [open, setOpen] = useState(false); return <div className="min-h-screen bg-slate-50"><Sidebar open={open} onClose={() => setOpen(false)}/><div className="lg:pl-72"><Navbar onMenu={() => setOpen(true)}/><Outlet/></div></div>; }