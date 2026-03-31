// ==============================
// Admin Router
// ==============================
import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import AdminLayout from "../pages/AdminLayout.jsx";
const isLoggedIn = () => Boolean(localStorage.getItem("msgp-admin-token"));
const router = createBrowserRouter([
  { path: "/login", element: isLoggedIn() ? <Navigate to="/" /> : <LoginPage /> },
  { path: "/", element: isLoggedIn() ? <AdminLayout /> : <Navigate to="/login" />, children: [{ index: true, element: <DashboardPage /> }] }
]);
export default router;
