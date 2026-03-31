// ==============================
// Storefront Router
// ==============================
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/MainLayout.jsx";
import HomePage from "../pages/HomePage.jsx";

const router = createBrowserRouter([{ path: "/", element: <MainLayout />, children: [{ index: true, element: <HomePage /> }] }]);
export default router;
