// ==============================
// Navbar Component
// ==============================
import { useState } from "react";
import logo from "../../../assets/logo.jpg";
import useCart from "../../../hooks/useCart.js";

const Navbar = () => {
  const { cartItems } = useCart();
  const [theme, setTheme] = useState("light");
  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="navbar sticky top-0 z-40 bg-base-100/95 shadow-md backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex w-full items-center justify-between">
          <a className="flex items-center gap-3 text-xl font-bold text-brand">
            <img src={logo} alt="MS Gadget Planet" className="h-12 w-12 rounded-full object-cover" />
            <span>MS Gadget Planet</span>
          </a>
          <div className="flex items-center gap-3">
            <button className="btn btn-sm btn-outline" onClick={handleTheme}>Theme</button>
            <label htmlFor="cart-drawer" className="btn btn-sm btn-primary">Cart ({cartItems.length})</label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
