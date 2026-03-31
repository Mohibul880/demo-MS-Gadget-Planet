// ==============================
// Cart Context with Local Storage
// ==============================
import { createContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("msgp-cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("msgp-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        toast.success("Quantity updated in cart");
        return prev.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      toast.success("Product added to cart");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((item) => item._id !== id));
  const updateQuantity = (id, quantity) => { if (quantity < 1) return; setCartItems((prev) => prev.map((item) => item._id === id ? { ...item, quantity } : item)); };
  const clearCart = () => setCartItems([]);
  const totalAmount = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);

  return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalAmount }}>{children}</CartContext.Provider>;
};
