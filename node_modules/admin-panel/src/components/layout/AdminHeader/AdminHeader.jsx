// ==============================
// Admin Header
// ==============================
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContext.jsx";

const AdminHeader = () => {
  const { admin, logout } = useContext(AdminContext);
  return <div className="navbar border-b border-base-300 bg-base-100 px-4 shadow-sm"><div className="flex-1"><label htmlFor="admin-drawer" className="btn btn-ghost lg:hidden">Menu</label><h1 className="text-xl font-bold text-brand">Admin Dashboard</h1></div><div className="flex items-center gap-3"><div className="text-right text-sm"><p className="font-semibold">{admin?.email}</p><p className="opacity-70">Administrator</p></div><button className="btn btn-error btn-sm" onClick={logout}>Logout</button></div></div>;
};
export default AdminHeader;
