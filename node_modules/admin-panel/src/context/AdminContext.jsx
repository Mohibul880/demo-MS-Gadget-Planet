// ==============================
// Admin Context
// ==============================
import { createContext, useEffect, useState } from "react";
export const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => { const saved = localStorage.getItem("msgp-admin"); return saved ? JSON.parse(saved) : null; });
  useEffect(() => { if (admin) localStorage.setItem("msgp-admin", JSON.stringify(admin)); else localStorage.removeItem("msgp-admin"); }, [admin]);
  const logout = () => { localStorage.removeItem("msgp-admin-token"); localStorage.removeItem("msgp-admin"); setAdmin(null); window.location.href = "/login"; };
  return <AdminContext.Provider value={{ admin, setAdmin, logout }}>{children}</AdminContext.Provider>;
};
