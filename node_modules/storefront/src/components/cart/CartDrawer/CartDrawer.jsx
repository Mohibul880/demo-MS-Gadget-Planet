// ==============================
// Cart Drawer Component
// ==============================
import useCart from "../../../hooks/useCart.js";
import api from "../../../services/api.js";
import toast from "react-hot-toast";
import { useState } from "react";

const CartDrawer = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();
  const [checkout, setCheckout] = useState({ customerName: "", phone: "", email: "", address: "", note: "" });

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!cartItems.length) return toast.error("Cart is empty");
    const payload = { ...checkout, totalAmount, items: cartItems.map((item) => ({ productId: item._id, name: item.name, image: item.image, price: item.price, quantity: item.quantity })) };
    try {
      await api.post("/orders", payload);
      toast.success("Cart order placed successfully");
      clearCart();
      setCheckout({ customerName: "", phone: "", email: "", address: "", note: "" });
      document.getElementById("cart-drawer").checked = false;
    } catch (error) { toast.error(error.response?.data?.message || "Checkout failed"); }
  };

  return (
    <div className="drawer drawer-end">
      <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content"></div>
      <div className="drawer-side z-50">
        <label htmlFor="cart-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="min-h-full w-full max-w-xl bg-base-100 p-5">
          <h2 className="mb-4 text-2xl font-bold">Shopping Cart</h2>
          <div className="space-y-4">{cartItems.length === 0 ? <p className="rounded-xl bg-base-200 p-4 text-sm">No product in cart yet.</p> : cartItems.map((item) => (
            <div key={item._id} className="rounded-2xl border border-base-300 p-4"><div className="flex gap-4"><img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" /><div className="flex-1"><h3 className="font-bold">{item.name}</h3><p className="text-sm">${item.price}</p><div className="mt-3 flex items-center gap-2"><button className="btn btn-xs" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button><span className="min-w-8 text-center">{item.quantity}</span><button className="btn btn-xs" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button></div></div><button className="btn btn-sm btn-error btn-outline" onClick={() => removeFromCart(item._id)}>Remove</button></div></div>
          ))}</div>
          <div className="mt-6 rounded-2xl bg-base-200 p-4">
            <h3 className="text-lg font-bold">Checkout Form</h3>
            <form className="mt-4 grid gap-3" onSubmit={handleCheckout}>
              <input className="input input-bordered" placeholder="Your name" required value={checkout.customerName} onChange={(e) => setCheckout({ ...checkout, customerName: e.target.value })} />
              <input className="input input-bordered" placeholder="Phone number" required value={checkout.phone} onChange={(e) => setCheckout({ ...checkout, phone: e.target.value })} />
              <input className="input input-bordered" placeholder="Email (optional)" value={checkout.email} onChange={(e) => setCheckout({ ...checkout, email: e.target.value })} />
              <textarea className="textarea textarea-bordered" placeholder="Address" required value={checkout.address} onChange={(e) => setCheckout({ ...checkout, address: e.target.value })}></textarea>
              <textarea className="textarea textarea-bordered" placeholder="Note (optional)" value={checkout.note} onChange={(e) => setCheckout({ ...checkout, note: e.target.value })}></textarea>
              <div className="mt-2 flex items-center justify-between"><span className="text-lg font-bold">Total: ${totalAmount.toFixed(2)}</span><button type="submit" className="btn btn-primary">Place Order</button></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartDrawer;
