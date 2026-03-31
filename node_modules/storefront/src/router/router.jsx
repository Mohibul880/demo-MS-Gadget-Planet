// ==============================
// Storefront Router
// ==============================
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/MainLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import ProductDetails from "../pages/ProductDetails/ProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "product/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

export default router;