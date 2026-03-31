// ==============================
// Admin Panel Entry File
// ==============================
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./router/router.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AdminProvider>
  </React.StrictMode>
);
