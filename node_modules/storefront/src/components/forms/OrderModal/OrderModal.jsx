// ==============================
// Order Modal Form
// ==============================
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../services/api.js";

const OrderModal = ({ product, onClose }) => {
  const [formData, setFormData] = useState({ customerName: "", phone: "", email: "", address: "", note: "", quantity: 1 });
  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleOrder = async (e) => {
    e.preventDefault();
    const payload = {
      customerName: formData.customerName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      note: formData.note,
      totalAmount: Number(product.price) * Number(formData.quantity),
      items: [{ productId: product._id, name: product.name, image: product.image, price: product.price, quantity: Number(formData.quantity) }]
    };
    try { await api.post("/orders", payload); toast.success("Order placed successfully"); onClose(); } catch (error) { toast.error(error.response?.data?.message || "Order failed"); }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="text-2xl font-bold">Order: {product.name}</h3>
        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleOrder}>
          <input className="input input-bordered w-full" name="customerName" placeholder="Your name" required onChange={handleChange} />
          <input className="input input-bordered w-full" name="phone" placeholder="Phone number" required onChange={handleChange} />
          <input className="input input-bordered w-full md:col-span-2" name="email" placeholder="Email (optional)" onChange={handleChange} />
          <input className="input input-bordered w-full md:col-span-2" name="address" placeholder="Full address" required onChange={handleChange} />
          <input className="input input-bordered w-full" type="number" min="1" name="quantity" value={formData.quantity} onChange={handleChange} />
          <input className="input input-bordered w-full" value={`$${product.price}`} disabled readOnly />
          <textarea className="textarea textarea-bordered md:col-span-2" name="note" placeholder="Extra note" onChange={handleChange}></textarea>
          <div className="modal-action md:col-span-2"><button type="button" className="btn" onClick={onClose}>Close</button><button type="submit" className="btn btn-primary">Confirm Order</button></div>
        </form>
      </div>
    </dialog>
  );
};
export default OrderModal;
