// ==============================
// Main Layout
// ==============================
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar/Navbar.jsx";
import Footer from "../components/layout/Footer/Footer.jsx";
import CartDrawer from "../components/cart/CartDrawer/CartDrawer.jsx";

const MainLayout = () => <><Navbar /><CartDrawer /><main className="min-h-screen"><Outlet /></main><Footer /></>;
export default MainLayout;
