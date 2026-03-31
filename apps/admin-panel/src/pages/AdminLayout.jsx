// ==============================
// Admin Layout
// ==============================
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/layout/AdminSidebar/AdminSidebar.jsx";
import AdminHeader from "../components/layout/AdminHeader/AdminHeader.jsx";
const AdminLayout = () => <div className="min-h-screen bg-base-200"><div className="drawer lg:drawer-open"><input id="admin-drawer" type="checkbox" className="drawer-toggle" /><div className="drawer-content"><AdminHeader /><div className="p-4 md:p-6"><Outlet /></div></div><div className="drawer-side z-50"><label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay"></label><AdminSidebar /></div></div></div>;
export default AdminLayout;
