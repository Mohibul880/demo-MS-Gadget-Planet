// ==============================
// Navbar Component
// ==============================
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.jpg";
import useCart from "../../../hooks/useCart.js";

const Navbar = () => {
  const { cartItems } = useCart();
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  const location = useLocation();

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="navbar sticky top-0 z-40 bg-base-100/95 shadow-md backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center gap-3 bg-transparent p-0 text-xl font-bold text-brand border-0 cursor-pointer"
          >
            <img
              src={logo}
              alt="MS Gadget Planet"
              className="h-12 w-12 rounded-full object-cover"
            />
            <span>MS Gadget Planet</span>
          </button>

          <div className="flex items-center gap-3">
            <button className="btn btn-sm btn-outline" onClick={handleTheme}>
              Theme
            </button>

            <label htmlFor="cart-drawer" className="btn btn-sm btn-primary">
              Cart ({cartItems.length})
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;